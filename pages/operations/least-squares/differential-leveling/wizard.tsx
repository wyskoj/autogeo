import CommonPage from '../../../../components/common-page';
import {
	Badge,
	Box,
	Button,
	Checkbox,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	HStack,
	Input,
	Radio,
	RadioGroup,
	Spinner,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import {
	DifferentialLevelingData,
	DifferentialLevelingObservation,
	DifferentialLevelingObservationSchema,
	DifferentialLevelingResultsSchema,
	StationElevation,
	StationElevationSchema,
	WeightingScheme,
	WeightingSchemeDescription,
	WeightingSchemeSchema,
} from '../../../../types/operation/least-squares/differential-leveling';
import MagicTable from '../../../../components/magic-table';
import { router } from 'next/client';
import useLocalStorage from '../../../../hooks/use-local-storage';
import {
	OperationInstance,
	OperationInstanceSchema,
} from '../../../../types/operation-instance';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';

export default function DifferentialLevelingWizard() {
	const [instances, setInstances] = useLocalStorage<OperationInstance[]>(
		'instances',
		z.array(OperationInstanceSchema)
	);
	const [title, setTitle] = useState('');
	const [weightingScheme, setWeightingScheme] =
		useState<WeightingScheme>('unweighted');
	const [benchmarks, setBenchmarks] = useState<StationElevation[]>([]);
	const [observations, setObservations] = useState<
		DifferentialLevelingObservation[]
	>([]);
	const [waiting, setWaiting] = useState(false);
	const toast = useToast();

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
		fetch('/api/operations/least-squares/differential-leveling', {
			body: JSON.stringify(payload),
			method: 'POST',
		})
			.then(x => {
				x.json()
					.then(y => {
						if (instances === undefined) {
							throw new Error('local storage is undefined.');
						}
						const results = DifferentialLevelingResultsSchema.parse(y);
						const instance: OperationInstance = {
							data: payload,
							id: uuid(),
							name: title,
							operation: 'differential-leveling',
							result: results,
							timestamp: new Date().valueOf(),
						};
						setInstances([...(instances ?? []), instance]);
						router.push('/');
					})
					.catch(err => {
						console.error(err);
						toast({
							title: 'Error',
							description: 'An error occurred while performing the operation.',
							status: 'error',
							duration: 5000,
							isClosable: true,
						});
					});
			})
			.catch(err => {
				console.error(err);
				toast({
					title: 'Error',
					description: 'An error occurred while performing the operation.',
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			})
			.finally(() => {
				setWaiting(false);
			});
	}

	return (
		<CommonPage
			title={'Differential Leveling'}
			description={
				'This operation performs a least-squares adjustment on a differential leveling dataset.'
			}
		>
			<VStack spacing={8}>
				{/* Title */}
				<FormControl>
					<FormLabel>
						<Badge mr={2}>1</Badge>Title
					</FormLabel>
					<Input
						type={'text'}
						value={title}
						onChange={e => setTitle(e.target.value.trim())}
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
						<HStack spacing="24px">
							<Radio value="unweighted">Unweighted</Radio>
							<Radio value="normal">Normal</Radio>
							<Radio value="distance">Distances</Radio>
							<Radio value="stddev">Standard deviations</Radio>
						</HStack>
					</RadioGroup>
					<FormHelperText>
						{WeightingSchemeDescription[weightingScheme]}
					</FormHelperText>
				</FormControl>
				{/* Benchmarks */}
				<FormControl>
					<FormLabel>
						<Badge mr={2}>3</Badge>Benchmarks
					</FormLabel>
					<MagicTable<StationElevation>
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
					</FormLabel>
					<MagicTable<DifferentialLevelingObservation>
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
						hideFields={[]}
					/>
				</FormControl>
				<FormControl>
					<FormLabel>
						<Badge mr={2}>5</Badge>Options
					</FormLabel>
					<VStack align={'start'}>
						<Box>
							<Checkbox>Adjust control stations</Checkbox>
						</Box>
						<Box>
							<Checkbox>Compute adjusted observational errors</Checkbox>
						</Box>
						<Box>
							<Checkbox>Perform data snooping</Checkbox>
						</Box>
					</VStack>
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
						Submit
					</Button>
				</FormControl>
			</VStack>
		</CommonPage>
	);
}
