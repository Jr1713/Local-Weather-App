// script.js

const locationEl = document.getElementById("location");
const iconEl = document.getElementById("icon");
const descEl = document.getElementById("description");
const tempValueEl = document.getElementById("temp-value");
const tempUnitEl = document.getElementById("temp-unit");
const toggleBtn = document.getElementById("toggle");

let celsiusTemp = null;
let isCelsius = true;

// Get user location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);
} else {
  locationEl.textContent = "Geolocation not supported by your browser.";
}

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  // Use FreeCodeCamp proxy weather API
  const apiURL = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`;

  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      const { name } = data;
      const { temp } = data.main;
      const { description, icon, main } = data.weather[0];

      celsiusTemp = temp;
      locationEl.textContent = name;
      descEl.textContent = description.charAt(0).toUpperCase() + description.slice(1);
      tempValueEl.textContent = Math.round(celsiusTemp);
      iconEl.innerHTML = `<img src="${icon}" alt="${description}"/>`;

      setBackground(main);
    })
    .catch(() => {
      locationEl.textContent = "Unable to retrieve weather data.";
    });
}

function error() {
  locationEl.textContent = "Unable to access your location.";
}

// Set background based on weather condition
function setBackground(condition) {
  let image = "";
  condition = condition.toLowerCase();

  if (condition.includes("cloud")) {
    image = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')";
  } else if (condition.includes("rain")) {
    image = "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')";
  } else if (condition.includes("clear")) {
    image = "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9')";
  } else if (condition.includes("snow")) {
    image = "url('https://images.unsplash.com/photo-1608889179113-52bdc212d4f2')";
  } else {
    image = "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')";
  }

  document.body.style.backgroundImage = image;
}

// Toggle temperature unit
toggleBtn.addEventListener("click", () => {
  if (celsiusTemp === null) return;

  if (isCelsius) {
    const fahrenheit = (celsiusTemp * 9) / 5 + 32;
    tempValueEl.textContent = Math.round(fahrenheit);
    tempUnitEl.textContent = "°F";
  } else {
    tempValueEl.textContent = Math.round(celsiusTemp);
    tempUnitEl.textContent = "°C";
  }
  isCelsius = !isCelsius;
});
