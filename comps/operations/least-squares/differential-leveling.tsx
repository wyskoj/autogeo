import { CheckIcon, WarningIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Icon, useColorModeValue } from '@chakra-ui/react';
import { FaSkullCrossbones } from 'react-icons/fa';

export function InterpretRefStdDev(refStdDev: number): string {
	if (refStdDev <= 0.1) {
		return 'green';
	} else if (refStdDev <= 1) {
		return 'yellow';
	} else {
		return 'red';
	}
}

export function InterpretRefStdDevSymbol(props: { refStdDev: number }) {
	const green = useColorModeValue('green.800', 'green.200');
	const yellow = useColorModeValue('yellow.500', 'yellow.200');
	const red = useColorModeValue('red.800', 'red.200');
	if (props.refStdDev < 0.1) {
		return (
			<CheckIcon
				color={green}
				ml={2}
			/>
		);
	} else if (props.refStdDev < 1) {
		return (
			<WarningIcon
				color={yellow}
				ml={2}
			/>
		);
	} else if (props.refStdDev < 10) {
		return (
			<WarningTwoIcon
				color={red}
				ml={2}
			/>
		);
	} else {
		return (
			<Icon
				as={FaSkullCrossbones}
				color={red}
				ml={2}
			/>
		);
	}
}
