import React, {useState} from 'react';
import styles from '../styles/Sidebar.module.css';
import { useDarkMode } from '../context/DarkModeContext';

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
  const { darkMode, toggleDarkMode } = useDarkMode();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const region = e.target.value;
    setSelectedRegion(region);
    onFilterRegion(region);
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const timezone = e.target.value;
    setSelectedTimezone(timezone);
    onFilterTimezone(timezone);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortByPopulation(e.target.value as 'asc' | 'desc');
  };

  return (
    <div className={`${styles.sidebar} ${darkMode ? 'dark-mode' : ''}`}>
      <h2>Country Data Dashboard</h2>
      
      <div className={styles.filterGroup}>
        <label htmlFor="search-input">Search by Name or Capital:</label>
        <input
          type="text"
          id="search-input"          
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name or capital"
        />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="region-input">Filter by Region:</label>
        <select id="region-input" value={selectedRegion} onChange={handleRegionChange}>
          <option value="">All Regions</option>
          {regions.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Filter by Timezone:</label>
        <select value={selectedTimezone} onChange={handleTimezoneChange}>
          <option value="">All Timezones</option>
          {timezones.map((timezone) => (
            <option key={timezone} value={timezone}>{timezone}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Sort by Population:</label>
        <select onChange={handleSortChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <button onClick={toggleDarkMode}> {/* Consider changing to slider, unsure of exact name (O=O)  */}
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>

    </div>
  );
};

export default Sidebar;