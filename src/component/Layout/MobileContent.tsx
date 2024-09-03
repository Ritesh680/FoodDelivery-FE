import { ArrowLeftOutlined } from "@ant-design/icons";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router";

const MobileContent = ({
	title,
	children,
}: PropsWithChildren<{ title: string }>) => {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col">
			<div className="sm:hidden bg-red-500">
				<div className="container mx-auto py-4 px-5 flex items-center gap-5">
					<ArrowLeftOutlined
						className="text-xl text-white"
						onClick={() => navigate(-1)}
					/>
					<h1 className="text-xl text-white">{title}</h1>
				</div>
			</div>
			{children}
		</div>
	);
};

export default MobileContent;
