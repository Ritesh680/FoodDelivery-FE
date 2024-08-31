import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Spin } from "antd";

interface Auth {
	accessToken: string;
	authenticated?: boolean;
	setIsAuthenticated?: (value: boolean) => void;
	loading?: boolean;
}

type AuthContextState = {
	auth: Auth | null;
	authenticated?: boolean;
	setIsAuthenticated?: (value: boolean) => void;
	logout: () => void;
	loading?: boolean;
};

export const AuthContext = createContext<AuthContextState>({
	auth: { accessToken: "" },
	authenticated: false,
} as AuthContextState);

const AuthProvider = ({ children }: PropsWithChildren) => {
	const [auth, setAuth] = useState<Auth | null>(null);
	const [authenticated, setIsAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const logout = () => {
		setLoading(true);
		setTimeout(() => {
			localStorage.clear();
			window.location.href = "/login";
			setLoading(false);
		}, 2000);
	};

	useEffect(() => {
		const accessToken = localStorage.getItem("token");
		if (accessToken) {
			setAuth({ accessToken });
		}
		if (auth) {
			setIsAuthenticated(true);
		}
	}, [auth]);
	return (
		<>
			{loading ? (
				<div className="min-w-screen min-h-screen flex items-center justify-center">
					<Spin fullscreen />
				</div>
			) : (
				<AuthContext.Provider
					value={{ auth, logout, authenticated, setIsAuthenticated }}>
					{children}
				</AuthContext.Provider>
			)}
		</>
	);
};

export default AuthProvider;
