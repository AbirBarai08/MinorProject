import React from "react";

export default function CurrentWeather({ data, city }) {
  const [time , setTime] = React.useState("");

  React.useEffect(() => {
    const timeStamp = data.dt;
    const date = new Date(timeStamp * 1000);

    const timeString = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    setTime(timeString);
  }, [data.dt]);

  return (
    <div className="bg-white rounded-xl shadow-2xl p-2 md:p-6 mb-6 w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-2 text-left">{city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}</h2>
      <p className="text-left">{time}</p>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center justify-center">
          <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} className="brightness-95 w-20 h-20 md:w-[100px] md:h-[100px]"></img>
          <h3 className="text-2xl md:text-4xl font-bold mb-2">{Math.round(data.main.temp)}°C</h3>
        </div>
        <div>
          <p className="text-xl md:text-3xl mb-3 font-semibold">{data.weather[0].description}</p>
          <p className="text-sm md:text-lg">Feels Like <b>{data.main.feels_like}°C</b></p>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-6 text-sm">
        <div>
          <p>Humidity</p>
          <p className="text-base md:text-lg font-bold">{data.main.humidity}%</p>
        </div>
        <div>
          <p>Wind</p>
          <p className="text-base md:text-lg font-bold">{data.wind.speed} m/s</p>
        </div>
        <div>
          <p>Pressure</p>
          <p className="text-base md:text-lg font-bold">{data.main.pressure} mb</p>
        </div>
        <div>
          <p>Visibility</p>
          <p className="text-base md:text-lg font-bold">{data.visibility} km</p>
        </div>
      </div>
    </div>
  );
}
