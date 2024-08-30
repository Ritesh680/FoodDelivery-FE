import HeaderInfo from "../Header/Info";
import { Outlet } from "react-router-dom";
import Navbar from "../Header/Navbar";
import Footer from "../Footer";

const Layout = () => {
	return (
		<>
			<div className="flex flex-col">
				<HeaderInfo />
				<Navbar />
				<div className="mb-16 sm:mb-0">
					<Outlet />
				</div>

				<Footer />
			</div>
		</>
	);
};

export default Layout;
