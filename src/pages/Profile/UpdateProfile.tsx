import { useEffect } from "react";
import ProfileImageRender from "../../component/ProfileImageUpload";
import InputField from "../../component/Input/InputField";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useYupValidationResolver from "../../hooks/useYupResolver";
import * as yup from "yup";
import { Button, Form, message } from "antd";
import { REGEX_EMAIL, REGEX_PHONE_NUMBER } from "../../constants";
import { useMutation } from "react-query";
import useApi, { RegisterData } from "../../api/useApi";
import { useNavigate } from "react-router";

const validationSchema = yup.object().shape({
	fname: yup.string().required(),
	lname: yup.string().required(),
	email: yup
		.string()
		.email()
		.required("Email is required")
		.matches(REGEX_EMAIL, "Invalid Email format"),
	password: yup.string().required("Password is required"),
	phone: yup
		.string()
		.required("Phone Number is required")
		.matches(REGEX_PHONE_NUMBER, "Invalid Phone Number"),
	cpassword: yup
		.string()
		.required("Confirm Password is required")
		.oneOf([yup.ref("password")], "Passwords must match"),
});

interface IUserDetails {
	fname: string;
	lname: string;
	email: string;
	phone: string;
	password: string;
	cpassword: string;
}
const UpdateProfile = () => {
	const { authenticated, userDetail, fetchUserDetail } = useAuth();
	const { updateProfile } = useApi();
	const navigate = useNavigate();

	const { control, reset, handleSubmit } = useForm<IUserDetails>({
		resolver: useYupValidationResolver(validationSchema),
	});

	const UpdateProfile = useMutation({
		mutationFn: (data: RegisterData) =>
			updateProfile(userDetail?.user?._id ?? "", data),
		onSuccess: () => {
			message.success("Profile Updated Successfully");
			navigate("/profile");
			fetchUserDetail();
			// success message
		},
	});

	const formatInput: (data: IUserDetails) => RegisterData = (
		data: IUserDetails
	) => {
		return {
			name: `${data.fname} ${data.lname}`,
			email: data.email,
			phone: data.phone,
			password: data.password,
		};
	};

	const onSubmit = (data: IUserDetails) => {
		const formattedData = formatInput(data);
		UpdateProfile.mutate(formattedData);
	};

	useEffect(() => {
		if (authenticated) {
			reset({
				fname: userDetail?.user?.name?.split(" ")[0],
				lname: userDetail?.user?.name?.split(" ")[1],
				email: userDetail?.user?.email,
				phone: userDetail?.user?.phone,
			});
		}
	}, [authenticated, userDetail, reset]);

	return (
		<div className="flex flex-col p-5 sm:py-10 sm:px-[148px] items-center">
			<div className="flex flex-col p-5 sm:py-8 sm:px-10 flex-grow w-full items-center gap-4 sm:gap-8">
				<div className="flex flex-col gap-5 sm:gap-8 items-center">
					<ProfileImageRender
						profileImage={userDetail?.user?.picture}
						shouldUpdateImage
					/>
					<span className="font-semibold sm:font-bold text-lg sm:text-3xl">
						{userDetail?.user?.name}
					</span>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-grow w-full flex-col">
					<div className="flex w-full flex-col">
						<InputField
							label="First Name"
							placeholder="First Name"
							control={control}
							name="fname"
							rules={{ required: "First Name is required" }}
						/>
						<InputField
							label="Last Name"
							placeholder="Last Name"
							control={control}
							name="lname"
							rules={{ required: "Last Name is required" }}
						/>
						<InputField
							label="Email"
							placeholder="Email"
							control={control}
							disabled
							name="email"
							rules={{ required: "Email is required" }}
						/>
						<InputField
							label="Mobile Number"
							placeholder="Mobile Number"
							control={control}
							name="phone"
							rules={{ required: "Phone Number is required" }}
						/>
						<InputField
							type="password"
							label="Password"
							placeholder="Password"
							control={control}
							name="password"
							rules={{ required: "Password is required" }}
						/>
						<InputField
							type="password"
							label="Confirm Password"
							placeholder="Confirm Password"
							control={control}
							name="cpassword"
							rules={{ required: "Confirm Password is required" }}
						/>
						<Form.Item>
							<Button type="primary" htmlType="submit" className="w-full py-2">
								Update Profile
							</Button>
						</Form.Item>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateProfile;
