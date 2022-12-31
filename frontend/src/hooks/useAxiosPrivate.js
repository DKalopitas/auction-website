import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";

const useAxiosPrivate = () => {
    const authHeader = useAuthHeader();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                config.headers['Authorization'] = authHeader();
                return config;
            }, (error) => Promise.reject(error)
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
        }
    }, [authHeader])

    return axiosPrivate;
}

export default useAxiosPrivate;