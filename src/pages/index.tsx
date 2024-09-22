import React, { useState, useEffect } from 'react';
import useFetchCountries from '../hooks/useFetchCountries';
import { Country } from '../types/Country';
import CountryCard from '../components/CountryCard';
import CountryModal from '../components/CountryModal';
import ComparisonModal from '../components/ComparisonModal';
import Sidebar from '../components/Sidebar';
import styles from '../styles/HomePage.module.css';
import LazyLoad from '../components/LazyLoad';
import Head from 'next/head';
import { useDarkMode } from '../context/DarkModeContext';

const HomePage = () => {
  const { countries, loading, error } = useFetchCountries();
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(countries);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [compareCountry, setCompareCountry] = useState<Country | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    let filtered = [...countries];

    if (searchQuery) {
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (country.capital && country.capital[0].toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedRegion) {
      filtered = filtered.filter(country => country.region === selectedRegion);
    }

    if (selectedTimezone) {
      filtered = filtered.filter(country => (country.timezones ?? []).includes(selectedTimezone));
    }

    filtered = filtered.sort((a, b) => {
      return sortOrder === 'asc' ? a.population - b.population : b.population - a.population;
    });

    setFilteredCountries(filtered);
  }, [searchQuery, selectedRegion, selectedTimezone, sortOrder, countries]);

  const handleCardClick = (country: Country) => {
    if (isComparing) {
      setCompareCountry(country);
      setIsCompareModalOpen(true);
    } else {
      setSelectedCountry(country);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsCompareModalOpen(false);
    setSelectedCountry(null);
    setCompareCountry(null);
    setIsComparing(false);
  };

  const handleCompareClick = () => {
    setIsComparing(true);
    setIsModalOpen(false);
  };

  const handleFilterRegion = (region: string) => {
    setSelectedRegion(region);
  };

  const handleFilterTimezone = (timezone: string) => {
    setSelectedTimezone(timezone);
  };

  const handleSortByPopulation = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const uniqueRegions = Array.from(new Set(countries.map((country) => country.region).filter(Boolean)));
  const uniqueTimezones = Array.from(new Set(countries.flatMap((country) => country.timezones || []).filter(Boolean)));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={`${styles.container} ${darkMode ? 'dark-mode' : ''}`}>
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
          onCompare={handleCompareClick}
        />
      )}

      {isCompareModalOpen && selectedCountry && compareCountry && (
        <ComparisonModal
          country={selectedCountry}
          country2={compareCountry}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default HomePage;