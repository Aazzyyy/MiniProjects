function ExpandViewOPenCLose() {
    var elements = document.querySelectorAll('.elems');
    var Expand = document.querySelectorAll('.elem_exp_view');
    var backButton = document.querySelectorAll('.back');

    elements.forEach(function (element, index) {
        element.addEventListener('click', function () {
            Expand[index].style.display = 'block';
        })
    })

    backButton.forEach(function (button, index) {
        button.addEventListener('click', function () {
            Expand[index].style.display = 'none';
        })
    })
}

ExpandViewOPenCLose();

function datetime(){
    document.addEventListener("DOMContentLoaded", () => {
    const temp = document.querySelector(".temperature");
    const weather = document.querySelector(".weather");
    const humidity = document.querySelector(".humidity");
    const precipitation = document.querySelector(".precipitation");
    const wind = document.querySelector(".wind");

    const timeSection = document.querySelector(".time");
    const dateEl = timeSection.querySelectorAll("p")[0];
    const dayTimeEl = timeSection.querySelector("h2");
    const locationEl = timeSection.querySelectorAll("p")[1];

    const city = prompt("Enter your city") || "Kolkata";

    async function getCoordinates(city) {
        const res = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );
        const data = await res.json();
        return data.results[0];
    }

    async function getWeather(lat, lon) {
        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );
        return await res.json();
    }

    async function initWeather() {
        try {
            const locationData = await getCoordinates(city);
            const weatherData = await getWeather(
                locationData.latitude,
                locationData.longitude
            );

            const current = weatherData.current;

            temp.textContent = `${current.temperature_2m}°C`;
            weather.textContent = "Live Weather";
            humidity.textContent = `Humidity: ${current.relative_humidity_2m}%`;
            wind.textContent = `Wind: ${current.wind_speed_10m} km/h`;
            precipitation.textContent = `Latitude: ${locationData.latitude}`;
            locationEl.textContent = locationData.name;
        } catch {
            weather.textContent = "Weather data unavailable";
        }
    }

    function updateDateTime() {
        const now = new Date();

        const days = [
            "Sunday", "Monday", "Tuesday",
            "Wednesday", "Thursday", "Friday", "Saturday"
        ];

        dateEl.textContent = now.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        const time = now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

        dayTimeEl.textContent = `${days[now.getDay()]}, ${time}`;
    }

    initWeather();
    updateDateTime();
    setInterval(updateDateTime, 1000);
});
}

datetime();