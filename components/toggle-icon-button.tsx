import { IconButton } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

export default function ToggleIconButton(props: {
	iconFalse: ReactElement;
	iconTrue: ReactElement;
	ariaLabel: string;
	value: boolean;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
	return (
		<IconButton
			aria-label="Search database"
			icon={props.value ? props.iconTrue : props.iconFalse}
			onClick={props.onClick}
			variant={props.value ? 'solid' : 'ghost'}
		/>
	);
}
