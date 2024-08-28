import { PropsWithChildren } from "react";
import ContentHeader from ".";

const ContentWrapper = ({
	title,
	children,
}: PropsWithChildren<{ title: string }>) => {
	return (
		<div className=" flex flex-col gap-10 items-center overflow-auto">
			<ContentHeader title={title} />

			{children}
		</div>
	);
};

export default ContentWrapper;
