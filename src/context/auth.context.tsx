import {
	createContext,
	PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Spin } from "antd";
import { IUserResponse } from "../@types/interface";
import { getCookie, removeCookie } from "../utils/function";

type AuthContextState = {
	userDetail: IUserResponse | null;
	authenticated?: boolean;
	setIsAuthenticated?: (value: boolean) => void;
	logout: () => void;
	loginWithGoogle: () => void;
	loginWithFacebook: () => void;
	loading: boolean;
	fetchUserDetail: () => void;
};

export const AuthContext = createContext<AuthContextState>({
	userDetail: {},
	authenticated: false,
} as AuthContextState);

const AuthProvider = ({ children }: PropsWithChildren) => {
	const [userDetail, setUserDetail] = useState<IUserResponse | null>(null);
	const [authenticated, setIsAuthenticated] = useState<boolean>(
		getCookie("token") ? true : false
	);
	const [loading, setLoading] = useState<boolean>(true);

	const searchParams = useMemo(
		() => new URLSearchParams(window.location.search),
		[]
	);

	const logout = () => {
		setLoading(true);
		fetch(import.meta.env.VITE_BASE_URL + "/auth/logout", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": "true",
				Authorization: `Bearer ${getCookie("token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					setUserDetail(null);
					setIsAuthenticated(false);
					removeCookie("token");
				}
			})
			.catch((err) => {
				if (err) return;
			})
			.finally(() => setLoading(false));
	};

	function loginWithFacebook() {
		window.open(import.meta.env.VITE_BASE_URL + "/auth/facebook");
	}

	function loginWithGoogle() {
		window.location.href = import.meta.env.VITE_BASE_URL + "/auth/google";
	}

	const fetchUserDetail = useCallback(async () => {
		if (authenticated && userDetail) return setLoading(false);
		setLoading(true);
		await fetch(import.meta.env.VITE_BASE_URL + "/auth/login/success", {
			method: "GET",
			credentials: "include",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					setUserDetail(data);
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
				}
			})
			.catch((err) => {
				if (err) return;
				setIsAuthenticated(false);
			})
			.finally(() => setLoading(false));
	}, [authenticated, userDetail]);

	useEffect(() => {
		fetchUserDetail();
	}, [fetchUserDetail, authenticated]);

	useEffect(() => {
		const query = searchParams.toString();
		const params = query.split("&");
		params.forEach((param) => {
			const [key, value] = param.split("=");
			if (key === "authenticated" && value === "true") {
				setIsAuthenticated(true);
			}
		});
	}, [searchParams]);

	return (
		<>
			{loading ? (
				<div className="min-w-screen min-h-screen flex items-center justify-center">
					<Spin fullscreen />
				</div>
			) : (
				<AuthContext.Provider
					value={{
						userDetail,
						logout,
						authenticated,
						setIsAuthenticated,
						loginWithGoogle,
						loginWithFacebook,
						loading,
						fetchUserDetail,
					}}>
					{children}
				</AuthContext.Provider>
			)}
		</>
	);
};

export default AuthProvider;
