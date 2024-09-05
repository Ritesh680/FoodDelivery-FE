import { Spin } from "antd";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const AdminProtectedRoutes = () => {
	const { loading, userDetail, authenticated } = useAuth();

	if (loading) return <Spin size="large" fullscreen />;

	if (!authenticated) return <Navigate to="/login" />;

	if (userDetail?.user?.role === "admin") {
		return <Outlet />;
	}

	return <Navigate to="/login" />;
};

export default AdminProtectedRoutes;
