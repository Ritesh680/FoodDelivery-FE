import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Login/Register";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="/" element={<HomePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
