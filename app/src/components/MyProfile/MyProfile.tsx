import { useEffect, useState } from "react";
import type { ChangeEvent, FormEventHandler } from "react";
import { useAuth } from "../../context/AuthContext";

type UserRole = "learner" | "native" | "both";

type ProfileUser = {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: UserRole;
  avatar: string;
  city: string;
  danishLevel: string;
  nativeLanguage: string;
  learningGoals: string;
  topics: string[];
  availability: string;
  bio: string;
  createdAt?: string;
};

type AuthContextValue = {
  user: ProfileUser | null;
  updateUser?: (updatedData: Partial<ProfileUser>) => ProfileUser | undefined;
};

type ProfileFormData = {
  avatar: string;
  name: string;
  email: string;
  role: UserRole;
  city: string;
  danishLevel: string;
  nativeLanguage: string;
  learningGoals: string;
  topics: string;
  availability: string;
  bio: string;
};

function getFormDataFromUser(user: ProfileUser): ProfileFormData {
  return {
    avatar: user.avatar ?? "",
    name: user.name ?? "",
    email: user.email ?? "",
    role: user.role ?? "learner",
    city: user.city ?? "",
    danishLevel: user.danishLevel ?? "",
    nativeLanguage: user.nativeLanguage ?? "",
    learningGoals: user.learningGoals ?? "",
    topics: user.topics?.join(", ") ?? "",
    availability: user.availability ?? "",
    bio: user.bio ?? "",
  };
}

function MyProfile() {
  const { user, updateUser } = useAuth() as AuthContextValue;

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState<ProfileFormData>({
    avatar: "",
    name: "",
    email: "",
    role: "learner",
    city: "",
    danishLevel: "",
    nativeLanguage: "",
    learningGoals: "",
    topics: "",
    availability: "",
    bio: "",
  });

  useEffect(() => {
    if (!user) return;

    setFormData(getFormDataFromUser(user));
  }, [user]);

  if (!user) {
    return null;
  }

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCancel() {
    setIsEditing(false);
    setMessage("");

    setFormData(getFormDataFromUser(user));
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!updateUser) {
      setMessage("Profile editing is not available yet.");
      return;
    }

    const updatedProfile: Partial<ProfileUser> = {
      avatar: formData.avatar,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      city: formData.city,
      danishLevel: formData.danishLevel,
      nativeLanguage: formData.nativeLanguage,
      learningGoals: formData.learningGoals,
      topics: formData.topics
        .split(",")
        .map((topic) => topic.trim())
        .filter(Boolean),
      availability: formData.availability,
      bio: formData.bio,
    };

    updateUser(updatedProfile);

    setIsEditing(false);
    setMessage("Profile updated successfully.");
  };

  return (
    <main>
      <h1>My Profile</h1>

      {message && <p>{message}</p>}

      {!isEditing ? (
        <section>
          <p>
            <strong>Avatar:</strong> {user.avatar || "No avatar"}
          </p>

          <p>
            <strong>Name:</strong> {user.name}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Role:</strong> {user.role}
          </p>

          <p>
            <strong>City:</strong> {user.city}
          </p>

          <p>
            <strong>Danish level:</strong> {user.danishLevel}
          </p>

          <p>
            <strong>Native language:</strong> {user.nativeLanguage}
          </p>

          <p>
            <strong>Learning goals:</strong> {user.learningGoals}
          </p>

          <p>
            <strong>Topics:</strong>{" "}
            {user.topics && user.topics.length > 0
              ? user.topics.join(", ")
              : "No topics added"}
          </p>

          <p>
            <strong>Availability:</strong> {user.availability}
          </p>

          <p>
            <strong>Bio:</strong> {user.bio}
          </p>

          <button type="button" onClick={() => setIsEditing(true)}>
            Edit profile
          </button>
        </section>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="avatar">Avatar</label>
            <input
              id="avatar"
              name="avatar"
              type="text"
              value={formData.avatar}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="learner">Learner</option>
              <option value="native">Native speaker</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div>
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="danishLevel">Danish level</label>
            <input
              id="danishLevel"
              name="danishLevel"
              type="text"
              value={formData.danishLevel}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="nativeLanguage">Native language</label>
            <input
              id="nativeLanguage"
              name="nativeLanguage"
              type="text"
              value={formData.nativeLanguage}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="learningGoals">Learning goals</label>
            <textarea
              id="learningGoals"
              name="learningGoals"
              value={formData.learningGoals}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="topics">Topics</label>
            <input
              id="topics"
              name="topics"
              type="text"
              value={formData.topics}
              onChange={handleChange}
              placeholder="culture, food, travel"
            />
          </div>

          <div>
            <label htmlFor="availability">Availability</label>
            <input
              id="availability"
              name="availability"
              type="text"
              value={formData.availability}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Save profile</button>

          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      )}
    </main>
  );
}

export default MyProfile;
