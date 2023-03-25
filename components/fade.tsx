import { motion } from 'framer-motion';

export function Fade(props: { children: JSX.Element }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 3 }}
		>
			{props.children}
		</motion.div>
	);
}
