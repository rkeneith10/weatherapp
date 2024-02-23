"use client";
import WeatherCard from "@/components/weatherCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Obtenir la localisation actuelle de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchWeatherData(latitude, longitude);
    }
  }, [latitude, longitude]);

  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=eadf0313fb2a49d3b34161523242202&q=${lat},${lon}`
      );
      const data = response.data;
      setWeatherData(data);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=eadf0313fb2a49d3b34161523242202&q=${query}`
      );
      const data = response.data;
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setLocation(value);
    handleSearch(value);
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center bg-gray-50 min-h-screen">
      {weatherData ? (
        <>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={handleChange}
              className="border rounded-md w-full p-2"
            />
          </div>
          <WeatherCard
            location={weatherData.location.name}
            country={weatherData.location.country}
            weatherC={weatherData.current.temp_c}
            weatherF={weatherData.current.temp_f}
            humidity={weatherData.current.humidity}
            condition={weatherData.current.condition.text}
            icon={weatherData.current.condition.icon}
            cloud={weatherData.current.cloud}
          />
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center">
            <p className="text-center text-xl">Loading data...</p>
          </div>
        </>
      )}
    </div>
  );
}
