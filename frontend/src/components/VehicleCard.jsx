import { useNavigate } from "react-router-dom";
import "./VehicleCard.css";

function VehicleCard({ vehicle }) {
  const navigate = useNavigate();

  return (
    <div className="vehicle-card">
      <div className="vehicle-image">
  <img src={vehicle.image} alt={vehicle.name} />
</div>

      <div className="vehicle-card-body">
        <h3>{vehicle.name}</h3>
        <p className="vehicle-username">{vehicle.username}</p>
        <p className="vehicle-meta">
          {vehicle.transmission} | {vehicle.year} | {vehicle.fuel} | {" "}
          {vehicle.location}
        </p>
        <h4>{vehicle.price}</h4>

        <button onClick={() => navigate(`/vehicle/${vehicle.id}`)}>
          More Details
        </button>
      </div>
    </div>
  );
}

export default VehicleCard;
