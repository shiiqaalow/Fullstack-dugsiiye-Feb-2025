
// const data = {
//     "coord": {
//         "lon": -74.006,
//         "lat": 40.7143
//     },
//     "weather": [
//         {
//             "id": 800,
//             "main": "Clear",
//             "description": "clear sky",
//             "icon": "01d"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 77.32,
//         "feels_like": 76.96,
//         "temp_min": 73.94,
//         "temp_max": 80.55,
//         "pressure": 1018,
//         "humidity": 47,
//         "sea_level": 1018,
//         "grnd_level": 1018
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 10.36,
//         "deg": 50
//     },
//     "clouds": {
//         "all": 0
//     },
//     "dt": 1749848753,
//     "sys": {
//         "type": 1,
//         "id": 4610,
//         "country": "US",
//         "sunrise": 1749806661,
//         "sunset": 1749860885
//     },
//     "timezone": -14400,
//     "id": 5128581,
//     "name": "New York",
//     "cod": 200
// }

document.querySelector(".form").addEventListener("submit",async function(e){
    e.preventDefault();

    const city = document.querySelector(".input");

    const url = `https://open-weather13.p.rapidapi.com/city?city=${city.value}&lang=EN`

    const options = {
        method:"GET",
        headers: {
            "x-rapidapi-key": "7fda873889msh19464de9555d5f1p1443d7jsn82b0ae898f5d",
            "x-rapidapi-host": "open-weather13.p.rapidapi.com"
        }
    }

    try {
        const response = await fetch(url,options);
        const result = await response.json();
        console.log(result.data)
        displayWeather(result)

        city.value = ""
    }
    catch(error){
        console.error("failed to fetch wheather data")
    }
})
function displayWeather(data){
    const weatherContainer = document.querySelector(".wheather-container");
    weatherContainer.innerHTML = "";

    const div = document.createElement("div");

    div.innerHTML = `
        <div class="wheather-info">
            <img src="./assets/${data.weather[0].main}.png" alt="">
            <h1>${Math.round((data.main.temp - 32) * 5 / 9)} <span>°</span> C</h1>
            <h2>${data.name}</h2>
        </div>
        <div class="wind-info">
            <div class="humanity">
                <img src="./assets/humidity.png" alt="humidity-pic">
                <div class="humidity-info">
                    <h3>${data.main.humidity}%</h3>
                    <p>Humidity</p>
                </div>
            </div>
            <div class="wind">
                <img src="./assets/wind.png" alt="wind-pic">
                <div class="wind-speed">
                    <h4>${Math.round(data.wind.speed * 1.609)} km/h</h4>
                    <p>Wind Speed</p>
                </div>
            </div>
        </div>
    `;
    weatherContainer.appendChild(div);
}
