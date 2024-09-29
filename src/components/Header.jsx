import { fetchWeatherData } from '../features/weather/weatherSlice';
import { fetchForecastData } from '../features/forecast/forecastSlice';
import styles from './Header.module.css';
import { CiSearch } from "react-icons/ci";
import logo from '/images/weather.png';
import location from '/images/location.png';

function Header({ search, setSearch, dispatch, locationHandler, setError }) {
    const searchHandler = (e) => {
        e.preventDefault();
        const trimmedSearch = search.trim();

        if (trimmedSearch) {
            // Fetch weather data
            dispatch(fetchWeatherData({ city: trimmedSearch }))
                .then((response) => {
                    if (response.error) {
                        setError('Please enter a valid city name');
                    } else {
                        // Fetch forecast data only if weather data is successfully fetched
                        dispatch(fetchForecastData({ city: trimmedSearch }))
                            .then((forecastResponse) => {
                                if (forecastResponse.error) {
                                    setError('Failed to fetch forecast data.');
                                } else {
                                    localStorage.setItem('search', trimmedSearch);
                                    setError('');
                                }
                            });
                    }
                });
        } else {
            setError('Please enter a city name');
        }
    };


    return (
        <div className={styles.headerContainer}>
            <div className={styles.logo}>
                <img src={logo} alt="logo" />
            </div>
            <div className={styles.searchBox}>
                <button onClick={locationHandler}><img src={location} alt="location" /></button>
                <form onSubmit={searchHandler}>
                    <div className={styles.search}>
                        <input type="text" placeholder='Search City' value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="submit"><CiSearch /></button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Header;
