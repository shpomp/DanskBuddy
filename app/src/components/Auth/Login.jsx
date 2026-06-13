import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    setError("");

    const result = await login(email, password);

    if (result.success) {
      navigate("/browse");
    } else {
      setError(result.error);
    }
  }

  return (
    <section>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>

        {error && <p>{error}</p>}

        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
        />

        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default Login;
