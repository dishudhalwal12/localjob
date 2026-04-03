"use client";

import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "18px",
          border: "1px solid rgba(28, 28, 28, 0.08)",
          background: "#ffffff",
          color: "#1c1c1c",
          padding: "14px 16px",
        },
        success: {
          iconTheme: {
            primary: "#e8162b",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}
