import axios, { AxiosRequestConfig } from "axios";

const BASE_API_URL = "https://api-veen-e-test.ewipro.com";
const DEFAULT_PATH = "/installer/info/";

const api = axios.create({
    baseURL: BASE_API_URL,
});

const post = async (urlOrData?: any, data?: any, config?: AxiosRequestConfig) => {
    if (typeof urlOrData === "string") {
        return api.post(urlOrData, data, config);
    } else {
        return api.post(DEFAULT_PATH, urlOrData, config);
    }
};

const get = async (url?: string, config?: AxiosRequestConfig) => {
    return api.get(url || DEFAULT_PATH, config);
};

export default {
    ...api,
    post,
    get,
};