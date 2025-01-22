const axios = require('axios');
const { shell } = require('electron');

document.getElementById('get-key').addEventListener('click', () => {
    const url = 'https://home.openweathermap.org/api_keys'; // The URL you want to open
    shell.openExternal(url); // Opens the link in the default browser
});

// mainWindow.webContents.setWindowOpenHandler((details) => {
//  shell.openExternal(details.url); // Open URL in user's browser.
//  return { action: "deny" }; // Prevent the app from opening the URL.
// })


function handleChange() {
  const WEATHER_API_KEY1 = document.getElementById('WEATHER_API_KEY')
  return WEATHER_API_KEY1
}

const WEATHER_API_KEY2 = handleChange()

console.log(document.getElementById('WEATHER_API_KEY'))

const weather_get = async(city) => {
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY2.value}`);
        return response.data
    }
    catch(error){
        console.log('error fetching',error)
    }
}



document.getElementById('fetch-btn').addEventListener('click', async () => {
  
    const city = document.getElementById('city-input').value;
    if (city) {
      console.log(city)
      const data = await weather_get(city);
      celcius = (data.main.temp - 273.15)
      document.getElementById('weather-output').innerHTML = (`
        <p>Temperature: ${((celcius * 9/5) + 32).toFixed(2)}°F / ${celcius.toFixed(2)}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
      `);
    } else {
      alert('Please enter a city name.');
    }
  });
  