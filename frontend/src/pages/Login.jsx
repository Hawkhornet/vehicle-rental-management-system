import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const redirectPath = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(form.email, form.password);
    setMessage(result.message);
    if (result.success) {
      navigate(redirectPath);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Use any email and password to sign in.</p>

        <label>
          Email
          <input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({ ...current, password: event.target.value }))
            }
          />
        </label>

        <button type="submit">Login</button>
        {message && <p className="auth-message">{message}</p>}
      </form>
    </main>
  );
}

export default Login;
