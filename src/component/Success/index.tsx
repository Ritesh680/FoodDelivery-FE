import React, { useMemo } from "react";
import { Button, Result } from "antd";
import { useLocation, useNavigate } from "react-router";
import CopyToClipboardButton from "../../utils/ClickToCopy";
import Payment from "../../pages/Checkout/Payment";

const Success: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const totalPayment = useMemo(() => location?.state?.data?.price, [location]);
	return (
		<Result
			status="success"
			title="Success"
			subTitle={
				<>
					Your order has been placed successfully. Please Copy this order number{" "}
					{<CopyToClipboardButton content={location?.state?.data.orderId} />}{" "}
					and send the payment of{" "}
					<span className="bg-white italic text-[15px]">Rs {totalPayment}</span>{" "}
					to the below QR.
				</>
			}
			extra={[
				<div className="flex flex-col gap-4 items-center">
					<Payment id={location?.state?.data?.orderId} />
					<Button type="primary" key="console" onClick={() => navigate("/")}>
						Go Home
					</Button>
				</div>,
			]}
			className="lg:w-1/2"
		/>
	);
};

export default Success;
