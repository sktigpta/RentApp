import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../storeing-data/auth";

const Home = () => {
  const { user, business } = useAuth();
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [suggestions, setSuggestions] = useState([]); // State to hold auto-suggestions
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value); // Update the search term state

    // Make an API call to get suggestions
    if (value.trim() !== "") {
      try {
        const response = await fetch(`http://localhost:2005/api/search/?query=${value}`);
        const data = await response.json();

        console.log("Data received from API:", data); // Log the data received from the API

        // Map over the suggestions and add a type property based on the suggestion
        const formattedSuggestions = data.suggestions.map((suggestion) => {
          if (suggestion.type === "product") {
            return { ...suggestion, type: "product" };
          } else if (suggestion.type === "business") {
            return { ...suggestion, type: "business" };
          } else if (suggestion.type === "category") {
            return { ...suggestion, type: "category" };
          } else {
            // Handle unknown type
            return null;
          }
        });

        // Filter out null values (if any)
        const validSuggestions = formattedSuggestions.filter((suggestion) => suggestion !== null);

        setSuggestions(validSuggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]); // Clear suggestions in case of error
      }
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };


  const handleSuggestionClick = (suggestion) => {
    // Navigate based on the type of suggestion
    switch (suggestion.type) {
      case "product":
        navigate(`/product/${suggestion._id}`);
        break;
      case "business":
        navigate(`/business/${suggestion._id}`);
        break;
      case "category":
        navigate(`/category/${suggestion._id}`);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <section>
        <div className="hero">
          <div className="hero-card">
            <input
              type="text"
              className="search"
              placeholder="Search for Items, events, categories and more..."
              value={searchTerm}
              onChange={handleInputChange}
            />
          {/* Display auto-suggestions */}
          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)} // Handle click event
                  >
                  {/* Render suggestion text based on type */}
                  {renderSuggestionText(suggestion)}
                </div>
              ))}
            </div>
          )}
          </div>
        </div>
      </section>
    </>
  );
};

// Function to render suggestion text based on its type
const renderSuggestionText = (suggestion) => {
  switch (suggestion.type) {
    case "product":
      return suggestion.name || suggestion.description;
    case "business":
      return suggestion.name || suggestion.about || suggestion.address;
    case "category":
      return suggestion.name;
    default:
      return "";
  }
};

export default Home;
