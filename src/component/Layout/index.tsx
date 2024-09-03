import HeaderInfo from "../Header/Info";
import { Outlet } from "react-router-dom";
import Navbar from "../Header/Navbar";
import Footer from "../Footer";
import { Layout as AntdLayout } from "antd";
import MobileNavigation from "../Header/Navbar/MobileNavigation";
import { NAVBAR_HIDDEN_PAGES } from "../../constants";

const { Header, Content, Footer: AntdFooter } = AntdLayout;

const Layout = () => {
	const hideNav = NAVBAR_HIDDEN_PAGES.includes(window.location.pathname);
	return (
		<AntdLayout className="min-h-screen">
			<Header className={`${hideNav ? "hidden" : ""} p-0`}>
				<HeaderInfo />
				<Navbar />
			</Header>

			<Content className="hidden py-10 sm:inline-block px-10">
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
