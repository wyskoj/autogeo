import {
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Th,
	Thead,
	Tr,
	useToast,
} from '@chakra-ui/react';
import { OperationDisplayRow } from './operation-display-row';
import { OperationInstance } from '../../operation/operation-instance';

/**
 * Displays the main dashboard by using a table format. This is shown at breakpoints
 * of 'lg' and above. At smaller breakpoints, the dashboard is displayed using `DashboardByCards`.
 *
 * @param props.instances The list of operation instances to display.
 * @param props.setInstances A function to set the list of operation instances.
 */
export default function DashboardByTable(props: {
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
		<TableContainer>
			<Table variant="simple">
				{!props.instances || props.instances?.length === 0 ? (
					<TableCaption>No operations yet. ☹️ Go start one!</TableCaption>
				) : (
					<></>
				)}
				<Thead>
					<Tr>
						<Th>Operation</Th>
						<Th>Name</Th>
						<Th>Date created</Th>
						<Th>Details</Th>
					</Tr>
				</Thead>
				<Tbody>
					{props.instances?.map((instance, i) => {
						return (
							<OperationDisplayRow
								key={instance.id}
								instance={instance}
								onDelete={() => deleteInstance(instance)}
								onOpen={() => markInstanceRead(instance)}
							/>
						);
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
