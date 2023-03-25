import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../utils/animation';

export function StaggerContainer(props: {
	children: JSX.Element | JSX.Element[];
}) {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={staggerContainer}
		>
			{props.children}
		</motion.div>
	);
}

export function StaggerItem(props: {
	children: JSX.Element | JSX.Element[];
	style?: any;
}) {
	return (
		<motion.div
			variants={staggerItem}
			style={props.style ?? {}}
		>
			{props.children}
		</motion.div>
	);
}
