import styles from './Forecast.module.css';
import { dateToLocaleString, getDayOfWeek } from '../helper/helper';
import { getWeatherIcon } from '../helper/helper';

function Forecast({ forecast }) {

    const dailyForecast = forecast.list.reduce((acc, current) => {
        const day = getDayOfWeek(current.dt);

        if (!acc[day]) {
            acc[day] = {
                dt: dateToLocaleString(current.dt), // Get the time
                temp: current.main.temp,
                description: current.weather[0].description,
                wind: current.wind.speed,
                humidity: current.main.humidity,
                icon: getWeatherIcon(current.weather[0].description,null, new Date(), null), // Get the weather icon
            };
        } else {
            acc[day].temp = (acc[day].temp + current.main.temp) / 2;
        }

        return acc;
    }, {});
    return (
        <div className={styles.forecastContainer}>
            <h2>5-Day Forecast</h2>
            <div className={styles.forecastGrid}>
                {Object.entries(dailyForecast).map(([date, data], index) => (
                    <div key={index} className={styles.forecastItem}>
                        <p>{date}-<span style={{color : "#b7b7b7"}}>{data.dt}</span></p>
                        <img src={data.icon} alt={data.description} />
                        <p>{data.temp.toFixed(0)} °C</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;
