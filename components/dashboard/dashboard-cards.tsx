import { OperationInstance } from '../../types/operation-instance';
import { useToast, VStack } from '@chakra-ui/react';
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
	updateInstance: (id: string, instance: OperationInstance | null) => void;
}) {
	const toast = useToast();

	function deleteInstance(instance: OperationInstance) {
		props.updateInstance(instance.id, null);
		toast({
			title: 'Operation deleted.',
			description: `"${instance.name}" has been deleted.`,
			status: 'info',
			duration: 5000,
			isClosable: true,
		});
	}

	function markInstanceRead(instance: OperationInstance) {
		if (!props.instances) return;
		props.updateInstance(instance.id, {
			...instance,
			new: false,
		});
	}

	return (
		<VStack>
			{props.instances.map((instance, index) => (
				<OperationDisplayCard
					key={index}
					instance={instance}
					onDelete={() => {
						deleteInstance(instance);
					}}
					onOpen={() => {
						markInstanceRead(instance);
					}}
				/>
			))}
		</VStack>
	);
}
