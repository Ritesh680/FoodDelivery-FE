/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontSize: {
				xxs: {
					fontSize: "10px",
					lineHeight: "13px",
				},
			},
		},
	},
	plugins: [],
};
