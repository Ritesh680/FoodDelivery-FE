import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

axios.interceptors.request.use((config) => {
	const token = "";
	if (config.headers && token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosInstance.interceptors.response.use(
	// Success response interceptors
	(response) => {
		return response;
	},
	// Error response interceptors
	(error) => {
		// const statusCode = error?.response?.status;

		// UNAUTHORIZED
		// if (statusCode === httpStatus.UNAUTHORIZED) {
		// 	// HANDLE UNAUTHORIZED
		// 	return redirect("/unauthorized");
		// } else if (statusCode === httpStatus.NOT_FOUND) {
		// 	return redirect("/notfound");
		// } else if (statusCode === httpStatus.FORBIDDEN) {
		// 	return redirect("/unauthorized");
		// }

		return Promise.reject(error);
	}
);

export default axiosInstance;
