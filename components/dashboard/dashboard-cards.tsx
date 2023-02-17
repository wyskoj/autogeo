import { OperationInstance } from '../../types/operation-instance';
import { VStack } from '@chakra-ui/react';
import { OperationDisplayCard } from './operation-display';

/**
 * Displays the main dashboard by using a card format. This is shown at breakpoints
 * of 'md' and below. At larger breakpoints, the dashboard is displayed using `DashboardByTable`.
 *
 * @param props.instances The list of operation instances to display.
 * @param props.setInstances A function to set the list of operation instances.
 */
export default function DashboardByCards(props: {
	instances: OperationInstance[];
	setInstances: (instances: OperationInstance[]) => void;
}) {
	function onOpen() {}

	return (
		<VStack>
			{props.instances.map((instance, index) => (
				<OperationDisplayCard
					key={index}
					instance={instance}
					onDelete={() => {}}
					onOpen={onOpen}
				/>
			))}
		</VStack>
	);
}
