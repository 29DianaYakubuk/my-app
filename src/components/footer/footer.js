import{useEffect} from 'react';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

export const FooterContainer = ({className}) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    'https://api.openweathermap.org/data/2.5/weather',
                    {
                        params: {
                            q: 'London',
                            appid: '6f637454a7e4948b72cf78357bb05b4f',
                            units: 'metric',
                        },
                    },
                );
                setWeather(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeather();
    }, []);

    return (
        <div className={className}>
            <div>
                <div>Blog web-developer</div>
                <div>web@developer.com</div>
            </div>
            {weather ? (
                <div>
                    <p>Location: {weather.name}</p>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                    <p>{new Date().toLocaleString()}</p>
                </div>
            ) : (
                <p>Loading weather information...</p>
            )}
        </div>
    );
};

export const Footer = styled(FooterContainer)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgb(0,0,0) 0px 2px 17px;
    height: 120px;
    width: 1000px;
    font-weight: bold;
    font-size: 15px;
    color: rgb(0, 0, 0);
    margin: 0 auto;
    border-radius: 10px;
`;