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
  availability?: string[];
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

    return searchMatches && cityMatches && roleMatches && danishLevelMatches;
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
    <main>
      <header>
        <h1>Browse language partners</h1>
      </header>

      <section>
        <label>
          Search by name, city, or topic
          <input
            type="search"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Example: Maja, Copenhagen, food"
          />
        </label>

        <label>
          City
          <select value={cityFilter} onChange={handleCityChange}>
            {cityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Role
          <select value={roleFilter} onChange={handleRoleChange}>
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Danish level
          <select value={danishLevelFilter} onChange={handleDanishLevelChange}>
            {danishLevelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label || getDisplayLabel(option.value)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Availability
          <select value={availabilityFilter} onChange={handleAvailabilityChange}>
            {availabilityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label || getDisplayLabel(option.value)}
              </option>
            ))}
          </select>
        </label>

        <button type="button" onClick={handleResetFilters}>
          Reset filters
        </button>
      </section>

      <p>
        Showing {filteredUsers.length} of {availableUsers.length} users
      </p>

      {filteredUsers.length > 0 ? (
        <section>
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
    </main>
  );
}

export default BrowsePage;
