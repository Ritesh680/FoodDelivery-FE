import { useMemo } from "react";
import { useQuery } from "react-query";
import { Outlet, useLocation } from "react-router-dom";
import { Layout as AntdLayout, Spin } from "antd";

import HeaderInfo from "../Header/Info";
import Navbar from "../Header/Navbar";
import Footer from "../Footer";
import MobileNavigation from "../Header/Navbar/MobileNavigation";
import { NAVBAR_HIDDEN_PAGES } from "../../constants";
import QueryKeys from "../../constants/QueryKeys";
import useApi from "../../api/useApi";

const { Header, Content, Footer: AntdFooter } = AntdLayout;

const Layout = () => {
	const location = useLocation();
	const { getCategories } = useApi();

	const Categories = useQuery({
		queryKey: [QueryKeys.Categories],
		queryFn: getCategories,
	});

	const hideNav = useMemo(
		() => NAVBAR_HIDDEN_PAGES.includes(location.pathname),
		[location.pathname]
	);

	if (Categories.isLoading) return <Spin fullscreen />;
	return (
		<AntdLayout className="min-h-screen">
			<Header className={`${hideNav ? "hidden" : ""} sm:block p-0 h-fit`}>
				<HeaderInfo />
				<Navbar categories={Categories.data?.data ?? []} />
			</Header>

			<Content className="hidden sm:inline-block">
				<Outlet />
			</Content>
			<Content className="sm:hidden min-h-screen">
				<Outlet></Outlet>
				<MobileNavigation></MobileNavigation>
			</Content>

			<AntdFooter className="p-0">
				<Footer categories={Categories.data?.data ?? []} />
			</AntdFooter>
		</AntdLayout>
	);
};

export default Layout;
