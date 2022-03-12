const form = document.querySelector('form');
const input = document.querySelector('input');

const IPAddress = document.querySelector('.IP');
const loc = document.querySelector('.location');
const zone = document.querySelector('.zone');
const ISP = document.querySelector('.ISP');

const map = L.map('map').setView([0, 0], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([0, 0]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

function checkIfValidIP(str) {
    // Regular expression to check if string is a IP address
    const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
    return regexExp.test(str);
}

const getIPData = async(value) => {
    
    try {
        const response = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_4EXMvOeC6uOgaEdvjjMf1IhzS316s&ipAddress=${value}`);
        if(response.ok) {
            const result = await response.json();
            return result;
        }

    } catch(err) {
        console.log("ERROR HAPPENED", err);
    }
}

const getCoordinates = async(value) => {
    try {
        const response = await fetch(`https://geocode.search.hereapi.com/v1/geocode?apiKey=XNeg3AZApytiueZf9WELqLeJ82vhMuk6m9BQqrTDr1g&q=${value}`);
        if(response.ok) {
            const result = await response.json();
            return result;
        }

    } catch(err) {
        console.log("ERROR HAPPENED", err);
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent default behaviour then call necessary functions

    if(checkIfValidIP(input.value)) {
        const IPData = getIPData(input.value);

        IPData.then((data) => {
            console.log(data);
            IPAddress.textContent = data['ip'];
            ISP.textContent = data['isp'];
            loc.textContent = data['location']['region'];
            zone.textContent = data['location']['timezone'];
    
            const mapCoordinates = getCoordinates(loc.textContent);
            mapCoordinates.then((vals) => {
                map.setView([vals['items'][0]['position']['lat'], vals['items'][0]['position']['lng']], 13);
            });
        });
    } else {
        alert("Invald IP")
    }
   

    input.value = '';
});

