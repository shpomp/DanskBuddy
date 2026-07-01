import { useState, useMemo } from "react";
import type { ChangeEvent } from "react";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import ProfileCard from "../ProfileCard/ProfileCard";
import type { ProfileCardUser } from "../ProfileCard/ProfileCard";
import EmptyState from "../Shared/EmptyState";
import StyledDropdown, { type SelectOption } from "../Shared/StyledDropdown";
import type { User } from "../../types/types";
import { Search } from "lucide-react";

type SendMatchResult =
  | {
      success: true;
      match: Match;
    }
  | {
      success: false;
      error: string;
    };

type AppContextValue = {
  users: User[];
  matches: Match[];
  sendMatchRequest: (
    requesterId: string,
    receiverId: string
  ) => SendMatchResult;
};

type AuthContextValue = {
  user: User | null;
};

type FilterName = "city" | "role" | "danishLevel" | "availability";

type MatchStatus = "pending" | "accepted" | "declined";

type Match = {
  id: string;
  requesterId: string;
  receiverId: string;
  status: MatchStatus;
  createdAt: string;
};

const allOption: SelectOption = {
  value: "all",
  label: "Alle",
};

const roleOptions: SelectOption[] = [
  allOption,
  { value: "learner", label: "Lærer dansk" },
  { value: "native", label: "Taler dansk" },
];

