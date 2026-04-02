import React from "react";

function VehicleList({ vehicles, deleteVehicle }) {
  return (
    <div>
      <h2>Vehicle List</h2>
      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle.id}>
            {vehicle.name} ({vehicle.type}) - 
            {vehicle.available ? " Available" : " Rented"}
            <button onClick={() => deleteVehicle(vehicle.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VehicleList;