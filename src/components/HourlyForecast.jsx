import React from "react";
import dayjs from "dayjs";

export default function HourlyForecast({ data }) {
  const next12Hours = data.list.slice(0, 12);

  return (
    <>
      <h3 className="text-xl font-semibold mb-5 text-white">Hourly Forecast</h3>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {next12Hours.map((item, i) => (
            <div key={i} className="p-2 border-none rounded-md shadow-xl">
              <p>{dayjs(item.dt_txt).format("h A")}</p>
              <p className="text-sm">{item.weather[0].main}</p>
              <div className="flex items-center justify-center">
                  <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} className="brightness-95"></img>
                  <p className="font-bold">{Math.round(item.main.temp)}°</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
