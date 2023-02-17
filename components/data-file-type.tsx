import {
	Badge,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Heading,
	Icon,
	SimpleGrid,
} from '@chakra-ui/react';
import { MdAutoFixHigh, MdTextSnippet, MdUpload } from 'react-icons/md';
import { IconType } from 'react-icons';
import { Operation } from '../types/operation';
import Link from 'next/link';

export default function DataFileType(props: { operation: Operation }) {
	return (
		<SimpleGrid
			minChildWidth="200px"
			spacing={4}
		>
			<Option
				icon={MdUpload}
				title={'Upload ADJUST file'}
				description={
					'Upload and convert pre-existing files used in the ADJUST software package.'
				}
				actionName={'Start'}
				actionLink={{
					pathname: '/operations/upload',
					query: { operation: props.operation },
				}}
			/>
			<Option
				icon={MdAutoFixHigh}
				title={'Start a wizard'}
				description={
					'Use a step-by-step form to enter information in a guided experience. No ADJUST knowledge needed.'
				}
				actionName={'Start'}
				badge={'Recommended'}
				actionLink={`${props.operation}/wizard`}
			/>
			<Option
				icon={MdTextSnippet}
				title={'Create manually'}
				description={`Enter data in ADJUST's format in a plain text editor. Documentation is provided.`}
				actionName={'Start'}
				actionLink={{
					pathname: '/operations/plain',
					query: { operation: props.operation },
				}}
			/>
		</SimpleGrid>
	);
}

function Option(props: {
	icon: IconType;
	title: string;
	description: string;
	actionName: string;
	actionLink: string | { pathname: string; query?: { [name: string]: string } };
	badge?: string;
}) {
	return (
		<Card>
			<CardHeader>
				<Flex>
					<Icon
						as={props.icon}
						fontSize={20}
						mr={2}
					/>
					<Heading
						as="h4"
						size="md"
					>
						{props.title}
						<Badge
							colorScheme={'green'}
							ml={2}
						>
							{props.badge}
						</Badge>
					</Heading>
				</Flex>
			</CardHeader>
			<CardBody>{props.description}</CardBody>
			<CardFooter>
				<Link href={props.actionLink}>
					<Button>{props.actionName}</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
