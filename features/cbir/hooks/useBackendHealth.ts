import { useState, useEffect } from "react";
import type { HealthStatus } from "../types/cbirTypes";
import { cbirService } from "../services/cbirService";

export function useBackendHealth(intervalMs: number = 60000) {
  const [healthStatus, setHealthStatus] = useState<HealthStatus>("checking");
  const [countdown, setCountdown] = useState<number>(intervalMs / 1000);

  async function checkHealth() {
    setHealthStatus("checking");
    const isHealthy = await cbirService.checkHealth();
    setHealthStatus(isHealthy ? "online" : "offline");
  }

  useEffect(() => {
    checkHealth();
    setCountdown(intervalMs / 1000);

    const intervalHealth = setInterval(() => {
      checkHealth();
      setCountdown(intervalMs / 1000);
    }, intervalMs);

    const intervalCountdown = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(intervalHealth);
      clearInterval(intervalCountdown);
    };
  }, [intervalMs]);

  return { healthStatus, countdown };
}
