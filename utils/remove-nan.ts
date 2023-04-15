export function removeNaN(input: any) {
	let obj = input
	for (let key in obj) {
		if (typeof obj[key] === 'number' && isNaN(obj[key])) {
			delete obj[key];
		}
		if (typeof obj[key] === 'object') {
			obj[key] = removeNaN(obj[key]);
		}
	}
	return obj
}