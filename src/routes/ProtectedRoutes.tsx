import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
	const { authenticated, loading } = useAuth();

	if (loading) return <div>Loading...</div>;
	return <>{authenticated ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoutes;
