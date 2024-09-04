import HeaderInfo from "../Header/Info";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Header/Navbar";
import Footer from "../Footer";
import { Layout as AntdLayout } from "antd";
import MobileNavigation from "../Header/Navbar/MobileNavigation";
import { NAVBAR_HIDDEN_PAGES } from "../../constants";
import { useMemo } from "react";

const { Header, Content, Footer: AntdFooter } = AntdLayout;

const Layout = () => {
	const location = useLocation();

	const hideNav = useMemo(
		() => NAVBAR_HIDDEN_PAGES.includes(location.pathname),
		[location.pathname]
	);
	return (
		<AntdLayout className="min-h-screen">
			<Header className={`${hideNav ? "hidden" : ""} sm:block p-0 h-fit`}>
				<HeaderInfo />
				<Navbar />
			</Header>

			<Content className="hidden sm:inline-block">
				<Outlet />
			</Content>
			<Content className="sm:hidden min-h-screen">
				<Outlet></Outlet>
				<MobileNavigation></MobileNavigation>
			</Content>

			<AntdFooter className="p-0">
				<Footer />
			</AntdFooter>
		</AntdLayout>
	);
};

export default Layout;
