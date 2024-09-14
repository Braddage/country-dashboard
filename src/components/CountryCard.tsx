import React from 'react';
import { Country } from '../types/Country';

const CountryCard: React.FC<{ country: Country }> = ({ country }) => (
  <div className="country-card">
    <img src={country.flags.svg} alt={`${country.name.common} flag`} />
    <h3>{country.name.common}</h3>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population.toLocaleString()}</p>
    <p>Region: {country.region}</p>
  </div>
);

export default CountryCard;