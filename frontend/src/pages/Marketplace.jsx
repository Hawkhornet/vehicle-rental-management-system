import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import VehicleCard from "../components/VehicleCard";
import vehicles from "../data";
import "./Marketplace.css";

function Marketplace() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [transmissions, setTransmissions] = useState([]);
  const [maxBudget, setMaxBudget] = useState(10000);
  const [searchText, setSearchText] = useState(initialSearch);

  const typeMap = {
    SUV: ["Vezel"],
    Sedan: ["Prius"],
    Pickup: ["Raptor"],
    Hatchback: ["Wagon R"],
  };

  const toggleValue = (value, stateSetter) => {
    stateSetter((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const priceNumber = Number(vehicle.price.replace(/[^0-9]/g, ""));
      const searchMatch =
        vehicle.name.toLowerCase().includes(searchText.toLowerCase()) ||
        vehicle.location.toLowerCase().includes(searchText.toLowerCase()) ||
        vehicle.fuel.toLowerCase().includes(searchText.toLowerCase());

      const transmissionMatch =
        transmissions.length === 0 || transmissions.includes(vehicle.transmission);

      const typeMatch =
        vehicleTypes.length === 0 ||
        vehicleTypes.some((type) => typeMap[type]?.some((keyword) => vehicle.name.includes(keyword)));

      return searchMatch && transmissionMatch && typeMatch && priceNumber <= maxBudget;
    });
  }, [maxBudget, searchText, transmissions, vehicleTypes]);

  return (
    <main className="marketplace-page">
      <section className="marketplace-layout">
        <aside className="filter-panel">
          <h2>Filters</h2>

          <div className="filter-block">
            <h4>Vehicle Type</h4>
            {Object.keys(typeMap).map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  checked={vehicleTypes.includes(type)}
                  onChange={() => toggleValue(type, setVehicleTypes)}
                />
                {type}
              </label>
            ))}
          </div>

          <div className="filter-block">
            <h4>Search</h4>
            <input
              className="marketplace-search"
              type="text"
              placeholder="Search by vehicle, fuel or city"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>

          <div className="filter-block">
            <h4>Price Range</h4>
            <input
              type="range"
              min="3000"
              max="10000"
              step="500"
              value={maxBudget}
              onChange={(event) => setMaxBudget(Number(event.target.value))}
            />
            <p className="budget-text">Up to Rs. {maxBudget}/day</p>
          </div>

          <div className="filter-block">
            <h4>Transmission</h4>
            {["Automatic", "Manual"].map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  checked={transmissions.includes(option)}
                  onChange={() => toggleValue(option, setTransmissions)}
                />
                {option}
              </label>
            ))}
          </div>
        </aside>

        <section className="marketplace-list">
          <div className="results-head">
            <h3>Available Vehicles</h3>
            <span>{filteredVehicles.length} result(s)</span>
          </div>
          <div className="marketplace-grid">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
            {filteredVehicles.length === 0 && (
              <div className="empty-results">No vehicles matched your filters.</div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

export default Marketplace;
