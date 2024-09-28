import { Button, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../../hooks/useYupResolver";
import { FacebookIcon, GoogleLogo } from "../../assets/icons";
import { useNavigate } from "react-router";
import useApi from "../../api/useApi";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import useAuth from "../../hooks/useAuth";
import { ROUTES } from "../../constants";

interface IRegisterProps {
	name: string;
	email: string;
	phone: string;
	password: string;
}

const validationSchema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().required(),
	phone: yup.string().required().min(10).max(10),
});

const Register = () => {
	const { register } = useApi();
	const { loginWithGoogle } = useAuth();
	const navigate = useNavigate();

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<IRegisterProps>({
		resolver: useYupValidationResolver(validationSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			password: "",
		},
	});

	const { mutate: registerUser } = useMutation({
		mutationFn: (data: IRegisterProps) => register(data),
		onSuccess: (res) => {
			message.success("Account created successfully");
			if (res.success) {
				navigate({
					pathname: "/" + ROUTES.VERIFY,
					search: `?email=${res.data.user.email}`,
				});
			}
		},
		onError: (error: AxiosError<{ errMessage: string }>) => {
			message.error(error.response?.data.errMessage);
		},
	});

	const onSubmit = (data: IRegisterProps) => registerUser(data);
	return (
		<div className="px-10 flex flex-col items-center justify-center gap-2 h-screen sm:h-fit sm:my-10 sm:py-10 rounded-lg w-[375px] mx-auto border">
			{/* <img src="/logo.jpeg" className="h-14 w-16 object-cover" /> */}

			<span className="text-center text-base font-bold text-[#C50202] text-wrap p-7">
				Welcome to <br /> Chicken Delivery Nepal
			</span>

			<form onSubmit={handleSubmit(onSubmit)} className="w-full">
				<div className="flex flex-col gap-7">
					<Controller
						control={control}
						name="name"
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Full Name"
								className="w-full py-2 rounded-lg"
								status={errors.name ? "error" : ""}
							/>
						)}
					/>
					<Controller
						control={control}
						name="email"
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Email"
								className="w-full py-2 rounded-lg"
								status={errors.email ? "error" : ""}
							/>
						)}
					/>
					<Controller
						control={control}
						name="phone"
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Phone Number"
								className="w-full py-2 rounded-lg"
								status={errors.phone ? "error" : ""}
							/>
						)}
					/>
					<Controller
						control={control}
						name="password"
						render={({ field }) => (
							<Input.Password
								{...field}
								placeholder="Password"
								className="w-full py-2 rounded-lg"
								status={errors.email ? "error" : ""}
							/>
						)}
					/>
				</div>

				<Button type="primary" htmlType="submit" className="w-full py-2 mt-12">
					Sign Up
				</Button>
			</form>
			<div className="flex gap-9 mt-7">
				<Button htmlType="button" onClick={loginWithGoogle}>
					<GoogleLogo className="text-xl" />
					Google
				</Button>
				<Button>
					<FacebookIcon className="text-lg" />
					Facebook
				</Button>
			</div>
			<div className="flex flex-col w-full">
				<span className="text-[10px] text-center mt-5 py-4 text-[#737373] text-opacity-70">
					Already have an account?
				</span>
				<Button
					type="primary"
					className="mx-10"
					htmlType="button"
					onClick={() => navigate("/login")}>
					Login
				</Button>
			</div>
		</div>
	);
};

export default Register;
