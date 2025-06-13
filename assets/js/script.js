document.addEventListener("DOMContentLoaded", () => {
    const apiKey = '5150e8bc5f4cb27681767291cc49aca4';
    const weatherResult = document.getElementById("weather-result");
    const input = document.querySelector("input");


    // Event listener for input
    input.addEventListener("keydown", getCity);

    function getCity(e) {
        if (e.key === "Enter") {
        e.preventDefault();
        const city = input.value;
        getWeather(city);
        }
    }
    async function getWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
        const response = await fetch(url); // Waits for the API to respond

        if (!response.ok) {
        throw new Error('City not found'); // Triggers the catch block below
        }

        const data = await response.json(); // Parses the JSON body

        // Create HTML using data
        const weatherInfo = `
        <div class="input-group">
            <div class="input-group-text text-white-50 bg-dark">Weather</div>
            <p>${data.weather[0].description}</p>
        </div>
        <div class="input-group">
            <div class="input-group-text text-white-50 bg-dark">Temp</div>
            <p>${data.main.temp}°C</p>
        </div>
        <div class="input-group">
            <div class="input-group-text text-white-50 bg-dark">Wind</div>
            <p>${data.wind.speed}</p>
        </div>`;

        // display result
        weatherResult.innerHTML = weatherInfo;

        } catch (error) {
            // Runs if there's a problem (e.g. bad city name or network error)
            weatherResult.innerHTML = `<p>${error.message}</p>`;
        }
    }
})
