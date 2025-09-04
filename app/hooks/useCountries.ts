import countries from 'world-countries';

// Function to convert a country code (e.g., "US") into a flag emoji
const getFlagEmoji = (countryCode: string) => {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
};

// Format the country data into a more usable structure
const formattedCountries = countries.map((country) => ({
  value: country.cca2, // Country code (e.g., "US")
  label: country.name.common, // Country name (e.g., "United States")
  flag: getFlagEmoji(country.cca2), // Flag emoji for the country
  latlng: country.latlng, // Latitude and longitude of the country
  region: country.region, // Region (e.g., "Americas", "Europe")
}));

// Custom hook to provide country-related utilities
const useCountries = () => {
  // Get all formatted countries
  const getAll = () => formattedCountries;

  // Find a country by its code (e.g., "US")
  const getByValue = (value: string) =>
    formattedCountries.find((country) => country.value === value);

  return {
    getAll,
    getByValue,
  };
};

export default useCountries; // Export the custom hook
