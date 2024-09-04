import {
	createContext,
	PropsWithChildren,
	useCallback,
	useEffect,
	useState,
} from "react";
import { Spin } from "antd";
import { IUserResponse } from "../@types/interface";

type AuthContextState = {
	userDetail: IUserResponse | null;
	authenticated?: boolean;
	setIsAuthenticated?: (value: boolean) => void;
	logout: () => void;
	loginWithGoogle: () => void;
	loginWithFacebook: () => void;
	loading: boolean;
};

export const AuthContext = createContext<AuthContextState>({
	userDetail: {},
	authenticated: false,
} as AuthContextState);

const AuthProvider = ({ children }: PropsWithChildren) => {
	const [userDetail, setUserDetail] = useState<IUserResponse | null>(null);
	const [authenticated, setIsAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const logout = () => {
		setLoading(true);
		fetch(import.meta.env.VITE_BASE_URL + "/auth/logout", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": "true",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					setUserDetail(null);
					setIsAuthenticated(false);
				}
			})
			.catch((err) => {
				if (err) return;
			})
			.finally(() => setLoading(false));
	};

	function loginWithFacebook() {
		window.open(import.meta.env.VITE_BASE_URL + "/auth/facebook", "_self");
	}

	function loginWithGoogle() {
		window.open(import.meta.env.VITE_BASE_URL + "/auth/google", "_self");
	}

	const fetchUserDetail = useCallback(async () => {
		setLoading(true);
		await fetch(import.meta.env.VITE_BASE_URL + "/auth/login/success", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": "true",
				Accept: "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
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
	}, [authenticated]);

	useEffect(() => {
		fetchUserDetail();
	}, [fetchUserDetail]);
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
					}}>
					{children}
				</AuthContext.Provider>
			)}
		</>
	);
};

export default AuthProvider;
