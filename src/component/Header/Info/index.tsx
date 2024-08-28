import { MailIcon, PhoneIcon } from "../../../assets/icons";

const HeaderInfo = () => {
	return (
		<div className="text-white flex justify-center bg-red-500 w-screen gap-4">
			<div className="flex items-center gap-4">
				<PhoneIcon />
				+977 9800000000
			</div>
			|
			<div className="flex items-center gap-4">
				<MailIcon />
				fooddelivery11@gmail.com
			</div>
		</div>
	);
};

export default HeaderInfo;
