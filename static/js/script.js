
let map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const init = async year => {

    // let data = await (await fetch('/api/combined_data')).json();
    data = await (await fetch('static/Resources/complete_df.json')).json();
    states = await (await fetch('https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json')).json()

    if (year == undefined) {

        let years = [... new Set(Object.values(data.Year))];

        year = years[0];

        document.getElementById('years').innerHTML = '';
        years.forEach(year => {
            document.getElementById('years').innerHTML += `<option>${year}</option>`;
        });
    };

    keys_filtered = Object.entries(data.Year).filter(arr=>arr[1]==year).map(arr=>arr[0])
    cases = keys_filtered.map(k => data.Cases[k]);
    rates = keys_filtered.map(k => data.Rate_per_100000[k]);
    rates.map( (rate, i) => states.features[i].properties.rates=rate);
    cases.map( (count, i) => states.features[i].properties.cases=count);

//    Allows you to parse GeoJSON data and display it on the map 
    L.geoJSON(states, {
        style: function ({properties:{cases}}) {
            return {
                color: "black",
                weight:1,
                fillOpacity:.3,
                fillColor: 
                    cases > 2000 ? 'purple' : 
                    cases > 1500 ? 'red' : 
                    cases > 1000 ? 'blue' : 
                    cases > 500 ? 'yellow' : 
                    cases > 100 ? 'orange' :
                    cases > 50 ? 'blue': 'green'

            };
        }
    }).bindPopup(function ({feature:{properties:{rates}}}) {
        
        return `<h3>Rates: ${rates}</h3>`;
    }).addTo(map);
};
init();

