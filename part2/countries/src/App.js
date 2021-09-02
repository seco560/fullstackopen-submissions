import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const CountryComponentDisplay = ({ countryData }) => (
  <div>
    <h1>{countryData.name}</h1>
    <h3>Capital: {countryData.capital}</h3>
    <h3>Population: {countryData.population.toLocaleString()}</h3>
    <h2>Languages</h2>
    <ul>
    {countryData.languages.map(language => <li>{language.name}</li>)}
    </ul>
    <h2>Flag</h2>
    <img src={countryData.flag} alt="Flag of the Country"/>
  </div>
);

const IAmErrorComponent = () => (
  <p>One of three things has gone wrong:
    <ul>
      <li>The data has not been downloaded yet (or cannot be downloaded - maybe the API is down)</li>
      <li>The country you are searching for does not exist</li>
      <li>I messed something up and failed to account for it</li>
    </ul>
    Hopefully if you wait the program will work as expected. Also, try refreshing the page!
  </p>
)

const CountriesDisplay = ({ countryData, countryQuery }) => {
  const countryFilterList = countryData.filter(country => country.name.toLowerCase().includes(countryQuery.toLowerCase()));
  const nrOfCountries = countryFilterList.length;
  return (
    <div>
      {nrOfCountries > 10 ? <p>Too many matches, be more specific</p>
        : nrOfCountries <= 10 && nrOfCountries > 1 ? countryFilterList.map(country => <p>{country.name}</p>)
        : nrOfCountries === 1 ? <CountryComponentDisplay countryData={countryFilterList[0]} />
        : <IAmErrorComponent />
      }
    </div>
  )
};

const App = () => {

  const [countryQuery, setCountryQuery] = useState('');
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountryData(response.data)
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
      <CountriesDisplay countryData={countryData} countryQuery={countryQuery} />
    </div>
  );

}

export default App;
