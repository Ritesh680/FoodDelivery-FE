// src/components/ProgressBar.tsx

import React from "react";

interface ProgressBarProps {
	progress: number; // Progress as a percentage (0 to 100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
	return (
		<div className="relative pt-1 mt-10">
			<div
				className="absolute -top-10 left-0 w-10 h-10 bg-white"
				style={{ left: `${progress - 3}%` }}>
				<img src="/logo.jpeg" alt="logo image" className="h-10" />
			</div>
			<div className="flex">
				<div className="w-full bg-gray-200 rounded-full h-2.5">
					<div
						className="bg-red-600 h-2.5 rounded-full"
						style={{ width: `${progress}%` }}></div>
				</div>
			</div>
		</div>
	);
};

export default ProgressBar;
