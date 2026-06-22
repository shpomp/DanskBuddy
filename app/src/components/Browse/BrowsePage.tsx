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

type FilterName = "city" | "role" | "danishLevel" | "availability";

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

function StyledDropdown({
  name,
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
}: {
  name: FilterName;
  value: string;
  options: SelectOption[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (name: FilterName, value: string) => void;
}) {
  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  return (
    <div className="relative mt-2">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-[#ECE6DD] bg-white px-4 py-3.5 text-left text-[15px] font-semibold text-[#2B2A28] outline-none transition hover:border-[#E6DCCF] hover:bg-[#FBF7F1] focus:border-[#E63946] focus:ring-4 focus:ring-[#FDEAEC] active:bg-[#F6F0E8]"
      >
        <span>{selectedOption.label}</span>
        <span
          aria-hidden="true"
          className={`text-[#A89F94] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-[#EFE8DD] bg-white p-1.5 shadow-[0_18px_32px_-18px_rgba(43,42,40,0.45)]">
          <div
            role="listbox"
            aria-label={name}
            className="max-h-56 overflow-auto"
          >
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => onSelect(name, option.value)}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-bold transition ${
                    isSelected
                      ? "bg-[#FDEAEC] text-[#D62F3C]"
                      : "text-[#6E665C] hover:bg-[#F6F0E8] hover:text-[#2B2A28]"
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-[#E63946]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function BrowsePage() {
  const { users } = useApp() as AppContextValue;
  const { user: currentUser } = useAuth() as AuthContextValue;

  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [danishLevelFilter, setDanishLevelFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [openDropdown, setOpenDropdown] = useState<FilterName | "">("");

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
    const availabilityMatches = matchesFilter(
      profileUser.availability,
      availabilityFilter
    );

    return (
      searchMatches &&
      cityMatches &&
      roleMatches &&
      danishLevelMatches &&
      availabilityMatches
    );
  });

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleDropdownChange(name: FilterName, value: string) {
    if (name === "city") {
      setCityFilter(value);
    }

    if (name === "role") {
      setRoleFilter(value);
    }

    if (name === "danishLevel") {
      setDanishLevelFilter(value);
    }

    if (name === "availability") {
      setAvailabilityFilter(value);
    }

    setOpenDropdown("");
  }

  function handleResetFilters() {
    setSearchTerm("");
    setCityFilter("all");
    setRoleFilter("all");
    setDanishLevelFilter("all");
    setAvailabilityFilter("all");
    setOpenDropdown("");
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
              <StyledDropdown
                name="city"
                value={cityFilter}
                options={cityOptions}
                isOpen={openDropdown === "city"}
                onToggle={() =>
                  setOpenDropdown(openDropdown === "city" ? "" : "city")
                }
                onSelect={handleDropdownChange}
              />
            </label>

            <label className={labelClass}>
              Role
              <StyledDropdown
                name="role"
                value={roleFilter}
                options={roleOptions}
                isOpen={openDropdown === "role"}
                onToggle={() =>
                  setOpenDropdown(openDropdown === "role" ? "" : "role")
                }
                onSelect={handleDropdownChange}
              />
            </label>

            <label className={labelClass}>
              Danish level
              <StyledDropdown
                name="danishLevel"
                value={danishLevelFilter}
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
              Availability
              <StyledDropdown
                name="availability"
                value={availabilityFilter}
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
