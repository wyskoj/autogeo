import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

const variants = {
	out: {
		opacity: 0,
		y: 10,
		transition: {
			duration: 0.15,
		},
	},
	in: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.15,
			delay: 0.15,
		},
	},
};

export function Transition(props: { children: JSX.Element }) {
	const { asPath } = useRouter();

	return (
		<div className="effect-1">
			<AnimatePresence
				initial={false}
				exitBeforeEnter
			>
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