const danishLevelOptions: SelectOption[] = [
  allOption,
  { value: "a1", label: "A1" },
  { value: "a2", label: "A2" },
  { value: "b1", label: "B1" },
  { value: "b2", label: "B2" },
  { value: "c1", label: "C1" },
  { value: "c2", label: "C2" },
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

function getCityOptions(users: User[]): SelectOption[] {
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

function isCurrentUser(profileUser: User, currentUser: User | null) {
  if (!currentUser) {
    return false;
  }

  return String(profileUser.id) === String(currentUser.id);
}

function matchesSearch(user: User, searchTerm: string) {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  if (!normalizedSearch) {
    return true;
  }

  const name = user.name.toLowerCase();
  const interests = user.interests ?? [];

  const interestsMatches = interests.some((interests) =>
    interests.toLowerCase().includes(normalizedSearch)
  );

  return name.includes(normalizedSearch) || interestsMatches;
}

function matchesFilter(userValue: string | undefined, selectedValue: string) {
  if (selectedValue === "all") {
    return true;
  }

  return userValue === selectedValue;
}

function matchesArrayFilter(
  userValues: string[] | undefined,
  selectedValue: string
) {
  if (selectedValue === "all") {
    return true;
  }

  if (!userValues) {
    return false;
  }

  return userValues.includes(selectedValue);
}

function toProfileCardUser(user: User): ProfileCardUser {
  return {
    id: user.id,
    name: user.name,
    avatar: user.avatar ?? "",
    city: user.city ?? "Unknown city",
    role: user.role ?? "learner",
    danishLevel: user.danishLevel ?? "Not selected",
    interests: user.interests ?? [],
    bio: user.bio ?? "No bio yet.",
  };
}

function findMatchBetweenUsers(
  matches: Match[],
  currentUserId: string,
  profileUserId: string
) {
  return matches.find(
    (match) =>
      (match.requesterId === currentUserId &&
        match.receiverId === profileUserId) ||
      (match.requesterId === profileUserId &&
        match.receiverId === currentUserId)
  );
}

function getConnectButtonState(match: Match | undefined) {
  if (!match) {
    return {
      label: "Opret forbindelse",
      disabled: false,
    };
  }

  if (match.status === "pending") {
    return {
      label: "Afventer",
      disabled: true,
    };
  }

  if (match.status === "accepted") {
    return {
      label: "Forbundet",
      disabled: true,
    };
  }

  return {
    label: "Opret forbindelse",
    disabled: false,
  };
}

function BrowsePage() {
  const { users, matches, sendMatchRequest } = useApp() as AppContextValue;
  const { user: currentUser } = useAuth() as AuthContextValue;

  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [danishLevelFilter, setDanishLevelFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [openDropdown, setOpenDropdown] = useState<FilterName | "">("");

  const availableUsers = useMemo(() => {
    return users.filter(
      (profileUser) => !isCurrentUser(profileUser, currentUser)
    );
  }, [users, currentUser]);

  const cityOptions = useMemo(() => {
    return getCityOptions(availableUsers);
  }, [availableUsers]);

  const filteredUsers = useMemo(() => {
    return availableUsers.filter((profileUser) => {
      const searchMatches = matchesSearch(profileUser, searchTerm);
      const cityMatches = matchesFilter(profileUser.city, cityFilter);
      const roleMatches = matchesFilter(profileUser.role, roleFilter);
      const danishLevelMatches = matchesFilter(
        profileUser.danishLevel,
        danishLevelFilter
      );
      const availabilityMatches = matchesArrayFilter(
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
  }, [
    availableUsers,
    searchTerm,
    cityFilter,
    roleFilter,
    danishLevelFilter,
    availabilityFilter,
  ]);

  function handleConnect(profileUserId: string) {
    if (!currentUser) {
      return;
    }

    sendMatchRequest(currentUser.id, profileUserId);
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleDropdownChange(name: FilterName, value: string) {
    switch (name) {
      case "city":
        setCityFilter(value);
        break;
      case "role":
        setRoleFilter(value);
        break;
      case "danishLevel":
        setDanishLevelFilter(value);
        break;
      case "availability":
        setAvailabilityFilter(value);
        break;
      default:
        break;
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
    <main className="-m-8 min-h-[calc(100vh-8rem)] bg-background font-sans">
      <section
        aria-label="Search and filter"
        className="w-full border-b border-surface bg-white px-4 py-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-[#161616]">
              Hvem vil du møde?
            </h1>
            <label
              htmlFor="search"
              className={`relative w-full md:max-w-sm lg:max-w-md`}
            >
              <span className="sr-only">Søg efter interesser</span>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-light"
              />
              <input
                type="search"
                id="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Søg efter interesser"
                className="w-full rounded-pill border border-surface bg-surface-alt py-3 pl-11 pr-4 text-sm font-semibold text-foreground outline-none placeholder:text-neutral-light focus:border-primary focus:ring-4 focus:ring-primary-pale"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <label className={labelClass}>
              By
              <StyledDropdown
                name="city"
                value={cityFilter}
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
              Hvem vil du møde?
              <StyledDropdown
                name="role"
                value={roleFilter}
                options={roleOptions}
                isOpen={openDropdown === "role"}
                onToggle={() =>
                  setOpenDropdown(openDropdown === "role" ? "" : "role")
                }
                onSelect={handleDropdownChange}
                onClose={() => setOpenDropdown("")}
              />
            </label>

            <label className={labelClass}>
              Danskniveau
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
                onClose={() => setOpenDropdown("")}
              />
            </label>

            <label className={labelClass}>
              Tilgængelighed
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
                onClose={() => setOpenDropdown("")}
              />
            </label>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleResetFilters}
              className="cursor-pointer rounded-full bg-[#ECE6DD] px-5 py-2.5 text-sm font-extrabold text-[#6E665C] transition hover:bg-[#F6F0E8] focus:outline-none focus:ring-4 focus:ring-[#FDEAEC] active:translate-y-px"
            >
              Nulstil filtre
            </button>
          </div>
        </div>
      </section>

      <p className="mt-4 text-sm font-semibold text-[#7C756B]">
        Viser {filteredUsers.length} ud af {availableUsers.length} brugere
      </p>

      {filteredUsers.length > 0 ? (
        <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <section
            aria-label="Language partners"
            className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredUsers.map((profileUser) => {
              const existingMatch = currentUser
                ? findMatchBetweenUsers(matches, currentUser.id, profileUser.id)
                : undefined;

              const buttonState = getConnectButtonState(existingMatch);

              return (
                <ProfileCard
                  key={profileUser.id}
                  user={toProfileCardUser(profileUser)}
                  showViewProfileLink
                  actions={
                    <button
                      type="button"
                      onClick={() => handleConnect(profileUser.id)}
                      disabled={buttonState.disabled}
                      className="rounded-pill bg-primary px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {buttonState.label}
                    </button>
                  }
                />
              );
            })}
          </section>
        </div>
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
