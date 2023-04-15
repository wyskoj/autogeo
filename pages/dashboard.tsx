import { Button, Center, Show, Spinner, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import CommonPage from '../components/common-page';
import DashboardByTable from '../components/dashboard/dashboard-table';
import DashboardByCards from '../components/dashboard/dashboard-cards';
import { useOperationInstances } from '../hooks/use-operation-instances';

export default function Dashboard() {
	const { operationInstances, updateInstance } = useOperationInstances();

	function display() {
		if (operationInstances === null) {
			return (
				<Center>
					<Center>
						<Spinner size="xl" />
					</Center>
				</Center>
			);
		} else if (operationInstances?.length === 0) {
			return (
				<Center>
					<Text>No operations yet. ☹️ Go start one!</Text>
				</Center>
			);
		} else {
			return (
				<>
					<Show above={'lg'}>
						<DashboardByTable
							instances={operationInstances}
							updateInstance={updateInstance}
						/>
					</Show>
					<Show below={'lg'}>
						<DashboardByCards
							instances={operationInstances}
							updateInstance={updateInstance}
						/>
					</Show>
				</>
			);
		}
	}

	return (
		<CommonPage
			title={'🛠️ All operations'}
			description={'View, edit, and export all previously executed operations.'}
			action={
				<Link href={'/operations'}>
					<Button
						leftIcon={<AddIcon />}
						className={
							operationInstances && operationInstances.length === 0
								? 'glow'
								: ''
						}
					>
						Start new operation
					</Button>
				</Link>
			}
		>
			{display()}
		</CommonPage>
	);
}
