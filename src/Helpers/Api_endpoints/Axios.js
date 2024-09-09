import axios from "axios";


export const axiosInstance = axios.create({
  baseURL: "/api",
  // debouncing the request for limiting the reuqest rate 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": 'OPKseItZ.d5sipf7oyd1vFH8ly5sual56hS0Eehpe',
  },
});