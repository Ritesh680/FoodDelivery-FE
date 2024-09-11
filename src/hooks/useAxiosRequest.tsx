import { AxiosRequestConfig, Method } from "axios";

import axiosInstance from "../utils/axios";

const useAxiosRequest = () => {
	const getApiConfig = async (config?: AxiosRequestConfig) => {
		return {
			...config,
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
