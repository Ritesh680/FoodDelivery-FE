import { Button, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../../hooks/useYupResolver";
import { FacebookIcon, GoogleLogo } from "../../assets/icons";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import useApi from "../../api/useApi";
import useAuth from "../../hooks/useAuth";

interface ILoginProps {
	email: string;
	password: string;
}

const validationSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

const Login = () => {
	const { login } = useApi();
	const { loginWithGoogle, loginWithFacebook } = useAuth();

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<ILoginProps>({
		resolver: useYupValidationResolver(validationSchema),
		mode: "onChange",
	});

	const navigate = useNavigate();

	const { mutate: loginUser } = useMutation({
		mutationFn: (data: ILoginProps) => login(data),
		onSuccess: (res) => {
			message.success(res.status);
			localStorage.setItem("token", res.token);
			navigate("/");
		},
		onError: (error: AxiosError<{ message: string }>) => {
			message.error(error.response?.data.message);
		},
	});

	const onSubmit = (data: ILoginProps) => loginUser(data);
	return (
		<div className="px-10 flex flex-col items-center justify-center gap-2 h-screen sm:h-fit sm:my-10 sm:py-10 rounded-lg w-[375px] mx-auto border">
			<img src="/logo.jpeg" className="h-14 w-16 object-cover" />

			<span className="text-center text-base font-bold text-[#C50202] text-wrap p-7">
				Welcome to <br /> Chicken Delivery Nepal
			</span>

			<form onSubmit={handleSubmit(onSubmit)} className="w-full">
				<div className="flex flex-col gap-7">
					<Controller
						control={control}
						name="email"
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Email or Phone Number"
								className="w-full py-2 rounded-lg"
								status={errors.email ? "error" : ""}
							/>
						)}
					/>
					<Controller
						control={control}
						name="password"
						render={({ field }) => (
							<Input.Password
								{...field}
								type="password"
								placeholder="Password"
								className="w-full py-2 rounded-lg"
								status={errors.password ? "error" : ""}
							/>
						)}
					/>
				</div>

				<Button type="primary" htmlType="submit" className="w-full py-2 mt-12">
					Login
				</Button>
			</form>
			<div className="flex gap-9 mt-7">
				<Button onClick={loginWithGoogle} htmlType="button">
					<GoogleLogo className="text-xl" />
					Google
				</Button>
				<Button htmlType="button" onClick={loginWithFacebook}>
					<FacebookIcon className="text-lg" />
					Facebook
				</Button>
			</div>
			<div className="flex flex-col w-full">
				<span className="text-[10px] text-center mt-5 py-4 text-[#737373] text-opacity-70">
					New to Chicken Delivery Nepal?
				</span>
				<Button
					type="primary"
					className="mx-10"
					htmlType="button"
					onClick={() => navigate("/register")}>
					Sign Up
				</Button>
			</div>
		</div>
	);
};

export default Login;
