import useFetchCountries from '../hooks/useFetchCountries';
import CountryCard from '../components/CountryCard';
import styles from '../styles/HomePage.module.css'
import Head from 'next/head';
import '../styles/globals.css';

const HomePage = () => {
  const { countries, loading, error } = useFetchCountries();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <Head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet"/>
    </Head>
    <div className={styles.countryGrid}>
      {countries.map((country) => (
        <CountryCard key={country.name.common} country={country} />
      ))}
    </div>
  </>
  );
};

export default HomePage;