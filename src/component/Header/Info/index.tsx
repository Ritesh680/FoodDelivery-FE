import { MailIcon, PhoneIcon } from "../../../assets/icons";

const HeaderInfo = () => {
	return (
		<div className="hidden text-white lg:flex flex-row bg-red-500 w-screen gap-4 justify-center h-6">
			<div className="flex items-center gap-4 lg:border-r lg:px-5">
				<PhoneIcon />
				+977 9800000000
			</div>
			<div className="flex items-center gap-4">
				<MailIcon />
				fooddelivery11@gmail.com
			</div>
		</div>
	);
};

export default HeaderInfo;
