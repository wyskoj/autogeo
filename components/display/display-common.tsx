import {
	Badge,
	Box, Center,
	Heading,
	HStack, Spinner,
	StackDivider, Text,
	VStack
} from '@chakra-ui/react';

/** A record with a label and value. */
type Record = { label: any; value: any; condensed?: boolean };

/** A list of properties and results. */
type DataResultsProps = {
	/** A list of data inputs. */
	data: Record[];
	/** A list of results. */
	result: Record[];
};

/**
 * Displays a list of properties and results in a 2 column layout with a divider,
 * with each property/result being a label and value.
 */
export function DataResult(props: DataResultsProps) {
	return (
		<HStack
			divider={<StackDivider />}
			spacing={4}
			align={'start'}
			width={'100%'}
		>
			<VStack
				align={'start'}
				spacing={4}
				width={'50%'}
			>
				<Group>Data</Group>
				{props.data.map((item, i) => {
					if (typeof item.value === 'object') {
						return (
							<VStack
								w={'100%'}
								align={'start'}
								key={i}
							>
								<Label>{item.label}</Label>
								{item.value}
							</VStack>
						);
					} else {
						return (
							<Property
								label={item.label}
								value={item.value}
								key={i}
								condensed={item.condensed ?? false}
							/>
						);
					}
				})}
			</VStack>
			<VStack
				align={'start'}
				spacing={4}
				width={'50%'}
			>
				<Group>Results</Group>
				{props.result.map(function (item, i) {
					if (typeof item.value === 'object') {
						return (
							<VStack
								w={'100%'}
								align={'start'}
								key={i}
							>
								<Label>{item.label}</Label>
								{item.value}
							</VStack>
						);
					} else {
						return (
							<Property
								label={item.label}
								value={item.value}
								key={i}
								condensed={item.condensed ?? false}
							/>
						);
					}
				})}
			</VStack>
		</HStack>
	);
}

export function DisplaySpinner() {
	return <Center><Spinner size={'xl'} /></Center>;
}

function Property(props: { label: any; value: any; condensed:boolean }) {
	return (
		<Box w={'100%'}>
			<Label>{props.label}</Label>
			<Value condensed={props.condensed}>{props.value}</Value>
		</Box>
	);
}

function Value(props: { children: any; condensed: boolean }) {
	if (props.condensed) {
		return <Badge
			fontSize={'md'}
			p={2}
			mt={1}
			style={{ whiteSpace: 'pre-wrap' }}
			w={'100%'}
		>
			{props.children}
		</Badge>
	} else {
		return (
			<Badge
				fontSize={'lg'}
				p={1.5}
				mt={1}
				w={'100%'}
			>
				{props.children}
			</Badge>
		);
	}
}

function Label(props: { children: any }) {
	return (
		<Heading
			as="h5"
			size="sm"
			fontWeight={'semibold'}
		>
			{props.children}
		</Heading>
	);
}

function Group(props: { children: any }) {
	return (
		<Heading
			as="h4"
			size="md"
		>
			{props.children}
		</Heading>
	);
}
