import axios from 'axios';

const API_KEY = '06440144ed01208ce0d44d22f54b2715';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        appid: API_KEY,
        units: 'metric'
    }
});

export const fetchWeatherByCity = (city) => {
    return api.get('weather', {
        params: {
            q: city
        }
    }).then(response => response.data);
};
export const fetchForecastByCity = (city) => {
    return api.get('forecast', {
        params: {
            q: city
        }
    }).then(response => response.data);
};

export const fetchForecastByCoordinates = (lat, lon) => {
    return api.get('forecast', {
        params: {
            lat,
            lon
        }
    }).then(response => response.data);
};
export const fetchWeatherByCoordinates = (lat, lon) => {
    return api.get('weather', {
        params: {
            lat,
            lon
        }
    }).then(response => response.data);
};
