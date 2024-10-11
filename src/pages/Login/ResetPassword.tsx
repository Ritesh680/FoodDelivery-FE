import { useEffect } from "react";
import InputField from "../../component/Input/InputField";
import { Button, Card, message } from "antd";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import useApi from "../../api/useApi";
import { useMutation } from "react-query";

interface IData {
	password: string;
	confirmPassword: string;
}
const ResetPassword = () => {
	const { control, handleSubmit, getValues } = useForm<IData>();
	const { token } = useParams();
	const { resetPassword } = useApi();
	const navigate = useNavigate();
	const { mutate, isLoading, error } = useMutation({
		mutationFn: (data: IData) => resetPassword(token!, data),
		onSuccess: () => {
			message.success("Password updated successfully");
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		},
	}) as {
		mutate: (data: IData) => void;
		isLoading: boolean;
		error: ApiError;
	};

	const onSubmit = (data: IData) => {
		mutate(data);
	};

	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
	}, [navigate, token]);

	return (
		<div className="p-10 sm:w-2/5 mx-auto h-full">
			<Card>
				<div className="p-4 flex flex-col items-center gap-8 w-full">
					<img src="/logo.jpeg" className="h-14 w-16 object-cover" />
					<span className="text-center text-base font-bold text-[#C50202]">
						Update Your Password
					</span>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex-grow w-full flex flex-col">
						<InputField
							type="password"
							control={control}
							name="password"
							placeholder="Password"
							rules={{ required: true }}
						/>
						<InputField
							type="password"
							control={control}
							name="confirmPassword"
							placeholder="Confirm Password"
							rules={{
								required: true,
								validate: (value) => {
									return (
										getValues("password") === value ||
										"The passwords do not match"
									);
								},
							}}
							showErrorMessage
						/>

						<span className="text-red-500 text-xs sm:text-sm text-center mx-auto flex">
							{error?.response?.data?.message}
						</span>

						<Button
							type="primary"
							htmlType="submit"
							className="w-full py-2 mt-5"
							loading={isLoading}>
							Submit
						</Button>
					</form>
				</div>
			</Card>
		</div>
	);
};

export default ResetPassword;
