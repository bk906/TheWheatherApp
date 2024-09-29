import { configureStore } from "@reduxjs/toolkit";

import weatherReducer from "../features/weather/weatherSlice";
import foreCastReducer from "../features/forecast/forecastSlice";

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        forecast: foreCastReducer,
    },
});

export default store;