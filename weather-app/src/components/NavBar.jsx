import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "center", // Centers the content horizontally
                alignItems: "center",  // Centers the items vertically
                position: "absolute",
                top: 0,
                width: "100%",
                padding: "10px 0",
                backgroundColor: "#f8f8f8",
                zIndex: 10,
                textAlign: "center", // Centers text inside the navbar
            }}
        >
            <Link to="/" style={{ margin: "0 20px" }}>Current Weather</Link>
            <Link to="/forecast" style={{ margin: "0 20px" }}>Forecast</Link>
        </nav>
    );
}
