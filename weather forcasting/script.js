const apiKey = "KEUBQ3CJEXQRK5J2TUCXVJ9QJ"; 
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

// Add Enter key support
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        } else {
            alert("Please enter a city name");
        }
    }
});

async function getWeather(city) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || data.error) {
            throw new Error(data.message || `City "${city}" not found.`);
        }

        const current = data.currentConditions;

        document.getElementById("cityName").textContent = `${data.resolvedAddress}`;
        document.getElementById("temperature").textContent = `🌡 Temperature: ${current.temp}°C`;
        document.getElementById("humidity").textContent = `💧 Humidity: ${current.humidity}%`;

        // Weather icon from Visual Crossing (based on "icon" property)
        const iconName = current.icon || "unknown";
        document.getElementById("weatherIcon").src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${iconName}.png`;

        // Show the weather data
        document.getElementById("weatherData").style.display = "block";

    } catch (error) {
        console.error("Weather API Error:", error);
        alert(error.message);
        // Hide weather data on error
        document.getElementById("weatherData").style.display = "none";
    }
}
