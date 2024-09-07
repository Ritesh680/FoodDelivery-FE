import { useEffect, useState } from "react";

const useInnerWidth = () => {
	const [isMobileDevice, setIsMobileDevice] = useState(checkInnerWidth());
	function checkInnerWidth() {
		return window.innerWidth < 768;
	}

	useEffect(() => {
		const handleResize = () => {
			setIsMobileDevice(checkInnerWidth());
		};

		window.addEventListener("resize", handleResize);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return { isMobileDevice };
};
export default useInnerWidth;
