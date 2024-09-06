import { Outlet } from "react-router";
import MobileNavigation from "../Header/Navbar/MobileNavigation";

const MobileLayout = () => {
	return (
		<div>
			<h1>Mobile Layout</h1>
			<Outlet />
			<MobileNavigation />
		</div>
	);
};
export default MobileLayout;
