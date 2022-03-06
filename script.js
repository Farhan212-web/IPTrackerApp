const form = document.querySelector('form');
const input = document.querySelector('input');

const IPAddress = document.querySelector('.IP');
const loc = document.querySelector('.location');
const zone = document.querySelector('.zone');
const ISP = document.querySelector('.ISP');

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


form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent default behaviour then call necessary functions
    const IPData = getIPData(input.value);

    IPData.then((data) => {
        console.log(data);
        IPAddress.textContent = data['ip'];
        ISP.textContent = data['isp'];
        loc.textContent = data['location']['region'];
        zone.textContent = data['location']['timezone'];
    });
});

const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

