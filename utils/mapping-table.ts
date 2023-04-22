export function VI(n: number): number {
	if (n < VITable.length) {
		return VITable[n];
	} else {
		return VIFun(n);
	}
}

function VIFun(n: number): number {
	if (n == 0) {
		return 0;
	} else {
		return VIFun(n - 1) + n;
	}
}

const VITable: number[] = [
	0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91, 105, 120, 136, 153, 171,
	190, 210, 231, 253, 276, 300, 325, 351, 378, 406, 435, 465, 496, 528, 561,
	595, 630, 666, 703, 741, 780, 820, 861, 903, 946, 990, 1035, 1081, 1128, 1176,
	1225, 1275, 1326, 1378, 1431,
];