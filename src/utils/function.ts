export function getCookie(name: string) {
	let value = null;
	const allCookies = document.cookie;

	const cookies = allCookies.split(`;`);
	cookies.forEach(function (cookie) {
		const parts = cookie.split("=");
		if (parts[0] === name) {
			value = parts.slice(1).join("");
		}
	});

	return value;
}
