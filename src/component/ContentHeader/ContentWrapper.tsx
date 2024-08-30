import { PropsWithChildren } from "react";
import ContentHeader from ".";

const ContentWrapper = ({
	title,
	children,
}: PropsWithChildren<{ title: string }>) => {
	return (
		<div className=" flex flex-col gap-5 items-center py-5 overflow-hidden">
			<ContentHeader title={title} />

			{children}
		</div>
	);
};

export default ContentWrapper;
