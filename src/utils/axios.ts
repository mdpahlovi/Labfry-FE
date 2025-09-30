import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER;

const baseAxios = axios.create({ baseURL: `${BASE_URL}/api/v1`, timeout: 60000 });

export type ErrorResponse = { status: number; message: string };
export type AxiosResponse<T> = { status: number; message: string; data: T };

const getToken = (key: string): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(key);
    }
    return null;
};

const setToken = (key: string, value: string): void => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, value);
    }
};

const removeToken = (key: string): void => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(key);
    }
};

baseAxios.interceptors.request.use(function (config) {
    const accToken = getToken("accToken");
    const refToken = getToken("refToken");

    if (accToken && refToken) {
        config.headers.authorization = `Bearer ${accToken}`;
        config.headers["x-refresh-token"] = refToken;
    }

    return config;
});

baseAxios.interceptors.response.use(
    function (res) {
        const newAccToken = res.headers["x-access-token"];
        if (newAccToken) {
            setToken("accToken", newAccToken);
        }

        return res.data;
    },
    function (error) {
        const status = error?.response?.status || 500;
        const message = error?.response?.data?.message || error?.message || "Something went wrong...";

        if (status === 401) {
            removeToken("accToken");
            removeToken("refToken");
        }

        return Promise.reject({ status, message });
    }
);

export default baseAxios;
