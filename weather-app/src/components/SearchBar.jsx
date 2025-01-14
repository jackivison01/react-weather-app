export default function SearchBar({ onSearch, setCity }) {
    const handleChange = (event) => {
        setCity(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            onSearch();
        };
    };

    return (
        <>
            <input
                placeholder='Enter a city:'
                onChange={handleChange}
                onKeyDown={handleKeyPress}>
            </input>
            <button onClick={onSearch}>Search</button>
        </>
    )
}