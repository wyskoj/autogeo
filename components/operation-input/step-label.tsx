import { Badge, FormLabel } from '@chakra-ui/react';

interface StepLabelProps {
	stepNumber: number,
	title: string
}

/**
 * Renders a step label with a badge and title
 */
export default function StepLabel(props: StepLabelProps) {
	return <FormLabel>
		<Badge mr={2}>{props.stepNumber}</Badge>{props.title}
	</FormLabel>;
}