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
		setTimeout(() => {
			localStorage.clear();
			window.location.href = "/login";
		}, 2000);
	};

	function loginWithFacebook() {
		window.open("http://localhost:4000/auth/facebook", "_self");
	}

	function loginWithGoogle() {
		window.open("http://localhost:4000/auth/google", "_self");
	}

	const fetchUserDetail = useCallback(async () => {
		setLoading(true);
		await fetch("http://localhost:4000/auth/login/success", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": "true",
				Accept: "application/json",
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
				setIsAuthenticated(false);
				console.log(err);
			})
			.finally(() => setLoading(false));
	}, []);

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
