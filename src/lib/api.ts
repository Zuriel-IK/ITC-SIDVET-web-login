import axios, { AxiosError } from "axios";

export interface ApiError {
  status: number;
  message: string;
  errors: Record<string, string[]> | null;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError<{ message?: string; error?: string; errors?: Record<string, string[]> }>) => {
    const status = error.response?.status;
    const data = error.response?.data;

    const apiError: ApiError = {
      status: status ?? 0,
      message:
        data?.message ||
        data?.error ||
        error.message ||
        "Ocurrió un error inesperado.",
      errors: data?.errors ?? null,
    };

    switch (status) {
      case 400:
        apiError.message =
          data?.message || "Los datos enviados no son válidos.";
        break;

      case 401:
        apiError.message =
          data?.message || "Tu sesión expiró o no es válida.";

        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        break;

      case 403:
        apiError.message =
          data?.message || "No tienes permisos para realizar esta acción.";
        break;

      case 404:
        apiError.message =
          data?.message || "El recurso solicitado no fue encontrado.";
        break;

      case 409:
        apiError.message =
          data?.message || "El recurso ya existe o hay un conflicto.";
        break;

      case 422:
        apiError.message =
          data?.message || "Hay errores de validación en los datos enviados.";
        break;

      case 500:
      case 502:
      case 503:
        apiError.message =
          data?.message || "El servidor tuvo un problema. Inténtalo más tarde.";
        break;

      case undefined:
        apiError.message =
          "No fue posible conectar con el servidor. Revisa tu conexión.";
        break;
    }

    return Promise.reject(apiError);
  }
);

export default api;