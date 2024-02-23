"use client";
import WeatherCard from "@/components/weatherCad";
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
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=eadf0313fb2a49d3b34161523242202 &q=${lat},${lon}`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=eadf0313fb2a49d3b34161523242202 &q=${query}`
      );
      const data = await response.json();
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
    <div className="p-10">
      <h1>Weather App</h1>
      {weatherData ? (
        <WeatherCard
          location={weatherData.location.name}
          weatherC={weatherData.current ? weatherData.current.temp_c : ""}
          weatherF={weatherData.current ? weatherData.current.temp_f : ""}
          humidity={weatherData.current ? weatherData.current.humidity : ""}
          condition={
            weatherData.current ? weatherData.current.condition.text : ""
          }
          icon={weatherData.current ? weatherData.current.condition.icon : ""}
        />
      ) : (
        <p>Loading weather data...</p>
      )}
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={handleChange}
      />
    </div>
  );
}
