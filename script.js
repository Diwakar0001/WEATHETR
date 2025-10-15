// Weather App JavaScript
class WeatherApp {
    constructor() {
       this.apiKey = 'df24ee0f73007a6f2c277e5408ed3677';
       this.apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

        
        this.initializeElements();
        this.bindEvents();
        this.checkForApiKey();
    }

    initializeElements() {
        // DOM elements
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.locationBtn = document.getElementById('locationBtn');
        
        // Weather display elements
        this.weatherContainer = document.getElementById('weatherContainer');
        this.cityName = document.getElementById('cityName');
        this.countryCode = document.getElementById('countryCode');
        this.temperature = document.getElementById('temperature');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.weatherDescription = document.getElementById('weatherDescription');
        this.feelsLike = document.getElementById('feelsLike');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        
        // Error and loading elements
        this.errorContainer = document.getElementById('errorContainer');
        this.errorMessage = document.getElementById('errorMessage');
        this.loadingContainer = document.getElementById('loadingContainer');
    }

    bindEvents() {
        // Search button click
        this.searchBtn.addEventListener('click', () => {
            const city = this.cityInput.value.trim();
            if (city) {
                this.searchWeather(city);
            }
        });

        // Enter key press in search input
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const city = this.cityInput.value.trim();
                if (city) {
                    this.searchWeather(city);
                }
            }
        });

        // Current location button
        this.locationBtn.addEventListener('click', () => {
            this.getCurrentLocation();
        });
    }

    checkForApiKey() {
        if (this.apiKey === 'YOUR_API_KEY_HERE') {
            this.showError('Please add your OpenWeatherMap API key to the script.js file. Get your free API key at https://openweathermap.org/api');
        }
    }

    async searchWeather(city) {
        this.showLoading();
        this.hideError();
        
        try {
            const response = await fetch(`${this.apiUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('City not found. Please check the spelling and try again.');
                } else if (response.status === 401) {
                    throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
                } else {
                    throw new Error('Failed to fetch weather data. Please try again.');
                }
            }
            
            const data = await response.json();
            this.displayWeather(data);
            this.cityInput.value = ''; // Clear search input
            
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    async getCurrentLocation() {
        if (!navigator.geolocation) {
            this.showError('Geolocation is not supported by your browser.');
            return;
        }

        this.showLoading();
        this.hideError();

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000 // 5 minutes
                });
            });

            const { latitude, longitude } = position.coords;
            await this.searchWeatherByCoords(latitude, longitude);
            
        } catch (error) {
            let errorMessage;
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Location access denied. Please search for a city manually.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information unavailable. Please search for a city manually.';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Location request timed out. Please search for a city manually.';
                    break;
                default:
                    errorMessage = 'Unable to get your location. Please search for a city manually.';
                    break;
            }
            this.showError(errorMessage);
            this.hideLoading();
        }
    }

    async searchWeatherByCoords(lat, lon) {
        try {
            const response = await fetch(`${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch weather data for your location.');
            }
            
            const data = await response.json();
            this.displayWeather(data);
            
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    displayWeather(data) {
        // Update city information
        this.cityName.textContent = data.name;
        this.countryCode.textContent = data.sys.country;
        
        // Update temperature
        this.temperature.textContent = Math.round(data.main.temp);
        
        // Update weather description and icon
        const weather = data.weather[0];
        this.weatherDescription.textContent = weather.description;
        this.weatherIcon.className = this.getWeatherIcon(weather.main, weather.id);
        
        // Update feels like temperature
        this.feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
        
        // Update humidity and wind speed
        this.humidity.textContent = `${data.main.humidity}%`;
        this.windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
        
        // Show weather container
        this.showWeather();
    }

    getWeatherIcon(weatherMain, weatherId) {
        // Map weather conditions to Font Awesome icons
        const iconMap = {
            'Clear': 'fas fa-sun',
            'Clouds': 'fas fa-cloud',
            'Rain': 'fas fa-cloud-rain',
            'Drizzle': 'fas fa-cloud-drizzle',
            'Thunderstorm': 'fas fa-bolt',
            'Snow': 'fas fa-snowflake',
            'Mist': 'fas fa-smog',
            'Smoke': 'fas fa-smog',
            'Haze': 'fas fa-smog',
            'Dust': 'fas fa-smog',
            'Fog': 'fas fa-smog',
            'Sand': 'fas fa-smog',
            'Ash': 'fas fa-smog',
            'Squall': 'fas fa-wind',
            'Tornado': 'fas fa-tornado'
        };

        // Handle specific weather conditions with more precise icons
        if (weatherId >= 200 && weatherId < 300) return 'fas fa-bolt'; // Thunderstorm
        if (weatherId >= 300 && weatherId < 400) return 'fas fa-cloud-drizzle'; // Drizzle
        if (weatherId >= 500 && weatherId < 600) return 'fas fa-cloud-rain'; // Rain
        if (weatherId >= 600 && weatherId < 700) return 'fas fa-snowflake'; // Snow
        if (weatherId >= 700 && weatherId < 800) return 'fas fa-smog'; // Atmosphere
        if (weatherId === 800) return 'fas fa-sun'; // Clear sky
        if (weatherId > 800) return 'fas fa-cloud'; // Clouds

        return iconMap[weatherMain] || 'fas fa-cloud';
    }

    showWeather() {
        this.hideAllContainers();
        this.weatherContainer.style.display = 'block';
        this.weatherContainer.classList.add('fade-in');
    }

    showError(message) {
        this.hideAllContainers();
        this.errorMessage.textContent = message;
        this.errorContainer.style.display = 'block';
        this.errorContainer.classList.add('fade-in');
    }

    showLoading() {
        this.hideAllContainers();
        this.loadingContainer.style.display = 'block';
        this.loadingContainer.classList.add('fade-in');
    }

    hideError() {
        this.errorContainer.style.display = 'none';
        this.errorContainer.classList.remove('fade-in');
    }

    hideLoading() {
        this.loadingContainer.style.display = 'none';
        this.loadingContainer.classList.remove('fade-in');
    }

    hideAllContainers() {
        this.weatherContainer.style.display = 'none';
        this.errorContainer.style.display = 'none';
        this.loadingContainer.style.display = 'none';
        
        // Remove animation classes
        this.weatherContainer.classList.remove('fade-in');
        this.errorContainer.classList.remove('fade-in');
        this.loadingContainer.classList.remove('fade-in');
    }
}

// Initialize the weather app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});

// Add some utility functions for better user experience
document.addEventListener('DOMContentLoaded', () => {
    // Add input validation
    const cityInput = document.getElementById('cityInput');
    cityInput.addEventListener('input', (e) => {
        // Remove any non-alphabetic characters except spaces, hyphens, and apostrophes
        e.target.value = e.target.value.replace(/[^a-zA-Z\s\-']/g, '');
    });

    // Add placeholder animation
    let placeholderIndex = 0;
    const placeholders = [
        'Enter city name...',
        'Try "London"',
        'Try "New York"',
        'Try "Tokyo"',
        'Try "Paris"'
    ];

    setInterval(() => {
        const input = document.getElementById('cityInput');
        if (input === document.activeElement) return; // Don't change if user is typing
        
        input.placeholder = placeholders[placeholderIndex];
        placeholderIndex = (placeholderIndex + 1) % placeholders.length;
    }, 3000);
});