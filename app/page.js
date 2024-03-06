"use client";
import WeatherCard from "@/components/weatherCard";
import axios from "axios";
import Image from "next/image.js";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/spinner.js";

export default function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [datahour, setDatahour] = useState([]);
  const [locationDisabled, setLocationDisabled] = useState(false);

  useEffect(() => {
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              setLocationDisabled(true);
            }
          }
        );
      } else {
        toast.error("Geolocation is not supported in your browser.");
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchWeatherData(latitude, longitude);
      fetchDatahour(latitude, longitude);
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

  const fetchDatahour = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=eadf0313fb2a49d3b34161523242202&q=${lat},${lon}&days=1`
      );
      const data = response.data;
      setDatahour(data);
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

  const handleSearchHour = async (query) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=eadf0313fb2a49d3b34161523242202&q=${query}&days=1`
      );
      const data = response.data;
      setDatahour(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setLocation(value);
    handleSearch(value);
    handleSearchHour(value);
  };
  const removealert = () => {
    setLocationDisabled(false);
  };

  return (
    <div className="p-10 flex flex-col items-center justify-center bg-gray-50 min-h-screen">
      <ToastContainer />
      <div className="mb-3">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={handleChange}
          className="border rounded-md w-full p-2"
        />
      </div>
      {weatherData ? (
        <>
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

          {datahour.hourly.map((hour) => (
            <div key={hour.dt}>
              {" "}
              // Use unique key for each data point
              <span>{new Date(hour.dt * 1000).getHours()}:00:</span>
              <span>{hour.temp}&deg;C</span>
              <Image
                src={`/* Your API's icon URL base */}${hour.weather[0].icon}@2x.png`}
                alt="Weather icon"
              />
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center">
            <LoadingSpinner />
          </div>
        </>
      )}

      {locationDisabled && (
        <div className="pl-5 pr-5">
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-xl font-semibold mb-4">
                Location Services Disabled
              </h2>
              <p>Please enable location in your browser settings.</p>
              <div
                className="mt-4 px-4 py-2 bg-blue-500 text-center text-white rounded hover:bg-blue-300 focus:outline-none focus:bg-blue-100"
                onClick={removealert}
              >
                Ok
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
