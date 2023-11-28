import axios from 'axios';

const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries';

async function fetchAllCountries() {
  try {
    const response = await axios.get(`${BASE_URL}/api/all`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

async function handleSearch(query) {
  try {
    const allCountries = await fetchAllCountries();

    const filteredCountries = allCountries.filter((country) => {
      const name = country.name.common.toLowerCase();
      return name.includes(query.toLowerCase());
    });

    if (filteredCountries.length > 10) {
      return 'Too many matches, specify another filter';
    } else if (filteredCountries.length > 1) {
      return filteredCountries;
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      const { capital, area, flag, languages } = country;
      return { capital, area, flag, languages };
    } else {
      return 'No matching country found';
    }
  } catch (error) {
    throw new Error('Failed to search for countries');
  }
}

export { handleSearch };
