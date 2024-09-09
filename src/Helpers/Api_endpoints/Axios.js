import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api", // Replace with your actual API base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": import.meta.env.VITE_API_SECRET_KEY, // Use the Vite-specific way to access env variables
  },
});
