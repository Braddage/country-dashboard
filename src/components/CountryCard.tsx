import React from 'react';
import { Country } from '../types/Country';
import Image from 'next/image';
import styles from '../styles/CountryCard.module.css';

interface CountryCardProps {
  country: Country;
  onClick: () => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onClick }) => {
  return (
    <div className={styles.countryCard} onClick={onClick}>
      <div className={styles.flagWrapper}>
        <Image
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          layout="intrinsic"
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