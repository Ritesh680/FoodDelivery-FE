import useAxiosRequest from "../hooks/useAxiosRequest";

interface RegisterData {
	name: string;
	email: string;
	password: string;
	phone: string;
	role?: string;
}

interface LoginData {
	email: string;
	password: string;
}

interface IUser {
	name: string;
	email: string;
	phone: string;
	role: string;
	_id: string;
}

interface ILoginResponse {
	token: string;
	status: string;
	user: IUser;
	"token-expire": string;
}
export default function useApi() {
	const { axiosRequest } = useAxiosRequest();

	const register = async (data: RegisterData) => {
		return axiosRequest("POST", "/user", data);
	};
	const login = async (data: LoginData) => {
		return axiosRequest<ILoginResponse>("POST", "/auth/local/login", data);
	};

	return { register, login };
}
