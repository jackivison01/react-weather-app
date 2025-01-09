import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav>
            <Link to="/">Current Weather</Link> | <Link to="/forecast">Forecast</Link>
        </nav>
    );
}