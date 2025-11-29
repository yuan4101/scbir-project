import { useState, useEffect } from "react";
import { cbirService } from "../services/cbirService";

type HealthStatusGlobal = "checking" | "online" | "partial" | "offline";

export function useBackendHealth(intervalMs: number = 60000) {
  const [healthStatusGlobal, setHealthStatusGlobal] =
    useState<HealthStatusGlobal>("checking");
  const [v12Online, setV12Online] = useState<boolean>(false);
  const [v3Online, setV3Online] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(intervalMs / 1000);

  async function checkHealth() {
    setHealthStatusGlobal("checking");

    const { v12Healthy, v3Healthy } = await cbirService.checkHealth();

    setV12Online(v12Healthy);
    setV3Online(v3Healthy);

    if (v12Healthy && v3Healthy) {
      setHealthStatusGlobal("online");
    } else if (!v12Healthy && !v3Healthy) {
      setHealthStatusGlobal("offline");
    } else {
      setHealthStatusGlobal("partial");
    }
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

  return { healthStatusGlobal, v12Online, v3Online, countdown };
}
