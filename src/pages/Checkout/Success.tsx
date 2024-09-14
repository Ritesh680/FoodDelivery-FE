import React, { useEffect } from "react";
import Success from "../../component/Success";
import { useNavigate } from "react-router";

const SuccessPage = () => {
	const [count, setCount] = React.useState(20);
	const navigate = useNavigate();

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prev) => prev - 1);
			if (count === 0) {
				navigate("/");
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [navigate, count]);
	return (
		<div className="flex flex-col items-center justify-center w-full">
			<Success />
			<span className="">Redirecting in {count}</span>
		</div>
	);
};

export default SuccessPage;
