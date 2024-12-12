import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AdminProtectedRoutes from "./routes/AdminProtected";
import AdminRoutes from "./routes/AdminRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import Success from "./pages/Checkout/Success";
import { useQuery } from "react-query";
import QueryKeys from "./constants/QueryKeys";
import useApi from "./api/useApi";
import { useDispatch } from "react-redux";
import { clearCart, updateCart } from "./slice/cartSlice";
import useAuth from "./hooks/useAuth";

function App() {
	const { getCart } = useApi();
	const { authenticated } = useAuth();
	const dispatch = useDispatch();

	//FIXME: THIS IS DONE BECAUSE OF HURRY. NEED TO MANAGE THIS PROPERLY
	useQuery({
		queryKey: [QueryKeys.Cart],
		queryFn: getCart,
		enabled: authenticated,
		onSuccess: (data) => {
			dispatch(clearCart());

			return data.data?.products
				? data.data.products.map((item) =>
						dispatch(
							updateCart({
								productId: item.product._id,
								quantity: item.quantity,
								price: item.product.price ?? 0,
								discountedPrice: item.product.discountedPrice ?? 0,
								name: item.product.name,
								image: item.product.image,
							})
						)
				  )
				: null;
		},
	});

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
