import { useState } from "react";
import { useNavigate } from "react-router";
import { NavItems } from "../../../constants";

function MobileNavigation() {
	const [activeTab, setActiveTab] = useState(NavItems[0].name.toLowerCase());
	const navigate = useNavigate();

	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
		navigate(`/${tab}`);
	};

	return (
		<div className="flex flex-col h-screen z-[99]">
			<div className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-lg z-[99]">
				<div className="flex justify-around p-2">
					{NavItems.map((item, index) => (
						<button
							key={index}
							className={`flex-1 py-2 text-center flex flex-col gap-1 items-center ${
								activeTab === item.name.toLowerCase()
									? "text-blue-500"
									: "text-gray-500"
							}`}
							onClick={() => handleTabChange(item.name.toLowerCase())}>
							{<item.icon className="text-black text-xl" />}
							<div className="text-sm">{item.name}</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default MobileNavigation;
