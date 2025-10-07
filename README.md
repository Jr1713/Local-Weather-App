# Local Weather App 🌤️

A web app that detects the user’s location and displays the current weather.  
It also allows toggling between Celsius and Fahrenheit, and dynamically changes the background based on weather conditions.

Live demo (CodePen): [Local Weather by jr-delfin](https://codepen.io/jr-delfin/pen/NPxdOMP) :contentReference[oaicite:0]{index=0}

---

## Table of Contents

1. What It Does  
2. Tools & Technologies Used  
3. How It Works  
4. API / Data Source  
5. Project Structure  
6. Usage / Instructions  
7. Possible Enhancements  
8. License  

---

## 1. What It Does

- Uses the browser’s Geolocation API to get the user’s latitude & longitude  
- Fetches current weather data for that location  
- Displays:
  - The location name (city / region)  
  - Weather description (e.g. “Clear,” “Clouds”)  
  - An icon representing the weather  
  - Temperature in Celsius (initially)  
- Has a **Toggle** button to switch between **°C** and **°F**  
- Dynamically changes the background image depending on weather conditions (cloudy, rain, clear, snow, or default)  

---

## 2. Tools & Technologies Used

- **HTML5** — basic markup structure :contentReference[oaicite:1]{index=1}  
- **CSS3** — styling, responsive layout, background transitions :contentReference[oaicite:2]{index=2}  
- **JavaScript (ES6+)** — for geolocation, fetching data, DOM updates, temperature toggle, background logic :contentReference[oaicite:3]{index=3}  
- **HTML5 Geolocation API** — to get user’s latitude/longitude :contentReference[oaicite:4]{index=4}  
- **Fetch API** — to request weather data (via a proxy) :contentReference[oaicite:5]{index=5}  

---

## 3. How It Works

1. **Detect Location**  
   The app checks `navigator.geolocation.getCurrentPosition(success, error)`.  
   - If successful, it retrieves `latitude` and `longitude`.  
   - If it fails or is denied, it shows a fallback message. :contentReference[oaicite:6]{index=6}  

2. **Fetch Weather Data**  
   Using the coordinates, the app builds a URL:

https://weather-proxy.freecodecamp.rocks/api/current?lat=LAT&lon=LON

markdown
Copy code

and does `fetch(apiURL)` to get weather data in JSON. :contentReference[oaicite:7]{index=7}  

3. **Parse & Display**  
From the JSON response, it extracts:
- `name` → location name  
- `main.temp` → temperature in Celsius  
- `weather[0].description`, `weather[0].main`, `weather[0].icon` → description, main condition, icon  

It sets:
- `locationEl.textContent = name`  
- `descEl.textContent = capitalized description`  
- `tempValueEl.textContent = Math.round(celsiusTemp)`  
- `iconEl.innerHTML = <img src="icon" alt="desc" />` :contentReference[oaicite:8]{index=8}  

Then calls `setBackground(main)` to pick a background based on `main` (clouds, rain, clear, snow) :contentReference[oaicite:9]{index=9}  

4. **Toggle Temperature Unit**  
When the user clicks the **Toggle** button:
- If currently showing Celsius, convert to Fahrenheit: `F = C * 9/5 + 32`  
- Update display and unit symbol  
- If switching back, show the original Celsius again :contentReference[oaicite:10]{index=10}  

---

## 4. API / Data Source

This project uses a **proxy weather API** from FreeCodeCamp:

https://weather-proxy.freecodecamp.rocks/api/current?lat=...&lon=...

- This proxy wraps a third-party weather API (like OpenWeatherMap) to avoid CORS issues. :contentReference[oaicite:11]{index=11}  
- It returns a JSON object with weather data for the given latitude and longitude. :contentReference[oaicite:12]{index=12}  
