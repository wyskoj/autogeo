import {
	Badge,
	Box,
	Heading,
	HStack,
	StackDivider,
	VStack,
} from '@chakra-ui/react';

/** A record with a label and value. */
type Record = { label: any; value: any };

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
							/>
						);
					}
				})}
			</VStack>
		</HStack>
	);
}

function Property(props: { label: any; value: any }) {
	return (
		<Box>
			<Label>{props.label}</Label>
			<Value>{props.value}</Value>
		</Box>
	);
}

function Value(props: { children: any }) {
	return (
		<Badge
			fontSize={'lg'}
			p={1}
			mt={1}
		>
			{props.children}
		</Badge>
	);
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
