import React, { useState } from "react";

function VehicleForm({ addVehicle }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addVehicle({ name, type });
    setName("");
    setType("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Vehicle</h2>
      <input
        type="text"
        placeholder="Vehicle Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Type (Car/Bike)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default VehicleForm;