import { Button, Card } from "antd";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import InputField from "../../component/Input/InputField";
import useApi from "../../api/useApi";
import { useState } from "react";
import { AxiosError } from "axios";

interface IData {
	email: string;
}

const ForgotPassword = () => {
	const { control, handleSubmit } = useForm<IData>();
	const [error, setError] = useState<string>();
	const { forgotPassword } = useApi();
	const [success, setSuccess] = useState<string>();

	const { mutate, isLoading } = useMutation({
		mutationFn: (data: IData) => forgotPassword(data),
		onSuccess: () => {
			setError(undefined);
			setSuccess("Reset link has been sent to your email address");
		},
		onError: (error: AxiosError<{ message: string }>) => {
			setError(error.response?.data?.message ?? "Something went wrong");
		},
	});
	const onSubmit = (data: IData) => {
		mutate(data);
	};
	return (
		<div className="p-10 sm:mx-auto sm:w-2/5">
			{/* <img src="/logo.jpeg" className="h-14 w-16 object-cover" /> */}
			<Card>
				<div className="p-4 flex flex-col items-center gap-4 mx-auto">
					<p className="text-center text-base font-bold text-[#C50202] text-nowrap">
						Enter your email
					</p>

					<p className="text-center text-[10px] sm:text-base text-gray-500">
						Please enter you email address
					</p>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="mt-4 flex-grow w-full">
						<div>
							<InputField
								control={control}
								name="email"
								placeholder="Email"
								customError={error}
								rules={{ required: true }}
							/>

							{success && (
								<p className="text-green-500 text-xs -mt-5 mb-2">{success}</p>
							)}
						</div>

						<Button
							type="primary"
							htmlType="submit"
							className="w-full py-2"
							loading={isLoading}
							disabled={!!success}>
							Verify
						</Button>
					</form>
				</div>
			</Card>
		</div>
	);
};

export default ForgotPassword;
