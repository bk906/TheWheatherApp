import humidity from '/images/feels.png';
import wind from '/images/windy.png';
import feel from '/images/temperature.png';
import pressure from '/images/pressure.png';
import clouds from '/images/clouds.png';
import Loader from './Loader';

import styles from './Weather.module.css';

function AirConditions({ weather, loading }) {
    return (
        <div className={styles.airConditions}>
            <h2>Air Conditions</h2>
            {loading ? <Loader /> : (
                <div className={styles.airConditionsBox}>
                    <div className={styles.weatherItem}>
                        <img src={wind} alt="wind speed" />
                        <div className={styles.weatherDetails}>
                            <h3>Wind</h3>
                            <p>{weather.wind.speed} m/s</p>
                        </div>
                    </div>
                    <div className={styles.weatherItem}>
                        <img src={humidity} alt="humidity" />
                        <div className={styles.weatherDetails}>
                            <h3>Humidity</h3>
                            <p>{weather.main.humidity} %</p>
                        </div>
                    </div>
                    <div className={styles.weatherItem}>
                        <img src={pressure} alt="pressure" />
                        <div className={styles.weatherDetails}>
                            <h3>Pressure</h3>
                            <p>{weather.main.pressure} hPa</p>
                        </div>
                    </div>
                    {/* <div className={styles.weatherItem}>
                        <img src={feel} alt="feels like" />
                        <div className={styles.weatherDetails}>
                            <h3>Real Feel</h3>
                            <p>{weather.main.feels_like.toFixed(0)} °C</p>
                        </div>
                    </div> */}
                    <div className={styles.weatherItem}>
                        <img src={clouds} alt="clouds" />
                        <div className={styles.weatherDetails}>
                            <h3>Cloudiness</h3>
                            <p>{weather.clouds.all} %</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AirConditions