import { Button, Card, message } from "antd";

import { useForm } from "react-hook-form";
import OTPInput from "../../component/OTP";
import { useMutation } from "react-query";
import useApi from "../../api/useApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMemo } from "react";

interface IData {
	otp: number;
}
const VerifyOtp = () => {
	const { control, handleSubmit } = useForm<IData>();

	const { verifyOtp } = useApi();
	const [searchParams] = useSearchParams();

	const navigate = useNavigate();

	const userEmail = useMemo(() => searchParams.get("email"), [searchParams]);

	const { mutate, isLoading, error } = useMutation({
		mutationFn: (data: IData) => verifyOtp(data),
		onSuccess: () => {
			navigate("/login");
		},
		onError: (err: any) => {
			message.error(err.response.data.message);
		},
	});

	const onSubmit = (data: IData) => {
		mutate(data);
	};
	return (
		<div className="p-10 sm:w-fit sm:mx-auto">
			{/* <img src="/logo.jpeg" className="h-14 w-16 object-cover" /> */}
			<Card className="p-4 flex flex-col items-center gap-4 justify-center sm:w-2/3">
				<p className="text-center text-base font-bold text-[#C50202]">
					Verify your email
				</p>

				<p className="text-center text-[10px] sm:text-base text-gray-500">
					{userEmail
						? `Please enter the verification code we sent to ${userEmail}`
						: "Please enter the verification code sent to your email"}
				</p>
				<form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex-grow">
					<OTPInput
						control={control}
						name="otp"
						status={error ? "error" : undefined}
					/>

					<Button
						type="primary"
						htmlType="submit"
						className="w-full py-2 mt-12"
						loading={isLoading}>
						Verify
					</Button>
				</form>
			</Card>
		</div>
	);
};

export default VerifyOtp;
