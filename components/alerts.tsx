import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/react';

/**
 * Renders an alert component with a warning status, and a message indicating that the software is currently in alpha.
 * Some features may not be available.
 */
export function AlphaAlert(): JSX.Element {
	return (
		<Alert status={'warning'} borderRadius={'lg'}>
			<AlertIcon />
			<AlertDescription>
				AutoGeo is currently in alpha. Some features may not be available.
			</AlertDescription>
		</Alert>
	);
}

/**
 * Creates an alert indicating that the operation does not support loading ADJUST files.
 */
export function MissingAdjustSupportAlert(): JSX.Element {
	return <Alert
		status='warning'
		borderRadius={'lg'}
	>
		<AlertIcon />
		<AlertDescription>
			This operation does not yet support loading ADJUST files.
		</AlertDescription>
	</Alert>;
}