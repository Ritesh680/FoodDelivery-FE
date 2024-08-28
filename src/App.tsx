import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import HomePage from "./pages/Homepage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<HomePage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
