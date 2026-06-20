import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

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

const fieldClass =
  "w-full bg-background border border-surface rounded-sm px-4 py-3 text-foreground text-sm placeholder:text-neutral-light focus:outline-none focus:border-primary transition-colors";

const fieldGroupClass = "flex flex-col gap-1.5";

const fieldLabelClass =
  "text-xs font-semibold text-neutral uppercase tracking-wide";

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

  const currentUser = user;

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

    setFormData(getFormDataFromUser(currentUser));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <h1 className="max-w-lg mx-auto text-2xl font-bold text-foreground mb-6">
        My Profile
      </h1>

      {message && (
        <p className="max-w-lg mx-auto mb-4 px-4 py-3 bg-success-light text-success-dark rounded-card text-sm font-medium">
          {message}
        </p>
      )}

      {!isEditing ? (
        <section className="max-w-lg mx-auto bg-surface-alt rounded-card shadow-card p-6">
          <p className="flex gap-3 py-3 border-b border-surface text-sm">
            <strong className="text-neutral font-medium w-36 shrink-0">
              Avatar:
            </strong>
            {user.avatar || "No avatar"}
          </p>

          <p className="flex gap-3 py-3 border-b border-surface text-sm">
            <strong className="text-neutral font-medium w-36 shrink-0">
              Name:
            </strong>
            {user.name}
          </p>

          <p className="flex gap-3 py-3 border-b border-surface text-sm">
            <strong className="text-neutral font-medium w-36 shrink-0">
              Email:
            </strong>
            {user.email}
          </p>

          <p className="flex gap-3 py-3 border-b border-surface text-sm">
            <strong className="text-neutral font-medium w-36 shrink-0">
              Role:
            </strong>
            {user.role}
          </p>

          <p className="flex gap-3 py-3 border-b border-surface text-sm">
            <strong className="text-neutral font-medium w-36 shrink-0">
              City:
            </strong>
            {user.city}
          </p>

          <p className="flex gap-3 py-3 border-b border-surface text-sm">
            <strong className="text-neutral font-medium w-36 shrink-0">
              Danish level:
            </strong>
            {user.danishLevel}
          </p>

          <p className="flex gap-3 py-3 border-b border-surface text-sm">
            <strong className="text-neutral font-medium w-36 shrink-0">
              Native language:
            </strong>
            {user.nativeLanguage}
          </p>

          <p className="flex gap-3 py-3 border-b border-surface text-sm">
            <strong className="text-neutral font-medium w-36 shrink-0">
              Learning goals:
            </strong>
            {user.learningGoals}
          </p>

          <p className="flex gap-3 py-3 border-b border-surface text-sm">
            <strong className="text-neutral font-medium w-36 shrink-0">
              Topics:
            </strong>{" "}
            {user.topics && user.topics.length > 0
              ? user.topics.join(", ")
              : "No topics added"}
          </p>

          <p className="flex gap-3 py-3 border-b border-surface text-sm">
            <strong className="text-neutral font-medium w-36 shrink-0">
              Availability:
            </strong>
            {user.availability}
          </p>

          <p className="flex gap-3 py-3 text-sm">
            <strong className="text-neutral font-medium w-36 shrink-0">
              Bio:
            </strong>
            {user.bio}
          </p>

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="mt-6 w-full bg-primary text-white font-semibold py-3 rounded-pill shadow-primary hover:bg-primary-dark transition-colors text-sm cursor-pointer"
          >
            Edit profile
          </button>
        </section>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-surface-alt rounded-card shadow-elevated p-6 space-y-4"
        >
          <div className={fieldGroupClass}>
            <label htmlFor="avatar" className={fieldLabelClass}>
              Avatar
            </label>
            <input
              id="avatar"
              name="avatar"
              type="text"
              value={formData.avatar}
              onChange={handleChange}
              className={fieldClass}
            />
          </div>

          <div className={fieldGroupClass}>
            <label htmlFor="name" className={fieldLabelClass}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className={fieldClass}
            />
          </div>

          <div className={fieldGroupClass}>
            <label htmlFor="email" className={fieldLabelClass}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={fieldClass}
            />
          </div>

          <div className={fieldGroupClass}>
            <label htmlFor="role" className={fieldLabelClass}>
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={fieldClass}
            >
              <option value="learner">Learner</option>
              <option value="native">Native speaker</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div className={fieldGroupClass}>
            <label htmlFor="city" className={fieldLabelClass}>
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              className={fieldClass}
            />
          </div>

          <div className={fieldGroupClass}>
            <label htmlFor="danishLevel" className={fieldLabelClass}>
              Danish level
            </label>
            <input
              id="danishLevel"
              name="danishLevel"
              type="text"
              value={formData.danishLevel}
              onChange={handleChange}
              className={fieldClass}
            />
          </div>

          <div className={fieldGroupClass}>
            <label htmlFor="nativeLanguage" className={fieldLabelClass}>
              Native language
            </label>
            <input
              id="nativeLanguage"
              name="nativeLanguage"
              type="text"
              value={formData.nativeLanguage}
              onChange={handleChange}
              className={fieldClass}
            />
          </div>

          <div className={fieldGroupClass}>
            <label htmlFor="learningGoals" className={fieldLabelClass}>
              Learning goals
            </label>
            <textarea
              id="learningGoals"
              name="learningGoals"
              value={formData.learningGoals}
              onChange={handleChange}
              rows={3}
              className={fieldClass}
            />
          </div>

          <div className={fieldGroupClass}>
            <label htmlFor="topics" className={fieldLabelClass}>
              Topics
            </label>
            <input
              id="topics"
              name="topics"
              type="text"
              value={formData.topics}
              onChange={handleChange}
              placeholder="culture, food, travel"
              className={fieldClass}
            />
          </div>

          <div className={fieldGroupClass}>
            <label htmlFor="availability" className={fieldLabelClass}>
              Availability
            </label>
            <input
              id="availability"
              name="availability"
              type="text"
              value={formData.availability}
              onChange={handleChange}
              className={fieldClass}
            />
          </div>

          <div className={fieldGroupClass}>
            <label htmlFor="bio" className={fieldLabelClass}>
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className={fieldClass}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 rounded-pill shadow-primary hover:bg-primary-dark transition-colors text-sm cursor-pointer"
          >
            Save profile
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="w-full bg-surface text-neutral font-medium py-3 rounded-pill hover:bg-surface-alt transition-colors text-sm cursor-pointer"
          >
            Cancel
          </button>
        </form>
      )}
    </main>
  );
}

export default MyProfile;
