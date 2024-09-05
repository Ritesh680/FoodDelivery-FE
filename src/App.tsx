import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Login/Register";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import AdminProtectedRoutes from "./routes/AdminProtected";
import AdminRoutes from "./routes/AdminRoutes";
import CheckoutPage from "./pages/Checkout";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="checkout" element={<CheckoutPage />} />

					<Route path="" element={<HomePage />} />
					<Route path="/" element={<ProtectedRoutes />}>
						<Route path="profile" element={<Profile />} />
						<Route path="orders" element={<Orders />} />
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
					<Route path="/menu" element={<Menu />} />
					<Route path="/cart" element={<Cart />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
