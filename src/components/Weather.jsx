import React, { useEffect, useState } from "react";
import clearBg from "../assets/clear.png";
import cloudsBg from "../assets/cloud.png";
import rainBg from "../assets/rain.png";
import drizzleBg from "../assets/drizzle.png";
import snowBg from "../assets/snow.png";
import searchIcon from "../assets/search.png";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";

const Weather = () => {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");

  const search = async (cityName) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        setCity(cityName);
      } else {
        setWeather(null);
      }
    } catch (error) {
      setWeather(null);
      console.error("Failed to fetch weather data:", error);
    }
  };

  useEffect(() => {
    search(city);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      search(input.trim());
      setInput("");
    }
  };

  const handleSearchClick = () => {
    if (input.trim() !== "") {
      search(input.trim());
      setInput("");
    }
  };

  const renderMainIcon = () => {
    if (!weather?.weather) return null;
    const main = weather.weather[0].main;
    switch (main) {
      case "Clear":
        return <img src={clearBg} alt="Clear Sky" width="120" height="120" className="mx-auto" />;
      case "Clouds":
        return <img src={cloudsBg} alt="Clouds" width="120" height="120" className="mx-auto" />;
      case "Rain":
        return <img src={rainBg} alt="Rain" width="120" height="120" className="mx-auto" />;
      case "Drizzle":
        return <img src={drizzleBg} alt="Drizzle" width="120" height="120" className="mx-auto" />;
      case "Snow":
        return <img src={snowBg} alt="Snow" width="120" height="120" className="mx-auto" />;
      case "Thunderstorm":
        return <img src={rainBg} alt="Thunderstorm" width="120" height="120" className="mx-auto" />;
      default:
        return null;
    }
  };

  const getDynamicBackground = () => {
    if (!weather?.weather) {
      return "#6bb8fa";
    }
    const main = weather.weather[0].main;
    switch (main) {
      case "Clear":
        return "#FFCC80";
      case "Clouds":
        return "#607D8B";
      case "Rain":
      case "Drizzle":
        return "#4FC3F7";
      case "Snow":
        return "#B3E5FC";
      case "Thunderstorm":
        return "#37474F";
      default:
        return "#6bb8fa";
    }
  };

  const bgStyle = {
    minHeight: "100vh",
    background: getDynamicBackground(),
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.5s ease-in-out",
  };

  return (
    <div style={bgStyle}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div
              className="rounded-4 shadow-lg p-5 text-center"
              style={{
                backdropFilter: "blur(20px)",
                border: "1.5px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.1)",
                color: "white"
              }}
            >
              <div className="d-flex justify-content-center mb-4">
                <input
                  className="form-control form-control-lg rounded-pill shadow-sm"
                  style={{
                    maxWidth: 350,
                    background: "rgba(255,255,255,0.2)",
                    border: "none",
                    color: "white",
                  }}
                  type="text"
                  placeholder="Search"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={handleSearchClick}
                  className="btn btn-outline-light rounded-circle ms-2"
                  style={{ width: "45px", height: "45px" }}
                >
                  <img src={searchIcon} alt="Search" width="20" height="20" />
                </button>
              </div>

              {weather && weather.weather ? (
                <>
                  <div className="mb-4">
                    {renderMainIcon()}
                    <h1 className="display-1 fw-bold">{Math.round(weather.main.temp)}°C</h1>
                    <h2 className="fs-3 fw-bold">{city}</h2>
                  </div>
                  <div className="row justify-content-center g-3">
                    <div className="col-6">
                      <div className="d-flex align-items-center justify-content-center">
                        <img src={humidityIcon} alt="Humidity" width="40" height="40" className="me-2" />
                        <div>
                          <div className="fs-5 fw-bold">{weather.main.humidity}%</div>
                          <div className="text-white-50">Humidity</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center justify-content-center">
                        <img src={windIcon} alt="Wind" width="40" height="40" className="me-2" />
                        <div>
                          <div className="fs-5 fw-bold">{Math.round(weather.wind.speed * 3.6)} km/h</div>
                          <div className="text-white-50">Wind Speed</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center fs-4 text-white py-5">No data found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;