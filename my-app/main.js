import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { Circle as CircleGeom } from 'ol/geom.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Style } from 'ol/style.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';

const sanLuisObispo = new Feature({
  geometry: new CircleGeom([-120.680656, 35.270378], 0.03),
});
const nevada = new Feature({
  geometry: new CircleGeom([-119.749619, 38.941296], 0.03),
});
const circleStyle = new Style({
    renderer(coordinates, state) {
      const [[x, y], [x1, y1]] = coordinates;
      const ctx = state.context;
      const dx = x1 - x;
      const dy = y1 - y;
      const radius = Math.sqrt(dx * dx + dy * dy);

      const innerRadius = 0;
      const outerRadius = radius * 1.4;

      const gradient = ctx.createRadialGradient(
        x,
        y,
        innerRadius,
        x,
        y,
        outerRadius,
      );
      gradient.addColorStop(0, 'rgba(255,0,0,0)');
      gradient.addColorStop(0.6, 'rgba(255,0,0,0.2)');
      gradient.addColorStop(1, 'rgba(255,0,0,0.8)');
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
      ctx.strokeStyle = 'rgba(255,0,0,1)';
      ctx.stroke();
    },
  });

sanLuisObispo.setStyle(circleStyle);
nevada.setStyle(circleStyle);

new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
      visible: true,
    }),
    new VectorLayer({
      source: new VectorSource({
        features: [sanLuisObispo, nevada],
      }),
    }),
  ],
  target: 'map',
  view: new View({
    projection: 'EPSG:4326',
    center: [-120.680656, 35.270378], // Longitude first, then latitude
    zoom: 10
  })
});