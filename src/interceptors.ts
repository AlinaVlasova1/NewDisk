import axios from "axios";
import {router} from "@/main";

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config
});

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            await router.push("/");
        }
        return Promise.reject(error)
    })