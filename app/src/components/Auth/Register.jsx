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
    avatar: "🙂",
    city: "Copenhagen",
    danishLevel: "beginner",
    nativeLanguage: "",
    learningGoals: "",
    topics: "",
    availability: "weekends",
    bio: "",
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

    const topicsArray = formData.topics
      .split(",")
      .map((topic) => topic.trim())
      .filter(Boolean);

    const registerResult = registerUser({
      name: formData.name,
      email: formData.email,
      password: hashedPassword,
      role: formData.role,
      avatar: formData.avatar,
      city: formData.city,
      danishLevel: formData.danishLevel,
      nativeLanguage: formData.nativeLanguage,
      learningGoals: formData.learningGoals,
      topics: topicsArray,
      availability: formData.availability,
      bio: formData.bio,
      createdAt: new Date().toISOString(),
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

        {error && <p role="alert">{error}</p>}

        <label>
          Name
          <input
            name="name"
            id="name"
            type="text"
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
            id="email"
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
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </label>

        <label>
          Role
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="learner">Learner</option>
            <option value="native">Native speaker</option>
            <option value="both">Both</option>
          </select>
        </label>

        <label>
          Avatar
          <select
            name="avatar"
            id="avatar"
            value={formData.avatar}
            onChange={handleChange}
          >
            <option value="🙂">🙂 Friendly</option>
            <option value="👩">👩 Woman</option>
            <option value="👨">👨 Man</option>
            <option value="👩‍🦰">👩‍🦰 Red hair</option>
            <option value="👨‍🦱">👨‍🦱 Curly hair</option>
            <option value="👩‍🦳">👩‍🦳 Older woman</option>
            <option value="🧑">🧑 Person</option>
          </select>
        </label>

        <label>
          City
          <select
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
          >
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
            id="danishLevel"
            value={formData.danishLevel}
            onChange={handleChange}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="native">Native</option>
          </select>
        </label>

        <label>
          Native language
          <input
            name="nativeLanguage"
            id="nativeLanguage"
            type="text"
            value={formData.nativeLanguage}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Learning goals
          <input
            name="learningGoals"
            id="learningGoals"
            type="text"
            value={formData.learningGoals}
            onChange={handleChange}
            placeholder="Example: Improve conversational Danish"
          />
        </label>

        <label>
          Availability
          <select
            name="availability"
            id="availability"
            value={formData.availability}
            onChange={handleChange}
          >
            <option value="weekends">Weekends</option>
            <option value="evenings">Evenings</option>
            <option value="weekdays">Weekdays</option>
            <option value="mornings">Mornings</option>
            <option value="flexible">Flexible</option>
          </select>
        </label>

        <label>
          Bio
          <textarea
            name="bio"
            id="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell others a little about yourself"
          />
        </label>

        <label>
          Topics
          <input
            name="topics"
            id="topics"
            type="text"
            value={formData.topicsText}
            onChange={handleChange}
            placeholder="culture, food, travel"
          />
        </label>

        <button type="submit">Register</button>
      </form>
    </section>
  );
}

export default Register;
