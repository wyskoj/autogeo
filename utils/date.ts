export default function timestampFormat(timestamp: number): string {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	// make hours into 12-hour format
	const hours12 = hours % 12 || 12;
	return `${month}/${day}/${year} ${hours12}:${('00' + minutes).slice(
		-2
	)} ${ampm}`;
}
