import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchForecastByCity, fetchForecastByCoordinates } from '../../services/config';

const initialState = {
    loading: false,
    forecast: null,
    error: ""
};

export const fetchForecastData = createAsyncThunk("forecast/fetchForecast", async ({ city, lat, lon } = {}, { rejectWithValue }) => {
    try {
        let data;
        if (city) {
            data = await fetchForecastByCity(city);
        } else if (lat !== undefined && lon !== undefined) {
            data = await fetchForecastByCoordinates(lat, lon);
        } else {
            throw new Error('City or coordinates must be provided');
        }
        return data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

const forecastSlice = createSlice({
    name: "forecast",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchForecastData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchForecastData.fulfilled, (state, action) => {
            state.loading = false;
            state.forecast = action.payload;
        });
        builder.addCase(fetchForecastData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export default forecastSlice.reducer;