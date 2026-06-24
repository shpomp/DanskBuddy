import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, hashPassword } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import StyledDropdown from "../Shared/StyledDropdown";

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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleDropdownChange(name, value) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setOpenDropdown("");
  }

  async function handleRegister(event) {
    event.preventDefault();
    setError("");

    const rawPassword = formData.password;
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

    const loginResult = await login(formData.email, rawPassword);

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
          <div className="flex items-center gap-3">
            <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-[12px] bg-[#F06A73]">
              <span className="absolute left-1/2 top-0 h-full w-[7px] -translate-x-1/2 bg-white" />
              <span className="absolute left-0 top-1/2 h-[7px] w-full -translate-y-1/2 bg-white" />
            </span>
          </div>

          <div className="max-w-xs pb-4">
            <h2 className="text-[36px] font-extrabold leading-[0.98] tracking-[-0.03em]">
              Join in under a minute.
            </h2>
            <p className="mt-5 text-[16px] font-semibold leading-relaxed text-[rgb(255,227,214)]">
              Tell us your level and interests, we will match you with the right
              partners from day one.
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <span className="flex items-center gap-3 text-[15px] font-bold">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.22)] text-[#FFFFFF]">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                </span>
                Quick to start
              </span>
              <span className="flex items-center gap-3 text-[15px] font-bold">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.22)] text-[#FFFFFF]">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                </span>
                Verified community
              </span>
              <span className="flex items-center gap-3 text-[15px] font-bold">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(255,255,255,0.22)] text-[#FFFFFF]">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 4 4 10-10" />
                  </svg>
                </span>
                Real meetups near you
              </span>
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
              <fieldset>
                <legend className="text-[16px] font-extrabold tracking-[-0.01em] text-[#A89F94]">
                  I am
                </legend>
                <div className="mt-2 flex rounded-full bg-[#F6F0E8] p-1">
                  {roleOptions.map((option) => {
                    const isSelected = formData.role === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() =>
                          handleDropdownChange("role", option.value)
                        }
                        className={`min-w-0 flex-1 cursor-pointer whitespace-nowrap rounded-full px-2 py-3 text-center text-[11px] font-extrabold transition focus:outline-none focus:ring-4 focus:ring-[#FDEAEC] min-[380px]:text-[12px] sm:px-4 sm:text-[13px] ${
                          isSelected
                            ? "bg-[#E63946] text-white shadow-[0_10px_18px_-12px_rgba(230,57,70,0.75)]"
                            : "text-[#6E665C] hover:bg-[#EFE8DD] active:bg-[#E6DCCF]"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <label className={labelClass}>
                Name
                <input
                  name="name"
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Maria Holm"
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
                  placeholder="maria@email.dk"
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
                  placeholder="••••••••"
                  required
                  className={fieldClass}
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
                  onClose={() => setOpenDropdown("")}
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
                  onClose={() => setOpenDropdown("")}
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
                  onClose={() => setOpenDropdown("")}
                />
              </label>

              <label className={labelClass}>
                Native language
                <input
                  name="nativeLanguage"
                  id="nativeLanguage"
                  type="text"
                  placeholder="English"
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
                  onClose={() => setOpenDropdown("")}
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
              className="mt-6 w-full cursor-pointer rounded-full bg-[#E63946] px-6 py-3.5 text-[15px] font-extrabold text-white shadow-[0_14px_24px_-12px_rgba(230,57,70,0.75)] transition hover:bg-[#D62F3C] focus:outline-none focus:ring-4 focus:ring-[#FAD2D5] active:translate-y-px"
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
