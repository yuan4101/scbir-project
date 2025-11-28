import type { CBIRResponse, CBIRSearchParams, CBIRMetricsResponse } from "../types/cbirTypes";

const BACKEND_V12_URL = "https://scbir-python-backend.onrender.com"; // Render (v1 y v2)
const BACKEND_V3_URL = "https://computative-nonalphabetical-hanna.ngrok-free.dev"; // ngrok (v3)

export const cbirService = {
  async checkHealth(): Promise<boolean> {
    try {
      const [res12, res3] = await Promise.all([
        fetch(`${BACKEND_V12_URL}/health`, { method: "GET" }),
        fetch(`${BACKEND_V3_URL}/health`, { method: "GET" }),
      ]);
      return res12.ok && res3.ok;
    } catch {
      return false;
    }
  },

  async search(params: CBIRSearchParams): Promise<CBIRResponse> {
    const fd = new FormData();
    fd.append("file", params.file);
    fd.append("threshold", String(params.threshold));
    fd.append("top_k", String(params.topK));

    if (params.version === "v3") {
      if (params.metrica) fd.append("metrica", params.metrica);
      if (params.pesoColor !== undefined) {
        fd.append("peso_color", String(params.pesoColor));
      }
    }

    const baseUrl =
      params.version === "v3" ? BACKEND_V3_URL : BACKEND_V12_URL;

    const endpoint = `${baseUrl}/cbir/search/${params.version}`;
    const response = await fetch(endpoint, {
      method: "POST",
      body: fd,
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

    const endpoint = `${BACKEND_V3_URL}/cbir/search/v3/metrics`;
    const response = await fetch(endpoint, {
      method: "POST",
      body: fd,
    });

    if (!response.ok) {
      throw new Error(`Error del servidor CBIR: ${response.status}`);
    }

    return response.json();
  },
};
