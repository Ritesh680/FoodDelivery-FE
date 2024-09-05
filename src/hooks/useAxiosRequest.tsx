import { AxiosRequestConfig, Method } from "axios";

import axiosInstance from "../utils/axios";
import { getCookie } from "../utils/function";

const useAxiosRequest = () => {
	const getApiConfig = async (config?: AxiosRequestConfig) => {
		const token = getCookie("token");
		return {
			...config,
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
	};

	async function axiosRequest<T>(
		method: Method,
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig
	): Promise<T> {
		const apiConfig = await getApiConfig(config);

		const res = await axiosInstance.request({
			method,
			url,
			data,
			...apiConfig,
		});
		return res.data;
	}
	return { axiosRequest };
};
export default useAxiosRequest;
