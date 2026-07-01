'use client'

import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token; // store.getState().auth.token; 

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
        store.dispatch(logout());

        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
    }

        return Promise.reject(error);
    }
);

export default api;