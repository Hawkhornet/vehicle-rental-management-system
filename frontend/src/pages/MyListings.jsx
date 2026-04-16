import { useState } from "react";
import vehicles from "../data";
import { useAuth } from "../context/AuthContext";
import "./MyListings.css";

function MyListings() {
  const { user } = useAuth();
  const [listingForm, setListingForm] = useState({
    name: "",
    location: "",
    price: "",
  });
  const [myVehicles, setMyVehicles] = useState(vehicles.slice(0, 2));

  const addListing = (event) => {
    event.preventDefault();
    if (!listingForm.name.trim() || !listingForm.location.trim() || !listingForm.price.trim()) {
      return;
    }

    setMyVehicles((current) => [
      {
        id: current.length + 100,
        name: listingForm.name,
        location: listingForm.location,
        price: `Rs. ${listingForm.price}/day`,
      },
      ...current,
    ]);
    setListingForm({ name: "", location: "", price: "" });
  };

  return (
    <main className="listings-page">
      <section className="listings-layout">
        <div className="listings-card">
          <h1>My Listings</h1>
          <p>Welcome back, {user?.name}. Manage your vehicles here.</p>

          <form className="listing-form" onSubmit={addListing}>
            <input
              type="text"
              placeholder="Vehicle name"
              value={listingForm.name}
              onChange={(event) => setListingForm((current) => ({ ...current, name: event.target.value }))}
            />
            <input
              type="text"
              placeholder="Location"
              value={listingForm.location}
              onChange={(event) =>
                setListingForm((current) => ({ ...current, location: event.target.value }))
              }
            />
            <input
              type="number"
              placeholder="Price per day"
              value={listingForm.price}
              onChange={(event) => setListingForm((current) => ({ ...current, price: event.target.value }))}
            />
            <button type="submit">Add Listing</button>
          </form>
        </div>

        <div className="my-vehicle-list">
          {myVehicles.map((vehicle) => (
            <div key={vehicle.id} className="my-vehicle-item">
              <h3>{vehicle.name}</h3>
              <p>{vehicle.location}</p>
              <strong>{vehicle.price}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default MyListings;
