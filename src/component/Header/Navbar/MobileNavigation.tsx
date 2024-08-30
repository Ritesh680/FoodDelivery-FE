import { useState } from "react";
import { useNavigate } from "react-router";
import { MobileNavItems } from "../../../constants";

function MobileNavigation() {
	const [activeTab, setActiveTab] = useState(getCurrentLocation() ?? "home");
	const navigate = useNavigate();

	function getCurrentLocation() {
		const path =
			window.location.pathname == "/register"
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

	return (
		<div className="flex flex-col h-screen z-[99]">
			<div className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-lg z-[99] mt-20">
				<div className="flex justify-around p-2">
					{MobileNavItems.map((item, index) => (
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
