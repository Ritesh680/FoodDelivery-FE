import { useEffect, useState } from "react";
import { StarIcon } from "../../assets/icons";

const Banner = ({ bannerItems }: { bannerItems: string[] }) => {
	const [dummyBannerItems, setDummybannerItems] = useState(bannerItems);

	useEffect(() => {
		if (dummyBannerItems.length < 6) {
			const newBannerItems = bannerItems.slice(0, 6 - dummyBannerItems.length);
			const updatedDummyBannerItems = [...dummyBannerItems, ...newBannerItems];

			setDummybannerItems(updatedDummyBannerItems);
		}
	}, [bannerItems, dummyBannerItems]);

	return (
		<div className="bg-gradient-to-r from-[#FFD600] to-[#C50202] ] my-4 py-[20.5px] overflow-hidden">
			<div className="flex gap-10 px-4">
				{dummyBannerItems.map((item, index) => (
					<div
						key={index}
						className="text-center text-black text-sm flex items-center gap-2 text-nowrap font-bold">
						<StarIcon />
						{item}
					</div>
				))}
			</div>
		</div>
	);
};

export default Banner;
