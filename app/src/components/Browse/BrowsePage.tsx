import { useState } from "react";
import type { ChangeEvent } from "react";

import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import ProfileCard from "../ProfileCard/ProfileCard";
import type { ProfileCardUser } from "../ProfileCard/ProfileCard";
import EmptyState from "../Shared/EmptyState";

type UserRole = "learner" | "native" | "both";

type BrowseUser = {
  id: string;
  name: string;
  avatar?: string;
  city?: string;
  role?: UserRole;
  danishLevel?: string;
  topics?: string[];
  availability?: string;
  bio?: string;
};

type AppContextValue = {
  users: BrowseUser[];
};

type AuthContextValue = {
  user: BrowseUser | null;
};

type SelectOption = {
  value: string;
  label: string;
};

const allOption: SelectOption = {
  value: "all",
  label: "All",
};

const roleOptions: SelectOption[] = [
  allOption,
  { value: "learner", label: "Learner" },
  { value: "native", label: "Native speaker" },
  { value: "both", label: "Both" },
];

const danishLevelOptions: SelectOption[] = [
  allOption,
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "native", label: "Native" },
];

const availabilityOptions: SelectOption[] = [
  allOption,
  { value: "mornings", label: "Mornings" },
  { value: "evenings", label: "Evenings" },
  { value: "weekends", label: "Weekends" },
  { value: "flexible", label: "Flexible" },
];

const labelClass =
  "block text-[12px] font-extrabold tracking-[-0.01em] text-[#6E665C]";

const inputClass =
  "mt-2 w-full rounded-2xl border border-[#ECE6DD] bg-white px-4 py-3.5 text-[15px] font-semibold text-[#2B2A28] outline-none transition placeholder:text-[#A89F94] focus:border-[#E63946] focus:ring-4 focus:ring-[#FDEAEC]";

const selectClass =
  "w-full cursor-pointer appearance-none rounded-2xl border border-[#ECE6DD] bg-white py-3.5 pl-4 pr-10 text-[15px] font-semibold text-[#2B2A28] outline-none transition hover:border-[#E6DCCF] hover:bg-[#FBF7F1] focus:border-[#E63946] focus:ring-4 focus:ring-[#FDEAEC]";

