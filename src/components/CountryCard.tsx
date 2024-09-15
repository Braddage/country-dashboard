import React from 'react';
import { Country } from '../types/Country';
import Image from 'next/image';
import styles from '../styles/CountryCard.module.css';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <div className={styles.countryCard}>
      <div className={styles.flagWrapper}>
        <Image
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          layout="responsive"
          width={300}
          height={200}
          className={styles.flagImage}
        />
      </div>

      <div className={styles.countryDetails}>
        <h2>{country.name.common}</h2>
        <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> {country.region}</p>
      </div>
    </div>
  );
};

export default CountryCard;