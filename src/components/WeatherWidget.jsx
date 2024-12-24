import styles from "./WeatherWidget.module.css";
import fetchWeather from "../api/fetchWeather";
import { useEffect, useState } from "react";
import formatDateAndTime from "../utils/formatDateAndTime";

function WeatherWidget() {
  const[weatherData,setWeatherData]=useState();
  const [dateTime,setDateTime]=useState();
    useEffect(()=>{
        fetchWeather().then((data)=>{
          const {temp_c, condition, pressure_mb, wind_kph, humidity}=
          data.current;
          setWeatherData({
            temperature:temp_c,
            condition:condition.text,
            thumbnail:condition.icon,
            pressure : pressure_mb,
            wind:wind_kph,
            humidity
          })
        });

        const {date,time} =formatDateAndTime();
        setDateTime({date,time});
    },[])
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {dateTime && (
          <>
          <div className={styles.date}>{dateTime.date}</div>
          <div className={styles.time}>{dateTime.time}</div>
          </>
        )}
      </div>     
      <div className={styles.content}>
        {weatherData?(
          <>
          <img
          className={styles.thumbnail}
          src={weatherData.thumbnail}
          alt="Weather"
          />
          <div className={styles.temperature}>
            {weatherData.temperature}°C
          </div>
          <div className={styles.condition}> 
            {weatherData.condition}
          </div>
          <div className={styles.details}> 
          <div className={styles.detail}>
              <span>Preassure</span>
              <span>{weatherData.pressure}mb</span>
            </div>
            <div className={styles.detail}>
              <span>Wind</span>
              <span>{weatherData.wind}kph</span>
            </div>
            <div className={styles.detail}>
              <span>Humidity</span>
              <span>{weatherData.humidity}%</span>
            </div>
          </div>
          </>
        ):(
          <div>Loading</div>
        )}

      </div>
    </div>
  )
}

export default WeatherWidget
