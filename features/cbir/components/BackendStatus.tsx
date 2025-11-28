"use client";

import { useBackendHealth } from "../hooks/useBackendHealth";

export function BackendStatus() {
  const { healthStatus, countdown } = useBackendHealth(60000);

  return (
    <div className="inline-flex items-center gap-2 sm:gap-3 bg-white px-3 sm:px-4 py-2 rounded-full border border-gray-200 text-xs sm:text-sm">
      <div className="relative shrink-0 w-2.5 h-2.5 sm:w-3 sm:h-3">
        <span
          className={`
            absolute inset-0 rounded-full
            ${
              healthStatus === "online"
                ? "bg-green-500"
                : healthStatus === "checking"
                ? "bg-yellow-400 animate-pulse"
                : "bg-red-500"
            }
          `}
        />
        {healthStatus === "online" && (
          <span className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping" />
        )}
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="text-gray-700 font-medium whitespace-nowrap">
          {healthStatus === "online" && "Backend Online"}
          {healthStatus === "checking" && "Verificando..."}
          {healthStatus === "offline" && "Backend Offline"}
        </span>
        {healthStatus !== "online" && (
          <>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="text-gray-500 tabular-nums">{countdown}s</span>
          </>
        )}
      </div>
    </div>
  );
}
