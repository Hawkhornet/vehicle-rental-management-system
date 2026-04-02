import React from "react";

function RentalForm({ vehicles, rentVehicle, returnVehicle }) {
  return (
    <div>
      <h2>Manage Rentals</h2>
      {vehicles.map(vehicle => (
        <div key={vehicle.id}>
          {vehicle.name}
          {vehicle.available ? (
            <button onClick={() => rentVehicle(vehicle.id)}>Rent</button>
          ) : (
            <button onClick={() => returnVehicle(vehicle.id)}>Return</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default RentalForm;