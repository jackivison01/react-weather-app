import React, { useState } from "react";
import axios from 'axios';

export default function SearchBar({ onSearch, setCity }) {
    const [inputValue, setInputValue] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const handleClearButtonClick = () => {
        setInputValue("");
        setCity("");
        setFilteredSuggestions([]);
    }

    const getCitySugesstions = async (input) => {
        try {
            const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
            const response = await axios.get(
                `https://api.weatherapi.com/v1/search.json`,
                {
                    params: {
                        key: API_KEY,
                        q: input,
                    },
                }
            );
            const autocomplete = response.data;
            const suggestions = [];
            for (let i = 0; i < autocomplete.length; i++) {
                const newSuggestion = {
                    city: autocomplete[i].name,
                    country: autocomplete[i].country,
                }
                suggestions.push(newSuggestion.city + ", " + newSuggestion.country);
            }
            setFilteredSuggestions(suggestions);
        } catch (err) {
            console.log(err.message);
        }
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setCity(value); // Update the parent state
        getCitySugesstions(value);
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion); // Set the selected suggestion
        setCity(suggestion); // Update parent city
        setFilteredSuggestions([]); // Clear the suggestions
        onSearch();
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            onSearch(); // Trigger the search
            setFilteredSuggestions([]); // Clear suggestions
        }
    };

    return (
        <div className="search-bar-container" style={{ position: "relative", paddingBottom: "15px" }}>
            {/* Input Field */}
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <input
                    type="text"
                    placeholder="Enter a city:"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    style={{
                        width: "100%",
                        padding: "10px",
                        boxSizing: "border-box",
                    }}
                />
                <button onClick={handleClearButtonClick}>Clear</button>
                <button onClick={onSearch}>Search</button>
            </div>

            {/* Suggestions Dropdown */}
            {filteredSuggestions.length > 0 && (
                <ul
                    className="suggestions-dropdown"
                    style={{
                        position: "absolute",
                        top: "40px",
                        left: "0",
                        width: "100%",
                        border: "1px solid #ccc",
                        backgroundColor: "#fff",
                        listStyle: "none",
                        margin: "0",
                        padding: "0",
                        zIndex: 1000,
                    }}
                >
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{
                                padding: "10px",
                                cursor: "pointer",
                                borderBottom: "1px solid #ddd",
                            }}
                            onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
