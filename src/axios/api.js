import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

// Separate instance for refresh to avoid infinite loop
const refreshApi = axios.create({
  baseURL: "http://localhost:8000",
});

// Add access token to request headers
api.interceptors.request.use((config) => {
  const access = localStorage.getItem("access");
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

// Handle token expiration and retry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh");
        const response = await refreshApi.post("/api/users/refresh/", {
          refresh: refreshToken,
        });

        const newAccess = response.data.access;
        localStorage.setItem("access", newAccess);

        // Update the authorization header and retry
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // If it's not a 401 or no refresh available, reject
    return Promise.reject(error);
  }
);

export default api;
