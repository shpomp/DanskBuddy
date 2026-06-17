import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, hashPassword } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";

const roleOptions = [
  { value: "learner", label: "Learner" },
  { value: "native", label: "Native speaker" },
  { value: "both", label: "Both" },
];

const avatarOptions = [
  { value: "🙂", label: "🙂 Friendly" },
  { value: "👩", label: "👩 Woman" },
  { value: "👨", label: "👨 Man" },
  { value: "👩‍🦰", label: "👩‍🦰 Red hair" },
  { value: "👨‍🦱", label: "👨‍🦱 Curly hair" },
  { value: "👩‍🦳", label: "👩‍🦳 Older woman" },
  { value: "🧑", label: "🧑 Person" },
];

const cityOptions = [
  { value: "Copenhagen", label: "Copenhagen" },
  { value: "Aarhus", label: "Aarhus" },
  { value: "Odense", label: "Odense" },
  { value: "Other", label: "Other" },
];

const danishLevelOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "native", label: "Native" },
];

const availabilityOptions = [
  { value: "weekends", label: "Weekends" },
  { value: "evenings", label: "Evenings" },
  { value: "weekdays", label: "Weekdays" },
  { value: "mornings", label: "Mornings" },
  { value: "flexible", label: "Flexible" },
];

function StyledDropdown({ name, value, options, isOpen, onToggle, onSelect }) {
  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  return (
    <div className="relative mt-2">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-2xl border border-[#ECE6DD] bg-white px-4 py-3.5 text-left text-[15px] font-semibold text-[#2B2A28] outline-none transition hover:border-[#E6DCCF] hover:bg-[#FBF7F1] focus:border-[#E63946] focus:ring-4 focus:ring-[#FDEAEC]"
      >
        <span>{selectedOption.label}</span>
        <span
          aria-hidden="true"
          className={`text-[#A89F94] transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-[#EFE8DD] bg-white p-1.5 shadow-[0_18px_32px_-18px_rgba(43,42,40,0.45)]">
          <div role="listbox" aria-label={name} className="max-h-56 overflow-auto">
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => onSelect(name, option.value)}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-bold transition ${
                    isSelected
                      ? "bg-[#FDEAEC] text-[#D62F3C]"
                      : "text-[#6E665C] hover:bg-[#F6F0E8] hover:text-[#2B2A28]"
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <span className="text-[#E63946]">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

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
  const [openDropdown, setOpenDropdown] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleDropdownChange(name, value) {
    setFormData({
      ...formData,
      [name]: value,
    });
    setOpenDropdown("");
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

  const fieldClass =
    "mt-2 w-full rounded-2xl border border-[#ECE6DD] bg-white px-4 py-3.5 text-[15px] font-semibold text-[#2B2A28] outline-none transition placeholder:text-[#A89F94] focus:border-[#E63946] focus:ring-4 focus:ring-[#FDEAEC]";
  const labelClass =
    "block text-[12px] font-extrabold tracking-[-0.01em] text-[#6E665C]";

  return (
    <section className="-m-8 min-h-[calc(100vh-8rem)] bg-[#F4EFE8] px-4 py-8 font-sans text-[#2B2A28] sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl overflow-hidden rounded-[18px] border border-[#EAE3D8] bg-white shadow-[0_32px_64px_-24px_rgba(33,30,28,0.40),0_8px_20px_-12px_rgba(33,30,28,0.28)]">
        <aside className="hidden w-[44%] flex-col justify-between bg-gradient-to-br from-[#E63946] via-[#F05258] to-[#F4A261] p-10 text-white lg:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <span className="relative block h-8 w-8 rounded-full bg-white/25">
              <span className="absolute left-1/2 top-0 h-full w-1.5 -translate-x-1/2 bg-white" />
              <span className="absolute left-0 top-1/2 h-1.5 w-full -translate-y-1/2 bg-white" />
            </span>
          </div>

          <div className="flex max-w-xs flex-col gap-4 pb-4">
            <span className="h-3 w-40 rounded-full bg-white/85" />
            <span className="h-3 w-56 rounded-full bg-white/50" />
            <span className="h-3 w-44 rounded-full bg-white/50" />
            <div className="mt-6 flex flex-col gap-3">
              <span className="h-6 w-36 rounded-full bg-white/25" />
              <span className="h-6 w-44 rounded-full bg-white/25" />
              <span className="h-6 w-40 rounded-full bg-white/25" />
            </div>
          </div>
        </aside>

        <div className="flex w-full items-start justify-center bg-white px-5 py-8 sm:px-8 md:py-12 lg:w-[56%] lg:px-16">
          <form onSubmit={handleRegister} className="w-full max-w-[380px]">
            <h1 className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-[#161616]">
              Create account
            </h1>

            {error && (
              <p
                role="alert"
                className="mt-5 rounded-2xl border border-[#F4C9CD] bg-[#FDEAEC] px-4 py-3 text-sm font-bold text-[#B0202C]"
              >
                {error}
              </p>
            )}

            <div className="mt-8 space-y-4">
              <label className={labelClass}>
                Name
                <input
                  name="name"
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className={fieldClass}
                />
              </label>

              <label className={labelClass}>
                Email
                <input
                  name="email"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                  className={fieldClass}
                />
              </label>

              <label className={labelClass}>
                Password
                <input
                  name="password"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className={fieldClass}
                />
              </label>

              <label className={labelClass}>
                Role
                <StyledDropdown
                  name="role"
                  value={formData.role}
                  options={roleOptions}
                  isOpen={openDropdown === "role"}
                  onToggle={() =>
                    setOpenDropdown(openDropdown === "role" ? "" : "role")
                  }
                  onSelect={handleDropdownChange}
                />
              </label>

              <label className={labelClass}>
                Avatar
                <StyledDropdown
                  name="avatar"
                  value={formData.avatar}
                  options={avatarOptions}
                  isOpen={openDropdown === "avatar"}
                  onToggle={() =>
                    setOpenDropdown(openDropdown === "avatar" ? "" : "avatar")
                  }
                  onSelect={handleDropdownChange}
                />
              </label>

              <label className={labelClass}>
                City
                <StyledDropdown
                  name="city"
                  value={formData.city}
                  options={cityOptions}
                  isOpen={openDropdown === "city"}
                  onToggle={() =>
                    setOpenDropdown(openDropdown === "city" ? "" : "city")
                  }
                  onSelect={handleDropdownChange}
                />
              </label>

              <label className={labelClass}>
                Danish level
                <StyledDropdown
                  name="danishLevel"
                  value={formData.danishLevel}
                  options={danishLevelOptions}
                  isOpen={openDropdown === "danishLevel"}
                  onToggle={() =>
                    setOpenDropdown(
                      openDropdown === "danishLevel" ? "" : "danishLevel"
                    )
                  }
                  onSelect={handleDropdownChange}
                />
              </label>

              <label className={labelClass}>
                Native language
                <input
                  name="nativeLanguage"
                  id="nativeLanguage"
                  type="text"
                  value={formData.nativeLanguage}
                  onChange={handleChange}
                  required
                  className={fieldClass}
                />
              </label>

              <label className={labelClass}>
                Learning goals
                <input
                  name="learningGoals"
                  id="learningGoals"
                  type="text"
                  value={formData.learningGoals}
                  onChange={handleChange}
                  placeholder="Example: Improve conversational Danish"
                  className={fieldClass}
                />
              </label>

              <label className={labelClass}>
                Availability
                <StyledDropdown
                  name="availability"
                  value={formData.availability}
                  options={availabilityOptions}
                  isOpen={openDropdown === "availability"}
                  onToggle={() =>
                    setOpenDropdown(
                      openDropdown === "availability" ? "" : "availability"
                    )
                  }
                  onSelect={handleDropdownChange}
                />
              </label>

              <label className={labelClass}>
                Bio
                <textarea
                  name="bio"
                  id="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell others a little about yourself"
                  className={`${fieldClass} min-h-28 resize-y`}
                />
              </label>

              <label className={labelClass}>
                Topics
                <input
                  name="topics"
                  id="topics"
                  type="text"
                  value={formData.topicsText}
                  onChange={handleChange}
                  placeholder="culture, food, travel"
                  className={fieldClass}
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-[#E63946] px-6 py-3.5 text-[15px] font-extrabold text-white shadow-[0_14px_24px_-12px_rgba(230,57,70,0.75)] transition hover:bg-[#D62F3C] focus:outline-none focus:ring-4 focus:ring-[#FAD2D5] active:translate-y-px"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
