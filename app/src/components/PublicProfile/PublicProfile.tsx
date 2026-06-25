import { Link, useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import EmptyState from "../Shared/EmptyState";
import type { Match, SendMatchResult, User } from "../../types/types";
import {
  findMatchBetweenUsers,
  getConnectButtonLabel,
} from "../../utils/matchUtils";

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

function ProfileDetail({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <strong>{label}: </strong>
      <span>{value || "Not added yet"}</span>
    </div>
  );
}

function ProfileListSection({
  title,
  items,
  emptyMessage,
}: {
  title: string;
  items?: string[] | string;
  emptyMessage: string;
}) {
  const listItems = Array.isArray(items) ? items : items ? [items] : [];

  return (
    <section>
      <h2>{title}</h2>

      {listItems.length > 0 ? (
        <ul>
          {listItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{emptyMessage}</p>
      )}
    </section>
  );
}

function PublicProfile() {
  const { id } = useParams();
  const { users, matches, sendMatchRequest } = useApp() as AppContextValue;
  const { user: currentUser } = useAuth() as AuthContextValue;
  const profileUser = users.find((user) => user.id === id);

  if (!profileUser) {
    return (
      <main>
        <EmptyState
          title="User not found"
          message="This profile does not exist or may have been removed."
        />
      </main>
    );
  }

  const isOwnProfile = currentUser?.id === profileUser.id;

  const existingMatch = currentUser
    ? findMatchBetweenUsers(matches, currentUser.id, profileUser.id)
    : undefined;

  const connectButtonLabel = getConnectButtonLabel(existingMatch);

  const isConnectDisabled =
    isOwnProfile ||
    existingMatch?.status === "pending" ||
    existingMatch?.status === "accepted";

  function handleConnect() {
    if (!currentUser || !profileUser) {
      return;
    }

    sendMatchRequest(currentUser.id, profileUser.id);
  }

  return (
    <main>
      <Link to="/browse">Back to Browse</Link>

      <section>
        <div>
          <div>
            <span>{profileUser.avatar || profileUser.name.charAt(0)}</span>
          </div>

          <h1>{profileUser.name}</h1>
          <p>{profileUser.city || "City not added"}</p>
        </div>

        {currentUser ? (
          <button
            type="button"
            onClick={handleConnect}
            disabled={isConnectDisabled}
          >
            {isOwnProfile ? "This is your profile" : connectButtonLabel}
          </button>
        ) : (
          <Link to="/login">Log in to connect</Link>
        )}

        <section>
          <h2>Profile details</h2>

          <ProfileDetail label="Role" value={profileUser.role} />
          <ProfileDetail label="Danish level" value={profileUser.danishLevel} />
          <ProfileDetail
            label="Native language"
            value={profileUser.nativeLanguage}
          />
        </section>

        <section>
          <h2>About</h2>
          <p>{profileUser.bio || "No bio added yet."}</p>
        </section>

        <ProfileListSection
          title="Topics"
          items={profileUser.topics}
          emptyMessage="No topics added yet."
        />

        <ProfileListSection
          title="Learning goals"
          items={profileUser.learningGoals}
          emptyMessage="No learning goals added yet."
        />

        <ProfileListSection
          title="Availability"
          items={profileUser.availability}
          emptyMessage="No availability added yet."
        />
      </section>
    </main>
  );
}

export default PublicProfile;
