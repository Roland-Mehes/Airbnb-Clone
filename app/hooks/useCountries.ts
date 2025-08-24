import countries from 'world-countries';

const getFlagEmoji = (countryCode: string) => {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
};

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: getFlagEmoji(country.cca2), // Generate flag emoji
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  return {
    getAll,
  };
};

export default useCountries;
