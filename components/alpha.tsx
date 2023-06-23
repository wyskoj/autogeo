import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/react';

export default function AlphaAlert() {
	return (
		<Alert status={'warning'} borderRadius={'lg'}>
			<AlertIcon />
			<AlertDescription>
				AutoGeo is currently in alpha. Some features may not be available.
			</AlertDescription>
		</Alert>
	);
}