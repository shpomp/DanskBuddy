import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, hashPassword } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";

function Register() {
  const navigate = useNavigate();

  const { login } = useAuth();
  const { registerUser } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "learner",
    city: "Copenhagen",
    danishLevel: "beginner",
    nativeLanguage: "",
    bio: "",
    topics: "",
    availability: "",
    avatar: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleRegister(event) {
    event.preventDefault();
    setError("");

    const hashedPassword = await hashPassword(formData.password);

    const registerResult = registerUser({
      name: formData.name,
      email: formData.email,
      password: hashedPassword,
      role: formData.role,
      city: formData.city,
      danishLevel: formData.danishLevel,
      nativeLanguage: formData.nativeLanguage,
      bio: formData.bio,
      topics: formData.topics,
      availability: formData.availability,
      avatar: formData.avatar,
    });

    if (registerResult && registerResult.success === false) {
      setError(registerResult.error);
      return;
    }

    const loginResult = await login(formData.email, formData.password);

    if (!loginResult.success) {
      setError(loginResult.error);
      return;
    }

    navigate("/profile/me");
  }

  return (
    <section>
      <form onSubmit={handleRegister}>
        <h1>Create account</h1>

        {error && <p>{error}</p>}

        <label>
          Name
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            required
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </label>

        <label>
          Role
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="learner">Learner</option>
            <option value="native speaker">Native speaker</option>
          </select>
        </label>

        <label>
          City
          <select name="city" value={formData.city} onChange={handleChange}>
            <option value="Copenhagen">Copenhagen</option>
            <option value="Aarhus">Aarhus</option>
            <option value="Odense">Odense</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Danish level
          <select
            name="danishLevel"
            value={formData.danishLevel}
            onChange={handleChange}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>

        <label>
          Native language
          <input
            name="nativeLanguage"
            value={formData.nativeLanguage}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Register</button>
      </form>
    </section>
  );
}

export default Register;
