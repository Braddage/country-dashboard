import { useState, useEffect } from 'react';
import useFetchCountries from '../hooks/useFetchCountries';
import { Country } from '../types/Country';
import CountryCard from '../components/CountryCard';
import CountryModal from '../components/CountryModal';
import Sidebar from '../components/Sidebar';
import styles from '../styles/HomePage.module.css';
import LazyLoad from '../components/LazyLoad';
import Head from 'next/head';
import '../styles/globals.css';

const HomePage = () => {
  const { countries, loading, error } = useFetchCountries();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countries);

  // Prevents there being no cards displayed on refresh.
  useEffect(() => {
    if (countries.length > 0) {
      setFilteredCountries(countries);
    }
  }, [countries]);

  const handleCardClick = (country: Country) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
  };

  const handleFilterRegion = (region: string) => {
    if (region === '') {
      setFilteredCountries(countries);
    } else {
      setFilteredCountries(countries.filter((country) => country.region === region));
    }
  };

  const handleFilterTimezone = (timezone: string) => {
    if (timezone === '') {
      setFilteredCountries(countries);
    } else {
      setFilteredCountries(countries.filter((country) => (country.timezones ?? []).includes(timezone)));
    }
  };

  const handleSortByPopulation = (order: 'asc' | 'desc') => {
    const sortedCountries = [...filteredCountries].sort((a, b) => {
      return order === 'asc' ? a.population - b.population : b.population - a.population;
    });
    setFilteredCountries(sortedCountries);
  };

  const handleSearch = (query: string) => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase()) ||
        (country.capital && country.capital[0].toLowerCase().includes(query.toLowerCase()))
      )
    );
  };

  const uniqueRegions = Array.from(new Set(countries.map((country) => country.region).filter(Boolean)));
  const uniqueTimezones = Array.from(new Set(countries.flatMap((country) => country.timezones || []).filter(Boolean)));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet" />
      </Head>

      <Sidebar
        regions={uniqueRegions as string[]}
        timezones={uniqueTimezones as string[]}
        onFilterRegion={handleFilterRegion}
        onFilterTimezone={handleFilterTimezone}
        onSortByPopulation={handleSortByPopulation}
        onSearch={handleSearch}
      />

      <div className={styles.countryGrid}>
        {filteredCountries.map((country) => (
          <LazyLoad key={country.name.common}>
            <CountryCard
                key={country.name.common}
                country={country}
                onClick={() => handleCardClick(country)}
            />
          </LazyLoad>
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