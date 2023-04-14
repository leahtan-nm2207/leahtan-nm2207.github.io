//Defines constant that stores the URL of a GeoJSON file containing geographical data for New York City boroughs
const boroughDataUrl = "https://raw.githubusercontent.com/codeforgermany/click_that_hood/1734be84a75016d24f819949158e73781c9c891c/public/data/new-york-city-boroughs.geojson";

//Manually type in the data for the number of pet abuse cases in each borough
const petAbuseByBorough = {
  "Bronx": 15279,
  "Brooklyn": 24012,
  "Manhattan": 14080,
  "Queens": 20672,
  "Staten Island": 5500
};

//Fetching data from GeoJson data
async function loadGeoJsonData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//Initialise map
async function initMap() {
const boroughData = await loadGeoJsonData(boroughDataUrl);
const map = L.map('map').setView([40.7128, -74.0060], 10);

//Add the base map layer (OpenStreetMap)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Add the GeoJSON layer with the style and onEachFeature functions
L.geoJson(boroughData, {style: style, onEachFeature: onEachFeature}).addTo(map);

//Add legend code here
var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 5000, 10000, 15000, 20000, 240000],
    labels = [];

  //Loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
    return div;
};
  legend.addTo(map);
}

initMap();

//Define the color scale based on the number of pet abuse cases
const getColor = d => {
  return d > 24000 ? '#800026' :
    d > 20000 ? '#BD0026' :
    d > 15000 ? '#E31A1C' :
    d > 10000 ? '#FC4E2A' :
    d > 5000  ? '#FD8D3C' :
      '#FFEDA0';
};

//Style function for the GeoJSON layer
const style = feature => {
  const borough = feature.properties.name;
  const cases = petAbuseByBorough[borough] || 0;
    return {
      fillColor: getColor(cases),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

//Map interactions
function highlightFeature(e) {
  const layer = e.target;
  layer.setStyle({
    weight: 2,
    text:'Borough name and number of pet abuse cases',
    color: '',
    dashArray: '',
    fillOpacity: 0.7
  });
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

function resetHighlight(e) {
  const layer = e.target;
  layer.setStyle(style(layer.feature));
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
  });
}

function updateInfo(e) {
  const layer = e.target;
  const borough = layer.feature.properties.name;
  const cases = petAbuseByBorough[borough] || 0;

  document.getElementById('info').innerHTML = `
    <h4>${borough}</h4>
    <p>Pet abuse cases: ${cases}</p>
  `;
}

function clearInfo() {
  document.getElementById('info').innerHTML = '';
}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: (e) => {
      highlightFeature(e);
      updateInfo(e);
    },
    mouseout: (e) => {
      resetHighlight(e);
      clearInfo();
    },
  });
}

//Above code derived from https://leafletjs.com/examples/choropleth/