document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('weatherForm');
  const cityInput = document.getElementById('cityInput');
  const errorEl = document.getElementById('error');
  const weatherCard = document.getElementById('weatherData');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
      errorEl.textContent = "Please enter a city name.";
      weatherCard.style.display = "none";
      return;
    }

    try {
      const apiKey = "17dd6eaccdf84001889141736250607";
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      errorEl.textContent = "";

      const condition = data.current.condition.text.toLowerCase();
      const iconEl = document.getElementById('customIcon');

     
      document.body.className = "default";
      let iconClass = "fa-sun";

      if (condition.includes("sunny") || condition.includes("clear")) {
        document.body.className = "sunny";
        iconClass = "fa-sun";
      } else if (condition.includes("cloudy") || condition.includes("overcast")) {
        document.body.className = "cloudy";
        iconClass = "fa-cloud";
      } else if (condition.includes("rain") || condition.includes("drizzle") || condition.includes("storm")) {
        document.body.className = "rainy";
        iconClass = "fa-cloud-showers-heavy";
      } else if (condition.includes("snow") || condition.includes("ice") || condition.includes("sleet")) {
        document.body.className = "snowy";
        iconClass = "fa-snowflake";
      }

      document.getElementById('location').textContent = `${data.location.name}, ${data.location.country}`;
      document.getElementById('icon').src = data.current.condition.icon;
      document.getElementById('icon').alt = data.current.condition.text;
      iconEl.className = `fa-solid ${iconClass}`;
      document.getElementById('condition').textContent = data.current.condition.text;
      document.getElementById('temperature').textContent = data.current.temp_c;
      document.getElementById('humidity').textContent = data.current.humidity;
      document.getElementById('wind').textContent = data.current.wind_kph;

      weatherCard.style.display = "block";
    } catch (err) {
      errorEl.textContent = "Unable to fetch weather. Try another city.";
      weatherCard.style.display = "none";
      document.body.className = "default";
    }
  });
});
