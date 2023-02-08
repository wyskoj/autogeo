import { useState } from 'react';
import {
	Flex,
	HStack,
	NumberInput,
	NumberInputField,
	Text,
} from '@chakra-ui/react';

export default function AngleInput(props: {
	onChange: (newValue: number) => void;
}) {
	const [degrees, setDegrees] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	function dd(d: number, m: number, s: number): number {
		return d + m / 60 + s / 3600;
	}

	return (
		<HStack width={'24rem'}>
			<NumberInput
				onChange={e => {
					setDegrees(Number(e));
					props.onChange(dd(Number(e), minutes, seconds));
				}}
			>
				<NumberInputField />
			</NumberInput>
			<Text fontSize={'xl'}>°</Text>
			<NumberInput
				min={0}
				max={59}
				onChange={e => {
					setMinutes(Number(e));
					props.onChange(dd(degrees, Number(e), seconds));
				}}
			>
				<NumberInputField />
			</NumberInput>
			<Text fontSize={'xl'}>&apos;</Text>
			<NumberInput
				min={0}
				max={60}
				onChange={e => {
					setSeconds(Number(e));
					props.onChange(dd(degrees, minutes, Number(e)));
				}}
			>
				<NumberInputField />
			</NumberInput>
			<Text fontSize={'xl'}>&quot;</Text>
		</HStack>
	);
}
