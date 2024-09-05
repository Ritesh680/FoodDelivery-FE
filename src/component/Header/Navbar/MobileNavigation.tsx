import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { MobileNavItems } from "../../../constants";
import useAuth from "../../../hooks/useAuth";
import AdminRoutes from "../../../routes/AdminRoutes";

function MobileNavigation() {
	const [activeTab, setActiveTab] = useState(getCurrentLocation() ?? "home");
	const navigate = useNavigate();
	const { authenticated, userDetail } = useAuth();

	function getCurrentLocation() {
		const path =
			window.location.pathname == "/register" ||
			window.location.pathname == "/profile"
				? "/login"
				: window.location.pathname;

		const currentPath = MobileNavItems.find(
			(item) => item.href === path
		)?.name.toLowerCase();
		return currentPath;
	}

	const handleTabChange = (tab: string, href: string) => {
		navigate(href);
		setActiveTab(tab);
	};

	const List = useMemo(() => {
		if (userDetail?.user?.role === "admin") {
			return AdminRoutes.filter((item) => !item.hidden).map((route) => ({
				name: route.name,
				icon: route.icon,
				href: `/admin/${route.route}`,
			}));
		} else {
			return MobileNavItems;
		}
	}, [userDetail?.user?.role]);

	const NavItems = useMemo(() => {
		return [...List].map((item) =>
			item.name === "Account" && authenticated
				? { ...item, href: "/profile" }
				: item
		);
	}, [authenticated, List]);

	return (
		<div className="flex flex-col z-[99]">
			<div className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-lg z-[99] mt-20">
				<div className="flex justify-around p-2">
					{NavItems.map((item, index) => (
						<button
							key={index}
							className={`flex-1 py-2 text-center flex flex-col gap-1 items-center ${
								activeTab === item.name.toLowerCase()
									? "text-red-500"
									: "text-gray-500"
							}`}
							onClick={() =>
								handleTabChange(item.name.toLowerCase(), item.href)
							}>
							{
								<item.icon
									className={
										activeTab === item.name.toLowerCase()
											? "text-red-500"
											: "text-gray-500"
									}
								/>
							}
							<div className="text-sm">{item.name}</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default MobileNavigation;
