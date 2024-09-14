import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AdminProtectedRoutes from "./routes/AdminProtected";
import AdminRoutes from "./routes/AdminRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import Success from "./pages/Checkout/Success";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					{PublicRoutes.map((route) => (
						<Route
							key={route.route}
							path={route.route}
							element={<route.content />}
						/>
					))}
				</Route>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<ProtectedRoutes />}>
						{AuthenticatedRoutes.map((route) => (
							<Route
								key={route.route}
								path={route.route}
								element={<route.content />}
							/>
						))}
					</Route>

					<Route path="/admin" element={<AdminProtectedRoutes />}>
						{AdminRoutes.map((route) => (
							<Route
								key={route.route}
								path={route.route}
								element={<route.content />}
							/>
						))}
					</Route>
					<Route path="/orders/success" element={<Success />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
