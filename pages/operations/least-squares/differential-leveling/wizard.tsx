import CommonPage from '../../../../components/common-page';
import {
	Badge,
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	Radio,
	RadioGroup,
	Spinner,
	Stack,
	VStack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import DataEntryTable from '../../../../components/data-entry-table';
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';
import {
	BenchmarkHelp,
	ObservationHelp,
	WeightingSchemeHelp,
} from '../../../../components/help/least-squares/differential-leveling';
import { GetServerSidePropsContext } from 'next';
import { PreloadEditProps } from '../../../../types/operation/preload-props';
import { useOperationInstances } from '../../../../hooks/use-operation-instances';
import DifferentialLevelingComp from '../../../../operation/least-squares/differential-leveling/differential-leveling-comp';
import {
	DifferentialLevelingData,
	DifferentialLevelingObservation,
	DifferentialLevelingObservationSchema,
	WeightingScheme,
	WeightingSchemeDescription,
	WeightingSchemeSchema,
} from '../../../../operation/least-squares/differential-leveling/differential-leveling-data';
import {
	StationElevation,
	StationElevationSchema,
} from '../../../../operation/misc/station-elevation';
import { OperationInstance } from '../../../../operation/operation-instance';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const edit = context.query['edit'];
	return {
		props: {
			edit: edit ? (Array.isArray(edit) ? edit[0] : edit) : null,
		} satisfies PreloadEditProps,
	};
}

export default function DifferentialLevelingWizard(props: PreloadEditProps) {
	const router = useRouter();
	const { operationInstances, createInstance, updateInstance } =
		useOperationInstances();

	// FORM DATA
	const [title, setTitle] = useState('');
	const [weightingScheme, setWeightingScheme] =
		useState<WeightingScheme>('unweighted');
	const [benchmarks, setBenchmarks] = useState<StationElevation[]>([]);
	const [observations, setObservations] = useState<
		DifferentialLevelingObservation[]
	>([]);
	const [waiting, setWaiting] = useState(false);

	function buildPayload(): DifferentialLevelingData {
		return {
			weightingScheme,
			benchmarks,
			observations,
		};
	}

	function submit() {
		setWaiting(true);
		const payload = buildPayload();

		const instance: OperationInstance = {
			data: payload,
			id: props.edit ?? uuid(),
			name: title.trim(),
			operation: 'differential-leveling',
			result: DifferentialLevelingComp(payload),
			timestamp: new Date().valueOf(),
			new: true,
		};

		if (!props.edit) {
			createInstance(instance);
		} else {
			updateInstance(props.edit, instance);
		}

		router.push('/dashboard');
	}

	// preload content
	useEffect(() => {
		if (props.edit && operationInstances) {
			const instance = operationInstances.find(
				instance => instance.id === props.edit
			);
			if (instance) {
				const data = instance.data as DifferentialLevelingData;
				setTitle(instance.name);
				setWeightingScheme(data.weightingScheme);
				setBenchmarks(data.benchmarks);
				setObservations(data.observations);
			}
		}
	}, [operationInstances, props.edit]);

	return (
		<CommonPage
			title={'Differential Leveling'}
			description={
				'This operation performs a least-squares adjustment on a differential leveling dataset.'
			}
		>
			<>
				<VStack spacing={8}>
					{/* Title */}
					<FormControl>
						<FormLabel>
							<Badge mr={2}>1</Badge>Title
						</FormLabel>
						<Input
							type={'text'}
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
						<FormHelperText>
							Use a name that uniquely identifies this operation.
						</FormHelperText>
						<FormErrorMessage>Title is required.</FormErrorMessage>
					</FormControl>
					{/* Weighting Scheme */}
					<FormControl>
						<FormLabel>
							<Badge mr={2}>2</Badge>Weighting scheme
							<WeightingSchemeHelp />
						</FormLabel>
						<RadioGroup
							defaultValue="unweighted"
							onChange={nextValue => {
								try {
									setWeightingScheme(WeightingSchemeSchema.parse(nextValue));
								} catch (e) {
									console.warn('Attempt to set weighting scheme failed.', e);
								}
							}}
							value={weightingScheme}
						>
							<Stack direction={['column', 'column', 'row']}>
								<Radio value="unweighted">Unweighted</Radio>
								<Radio value="normal">Normal</Radio>
								<Radio value="distance">Distances</Radio>
								<Radio value="stddev">Standard deviations</Radio>
							</Stack>
						</RadioGroup>
						<FormHelperText>
							{WeightingSchemeDescription[weightingScheme]}
						</FormHelperText>
					</FormControl>
					{/* Benchmarks */}
					<FormControl>
						<FormLabel>
							<Badge mr={2}>3</Badge>Benchmarks
							<BenchmarkHelp />
						</FormLabel>
						<DataEntryTable<StationElevation>
							schema={StationElevationSchema}
							rows={benchmarks}
							setRows={setBenchmarks}
							validation={(data, rows) => {
								return {
									station: rows.some(it => it.station === data.station)
										? 'Station name must be unique.'
										: null,
									elevation: null,
								};
							}}
							transform={{
								station: data => {
									return data.trim();
								},
								elevation: data => {
									return data;
								},
							}}
							helperText={'Enter stations with known elevations.'}
						/>
					</FormControl>
					{/* Observations */}
					<FormControl>
						<FormLabel>
							<Badge mr={2}>4</Badge>Observations
							<ObservationHelp />
						</FormLabel>
						<DataEntryTable<DifferentialLevelingObservation>
							rows={observations}
							setRows={setObservations}
							schema={DifferentialLevelingObservationSchema}
							validation={data => {
								if (data.from === data.to) {
									return {
										from: 'From and to stations must be different.',
										to: 'From and to stations must be different.',
										deltaElevation: null,
										weight: null,
									};
								}
								return {
									from: null,
									to: null,
									deltaElevation: null,
									weight: null,
								};
							}}
							transform={{
								from: data => {
									return data.trim();
								},
								to: data => {
									return data.trim();
								},
								deltaElevation: data => {
									return data;
								},
								weight: data => {
									return data;
								},
							}}
							helperText={
								'Enter observations—a difference in elevation between two stations.'
							}
							customNames={{
								from: 'From',
								to: 'To',
								deltaElevation: 'Δ Elevation',
								weight: 'Weight',
							}}
							hideFields={
								weightingScheme === 'unweighted' ? ['weight'] : undefined
							}
						/>
					</FormControl>
					<FormControl>
						<Button
							leftIcon={waiting ? <Spinner size={'sm'} /> : <CheckIcon />}
							isDisabled={
								!title.length ||
								!benchmarks.length ||
								!observations.length ||
								waiting
							}
							onClick={submit}
						>
							{props.edit ? 'Save changes' : 'Submit'}
						</Button>
					</FormControl>
				</VStack>
			</>
		</CommonPage>
	);
}
