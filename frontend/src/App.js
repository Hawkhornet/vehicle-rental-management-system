import React, { useState } from "react";
import VehicleList from "./components/VehicleList";
import VehicleForm from "./components/VehicleForm";
import RentalForm from "./components/RentalForm";
import "./styles.css";

function App() {
  const [vehicles, setVehicles] = useState([
    { id: 1, name: "Toyota Corolla", type: "Car", available: true },
    { id: 2, name: "Honda Dio", type: "Bike", available: true }
  ]);

  const addVehicle = (vehicle) => {
    setVehicles([...vehicles, { ...vehicle, id: Date.now(), available: true }]);
  };

  const rentVehicle = (id) => {
    setVehicles(
      vehicles.map(v =>
        v.id === id ? { ...v, available: false } : v
      )
    );
  };

  const returnVehicle = (id) => {
    setVehicles(
      vehicles.map(v =>
        v.id === id ? { ...v, available: true } : v
      )
    );
  };

  const deleteVehicle = (id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  return (
   <div>
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">
          valo<span>rent.lk</span>
        </h2>
        <ul className="nav-links">
          <li>Home</li>
          <li>Marketplace</li>
          <li>Messages</li>
          <li>My Listings</li>
        </ul>
        <button className="login-btn">Login</button>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="icons">
          🚚 🚗 🚐 🚙
        </div>

        <h1>
          Rent out Your <span>Vehicle.</span><br />
          <span>Rent</span> a Vehicle.
        </h1>

        <p>
          List your vehicle to rent or browse, compare and book vehicles.
          <br />
          All in one place - safe and hassle free
        </p>

        <div className="search-box">
          <input type="text" placeholder="Search for vehicle" />
          <button>Search</button>
        </div>
      </section>

      {/* Listings */}
      <section className="listings">
        <h2>Latest Listings / Featured Listings</h2>
        <p>Discover the latest / featured vehicles available right now.</p>

        <div className="card">
          <h3>🚙 Ford Raptor Ranger 2019</h3>
          <p>@notshanesilva</p>
          <p>Automatic | 2019 | Diesel | Ganemulla</p>
          <h4>Rs. 7000 LKR /day</h4>
          <button className="details-btn">More Details</button>
        </div>
      </section>
    </div>
  );
}

export default App;
