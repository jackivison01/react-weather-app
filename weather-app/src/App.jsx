import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurrentWeather from "./pages/CurrentWeather"; // Import your new page
import ForecastWeather from "./pages/ForecastWeather"; // Import another page
import Navbar from "./components/NavBar";

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Define your routes */}
                <Route path="/" element={<CurrentWeather />} />
                <Route path="/forecast" element={<ForecastWeather />} />
            </Routes>
        </Router>
    );
}