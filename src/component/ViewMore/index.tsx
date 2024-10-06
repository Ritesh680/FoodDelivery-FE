import { ArrowRightOutlined } from "@ant-design/icons";

const ViewMore = ({ handleClick }: { handleClick?: () => void }) => {
	return (
		<button
			className="flex gap-2 justify-center items-center lg:min-w-[305px] min-w-[160px] bg-white card rounded shadow hover:shadow-xl hover:text-red-500"
			onClick={handleClick}>
			<span className="text-xl">View More</span>
			<ArrowRightOutlined />
		</button>
	);
};

export default ViewMore;
