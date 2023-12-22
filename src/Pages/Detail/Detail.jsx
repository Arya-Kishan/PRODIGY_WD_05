import React, { useEffect, useState } from 'react'
import './Detail.scss'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import logo from '../../assets/logo.png'
import country from '../../assets/country.png'
import city from '../../assets/city.png'
import globe from '../../assets/globe.png'
import forecast from '../../assets/forecast.png'
import wind from '../../assets/wind.png'
import pressure from '../../assets/pressure.png'
import humid from '../../assets/humid.png'
import temp from '../../assets/temp.png'
import Loading from '../../components/Loading'

export default function Detail() {

  const [data, setData] = useState(null)
  const [data11, setData11] = useState(null)
  const params = useParams()

  const handleBack = () => {
    window.history.back();
  }

  const fetchData = async () => {
    let arr = [];
    let arr2 = [];
    let globe = params.globe.split(",")
    let lat = Math.round(globe[0] * 100) / 100
    let lon = Math.round(globe[1] * 100) / 100
    let { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5a327cef9fddb1d9a16407f4d4b77644`)
    // console.log(data.list);

    const uniqueForecastDays = [];
    const fiveDaysForecast = data.list.filter((forecast) => {
      const forecastDate = new Date(forecast.dt_txt).getDate();
      if (!uniqueForecastDays.includes(forecastDate)) {
        return uniqueForecastDays.push(forecastDate)
      }
    });
    console.log(fiveDaysForecast);


    setData(fiveDaysForecast)
    setData11(data)
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='mainDetail'>
      {data ? (<>

        <div className='detailDiv1'>

          <div className='detailLogo'>
            <img src={logo} alt="" srcSet="" />
            <span><b>W</b>eather</span> <span><b>A</b>pp</span>
          </div>

          <div>
            <img src={country} alt="" />
            <span className='country'>Country : <b>{data11.city.country}</b> </span>
            <img src={city} alt="" />
            <span>City : <b>{data11.city.name}</b></span>
          </div>

        </div>


        <div className='detailDiv2'>
          <h2>4 DAY FORCAST : -</h2>
        </div>


        <div className='detailDiv3'>
          <img src={forecast} alt="" />
          <div>
            {
              data.slice(0, 4).map((e, i) => (
                <div key={i} className='detailCard'>

                  <h2 className='date'>{e.dt_txt.split(" ")[0]}</h2>

                  <div>
                    <p><img src={temp} alt="" srcSet="" />Temperature : {e.main.temp}</p>
                    <p><img src={pressure} alt="" />Pressure : {e.main.pressure}</p>
                    <p><img src={humid} alt="" />Humidity{e.main.humidity}</p>
                    <p><img src={wind} alt="" srcSet="" />Weather : {e.weather[0].description}</p>
                  </div>

                </div>

              ))
            }
          </div>
        </div>


        <div className='detailDiv4'>

          <div>
            <img src={globe} alt="" />
            <span>Latitude : <b>{params.globe[0]}</b> </span>
            <span>Longitude : <b>{params.globe[1]}</b></span>
          </div>

          <button onClick={handleBack}>back</button>

        </div>

      </>) : (<Loading />)}

      <div className="circle1"></div>
      <div className="circle2"></div>

    </div>
  )
}