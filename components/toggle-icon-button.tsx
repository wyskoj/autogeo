import { IconButton } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

/**
 * A button that toggles between two icons. The icons are passed in as props.
 *
 * @param props.iconFalse The icon to display when the button is false.
 * @param props.iconTrue The icon to display when the button is true.
 * @param props.ariaLabel The aria label for the button.
 * @param props.value The value of the button.
 * @param props.onClick The function to call when the button is clicked.
 *
 * @returns A button that toggles between two icons.
 *
 * @example
 * <ToggleIconButton
 * 		iconFalse={<Icon as={FaMoon} />}
 * 		iconTrue={<Icon as={FaSun} />}
 * 		ariaLabel="Toggle dark mode"
 * 		value={isDarkMode}
 * 		onClick={toggleColorMode}
 * />
 */
export default function ToggleIconButton(props: {
	iconFalse: ReactElement;
	iconTrue: ReactElement;
	ariaLabel: string;
	value: boolean;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
	return (
		<IconButton
			aria-label={props.ariaLabel}
			icon={props.value ? props.iconTrue : props.iconFalse}
			onClick={props.onClick}
			variant={props.value ? 'solid' : 'ghost'}
		/>
	);
}
