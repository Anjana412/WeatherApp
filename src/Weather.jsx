import React, { useState } from 'react';
import axios from 'axios';
import img from './images/p4.jpg';
import { WiThermometer, WiHumidity, WiBarometer, WiStrongWind, WiDaySunny,WiCloudy,} from 'react-icons/wi';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,} from 'recharts';

const WeatherApp = () => {
  const [data, setData] = useState();
  const [forecast, setForecast] = useState([]);
  const [search, setSearch] = useState('');

  const handleChange = (e) => setSearch(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=imperial&appid=0cf3d05c6cb443424f42856d18e090b3`
    );
    setData(weatherRes.data);

    const forecastRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=imperial&appid=0cf3d05c6cb443424f42856d18e090b3`
    );

    const formatted = forecastRes.data.list.slice(0, 8).map((item) => ({
      time: item.dt_txt.split(' ')[1].slice(0, 5),
      temp: item.main.temp,
    }));

    setForecast(formatted);
    setSearch('');
  };

  return (
    <div
      className="flex min-h-screen w-full bg-cover bg-center text-white overflow-y-auto"
      style={{ backgroundImage: `url(${img})`}}
    >
      <div className="flex-1 p-4 sm:p-10 bg-black/40">
        
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 space-y-6 sm:space-y-0">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide drop-shadow-lg">
              {data?.name || 'Search a city'}
            </h2>
            <p className="text-white/70 text-sm mt-1">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex gap-3 bg-black/60 border border-white/20 px-4 py-2 rounded-full shadow-xl w-full sm:w-auto"
          >
            <input
              type="search"
              value={search}
              onChange={handleChange}
              className="px-3 py-1 rounded-full text-white bg-transparent focus:outline-none placeholder-white/60 w-full sm:w-auto"
              placeholder="Search city..."
            />
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-md"
            >
              Search
            </button>
          </form>
        </div>

        {data && (
          <>
            <div className="text-center mb-16 sm:mb-20 px-2">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold drop-shadow-2xl">
                {data.main.temp}°F
              </h1>

              <p className="text-lg text-white/80 mt-3">
                High {data.main.temp_max}°F / Low {data.main.temp_min}°F
              </p>

              <p className="text-xl sm:text-2xl mt-3 text-white font-semibold capitalize tracking-wide">
                {data.weather[0].description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-white/90">
              
              <div className="bg-black/50 border border-white/10 p-7 rounded-2xl shadow-xl min-h-[200px] flex flex-col justify-center items-center space-y-4 hover:bg-black/60 transition-all">
                <WiThermometer size={50} className="text-red-400" />
                <p className="font-bold text-xl">Temperature</p>
                <p>Actual: {data.main.temp}°F</p>
                <p>Feels Like: {data.main.feels_like}°F</p>
              </div>

              <div className="bg-black/50 border border-white/10 p-7 rounded-2xl shadow-xl min-h-[200px] flex flex-col justify-center items-center space-y-4 hover:bg-black/60 transition-all">
                <div className="flex space-x-2 items-center text-blue-300">
                  <WiHumidity size={40} />
                  <WiBarometer size={40} />
                </div>
                <p className="font-bold text-xl">Atmosphere</p>
                <p>Humidity: {data.main.humidity}%</p>
                <p>Pressure: {data.main.pressure} hPa</p>
              </div>

              <div className="bg-black/50 border border-white/10 p-7 rounded-2xl shadow-xl min-h-[200px] flex flex-col justify-center items-center space-y-4 hover:bg-black/60 transition-all">
                <WiStrongWind size={50} className="text-sky-400" />
                <p className="font-bold text-xl">Air Conditions</p>
                <p>Wind: {data.wind.speed} mph</p>
                <p>Visibility: {data.visibility / 1000} km</p>
              </div>

              <div className="bg-black/50 border border-white/10 p-7 rounded-2xl shadow-xl min-h-[200px] flex flex-col justify-center items-center space-y-4 hover:bg-black/60 transition-all">
                <div className="flex space-x-3 items-center">
                  <WiDaySunny size={38} className="text-yellow-400" />
                  <WiCloudy size={38} className="text-blue-300" />
                </div>
                <p className="font-bold text-xl">Sky & Sun</p>
                <p>Clouds: {data.clouds.all}%</p>
                <p>Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
              </div>
            </div>

            <div className="mt-16 sm:mt-20 bg-black/50 border border-white/10 p-6 sm:p-8 rounded-2xl shadow-xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
                Upcoming Hours Forecast
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="time" stroke="white" />
                  <YAxis stroke="white" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#000',
                      border: '1px solid #333',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="#4FC3F7"
                    strokeWidth={4}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
