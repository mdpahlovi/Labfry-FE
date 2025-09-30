import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_APP_SERVER;
const baseAxios = axios.create({ baseURL: `${BASE_URL}/api/v1`, timeout: 60000 });

export type ErrorResponse = { status: number; message: string };
export type AxiosResponse<T> = { status: number; message: string; data: T };

baseAxios.interceptors.request.use(function (config) {
    const accToken = localStorage.getItem("accToken");
    const refToken = localStorage.getItem("refToken");

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
            localStorage.setItem("accToken", newAccToken);
        }

        return res.data;
    },
    function (error) {
        const status = error?.response?.status || 500;
        const message = error?.response?.data?.message || error?.message || "Something went wrong...";

        if (status === 401) {
            localStorage.removeItem("accToken");
            localStorage.removeItem("refToken");
        }

        return Promise.reject({ status, message });
    }
);

export default baseAxios;
