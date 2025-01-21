import React, { useState } from "react";

export default function SearchBar({ onSearch, setCity, suggestions }) {
    const [inputValue, setInputValue] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setCity(value); // Update the parent state

        if (value) {
            // Filter suggestions based on input value
            const filtered = suggestions.filter((suggestion) =>
                suggestion.toLowerCase().startsWith(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion); // Set the selected suggestion
        setCity(suggestion); // Update parent city
        setFilteredSuggestions([]); // Clear the suggestions
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            onSearch(); // Trigger the search
            setFilteredSuggestions([]); // Clear suggestions
        }
    };

    return (
        <div className="search-bar-container" style={{ position: "relative" }}>
            {/* Input Field */}
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

            {/* Search Button */}
            <button onClick={onSearch} style={{ marginTop: "10px" }}>
                Search
            </button>
        </div>
    );
}
