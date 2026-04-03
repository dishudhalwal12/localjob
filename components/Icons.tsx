import type { ComponentProps } from "react";

type IconProps = ComponentProps<"svg">;

export function SparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 1.5L14.5 9.5L22.5 12L14.5 14.5L12 22.5L9.5 14.5L1.5 12L9.5 9.5L12 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ToolsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
      <path
        d="M11 35.5L22.5 24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M19 13.5C19 17.6 15.6 21 11.5 21C10.8 21 10.1 20.9 9.5 20.7L6 24.2L10.5 28.7L14 25.2C14.8 25.5 15.6 25.7 16.5 25.7C20.6 25.7 24 22.3 24 18.2C24 16.5 23.4 14.9 22.4 13.7L19 17.1V13.5Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M26 12L36 22M33.5 9.5L38.5 14.5M24.5 23.5L13.5 34.5C12.1 35.9 12.1 38.1 13.5 39.5C14.9 40.9 17.1 40.9 18.5 39.5L29.5 28.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M16 16L21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ProfileIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 19C6.2 15.8 8.7 14.2 12 14.2C15.3 14.2 17.8 15.8 19 19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.8 4.5L10.2 4C10.8 3.9 11.4 4.2 11.6 4.7L12.8 7.8C13 8.3 12.9 8.9 12.4 9.3L10.9 10.6C11.8 12.4 13.2 13.8 15 14.7L16.3 13.2C16.7 12.7 17.3 12.6 17.8 12.8L20.9 14C21.4 14.2 21.7 14.8 21.6 15.4L21.1 17.8C21 18.4 20.5 18.8 19.9 18.8C10.7 18.8 5.2 13.3 5.2 4.1C5.2 3.5 5.6 3 6.2 2.9L7.8 4.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LocationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 21C15.9 16.8 18 13.6 18 10.5C18 7 15.3 4.2 12 4.2C8.7 4.2 6 7 6 10.5C6 13.6 8.1 16.8 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.2" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 7H20M4 12H20M4 17H20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 21C16.97 21 21 17.19 21 12.5C21 7.81 16.97 4 12 4C7.03 4 3 7.81 3 12.5C3 14.1 3.46 15.61 4.27 16.9L3.5 20.5L7.3 19.66C8.65 20.52 10.27 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.7 9.4C9.9 9 10.1 8.9 10.4 8.9H10.9C11.1 8.9 11.3 9 11.4 9.3L12 10.7C12.1 11 12 11.2 11.8 11.4L11.2 12C11.6 12.8 12.2 13.4 13 13.8L13.6 13.2C13.8 13 14 12.9 14.3 13L15.7 13.6C16 13.7 16.1 13.9 16.1 14.1V14.6C16.1 14.9 16 15.1 15.6 15.3C15.2 15.5 14.7 15.5 14.2 15.4C11.7 14.8 9.2 12.3 8.6 9.8C8.5 9.3 8.5 8.8 8.7 8.4C8.9 8 9.2 7.9 9.7 9.4Z"
        fill="currentColor"
      />
    </svg>
  );
}
