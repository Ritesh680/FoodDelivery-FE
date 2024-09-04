import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Login/Register";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import CreateOrEditProduct from "./pages/Products/CreateOrEdit";
import ProductPage from "./pages/Products";
import Menu from "./pages/Menu";
import CreateOrEditCategory from "./pages/Categories/CreateOrEditCategory";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="/profile" element={<Profile />} />

					<Route path="" element={<HomePage />} />
					<Route path="/" element={<ProtectedRoutes />}>
						<Route path="products/create" element={<CreateOrEditProduct />} />
						<Route path="orders" element={<Orders />} />
						<Route path="products" element={<ProductPage />} />
						<Route path="products/edit/:id" element={<CreateOrEditProduct />} />

						<Route
							path="categories/create"
							element={<CreateOrEditCategory />}
						/>
						<Route
							path="categories/edit/:id"
							element={<CreateOrEditCategory />}
						/>
						<Route path="categories" element={<Categories />} />
					</Route>
					<Route path="/menu" element={<Menu />} />
					<Route path="/cart" element={<Cart />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
