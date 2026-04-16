import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import VehicleCard from "../components/VehicleCard";
import vehicles from "../data";
import "./Home.css";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const featuredVehicles = useMemo(() => vehicles.slice(0, 3), []);

  const handleSearch = () => {
    const query = searchTerm.trim();
    navigate(query ? `/marketplace?search=${encodeURIComponent(query)}` : "/marketplace");
  };

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Rent out Your <span>Vehicle.</span>
            <br />
            <span>Rent</span> a Vehicle.
          </h1>

          <p>List your vehicle to rent or browse vehicles easily.</p>

          <div className="hero-search">
            <input
              type="text"
              placeholder="Search for vehicle"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-title-row">
          <h2>Latest Listings / Featured Listings</h2>
        </div>

        <div className="featured-grid">
          {featuredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
