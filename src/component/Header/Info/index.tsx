import { MailIcon, PhoneIcon } from "../../../assets/icons";
import { STATIC_DATA } from "../../../constants";

const HeaderInfo = () => {
	return (
		<div className="hidden text-white lg:flex flex-row bg-red-500 w-screen gap-4 justify-center h-6">
			<div className="flex items-center gap-4 lg:border-r lg:px-5">
				<PhoneIcon />
				{STATIC_DATA.PHONE_NUMBER}
			</div>
			<div className="flex items-center gap-4">
				<MailIcon />
				{STATIC_DATA.EMAIL}
			</div>
		</div>
	);
};

export default HeaderInfo;
