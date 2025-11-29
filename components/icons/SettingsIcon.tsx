"use client";

import type { SVGProps } from "react";

export function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M19.4 14.5a2 2 0 0 0 .4 2.2l.1.1a1.3 1.3 0 0 1-1 2.2h-1a2 2 0 0 0-1.9 1.4l-.2.6a1.3 1.3 0 0 1-2.4 0l-.2-.6A2 2 0 0 0 10 19h-1a1.3 1.3 0 0 1-1-2.2l.1-.1a2 2 0 0 0 .4-2.2 2 2 0 0 0-1.5-1.1l-.6-.1a1.3 1.3 0 0 1 0-2.4l.6-.2A2 2 0 0 0 8.1 7l-.1-.6a1.3 1.3 0 0 1 1.2-1.4h1A2 2 0 0 0 12 3.6l.2-.6a1.3 1.3 0 0 1 2.4 0l.2.6A2 2 0 0 0 16.8 5h1a1.3 1.3 0 0 1 1.2 1.4L19 7a2 2 0 0 0 1.3 2.3l.6.2a1.3 1.3 0 0 1 0 2.4l-.6.1a2 2 0 0 0-1 0.5Z" />
    </svg>
  );
}
