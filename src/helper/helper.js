import sun from '/images/sun.png';
import fewClouds from '/images/cloudy-day.png';
import cloudyNight from '/images/cloudy-night.png';
import scatteredClouds from '/images/partly-cloudy.png';
import brokenClouds from '/images/cloudy.png';
import mostlyCloudy from '/images/mostly-cloudy.png';
import overcastClouds from '/images/overcast.png';
import drizzle from '/images/drizzle.png';
import nightDrizzle from '/images/night-drizzle.png';
import rain from '/images/rain.png';
import thunderstorm from '/images/thunderstorm.png';
import thunderstormLightRain from '/images/thunderstorm-light-rain.png';
import snow from '/images/snow.png';
import mist from '/images/mist.png';
import moon from '/images/moon.png';


export const getWeatherIcon = (weatherMain, sunset, forecastDate, sunrise) => {
    let afterSunset = false;
    let beforeSunrise = false;

    if (
        sunset instanceof Date &&
        !isNaN(sunset.getTime()) &&
        forecastDate instanceof Date &&
        sunrise instanceof Date
    ) {
        // Convert times to UTC for accurate comparison across different time zones
        const forecastHours = forecastDate.getUTCHours();
        const forecastMinutes = forecastDate.getUTCMinutes();

        const sunsetHours = sunset.getUTCHours();
        const sunsetMinutes = sunset.getUTCMinutes();

        const sunriseHours = sunrise.getUTCHours();
        const sunriseMinutes = sunrise.getUTCMinutes();

        // Check if the forecast time is after sunset or before sunrise in UTC time
        afterSunset = (forecastHours > sunsetHours) || (forecastHours === sunsetHours && forecastMinutes > sunsetMinutes);
        beforeSunrise = (forecastHours < sunriseHours) || (forecastHours === sunriseHours && forecastMinutes < sunriseMinutes);

        // Consider early morning hours (after midnight until 5 AM) as night
        if (forecastHours >= 0 && forecastHours <= 5) {
            afterSunset = true;
        }
    }

    switch (weatherMain.toLowerCase()) {
        case 'clear':
        case 'clear sky':
            return afterSunset || beforeSunrise ? moon : sun;

        case 'few clouds':
            return afterSunset || beforeSunrise ? cloudyNight : fewClouds;

        case 'scattered clouds':
            return afterSunset || beforeSunrise ? cloudyNight : scatteredClouds;

        case 'broken clouds':
            return afterSunset || beforeSunrise ? mostlyCloudy : brokenClouds;

        case 'overcast clouds':
            return overcastClouds;

        case 'drizzle':
            return afterSunset || beforeSunrise ? nightDrizzle : drizzle;

        case 'rain':
        case 'light rain':
        case 'sleet':
        case 'moderate rain':
        case 'freezing rain':
        case 'heavy intensity rain':
            return rain;

        case 'thunderstorm':
            return thunderstorm;

        case "thunderstorm with light rain":
            return thunderstormLightRain;

        case 'snow':
            return snow;

        case 'mist':
        case 'fog':
        case 'haze':
            return mist;

        default:
            return afterSunset || beforeSunrise ? moon : sun; // Fallback icon
    }
};




export function translateWeatherDescription(description) {
    switch (description.toLowerCase()) {
        case 'clear':
        case 'clear sky':
            return 'Clear';
        case 'few clouds':
            return 'Mostly Sunny';
        case 'scattered clouds':
            return 'Partly Cloudy';
        case 'broken clouds':
            return 'Mostly Cloudy';
        case 'overcast clouds':
            return 'Overcast';
        case 'drizzle':
            return 'Light Rain';
        case 'rain':
        case 'heavy intensity rain':
        case 'moderate rain':
            return 'Rainy';
        case 'thunderstorm':
            return 'Thunderstorm';
        case 'snow':
            return 'Snow';
        case 'mist':
            return 'Mist';
        default:
            return description; // Fallback description
    }
}

export function getDayOfWeek(dt) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dt * 1000); // Convert Unix timestamp to JavaScript date
    return days[date.getDay()];
}


export function getTodayForecast(forecast) {
    const today = new Date().toLocaleDateString(); // Get today's date as a string
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDateString = tomorrow.toLocaleDateString();

    // Filter forecast data for today
    let todayForecast = forecast.list.filter((item) => {
        const forecastDate = new Date(item.dt * 1000).toLocaleDateString();
        return forecastDate === today;
    });

    // If there are missing times, add the corresponding times from tomorrow
    if (todayForecast.length < 8) {
        const tomorrowForecast = forecast.list.filter((item) => {
            const forecastDate = new Date(item.dt * 1000).toLocaleDateString();
            return forecastDate === tomorrowDateString;
        });

        // Fill in the missing times with tomorrow's forecast data
        todayForecast = todayForecast.concat(tomorrowForecast.slice(0, 8 - todayForecast.length));
    }

    return todayForecast;
}

export function getMonthName(monthNumber) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber - 1].slice(0, 3); // Get the first three letters of the month name
}

export const dateToLocaleString = (dt) => {
    const date = new Date(dt * 1000);
    return date.toLocaleString([], { month: '2-digit', day: '2-digit' });
}