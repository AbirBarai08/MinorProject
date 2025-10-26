import React, { useState } from "react";
import axios from "axios";
import './App.css'
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import Error from "./components/Error";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState("");
  const [error , setError] = useState({error: false , city: ""});

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(async(position) => {
      let { latitude: lat , longitude: lon } = position.coords;

      if(!lat && !lon){
        const geoRes = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=kolkata&limit=1&appid=${API_KEY}`
        );

        lat = geoRes.data[0].lat;
        lon = geoRes.data[0].lon;
        setCity("kolkata");
      };

      const location = await axios.get(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      setWeatherData(weatherRes.data);
      setForecastData(forecastRes.data);
      setCity(location.data[0].name);
    })
  }, [])

  const fetchWeather = async (cityName) => {
    try {
      const geoRes = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );
      if (!geoRes.data.length) {
        setError({error: true , city: cityName}); 
        return;
      }

      const { lat, lon } = geoRes.data[0];

      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      setWeatherData(weatherRes.data);
      setForecastData(forecastRes.data);
      setCity(cityName);
      setError({error: false , city: ""});
    } catch (err) {
      console.error(err);
      setError({error: true , city: cityName});
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-t from-sky-500 to-indigo-500 text-gray-900 flex flex-col items-center p-4 rounded-lg">
      <Error error={error} setError={setError}/>
      <h1 className="text-3xl font-bold mb-6 text-white">Weather App</h1>
      <SearchBar onSearch={fetchWeather} />

      {weatherData && (
        <>
          <CurrentWeather data={weatherData} city={city} />
          <HourlyForecast data={forecastData} />
          <DailyForecast data={forecastData} />
        </>
      )}
    </div>
  );
}