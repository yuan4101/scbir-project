import type {
  CBIRResponse,
  CBIRSearchParams,
  CBIRMetricsResponse,
} from "../types/cbirTypes";

// V1/V2 en Render
const BACKEND_V12_URL = "https://scbir-python-backend.onrender.com";
// V3 detrás de ngrok (HTTPS)
const BACKEND_V3_URL = "https://computative-nonalphabetical-hanna.ngrok-free.dev";

type SimpleHeaders = Record<string, string>;

const COMMON_HEADERS: SimpleHeaders = {
  Accept: "*/*",
};

async function checkUrl(
  baseUrl: string,
  useNgrokSkip = false
): Promise<boolean> {
  try {
    const headers: SimpleHeaders = { ...COMMON_HEADERS };
    if (useNgrokSkip) {
      headers["ngrok-skip-browser-warning"] = "true";
    }

    const res = await fetch(`${baseUrl}/health`, {
      method: "GET",
      headers,
    });

    if (!res.ok) return false;

    const text = await res.text();

    try {
      const data = JSON.parse(text) as { status?: string };
      return data.status === "ok";
    } catch {
      return true;
    }
  } catch {
    return false;
  }
}

export const cbirService = {
  async checkHealth(): Promise<{ v12Healthy: boolean; v3Healthy: boolean }> {
    const [v12Healthy, v3Healthy] = await Promise.all([
      checkUrl(BACKEND_V12_URL, false),
      checkUrl(BACKEND_V3_URL, true),
    ]);

    return { v12Healthy, v3Healthy };
  },

  async search(params: CBIRSearchParams): Promise<CBIRResponse> {
    const fd = new FormData();
    fd.append("file", params.file);
    fd.append("threshold", String(params.threshold));
    fd.append("top_k", String(params.topK));

    if (params.version === "v3") {
      if (params.metrica) {
        fd.append("metrica", params.metrica);
      }
      if (params.pesoColor !== undefined) {
        fd.append("peso_color", String(params.pesoColor));
      }
    }

    const isV3 = params.version === "v3";
    const baseUrl = isV3 ? BACKEND_V3_URL : BACKEND_V12_URL;

    const headers: SimpleHeaders = { ...COMMON_HEADERS };
    if (isV3) {
      headers["ngrok-skip-browser-warning"] = "true";
    }

    const endpoint = `${baseUrl}/cbir/search/${params.version}`;

    const response = await fetch(endpoint, {
      method: "POST",
      body: fd,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error del servidor CBIR: ${response.status}`);
    }

    return response.json();
  },

  async searchWithMetrics(
    params: Omit<CBIRSearchParams, "metrica">
  ): Promise<CBIRMetricsResponse> {
    if (params.version !== "v3") {
      throw new Error("searchWithMetrics solo está disponible para V3");
    }

    const fd = new FormData();
    fd.append("file", params.file);
    fd.append("threshold", String(params.threshold));
    fd.append("top_k", String(params.topK));
    if (params.pesoColor !== undefined) {
      fd.append("peso_color", String(params.pesoColor));
    }

    const headers: SimpleHeaders = {
      ...COMMON_HEADERS,
      "ngrok-skip-browser-warning": "true",
    };

    const endpoint = `${BACKEND_V3_URL}/cbir/search/v3/metrics`;
    const response = await fetch(endpoint, {
      method: "POST",
      body: fd,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error del servidor CBIR: ${response.status}`);
    }

    return response.json();
  },
};
