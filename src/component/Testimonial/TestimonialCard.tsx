const TestimonialCard = ({
	imgSrc,
	name,
	details,
	isActive = true,
}: {
	imgSrc: string;
	name: string;
	details: string;
	isActive?: boolean;
}) => {
	return (
		<div
			className={`${
				isActive
					? "w-[300px] min-h-[300px] lg:w-[400px] lg:h-[450px] bg-gray-400 px-10 py-12 shadow-lg"
					: "bg-gray-200 w-[200] h-[150] py-5 px-5"
			}  flex flex-col gap-2.5 items-center rounded-xl`}>
			<div
				className={`${
					isActive ? "w-[150px] h-[150px]" : "w-[100px] h-[100px]"
				} rounded-full bg-gray-600 object-cover`}>
				<img
					src={imgSrc ?? "https://via.placeholder.com/200"}
					alt=""
					className={`${
						isActive ? "w-[150px] h-[150px]" : "w-[100px] h-[100px]"
					} rounded-full  object-cover`}
				/>
			</div>

			<div className="flex flex-col items-center gap-5">
				<span className="text-center text-white font-semibold text-xl">
					{name ?? "Name"}
				</span>
				<span className="text-center text-white text-base min-h-24 overflow-clip">
					{details ??
						"Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit a"}
				</span>
			</div>
		</div>
	);
};

export default TestimonialCard;
