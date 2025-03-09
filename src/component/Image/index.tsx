import {
	LazyLoadImage,
	LazyLoadImageProps,
} from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";

const Image = ({ ...props }: LazyLoadImageProps) => {
	const replaceSrc = (oldLink?: string) =>
		oldLink && typeof oldLink === "string"
			? oldLink.replace(
					/backend.chickendeliverynepal.com/g,
					"be.primecuts.com.np"
			  )
			: oldLink;

	return (
		<LazyLoadImage
			effect="blur"
			loading="lazy"
			onError={(e) => {
				e.currentTarget.src = "https://placehold.co/600x400";
			}}
			wrapperProps={{
				// If you need to, you can tweak the effect transition using the wrapper style.
				style: { transitionDelay: "1ms" },
			}}
			useIntersectionObserver
			{...props}
			src={replaceSrc(props.src)}
		/>
	);
};

export default Image;
