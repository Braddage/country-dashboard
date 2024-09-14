import useFetchCountries from '../hooks/useFetchCountries';
import CountryCard from '../components/CountryCard'; // CountryCard will be created later

const HomePage = () => {
  const { countries, loading, error } = useFetchCountries();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="country-grid">
      {countries.map((country) => (
        <CountryCard key={country.name.common} country={country} />
      ))}
    </div>
  );
};

export default HomePage;