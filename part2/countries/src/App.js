import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const CapitalWeatherDisplay = ({ countryCapital }) => {
  const apiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY;
  // prevent a strange bug with boilerplate placeholder data
  const [weatherData, setWeatherData] = useState({
    temperature: 'placeholder',
    weather_descriptions: ['placeholder'],
    weather_icons: ['https://image.shutterstock.com/image-illustration/trollface-laughing-internet-meme-troll-600w-201282305.jpg'],
    wind_dir: "PH",
    wind_speed: 'placeholder'
  });

  // weird bug - sends request twice, first time doesn't work...
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${countryCapital}`)
      .then(response => { console.log("RESP DATA", response.data.current); setWeatherData(response.data.current); }
      );
  }, [apiKey, countryCapital]);

  console.log("weatherData", weatherData);

  // it STILL crashes sometimes - can't figure out what causes it...
  return (
    <div>
      <h2>Weather in {countryCapital}</h2>
      <p>It is currently <strong>{weatherData.weather_descriptions[0]}</strong></p>
      <p><strong>Temperature: </strong>{weatherData.temperature}°C</p>
      <img src={weatherData.weather_icons[0]} alt="Weather Icon" width="240" height="240"></img>
      <p><strong>Wind: </strong>
        {weatherData.wind_speed}mph in {weatherData.wind_dir} direction.
      </p>
    </div>
  );
}

const CountryComponentDisplay = ({ countryData }) => (
  <div>
    <h1>{countryData.name}</h1>
    <h3>Capital: {countryData.capital}</h3>
    <h3>Population: {countryData.population.toLocaleString()}</h3>
    <h2>Languages</h2>
    <ul>
      {countryData.languages.map(language => <li key={language.name}>{language.name}</li>)}
    </ul>
    <h2>Flag</h2>
    <img src={countryData.flag} alt="Flag of the Country" className="countryFlag"/>
    <CapitalWeatherDisplay countryCapital={countryData.capital} />
  </div>
);

const IAmErrorComponent = () => (
  <div>One of three things has gone wrong:
    <ul>
      <li>The data has not been downloaded yet (or cannot be downloaded - maybe the API is down)</li>
      <li>The country you are searching for does not exist</li>
      <li>I messed something up and failed to account for it</li>
    </ul>
    Hopefully if you wait the program will work as expected. Also, try refreshing the page!
  </div>
)

const ShowDataButtonDisplay = ({ countryData }) => {
  const [dataIsShown, setDataIsShown] = useState(false);
  const showButtonOnClick = () => setDataIsShown(!dataIsShown);

  return (
    <span>
      <button onClick={showButtonOnClick}>{dataIsShown ? "Hide" : "Show"}</button>
      {dataIsShown ? <CountryComponentDisplay key={countryData.name} countryData={countryData} /> : <span />}
    </span>
  );
}

const CountriesDisplay = ({ allCountriesData, countryQuery }) => {
  const countryFilterList = allCountriesData.filter(country => country.name.toLowerCase().includes(countryQuery.toLowerCase()));
  const nrOfCountries = countryFilterList.length;
  return (
    <div>
      {nrOfCountries > 10 ? <p>Too many matches, be more specific</p>
        : nrOfCountries <= 10 && nrOfCountries > 1 ? countryFilterList
          .map(countryData => <div key={countryData.name}>{countryData.name}
            <ShowDataButtonDisplay countryData={countryData} /></div>)
          : nrOfCountries === 1 ? <CountryComponentDisplay countryData={countryFilterList[0]} />
            : <IAmErrorComponent />
      }
    </div>
  )
};

const App = () => {

  const [countryQuery, setCountryQuery] = useState('');
  const [allCountriesData, setAllCountriesData] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setAllCountriesData(response.data)
      );
  }, []);

  const handleCountryChange = (event) => {
    setCountryQuery(event.target.value);
  }

  return (
    <div>
      <div>Search for countries: <input value={countryQuery} placeholder={"Romania"}
        onChange={handleCountryChange} />
      </div>
      <CountriesDisplay allCountriesData={allCountriesData} countryQuery={countryQuery} />
    </div>
  );

}

export default App;
