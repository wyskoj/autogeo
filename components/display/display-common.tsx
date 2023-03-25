import {
	Badge,
	Box,
	Heading,
	HStack,
	StackDivider,
	VStack,
} from '@chakra-ui/react';

export function DataAndResults(props: {
	data: { label: any; value: any }[];
	results: { label: any; value: any }[];
}) {
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
				{props.results.map(function (item, i) {
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

export function Property(props: { label: any; value: any }) {
	return (
		<Box>
			<Label>{props.label}</Label>
			<Value>{props.value}</Value>
		</Box>
	);
}

export function Value(props: { children: any }) {
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

export function Label(props: { children: any }) {
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

export function Group(props: { children: any }) {
	return (
		<Heading
			as="h4"
			size="md"
		>
			{props.children}
		</Heading>
	);
}
