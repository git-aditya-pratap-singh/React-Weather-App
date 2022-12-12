import React, {useState, useEffect} from "react";
import axios from 'axios';
import webimg from "./assets/logo.png";
import img from "./assets/lg.png";
import man from "./assets/man.png";
import { FaStreetView, FaThermometerHalf,FaThermometerFull, FaTint } from "react-icons/fa";
import { GiSunset, GiSunrise } from "react-icons/gi";
import { BsCloudHazeFill, BsWater } from "react-icons/bs";



const Weather = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Mumbai");
  const API = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=b3e42d09b9841d9b623fac122c9576ce`;

  const fetchApi = async() =>{
    const response = await axios.get(API);
    console.log(response.data);
    setCity(response.data);
  }

  useEffect(()=>{
    fetchApi();
  },[search]);

  const locale = 'en';
  const day = new Date().toLocaleDateString(locale, {weekday:'long'});
  const month = new Date().toLocaleDateString(locale, {month:'long'});
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString(locale, {hour:'numeric',hour12: true, minute:'numeric'});
  const hour = new Date().getHours();
  const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}`;
  
  
    return(
        <>
        {/* Banner */}
        <div className="w-full md:h-screen bg-[url('./assets/banner.png')]">

          {/* Navigation Bar */}
          <div className="bg-[url('./assets/banner.png')] drop-shadow-lg w-full py-3 text-center 
          flex align-center justify-between px-7">

             {/* Navigation Logo */}
             <img src={webimg} alt="Error" width={50} height={50}/>

             <h1 className="text-3xl font-bold text-cyan-500 font-sans hidden md:block">Weather App</h1>
             
             {/* Navigation Search Box */}
             <input type="search"
             name="searchbox"
             autoComplete="off"
             placeholder="Search City"
             onChange={(event)=>{ setSearch(event.target.value)}}
             className="form-input px-4 py-3 rounded-lg"
             
            />
            
            {/* Navigation Closed */}
          </div>

          {/* Middle Container Start*/}

          <div className="w-full flex flex-col md:flex-row pt-5 px-3 gap-5 md:gap-9">
              
            {/* Container -1 */}
            
              <div className="w-[300px] mx-auto flex flex-row items-center text-center md:hidden">

                  <div className="w-[60px] h-1 bg-gray-800 rounded-md"></div>
                    <h1 className="text-2xl text-cyan-500 font-bold mx-auto">Weather App</h1>
                  <div className="w-[60px] h-1 bg-gray-800 rounded-md "></div>

              </div>

              <div className="bg-gray-800 p-5 h-[190px] align-center text-center rounded-lg 
              text-white font-semibold leading-9 basis-1/4 opacity-90">
                <h1>{wish}</h1>
                <h2>Time : {time}</h2>
                <h3>Date : {date}</h3>
                <h3>( {day} | {month} )</h3>
              </div>
            
            {/* Container -2 */}

              <div className="bg-gray-800 p-5 align-center text-center rounded-lg 
              text-white font-semibold basis-1/2 opacity-90">

                {!city ? (
                  <p> No Data Found!</p>
                ) : (
                  <div>

                     {/* Temp & logo section */}
                    <div className="flex flex-col gap-0 text-center items-center">
                        <img src={img} alt="Error" width={80} height={80} />

                        <div className="w-full mx-auto flex flex-row gap-2 justify-center">
                          <FaStreetView size={35} className="text-cyan-500"/>
                          <h2 className="text-3xl font-bold">{city.name},{city.sys.country}</h2>
                        </div>
                    
                        <h2 className="text-[15px] mt-3 flex flex-row items-center">
                          <FaThermometerHalf/>
                          Temperature</h2>

                        <h3 className="text-5xl font-extrabold">{Math.floor(city.main.temp-273)}°C</h3>

                        <h2 className="text-[15px] mt-2 fleitems-center">{city.weather[0].description}</h2>

                        <h2 className="text-[15px] mt-2 fleitems-center">lat : {city.coord.lat} | lon : {city.coord.lon}</h2>
                    </div>

                    {/* Humidity */}

                    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-y-5 mt-9 pb-4">

                      <h1 className="flex flex-row mx-auto items-center"><FaThermometerHalf/>Min : {Math.floor(city.main.temp_min-273)}°C</h1>
                      <h1 className="flex flex-row mx-auto items-center"><FaThermometerFull/>Max : {Math.floor(city.main.temp_max-273)}°C</h1>
                      <h1 className="flex flex-row mx-auto gap-1 items-center"><GiSunrise/>Sunrise : {new Date(city.sys.sunrise * 1000).toLocaleTimeString(locale, {hour:'numeric',hour12: true, minute:'numeric'})}</h1>
                      <h1 className="flex flex-row mx-auto gap-1 items-center"><BsWater/>Wind : {city.wind.speed} <p className="text-[10px] items-center">MPH</p></h1>
                      <h1 className="flex flex-row mx-auto gap-1 items-center"><GiSunset/>Sunset : {new Date(city.sys.sunset * 1000).toLocaleTimeString(locale, {hour:'numeric',hour12: true, minute:'numeric'})}</h1>                    
                      <h1 className="flex flex-row mx-auto gap-1 items-center"><BsCloudHazeFill/>Pressure : {city.main.pressure}</h1>                      
                      <h1 className="flex flex-row mx-auto items-center"><FaTint/>Humidity : {city.main.humidity} %</h1>
                    </div>
                  </div>
                )
              }
                   
              </div>

           {/* Middle Container End */}

           {/* Man Container */}

           <div className="my-auto hidden md:block">
            <img src={man} alt="Error"/>
           </div>

           {/* Middle Container Start */}
          </div>

           {/* Developer Container  */}

          <div className="bg-gray-800 w-full py-2 opacity-90 mt-5">
            <h1 className="text-cyan-500 font-semibold text-center md:text-right px-8 ">Developed By : Aditya Pratap Singh</h1>
          </div>
        
        {/* Banner Closed */}

        </div>
        </>
    );
}
export default Weather;