import type { User } from "@/types";

export const USER_STORAGE_KEY = "hyangyeon-user";

const USER_STORAGE_EVENT = "hyangyeon-user-change";

type StoredUser = Omit<User, "rewardReceived"> & {
  rewardReceived?: boolean;
};

export function isStoredUser(value: unknown): value is StoredUser {
  if (!value || typeof value !== "object") {
    return false;
  }

  const user = value as StoredUser;

  return (
    typeof user.studentId === "string" &&
    /^\d{8}$/.test(user.studentId) &&
    typeof user.name === "string" &&
    Array.isArray(user.stamps) &&
    user.stamps.every((stamp) => typeof stamp === "number") &&
    typeof user.isCompleted === "boolean" &&
    (user.rewardReceived === undefined ||
      typeof user.rewardReceived === "boolean")
  );
}

export function parseStoredUser(value: string | null): User | null {
  if (!value) {
    return null;
  }

  try {
    const storedUser: unknown = JSON.parse(value);
    return isStoredUser(storedUser)
      ? {
          ...storedUser,
          rewardReceived: storedUser.rewardReceived ?? false,
        }
      : null;
  } catch {
    return null;
  }
}

export function subscribeToStoredUser(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(USER_STORAGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(USER_STORAGE_EVENT, onStoreChange);
  };
}

export function getStoredUserSnapshot() {
  return localStorage.getItem(USER_STORAGE_KEY);
}

export const getServerStoredUserSnapshot = () => null;

export function saveStoredUser(user: User) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(USER_STORAGE_EVENT));
}
