
let map = L.map('map').setView([37.8, -96], 6);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const init = async year => {

    // Clear existing layers from the map
    map.eachLayer(layer => {
        if (layer instanceof L.GeoJSON) {
            map.removeLayer(layer);
        }
    });

    // Load data
    //let data = await (await fetch('/api/combined_data')).json();
    data = await (await fetch('static/Resources/complete_df.json')).json();
    states = await (await fetch('https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json')).json()
    
    // Set default year and populate year dropdown
    if (year == undefined) {

        let years = [... new Set(Object.values(data.Year))];

        year = years[0];

        document.getElementById('years').innerHTML = '';
        years.forEach(year => {
            document.getElementById('years').innerHTML += `<option>${year}</option>`;
        });
    };


    // Filter data based on selected year 
    keys_filtered = Object.entries(data.Year).filter(arr=>arr[1]==year).map(arr=>arr[0])
    cases = keys_filtered.map(k => data.Cases[k]);
    rates = keys_filtered.map(k => data.Rate_per_100000[k]);
    rates.map( (rate, i) => states.features[i].properties.rates=rate);
    cases.map( (count, i) => states.features[i].properties.cases=count);

//    Parse GeoJSON data and display it on the map and create new L.geoJSON layer with updated styling and popup content

    L.geoJSON(states, {
        style: function ({properties:{cases}}) {
            return {
                color: "black",
                weight:2,
                fillOpacity:1
                ,
                fillColor: 
                    cases > 2000 ? 'rgb(128, 0, 128)': 
                    cases > 1500 ? 'rgb(237,67,80)' : 
                    cases > 1000 ? 'rgb(51,77,143)' : 
                    cases > 500 ? 'rgb(241,106,106)' : 
                    cases > 300 ? 'rgb(204,204,204)' : 
                    cases > 100 ? 'rgb(255,179,125)' :
                    cases > 50 ? 'rgb(105,123,170': 'rgb(23,134,136)'

            };
        }
    }).bindPopup(function (layer) {
        console.log(layer)
        const {rates, cases,name} = layer.feature.properties;
        return `
            <h5>State: ${name}<br> Rates: ${rates}
            <br>Cases: ${cases}</h5>
        `;
    }).addTo(map);

};
init();

function getColor(cases) {
    return cases > 2000 ? 'rgb(128, 0, 128)' :
           cases > 1500 ? 'rgb(237, 67, 80)' :
           cases > 1000 ? 'rgb(51, 77, 143)' :
           cases > 500 ? 'rgb(241, 106, 106)' :
           cases > 300 ? 'rgb(204, 204, 204)' :
           cases > 100 ? 'rgb(255, 179, 125)' :
           cases > 50 ? 'rgb(105, 123, 170)' : 'rgb(23, 134, 136)'};

// Create legend control
let legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'legend');
    let labels = ['<strong>Cases</strong>'];

    // Array of color ranges and labels
    let colors = [0, 50, 100, 300, 500, 1000, 1500, 2000];
    for (let i = 0; i < colors.length; i++) {
        div.innerHTML +=
            labels.push(
                '<i style="background:' + getColor(colors[i] + 1) + '"></i> ' +
                (colors[i] + 1) + (colors[i + 1] ? '&ndash;' + colors[i + 1] : '+'));
    }
    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(map);
