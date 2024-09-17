import { useState } from 'react';
import styles from '../styles/Sidebar.module.css';

interface SidebarProps {
  regions: string[];
  timezones: string[];
  onFilterRegion: (region: string) => void;
  onFilterTimezone: (timezone: string) => void;
  onSortByPopulation: (order: 'asc' | 'desc') => void;
  onSearch: (query: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  regions,
  timezones,
  onFilterRegion,
  onFilterTimezone,
  onSortByPopulation,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Send the search query to the parent component
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const region = e.target.value;
    setSelectedRegion(region);
    onFilterRegion(region); // Filter countries by selected region
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const timezone = e.target.value;
    setSelectedTimezone(timezone);
    onFilterTimezone(timezone); // Filter countries by selected timezone
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortByPopulation(e.target.value as 'asc' | 'desc'); // Sort countries by population
  };

  return (
    <div className={styles.sidebar}>
      <h2>Country Data Dashboard</h2>
      
      {/* Search by Name or Capital */}
      <div className={styles.filterGroup}>
        <label>Search by Name or Capital:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name or capital"
        />
      </div>

      {/* Filter by Region */}
      <div className={styles.filterGroup}>
        <label>Filter by Region:</label>
        <select value={selectedRegion} onChange={handleRegionChange}>
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      {/* Filter by Timezone */}
      <div className={styles.filterGroup}>
        <label>Filter by Timezone:</label>
        <select value={selectedTimezone} onChange={handleTimezoneChange}>
          <option value="">All Timezones</option>
          {timezones.map((timezone) => (
            <option key={timezone} value={timezone}>{timezone}</option>
          ))}
        </select>
      </div>

      {/* Sort by Population */}
      <div className={styles.filterGroup}>
        <label>Sort by Population:</label>
        <select onChange={handleSortChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;