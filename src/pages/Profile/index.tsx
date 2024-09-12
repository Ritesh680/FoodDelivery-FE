import { useMemo } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import ProfileImageRender from "../../component/ProfileImageUpload";

const Profile = () => {
	const { userDetail, logout } = useAuth();
	const navigate = useNavigate();

	const List = [
		{ label: "My Order", action: () => navigate("/orders") },
		{ label: "Billing Address", action: () => navigate("/billing-address") },
		{ label: "About Us", action: () => navigate("/about") },
		{
			label: "Terms and Conditions",
			action: () => navigate("/terms-and-conditions"),
		},
		{ label: "Logout", action: () => logout() },
	];

	const userImage = useMemo(() => {
		return userDetail?.user.picture;
	}, [userDetail]);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-center pt-5 bg-red-500 pb-[30px]">
				<div className="flex flex-col items-center gap-3">
					<ProfileImageRender profileImage={userImage} />

					<div className="flex flex-col gap-1">
						<span className="text-sm text-center font-semibold text-white">
							{userDetail?.user.name}
						</span>
						<span className="text-xs text-center text-white">
							{userDetail?.user.email}
						</span>
						<button
							className="text-xs text-center text-white bg-red-500 rounded-lg py-1"
							onClick={() => navigate("/profile/update")}>
							Edit Profile
						</button>
					</div>
				</div>
			</div>

			<div className="py-5 px-6">
				<ul className="flex flex-col gap-4">
					{List.map((item, index) => (
						<li key={index}>
							<button
								type="button"
								onClick={item.action}
								className="text-[10px] leading-3 font-semibold">
								{item.label}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Profile;
