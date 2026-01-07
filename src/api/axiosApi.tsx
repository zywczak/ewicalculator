import axios, { AxiosRequestConfig } from "axios";

const BASE_API_URL = "https://api-veen-e-test.ewipro.com";
const DEFAULT_PATH = "/installer/info/";

const getAccessToken = () => localStorage.getItem("access");

const api = axios.create({
    baseURL: BASE_API_URL,
});

const excludedPaths: string[] = [
    "/installer/authenticate/",
    "/installer/registration/",
    "/installer/forget-password/",
];

api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        const isExcluded = excludedPaths.some(path => config.url?.includes(path));

        if (token && !isExcluded) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor response – obsługa błędu 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized! Redirecting to /auth...");
            localStorage.clear(); 
            globalThis.location.href = "/auth";
        }
        return Promise.reject(error);
    }
);

const post = async (urlOrData?: any, data?: any, config?: AxiosRequestConfig) => {
    if (typeof urlOrData === "string") {
        return api.post(urlOrData, data, config);
    } else {
        const token = getAccessToken();
        const headers = { Authorization: token ? `Bearer ${token}` : undefined };
        const finalConfig: AxiosRequestConfig = { ...config, headers };
        return api.post(DEFAULT_PATH, urlOrData, finalConfig);
    }
};

const get = async (url?: string, config?: AxiosRequestConfig) => {
    const token = getAccessToken();
    const headers = { Authorization: token ? `Bearer ${token}` : undefined };
    return api.get(url || DEFAULT_PATH, { ...(config), headers });
};

export default {
    ...api,
    post,
    get,
};