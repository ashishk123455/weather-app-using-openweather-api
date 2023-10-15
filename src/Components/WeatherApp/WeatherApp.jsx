import React, { useState } from 'react'
import './WeatherApp.css'
import search from '../Assets/search.png'
import clear from "../Assets/clear.png"
import cloud from '../Assets/cloud.png'
import drizzle from '../Assets/drizzle.png'
import rain from '../Assets/rain.png'
import snow from '../Assets/snow.png'
import wind from '../Assets/wind.png'
import humidity from "../Assets/humidity.png"

const WeatherApp = () => {
    let api_key="ed9c9f42b226f4e27928e3178a7233a2"
    const [wicon,setWIcon]=useState(cloud);

    const searchfn=async()=>{
        const element=document.getElementsByClassName("cityInput")
        if(element[0].value===""){
            return 0
        }
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
        let res=await fetch(url);
        let data=await res.json();

        const humidity=document.getElementsByClassName("humidity-percent")
        const wind=document.getElementsByClassName("wind-rate")
        const temp=document.getElementsByClassName('weather-temp')
        const location=document.getElementsByClassName("weather-location")

        humidity[0].innerHTML=data.main.humidity+" %";
        wind[0].innerHTML=Math.floor(data.wind.speed)+" km/h";
        temp[0].innerHTML=Math.floor(data.main.temp)+"°c";
        location[0].innerHTML=data.name;

        if(data.weather[0].icon==="01d"||data.weather[0].icon==="01n"){
            setWIcon(clear);
        }
        else if(data.weather[0].icon==="02d"||data.weather[0].icon==="02n"){
            setWIcon(cloud);
        }
        else if(data.weather[0].icon==="03d"||data.weather[0].icon==="03n"){
            setWIcon(drizzle);
        }
        else if(data.weather[0].icon==="04d"||data.weather[0].icon==="04n"){
            setWIcon(drizzle);
        }
        else if(data.weather[0].icon==="09d"||data.weather[0].icon==="09n"){
            setWIcon(rain);
        }
        else if(data.weather[0].icon==="10d"||data.weather[0].icon==="10n"){
            setWIcon(rain);
        }
        else if(data.weather[0].icon==="13d"||data.weather[0].icon==="13n"){
            setWIcon(snow);
        }
        else{
            setWIcon(clear)
        }
    }
  return (
    <div className="container">
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder='Search'/>
            <div className="search-icon" onClick={()=>{searchfn()}}>
                <img src={search} alt="" />
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">24 deg c</div>
        <div className="weather-location">London</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity}alt="" className='icon' />
                <div className="data">
                    <div className="humidity-percent">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind} alt="" className='icon' />
                <div className="data">
                    <div className="wind-rate">18 km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp