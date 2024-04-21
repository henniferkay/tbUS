
let map = L.map('map').setView([37.8, -96], 4);

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
        const {rates, cases} = layer.feature.properties;
        return `
            <h3>State: ${states}</h3>
            <h3>Rates: ${rates}</h3>
            <h3>Cases: ${cases}</h3>
        `;
    }).addTo(map);
};
init();

