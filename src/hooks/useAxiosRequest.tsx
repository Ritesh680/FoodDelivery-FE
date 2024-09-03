import { AxiosRequestConfig, Method } from "axios";

import axiosInstance from "../utils/axios";

const useAxiosRequest = () => {
	const token = "";

	const getApiConfig = async (config?: AxiosRequestConfig) => {
		return {
			...config,
			headers: { Authorization: `Bearer ${token}` },
			withCredentials: true,
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
