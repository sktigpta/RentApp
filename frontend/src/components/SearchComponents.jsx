import React, { useState } from 'react';

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const [locationResults, setLocationResults] = useState([]);
    const [webResults, setWebResults] = useState([]); // Initialize as an empty array

    const handleSearch = async (searchQuery) => {
        try {
            const response = await fetch(`http://localhost:2005/api/auth/search/?query=${searchQuery}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const { location_search, web_search } = await response.json();

            setLocationResults(location_search);
            setWebResults(Array.isArray(web_search) ? web_search : []); // Ensure webResults is an array
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setQuery(value);
        handleSearch(value); // Call handleSearch with the updated query
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter your search query"
            />
            {/* No need for a search button anymore */}

            <div>
                <h2>Location Results</h2>
                <ul>
                    {locationResults.map((location, index) => (
                        <li key={index}>{`${location.name}, ${location.address.state_district}, ${location.address.country}`}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Web Results</h2>
                <ul>
                    {webResults.map((result, index) => (
                        <li key={index}>
                            <a href={result.url} target="_blank" rel="noopener noreferrer">{result.title}</a>
                            <p>{result.snippet}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchComponent;
