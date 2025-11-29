"use client";

import { useBackendHealth } from "../hooks/useBackendHealth";

export function BackendStatus() {
  const { healthStatusGlobal, v12Online, v3Online, countdown } =
    useBackendHealth(60000);

  const bgColor =
    healthStatusGlobal === "online"
      ? "bg-green-500"
      : healthStatusGlobal === "partial"
      ? "bg-yellow-400"
      : healthStatusGlobal === "checking"
      ? "bg-yellow-400 animate-pulse"
      : "bg-red-500";

  return (
    <div className="inline-flex items-center gap-2 sm:gap-3 bg-white px-3 sm:px-4 py-2 rounded-full border border-gray-200 text-xs sm:text-sm">
      <div className="relative shrink-0 w-2.5 h-2.5 sm:w-3 sm:h-3">
        <span className={`absolute inset-0 rounded-full ${bgColor}`} />
        {healthStatusGlobal === "online" && (
          <span className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping" />
        )}
      </div>

      <div className="flex flex-row gap-2 sm:flex-row sm:items-center sm:gap-2">
        <span className="text-gray-700 font-medium whitespace-nowrap">
          {healthStatusGlobal === "online" && "Backends Online"}
          {healthStatusGlobal === "partial" && "Backend Parcial"}
          {healthStatusGlobal === "checking" && "Verificando..."}
          {healthStatusGlobal === "offline" && "Backends Offline"}
        </span>

        <div className="flex items-center gap-2">
          <span className="text-gray-500 whitespace-nowrap">
            <span className={v12Online ? "text-green-600" : "text-red-600"}>
              v1/v2
            </span>
            : {v12Online ? "OK" : "Off"}
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-500 whitespace-nowrap">
            <span className={v3Online ? "text-green-600" : "text-red-600"}>
              v3
            </span>
            : {v3Online ? "OK" : "Off"}
          </span>
        </div>

        {healthStatusGlobal !== "online" && (
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="text-gray-500 tabular-nums">{countdown}s</span>
          </div>
        )}
      </div>
    </div>
  );
}
