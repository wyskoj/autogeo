import { HStack, NumberInput, NumberInputField, Text } from '@chakra-ui/react';
import DMS from '../types/dms';

export default function AngleInput(props: {
	DMS: DMS;
	setDMS: {
		setD: (d: number) => void;
		setM: (m: number) => void;
		setS: (s: number) => void;
	};
}) {
	return (
		<HStack width={'24rem'}>
			<NumberInput
				min={0}
				max={360}
				value={props.DMS.d ?? ''}
				onChange={e => {
					props.setDMS.setD(Number(e));
				}}
			>
				<NumberInputField />
			</NumberInput>
			<Text fontSize={'xl'}>°</Text>
			<NumberInput
				value={props.DMS.m ?? ''}
				min={0}
				max={59}
				onChange={e => {
					props.setDMS.setM(Number(e));
				}}
			>
				<NumberInputField />
			</NumberInput>
			<Text fontSize={'xl'}>&apos;</Text>
			<NumberInput
				value={props.DMS.s ?? ''}
				min={0}
				max={60}
				onChange={e => {
					props.setDMS.setS(Number(e));
				}}
			>
				<NumberInputField />
			</NumberInput>
			<Text fontSize={'xl'}>&quot;</Text>
		</HStack>
	);
}
