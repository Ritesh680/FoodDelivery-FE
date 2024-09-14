import React from "react";
import { Button, Result } from "antd";
import { useLocation, useNavigate } from "react-router";

const Success: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<Result
			status="success"
			title="Success"
			subTitle={`Order number: ${location.state.data._id} Please wait for confirmation of the delivery`}
			extra={[
				<Button type="primary" key="console" onClick={() => navigate("/")}>
					Go Home
				</Button>,
			]}
		/>
	);
};

export default Success;
