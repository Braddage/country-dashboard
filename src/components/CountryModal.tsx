import { useEffect } from 'react';
import styles from '../styles/CountryModal.module.css';
import Image from 'next/image';
import { Country } from '../types/Country';

interface CountryModalProps {
    country: Country;
    onClose: () => void;
  }

  const CountryModal: React.FC<CountryModalProps> = ({ country, onClose }) => {
  
    useEffect(() => {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, []);
  
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div 
          className={styles.modalContent} 
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeButton} onClick={onClose}>X</button>
          <h2>{country.name.common}</h2>
          <Image
            src={country.flags.svg}
            alt={`${country.name.common} flag`}
            layout="intrinsic"
            width={300}
            height={200}
            className={styles.flagImage}
          />
          <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Currencies:</strong> {Object.keys(country.currencies || {}).join(', ')}</p>
          <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
        </div>
      </div>
    );
  };
  
  export default CountryModal;