import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import vehicles from "../data";
import { useAuth } from "../context/AuthContext";
import "./VehicleDetails.css";

function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const vehicle = vehicles.find((item) => item.id === Number(id)) || vehicles[0];
  const [showBooking, setShowBooking] = useState(false);
  const [booking, setBooking] = useState({ startDate: "", endDate: "" });
  const [statusMessage, setStatusMessage] = useState("");

  const days = useMemo(() => {
    if (!booking.startDate || !booking.endDate) return 0;
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  }, [booking.endDate, booking.startDate]);

  const dailyRate = Number(vehicle.price.replace(/[^0-9]/g, ""));
  const totalPrice = days * dailyRate;

  const handleChat = () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: `/messages?vehicle=${vehicle.id}` } } });
      return;
    }
    navigate(`/messages?vehicle=${vehicle.id}`);
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    if (!user) {
      navigate("/login", { state: { from: { pathname: `/vehicle/${vehicle.id}` } } });
      return;
    }
    if (!booking.startDate || !booking.endDate || days === 0) {
      setStatusMessage("Select a valid start date and end date.");
      return;
    }
    setStatusMessage(`Booking confirmed for ${days} day(s). Total: Rs. ${totalPrice}.`);
  };

  return (
    <main className="details-page">
      <section className="details-layout">
        <div className="details-left">
          <div className="details-main-card">
            <h2>{vehicle.name}</h2>
            <p className="details-username">{vehicle.username}</p>
            <p className="details-meta">
              {vehicle.transmission} | {vehicle.year} | {vehicle.fuel} | {" "}
              {vehicle.location}
            </p>
            <h3>{vehicle.price}</h3>
          </div>

          <div className="gallery-card">
            <h3>Vehicle Gallery</h3>
            <div className="large-gallery-box">
             <img src={vehicle.image} alt={vehicle.name} />
          </div>
            <div className="gallery-thumbs">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>

        <div className="details-right">
          <div className="seller-card">
            <h3>Seller Information</h3>
            <p><strong>Name:</strong> {vehicle.owner}</p>
            <p><strong>Location:</strong> {vehicle.location}</p>

            <div className="seller-buttons">
              <button className="chat-btn" onClick={handleChat}>Chat</button>
              <button className="purchase-btn" onClick={() => setShowBooking((current) => !current)}>
                {showBooking ? "Hide Booking" : "Purchase"}
              </button>
            </div>
          </div>

          <div className="overview-card">
            <h3>Car Overview</h3>
            <p><strong>Interior Color:</strong> {vehicle.interiorColor}</p>
            <p><strong>Horsepower:</strong> {vehicle.horsepower}</p>
            <p><strong>Doors:</strong> {vehicle.doors}</p>
          </div>

          {showBooking && (
            <form className="booking-card" onSubmit={handleBookingSubmit}>
              <h3>Book This Vehicle</h3>
              <label>
                Start Date
                <input
                  type="date"
                  value={booking.startDate}
                  onChange={(event) =>
                    setBooking((current) => ({ ...current, startDate: event.target.value }))
                  }
                />
              </label>
              <label>
                End Date
                <input
                  type="date"
                  value={booking.endDate}
                  onChange={(event) =>
                    setBooking((current) => ({ ...current, endDate: event.target.value }))
                  }
                />
              </label>
              <p className="booking-summary">Estimated total: Rs. {totalPrice || 0}</p>
              <button type="submit" className="confirm-booking-btn">Confirm Booking</button>
              {statusMessage && <p className="status-message">{statusMessage}</p>}
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default VehicleDetails;
