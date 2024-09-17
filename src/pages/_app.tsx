import { useState } from 'react';
import useFetchCountries from '../hooks/useFetchCountries';
import { Country } from '../types/Country';
import CountryCard from '../components/CountryCard';
import CountryModal from '../components/CountryModal';
import styles from '../styles/HomePage.module.css'
import Head from 'next/head';
import '../styles/globals.css';

const HomePage = () => {
  const { countries, loading, error } = useFetchCountries();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  const handleCardClick = (country: Country) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  return (
    <div>
    <Head>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet"/>
    </Head>

    <div className={styles.countryGrid}>
        {countries.map((country) => (
          <CountryCard 
            key={country.name.common} 
            country={country} 
            onClick={() => handleCardClick(country)} 
          />
        ))}
    </div>


    {isModalOpen && selectedCountry && (
        <CountryModal 
          country={selectedCountry} 
          onClose={handleCloseModal}
        />
    )}
    
    </div>
  );
};

export default HomePage;