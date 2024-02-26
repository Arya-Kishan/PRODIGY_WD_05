import React, { useContext, useEffect, useRef, useState } from 'react'
import './Homepage.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import logo from '../../assets/logo.png'
import country from '../../assets/country.png'
import city1 from '../../assets/city.png'
import globe from '../../assets/globe.png'
import summer from '../../assets/summer.png'
import winter from '../../assets/winter.png'
import rainy from '../../assets/rainy.png'
import more from '../../assets/more.png'
import wind from '../../assets/wind.png'
import pressure from '../../assets/pressure.png'
import humid from '../../assets/humid.png'
import temp from '../../assets/temp.png'
import search from '../../assets/search.png'
import hamburger from '../../assets/hamburger.png'
import sun from '../../assets/sun.png'
import moon from '../../assets/moon.png'
import Loading from '../../components/Loading'
import Speech from '../Speech/Speech'
import { myContext } from '../../ContextApi/Context'

let IMG = "";
export default function Homepage() {

    const [data, setData] = useState(null)
    const [show, setShow] = useState(false)
    const inputRef = useRef(null)
    const parent = useRef(null)
    const ham = useRef(null)
    const navigate = useNavigate()
    const { mode, setMode } = useContext(myContext)

    const handleDetail = (data) => {
        navigate(`/detail/${data}`)
    }


    const getCity = async () => {

        async function success(position) {
            const lat = Math.round(position.coords.latitude * 100) / 100;
            const lon = Math.round(position.coords.longitude * 100) / 100;
            let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5a327cef9fddb1d9a16407f4d4b77644&units=metric`)
            let data = await res.json();
            console.log(data.name);
            fetchData(data.name);
        }

        function error() {
            alert("GEOLOCATION API NOT ALLOWED ,RANDOM LOCATION WEATHER WILL BE SHOWED")
            setData("patna")
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error)
        }

    }

    const handleMore1 = () => {
        gsap.to(".hamburger", {
            y: "-35vh",
        })
        setShow(true)
    }

    const handleMore2 = () => {
        gsap.to(".hamburger", {
            y: "0vh",
        })
        setShow(false)
    }

    const fetchData = async (city) => {
        let { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5a327cef9fddb1d9a16407f4d4b77644&units=metric`)

        if (data?.main?.temp > 25) {
            IMG = summer
            console.log("hot");
        } else if (data?.main?.temp < 25 && data?.main?.temp > 7) {
            IMG = rainy
            console.log("cold");
        } else if (data?.main?.temp < 7) {
            IMG = winter
            console.log("very very cold");
        }

        setData(data)


    }

    const handleSearchQuery = (e) => {
        if (e.key == "Enter" && inputRef.current?.value.length > 0) {
            fetchData(inputRef.current.value)
        }
    }

    const handleSearchQuery2 = (e) => {
        if (inputRef.current?.value.length > 0) {
            fetchData(inputRef.current.value)
        }
    }

    useEffect(() => {
        getCity();
        const ctx = gsap.context(() => {

        }, parent)

        return () => ctx.revert();

    }, [])

    return (
        <div className='mainHome' ref={parent} style={{ background: (mode ? "linear-gradient(aqua,rgb(10, 184, 184))" : "black") }}>
            {
                data ? (<>

                    <div className='homeDiv1'>

                        <div className='homeLogo'>
                            <img src={logo} alt="" srcSet="" />
                            <span><b>W</b>eather</span> <span><b>A</b>pp</span>
                        </div>

                        <div className='homeInput'>

                            <input type="text" onKeyUp={handleSearchQuery} ref={inputRef} />

                            <Speech input={inputRef} fetchData={fetchData} />

                            <div onClick={handleSearchQuery2}><img src={search} alt="" srcSet="" /></div>

                        </div>

                        <div className='more' onClick={() => handleDetail(`${data.coord.lat},${data.coord.lon}`)}>
                            <span>Forecast</span>
                            <img src={more} alt="" srcSet="" />
                        </div>

                    </div>

                    <div className='homeDiv2'>
                        <img src={IMG} alt="" />
                    </div>

                    <div className='homeDiv3'>

                        <div>
                            <img src={temp} alt="" />
                            <b>{data.main.temp}&#8451;</b>
                        </div>

                        <div>
                            <img src={humid} alt="" />
                            <b>{data.main.humidity}g/m<sup>3</sup></b>
                        </div>

                        <div>
                            <img src={wind} alt="" />
                            <b>{data.wind.speed}km/hr</b>
                        </div>

                        <div>
                            <img src={pressure} alt="" />
                            <b>{data.main.pressure}mb</b>
                        </div>

                    </div>

                    <div className='homeDiv4'>

                        <div>
                            <img className="countryImg" src={country} alt="" />
                            <span className="countryText" >Country : <b>{data.sys.country}</b> </span>
                            <img src={city1} alt="" />
                            <span>City : <b>{data.name}</b></span>
                        </div>

                        <div>
                            <img src={globe} alt="" />
                            <span>Latitude : <b>{data.coord.lat}</b> </span>
                            <span>Longitude : <b>{data.coord.lon}</b></span>
                        </div>

                    </div>

                </>) : (<Loading />)
            }

            {
                data &&
                <div className="hamburger" ref={ham}>

                    {!show ? <img onClick={handleMore1} src={hamburger} alt="" /> : <img id='down' onClick={handleMore2} src={more} alt="" />}

                    <div style={{ background: (mode ? "linear-gradient(aqua,rgb(10, 184, 184))" : "black") }}>
                        <p>Weather : {data.weather[0].description}</p>
                        <p>Temperature : {data.main.temp}&#8451;</p>
                        <p>Max Temperature : {data.main.temp_max}&#8451;</p>
                        <p>Min Temperature : {data.main.temp_min}&#8451;</p>
                        <p>Pressure : {data.main.pressure}mb</p>
                        <p>Humidity : {data.main.humidity}g/m<sup>3</sup></p>
                        <p>Wind Speed : {data.wind.speed}km/hr</p>
                        <p>Wind Degree : {data.wind.deg}km/hr</p>
                        <p>Sunrise : {data.sys.sunrise}</p>
                        <p>Sunrise : {data.sys.sunset}</p>
                        <p>Timezone : {data.timezone}</p>
                    </div>

                    <div className='theme'>
                        <div onClick={e => setMode(false)}>
                            <img src={moon} alt="" />
                            <i>Dark</i>
                        </div>
                        <div onClick={e => setMode(true)}>
                            <img src={sun} alt="" />
                            <i>Light</i>
                        </div>
                    </div>

                </div>
            }

            <div className="circle1"></div>
            <div className="circle2"></div>

        </div>
    )
}