import React, { useState } from 'react';
import axios from 'axios';
import img from './images/sky.webp'; 
import { WiThermometer, WiHumidity, WiBarometer, WiStrongWind, WiDaySunny, WiCloudy } from 'react-icons/wi';
// import { motion } from 'framer-motion';
import { FaGlobeAmericas } from 'react-icons/fa';


const WeatherApp = () => {
  const [data, setData] = useState();
  const [search, setSearch] = useState('');

  const handleChange = (e) => setSearch(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=0cf3d05c6cb443424f42856d18e090b3`);
    setData(response.data);
    console.log(response.data);
    setSearch('')
  }

  return (
    <div
      className="flex h-screen w-screen bg-cover bg-center text-white"
      style={{ backgroundImage:`url(${img})`}}>


      {data && (
        <div
            className="w-1/3 p-6 bg-black/40 backdrop-blur-md flex flex-col justify-between"
          >
           <div>
            <h1 className="text-3xl font-semibold mt-10 mb-6">WeatherApp</h1>
           
            <div className="mb-6">
              <p className="text-sm text-white/70">Select Area</p>
              <p className="text-lg font-medium mt-2">{data.name}, {data.sys.country}</p>
              <p className="text-xs text-white/60">Lat: {data.coord.lat}, Lon: {data.coord.lon}</p>
            </div>
          
          </div>
          <div className="flex justify-center mt-4">
            <FaGlobeAmericas size={300} className="text-white/80 animate-pulse" />
          </div>
          <div>
            <p className="text-sm text-white/70">Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p className="text-sm text-white/70">Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        </div>
      )}


      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">{data?.name || 'Search a city'}</h2>
            <p className="text-sm text-white/70">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="search"
              value={search}
              onChange={handleChange}
              className="px-4 py-2 rounded-md text-white bg-black/60"
              placeholder="Search city"
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600">
              Search
            </button>
          </form>
        </div>

        {data && (
          <>
            <div className="text-center mb-6">
              <h1 className="text-6xl font-bold mt-20">{data.main.temp}°F</h1>
              <p className="text-lg text-white/80">
                High: {data.main.temp_max}°F / Low: {data.main.temp_min}°F
              </p>
              <p className="text-xl mt-2 text-white font-bold capitalize">{data.weather[0].description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-40 text-white/90">

                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md aspect-square flex flex-col justify-center items-center space-y-4">
                  <WiThermometer size={40} className='text-red-500'/>
                  <p className="font-semibold text-lg">Temperature</p>
                  <div className="text-center space-y-1">
                    <p>Actual: <span className="font-medium">{data.main.temp}°F</span></p>
                    <p>Feels Like: <span className="font-medium">{data.main.feels_like}°F</span></p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md aspect-square flex flex-col justify-center items-center space-y-4">
                  <div className="flex space-x-2 items-center text-cyan-300 or text-blue-300">
                    <WiHumidity size={32} />
                    <WiBarometer size={32} />
                  </div>
                  <p className="font-semibold text-lg">Atmosphere</p>
                  <div className="text-center space-y-1">
                    <p>Humidity: <span className="font-medium">{data.main.humidity}%</span></p>
                    <p>Pressure: <span className="font-medium">{data.main.pressure} hPa</span></p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md aspect-square flex flex-col justify-center items-center space-y-4 ">
                  <WiStrongWind size={40} className='text-sky-400 ' />
                  <p className="font-semibold text-lg">Air Conditions</p>
                  <div className="text-center space-y-1">
                    <p>Wind: <span className="font-medium">{data.wind.speed} mph</span></p>
                    <p>Visibility: <span className="font-medium">{data.visibility / 1000} km</span></p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md aspect-square flex flex-col justify-center items-center space-y-4">
                  <div className="flex space-x-2 items-center">
                    <WiDaySunny size={32} color='orange' />
                    <WiCloudy size={32} color='blue' />
                  </div>
                  <p className="font-semibold text-lg">Sky & Sun</p>
                  <div className="text-center space-y-1">
                    <p>Clouds: <span className="font-medium">{data.clouds.all}%</span></p>
                    <p>Sunrise: <span className="font-medium">{new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</span></p>
                    <p>Sunset: <span className="font-medium">{new Date(data.sys.sunset * 1000).toLocaleTimeString()}</span></p>
                  </div>
                </div>
            </div>
          </>
        )}
        
      </div>
    </div>
  );
};

export default WeatherApp;
