import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import vehicles from "../data";
import { useAuth } from "../context/AuthContext";
import "./Messages.css";

function Messages() {
  const [searchParams] = useSearchParams();
  const vehicleId = Number(searchParams.get("vehicle"));
  const vehicle = vehicles.find((item) => item.id === vehicleId) || vehicles[0];
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: vehicle.owner, body: `Hi, ${vehicle.name} is available for booking.` },
  ]);

  const headerText = useMemo(
    () => `Conversation about ${vehicle.name}`,
    [vehicle.name]
  );

  const sendMessage = () => {
    if (!text.trim()) return;
    setMessages((current) => [
      ...current,
      { id: current.length + 1, sender: user?.name || "You", body: text.trim() },
    ]);
    setText("");
  };

  return (
    <main className="messages-page">
      <section className="messages-card">
        <h1>Messages</h1>
        <p>{headerText}</p>

        <div className="message-thread">
          {messages.map((message) => (
            <div key={message.id} className="message-bubble">
              <strong>{message.sender}:</strong> {message.body}
            </div>
          ))}
        </div>

        <div className="message-compose">
          <input
            type="text"
            placeholder="Type your message"
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </section>
    </main>
  );
}

export default Messages;
