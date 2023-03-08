import { useRouter } from 'next/router';
import { AnimatePresence, motion, Variants } from 'framer-motion';

const variants: Variants = {
	out: {
		opacity: 0,
		y: 15,
	},
	in: {
		opacity: 1,
		y: 0,
	},
};

export function Transition(props: { children: JSX.Element }) {
	const { asPath } = useRouter();

	return (
		<div className="effect-1">
			<AnimatePresence mode="wait">
				<motion.div
					key={asPath}
					variants={variants}
					animate="in"
					initial="out"
					exit="out"
				>
					{props.children}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
