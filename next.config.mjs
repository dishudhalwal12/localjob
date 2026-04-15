function pickEnv(...values) {
  return values.find((value) => typeof value === "string" && value.trim().length > 0) ?? "";
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Support legacy Vite-style Firebase keys when this project is run as a Next.js app.
    NEXT_PUBLIC_FIREBASE_API_KEY: pickEnv(
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      process.env.VITE_FIREBASE_API_KEY,
    ),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: pickEnv(
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      process.env.VITE_FIREBASE_AUTH_DOMAIN,
    ),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: pickEnv(
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      process.env.VITE_FIREBASE_PROJECT_ID,
    ),
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: pickEnv(
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      process.env.VITE_FIREBASE_STORAGE_BUCKET,
    ),
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      pickEnv(
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      ),
    NEXT_PUBLIC_FIREBASE_APP_ID: pickEnv(
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      process.env.VITE_FIREBASE_APP_ID,
    ),
  },
};

export default nextConfig;
