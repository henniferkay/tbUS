
let map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const init = async year => {

    console.log(year);

    

    // let data = await (await fetch('/api/combined_data')).json();
    let data = await (await fetch('static/Resources/complete_df.json')).json();
    let states = await (await fetch('https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json')).json()

    if (year == undefined) {

        let years = [... new Set(Object.values(data.Year))];

        year = years[0];

        document.getElementById('years').innerHTML = '';
        years.forEach(year => {
            document.getElementById('years').innerHTML += `<option>${year}</option>`;
        });
    };

    console.log(data);


    L.geoJSON(states, {
        style: function (feature) {
            return { color: "blue" };
        }
    }).bindPopup(function (layer) {
        return layer.feature.properties.description;
    }).addTo(map);




};

init();