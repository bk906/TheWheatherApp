import React, { useState, useEffect } from 'react';
import styles from './Weather.module.css';
import { getMonthName, getWeatherIcon, translateWeatherDescription } from '../helper/helper';
import Loader from './Loader';
import AirConditions from '../components/AirConditions';

function Weather({ weather, loading, error }) {
    const sunset = new Date(weather.sys.sunset * 1000);
    const sunrise = new Date(weather.sys.sunrise * 1000);
    const weatherIcon = getWeatherIcon(weather.weather[0].description,sunset,new Date(),sunrise);
    const [localTime, setLocalTime] = useState('');

    const date = new Date(weather.dt * 1000); // Convert Unix timestamp to JavaScript date
    const monthString = date.toLocaleDateString([], { month: '2-digit'}); // Format date as MM/DD
    const dateString = date.toLocaleDateString([], { day: '2-digit' }); // Format date as MM/DD

    // Function to calculate and update the local time
    const updateLocalTime = () => {
        const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        const currentLocalTime = new Date(utcTime + weather.timezone * 1000);
        const formattedTime = currentLocalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); // 24-hour format
        setLocalTime(formattedTime);
    };

    // useEffect to set the initial time and update it every minute
    useEffect(() => {
        updateLocalTime(); // Set initial time

        // Update time every minute (60000 milliseconds)
        const intervalId = setInterval(updateLocalTime, 60000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [weather.timezone]); 

    return (
        <div className={styles.weatherAndConditions}>
            <div className={styles.containerBox}>
                {loading ? <Loader /> : (
                    <>
                        <div>
                            <h2>{weather.name}</h2>
                            <span>{translateWeatherDescription(weather.weather[0].description)}</span>
                            <p>{weather.main.temp.toFixed(0)} °C</p>
                            <h3 style={{display : "inline"}}>Real Feel </h3>
                            <span style={{fontSize : "1.2rem"}}>{weather.main.feels_like.toFixed(0)} °C</span> 
                        </div>
                        <div className={styles.weatherIconBox}>
                            <img src={weatherIcon} alt={weather.weather[0].main} />
                            <p>{localTime}</p>
                            <span style={{fontSize : "1.2rem"}}>{`${dateString}-${getMonthName(monthString)}`}</span>  
                        </div>
                    </>
                )}
            </div>
            {weather && !error && <AirConditions weather={weather} loading={loading} />}
        </div>
    );
}

export default Weather;
