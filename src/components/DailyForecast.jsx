import React from "react";
import dayjs from "dayjs";

export default function DailyForecast({ data }) {
  const daily = [];
  const grouped = {};

  data.list.forEach((item) => {
    const date = dayjs(item.dt_txt).format("YYYY-MM-DD");
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });

  for (const date in grouped) {
    const temps = grouped[date].map((i) => i.main.temp);
    daily.push({
      date,
      min: Math.min(...temps),
      max: Math.max(...temps),
      weather: grouped[date][0].weather[0].main,
      icon: grouped[date][0].weather[0].icon,
    });
  }

  return (
    <>
      <h3 className="text-xl font-semibold mb-5 text-white">6-Days Forecast</h3>
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 text-center">
          {daily.slice(0, 8).map((d, i) => (
            <div key={i} className="p-2 border-none shadow-2xl rounded-md">
              <div className="flex items-center justify-between">
                  <p className="font-semibold">{dayjs(d.date).date()}</p>
                  <p className="font-semibold">{dayjs(d.date).format("ddd")}</p>
              </div>
              <p className="text-sm">{d.weather}</p>
              <div className="flex items-center justify-center">
                  <img src={`https://openweathermap.org/img/wn/${d.icon}@2x.png`} className="brightness-95"></img>
                  <div>
                      <p className="font-bold mb-2">
                          {Math.round(d.max)}°
                      </p>
                      <p className="font-bold">
                          {Math.round(d.min)}°
                      </p>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
