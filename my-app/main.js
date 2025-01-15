import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { Circle as CircleGeom } from 'ol/geom.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Style } from 'ol/style.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';

const fresno = new Feature({
  geometry: new CircleGeom([-119.772591, 36.737798], 0.03),
});
const sanFrancisco2 = new Feature({
  geometry: new CircleGeom([-122.419418, 37.774929], 0.06),
});
const gardnervilleNevada = new Feature({
  geometry: new CircleGeom([-119.749619, 38.941296], 0.03),
});
const losAngeles = new Feature({
  geometry: new CircleGeom([-118.243683, 34.052235], 0.03),
});
const folsomCA = new Feature({
  geometry: new CircleGeom([-121.172958, 38.677959], 0.03),
});

const circleStyleRed = new Style({
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
      outerRadius
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

const circleStyleYellow = new Style({
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
      outerRadius
    );
    gradient.addColorStop(0, 'rgba(255,0,0,0)');
    gradient.addColorStop(0.6, 'rgb(255, 176, 7)');
    gradient.addColorStop(1, 'rgb(229, 255, 0)');
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    ctx.strokeStyle = 'rgb(255, 221, 0)';
    ctx.stroke();
  },
});

fresno.setStyle(circleStyleRed);
sanFrancisco2.setStyle(circleStyleYellow);
gardnervilleNevada.setStyle(circleStyleRed);
losAngeles.setStyle(circleStyleRed);
folsomCA.setStyle(circleStyleRed);

new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
      visible: true,
    }),
    new VectorLayer({
      source: new VectorSource({
        features: [
          fresno,
          sanFrancisco2,
          gardnervilleNevada,
          losAngeles,
          folsomCA,
        ],
      }),
    }),
  ],
  target: 'map',
  view: new View({
    projection: 'EPSG:4326',
    center: [-119.417931, 36.778259], // Centered over California
    zoom: 6, // Adjust zoom for broader view of the locations
  }),
});
