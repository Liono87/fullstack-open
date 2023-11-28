import { useState, useEffect } from 'react';
import { handleSearch } from './services/countryService';

const App = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (query.length > 0) {
          const searchResult = await handleSearch(query);
          setResult(searchResult);
        } else {
          setResult(null);
        }
      } catch (error) {
        setResult('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
  };

  return (
    <div>
      find countries &nbsp;
      <input
        type='text'
        value={query}
        onChange={handleInputChange}
        placeholder='Type a country name...'
      />
      <div>
        <h3>Search Result:</h3>
        {loading ? (
          <p>Loading...</p>
        ) : result && typeof result === 'object' ? (
          <div>
            <p>Capital: {result.capital && result.capital[0]}</p>
            <p>Area: {result.area}</p>
            <p>Languages:</p>
            <ul>
              {result.languages &&
                Object.entries(result.languages).map(([key, value]) => (
                  <li key={key}>{value}</li>
                ))}
            </ul>
            <p>{result.flag}</p>
          </div>
        ) : (
          <p>No country data to display</p>
        )}
      </div>
    </div>
  );
};

export default App;
