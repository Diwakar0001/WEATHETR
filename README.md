# Weather App

A modern, responsive weather web application that fetches weather data from OpenWeatherMap API.

## Features

- 🌍 **Current Location**: Get weather for your current location using browser geolocation
- 🔍 **City Search**: Search for weather in any city worldwide
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean design with smooth animations and glassmorphism effects
- ⚡ **Real-time Data**: Live weather information including temperature, humidity, wind speed
- 🛡️ **Error Handling**: Graceful error handling for invalid cities and API issues

## Setup Instructions

1. **Get an API Key**:
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate your API key

2. **Configure the App**:
   - Open `script.js`
   - Replace `YOUR_API_KEY_HERE` on line 5 with your actual API key:
   ```javascript
   this.apiKey = 'your_actual_api_key_here';
   ```

3. **Run the App**:
   - Open `index.html` in your web browser
   - Or serve it using a local web server

## File Structure

```
/
├── index.html      # Main HTML structure
├── style.css       # Modern CSS styling
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Usage

1. **Search by City**: Type a city name in the search box and press Enter or click the search button
2. **Use Current Location**: Click the "Use Current Location" button to get weather for your current position
3. **View Weather Data**: The app displays:
   - City name and country
   - Current temperature in Celsius
   - Weather condition and description
   - Weather icon
   - Feels-like temperature
   - Humidity percentage
   - Wind speed in km/h

## Browser Compatibility

- Modern browsers with ES6+ support
- Geolocation API support for location-based weather
- Fetch API support for HTTP requests

## API Information

This app uses the OpenWeatherMap API:
- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Documentation**: [OpenWeatherMap API Docs](https://openweathermap.org/current)
- **Rate Limits**: 1000 calls/day for free tier

## Error Handling

The app handles various error scenarios:
- Invalid city names
- Network connectivity issues
- Geolocation permission denied
- API key errors
- Rate limit exceeded

## Customization

You can easily customize:
- **Colors**: Modify the CSS gradient and color variables
- **Icons**: Change Font Awesome icons in the `getWeatherIcon()` method
- **Layout**: Adjust the responsive breakpoints in CSS
- **API**: Switch to a different weather API by modifying the API URL and data parsing

## License

This project is open source and available under the MIT License.