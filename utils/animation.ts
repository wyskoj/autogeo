export const staggerItem = {
	hidden: { y: 10, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};
export const staggerContainer = {
	visible: {
		transition: {
			delayChildren: 0.2,
			staggerChildren: 0.1,
		},
	},
};
