import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherByCity, fetchWeatherByCoordinates } from '../../services/config';

const initialState = {
    weather: null,
    loading: false,
    error: null,
};

export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeather',
    async ({ city, lat, lon } = {}, { rejectWithValue }) => {
        try {
            let data;
            if (city) {
                data = await fetchWeatherByCity(city);
            } else if (lat !== undefined && lon !== undefined) {
                data = await fetchWeatherByCoordinates(lat, lon);
            } else {
                throw new Error('City or coordinates must be provided');
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.loading = false;
                state.weather = action.payload;
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.loading = false;
                state.weather = null;
                state.error = action.payload || action.error.message;
            });
    },
});

export default weatherSlice.reducer;
