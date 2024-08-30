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
					? "w-[350px] min-h-[350px] lg:w-[450px] lg:h-[450px] bg-gray-400 px-[61px] py-[52px] shadow-lg"
					: "bg-gray-200 w-[300] h-[250] py-5"
			}  flex flex-col gap-2.5 items-center rounded-xl`}>
			<div
				className={`${
					isActive ? "w-[200px] h-[200px]" : "w-[100px] h-[100px]"
				} rounded-full bg-gray-600 object-cover`}>
				<img
					src={imgSrc ?? "https://via.placeholder.com/200"}
					alt=""
					className={`${
						isActive ? "w-[200px] h-[200px]" : "w-[100px] h-[100px]"
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
