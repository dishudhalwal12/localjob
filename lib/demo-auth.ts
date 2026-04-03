export interface DemoUser {
  uid: string;
  email: string;
}

interface DemoAccount extends DemoUser {
  password: string;
}

const DEMO_ACCOUNTS_KEY = "localjob-demo-accounts";
const DEMO_SESSION_KEY = "localjob-demo-session";
const DEMO_AUTH_EVENT = "localjob-demo-auth-change";

function isBrowser() {
  return typeof window !== "undefined";
}

function emitAuthChange() {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(new CustomEvent(DEMO_AUTH_EVENT));
}

function readAccounts() {
  if (!isBrowser()) {
    return [] as DemoAccount[];
  }

  const rawAccounts = window.localStorage.getItem(DEMO_ACCOUNTS_KEY);

  if (!rawAccounts) {
    return [] as DemoAccount[];
  }

  try {
    const parsedAccounts = JSON.parse(rawAccounts) as DemoAccount[];
    return Array.isArray(parsedAccounts) ? parsedAccounts : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: DemoAccount[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(DEMO_ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function getDemoUser() {
  if (!isBrowser()) {
    return null;
  }

  const rawUser = window.localStorage.getItem(DEMO_SESSION_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as DemoUser;
  } catch {
    return null;
  }
}

function setDemoUser(user: DemoUser | null) {
  if (!isBrowser()) {
    return;
  }

  if (user) {
    window.localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(DEMO_SESSION_KEY);
  }

  emitAuthChange();
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function validateCredentials(email: string, password: string) {
  if (!normalizeEmail(email) || !normalizeEmail(email).includes("@")) {
    throw new Error("Enter a valid email address.");
  }

  if (password.length < 6) {
    throw new Error("Use a password with at least 6 characters.");
  }
}

function createUserId() {
  return `demo-user-${Math.random().toString(36).slice(2, 10)}`;
}

export async function signUpDemo(email: string, password: string) {
  validateCredentials(email, password);

  const normalizedEmail = normalizeEmail(email);
  const accounts = readAccounts();

  if (accounts.some((account) => account.email === normalizedEmail)) {
    throw new Error("This demo account already exists. Log in instead.");
  }

  const nextAccount: DemoAccount = {
    uid: createUserId(),
    email: normalizedEmail,
    password,
  };

  writeAccounts([...accounts, nextAccount]);
  setDemoUser({ uid: nextAccount.uid, email: nextAccount.email });

  return { uid: nextAccount.uid, email: nextAccount.email } satisfies DemoUser;
}

export async function signInDemo(email: string, password: string) {
  validateCredentials(email, password);

  const normalizedEmail = normalizeEmail(email);
  const accounts = readAccounts();
  const account = accounts.find((entry) => entry.email === normalizedEmail);

  if (!account) {
    const nextAccount: DemoAccount = {
      uid: createUserId(),
      email: normalizedEmail,
      password,
    };

    writeAccounts([...accounts, nextAccount]);
    const nextUser = { uid: nextAccount.uid, email: nextAccount.email };
    setDemoUser(nextUser);
    return nextUser satisfies DemoUser;
  }

  if (account.password !== password) {
    throw new Error("Incorrect password for this demo account.");
  }

  const user = { uid: account.uid, email: account.email };
  setDemoUser(user);
  return user satisfies DemoUser;
}

export async function signOutDemo() {
  setDemoUser(null);
}

export function subscribeToDemoAuth(callback: (user: DemoUser | null) => void) {
  callback(getDemoUser());

  if (!isBrowser()) {
    return () => undefined;
  }

  const handleAuthChange = () => callback(getDemoUser());
  const handleStorage = (event: StorageEvent) => {
    if (!event.key || event.key === DEMO_SESSION_KEY) {
      handleAuthChange();
    }
  };

  window.addEventListener(DEMO_AUTH_EVENT, handleAuthChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(DEMO_AUTH_EVENT, handleAuthChange);
    window.removeEventListener("storage", handleStorage);
  };
}