function getDisplayLabel(value: string) {
  if (!value) {
    return "";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getCityOptions(users: BrowseUser[]): SelectOption[] {
  const cities = users
    .map((user) => user.city)
    .filter((city): city is string => Boolean(city));

  const uniqueCities = Array.from(new Set(cities)).sort();

  return [
    allOption,
    ...uniqueCities.map((city) => ({
      value: city,
      label: city,
    })),
  ];
}

function isCurrentUser(
  profileUser: BrowseUser,
  currentUser: BrowseUser | null
) {
  if (!currentUser) {
    return false;
  }

  return String(profileUser.id) === String(currentUser.id);
}

function matchesSearch(user: BrowseUser, searchTerm: string) {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  if (!normalizedSearch) {
    return true;
  }

  const name = user.name.toLowerCase();
  const city = user.city?.toLowerCase() ?? "";
  const topics = user.topics ?? [];

  const topicMatches = topics.some((topic) =>
    topic.toLowerCase().includes(normalizedSearch)
  );

  return (
    name.includes(normalizedSearch) ||
    city.includes(normalizedSearch) ||
    topicMatches
  );
}

function matchesFilter(userValue: string | undefined, selectedValue: string) {
  if (selectedValue === "all") {
    return true;
  }

  return userValue === selectedValue;
}

function toProfileCardUser(user: BrowseUser): ProfileCardUser {
  return {
    id: user.id,
    name: user.name,
    avatar: user.avatar ?? "",
    city: user.city ?? "Unknown city",
    role: user.role ?? "learner",
    danishLevel: user.danishLevel ?? "Not selected",
    topics: user.topics ?? [],
    bio: user.bio ?? "No bio yet.",
  };
}

function BrowsePage() {
  const { users } = useApp() as AppContextValue;
  const { user: currentUser } = useAuth() as AuthContextValue;

  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [danishLevelFilter, setDanishLevelFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const availableUsers = users.filter(
    (profileUser) => !isCurrentUser(profileUser, currentUser)
  );

  const cityOptions = getCityOptions(availableUsers);

  const filteredUsers = availableUsers.filter((profileUser) => {
    const searchMatches = matchesSearch(profileUser, searchTerm);
    const cityMatches = matchesFilter(profileUser.city, cityFilter);
    const roleMatches = matchesFilter(profileUser.role, roleFilter);
    const danishLevelMatches = matchesFilter(
      profileUser.danishLevel,
      danishLevelFilter
    );
    const availabilityMatches = matchesFilter(profileUser.availability, availabilityFilter);

    return searchMatches && cityMatches && roleMatches && danishLevelMatches && availabilityMatches;
  });

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleCityChange(event: ChangeEvent<HTMLSelectElement>) {
    setCityFilter(event.target.value);
  }

  function handleRoleChange(event: ChangeEvent<HTMLSelectElement>) {
    setRoleFilter(event.target.value);
  }

  function handleDanishLevelChange(event: ChangeEvent<HTMLSelectElement>) {
    setDanishLevelFilter(event.target.value);
  }

  function handleAvailabilityChange(event: ChangeEvent<HTMLSelectElement>) {
    setAvailabilityFilter(event.target.value);
  }

  function handleResetFilters() {
    setSearchTerm("");
    setCityFilter("all");
    setRoleFilter("all");
    setDanishLevelFilter("all");
    setAvailabilityFilter("all");
  }

  return (
    <main className="-m-8 min-h-[calc(100vh-8rem)] bg-background px-4 py-8 font-sans sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-6">
          <h1 className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-[#161616]">
            Browse language partners
          </h1>
        </header>

        <section
          aria-label="Search and filter"
          className="rounded-[18px] border border-[#EAE3D8] bg-white p-5 shadow-card sm:p-6"
        >
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <label
              htmlFor="search"
              className={`${labelClass} col-span-2 lg:col-span-4`}
            >
              Search by name, city, or topic
              <input
                type="search"
                id="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Example: Maja, Copenhagen, food"
                className={inputClass}
              />
            </label>

            <label className={labelClass}>
              City
              <div className="relative mt-2">
                <select
                  value={cityFilter}
                  onChange={handleCityChange}
                  className={selectClass}
                >
                  {cityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#A89F94]"
                >
                  ▾
                </span>
              </div>
            </label>

            <label className={labelClass}>
              Role
              <div className="relative mt-2">
                <select
                  value={roleFilter}
                  onChange={handleRoleChange}
                  className={selectClass}
                >
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#A89F94]"
                >
                  ▾
                </span>
              </div>
            </label>

            <label className={labelClass}>
              Danish level
              <div className="relative mt-2">
                <select
                  value={danishLevelFilter}
                  onChange={handleDanishLevelChange}
                  className={selectClass}
                >
                  {danishLevelOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label || getDisplayLabel(option.value)}
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#A89F94]"
                >
                  ▾
                </span>
              </div>
            </label>

            <label className={labelClass}>
              Availability
              <div className="relative mt-2">
                <select
                  value={availabilityFilter}
                  onChange={handleAvailabilityChange}
                  className={selectClass}
                >
                  {availabilityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label || getDisplayLabel(option.value)}
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#A89F94]"
                >
                  ▾
                </span>
              </div>
            </label>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleResetFilters}
              className="cursor-pointer rounded-full bg-[#ECE6DD] px-5 py-2.5 text-sm font-extrabold text-[#6E665C] transition hover:bg-[#F6F0E8] focus:outline-none focus:ring-4 focus:ring-[#FDEAEC] active:translate-y-px"
            >
              Reset filters
            </button>
          </div>
        </section>

        <p className="mt-4 text-sm font-semibold text-[#7C756B]">
          Showing {filteredUsers.length} of {availableUsers.length} users
        </p>

        {filteredUsers.length > 0 ? (
          <section
            aria-label="Language partners"
            className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredUsers.map((profileUser) => (
              <ProfileCard
                key={profileUser.id}
                user={toProfileCardUser(profileUser)}
                showViewProfileLink
              />
            ))}
          </section>
        ) : (
          <EmptyState
            title="No users found"
            message="Try changing your search or filters."
          />
        )}
      </div>
    </main>
  );
}

export default BrowsePage;
