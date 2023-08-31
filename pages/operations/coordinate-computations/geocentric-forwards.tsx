import {
	Button, FormControl, FormErrorMessage, FormHelperText, HStack, Input, Radio, RadioGroup, Spinner, Stack, Text, VStack
} from '@chakra-ui/react';
import CommonPage from '../../../components/common-page';
import { useEffect, useState } from 'react';
import EllipsoidSelect from '../../../components/ellipsoid-select';
import AngleInput from '../../../components/angle-input';
import { CheckIcon } from '@chakra-ui/icons';
import { GetServerSidePropsContext } from 'next';
import useDMS from '../../../hooks/use-dms';
import {
	decimalToRadians, DMStoDecimal, DMSToRadiansT, radiansToDMS, radiansToLat, radiansToLon
} from '../../../utils/angle';
import { PreloadEditProps } from '../../../types/operation/preload-props';
import { useOperationInstances } from '../../../hooks/use-operation-instances';
import { v4 as uuid } from 'uuid';
import router from 'next/router';
import {
	EllipsoidName, LatitudeHemisphere, LongitudeHemisphere
} from '../../../operation/misc/ellipsoid/ellipsoid-types';
import GeocentricForwardsComp
	from '../../../operation/coordinate-computations/geocentric-forwards/geocentric-forwards-comp';
import {
	GeocentricForwardsData
} from '../../../operation/coordinate-computations/geocentric-forwards/geocentric-forwards-data';
import { OperationDescription, OperationName } from '../../../operation/operation';
import { MissingAdjustSupportAlert } from '../../../components/alerts';
import StepLabel from '../../../components/operation-input/step-label';
import { FormFactory } from '../../../components/form-factory';
import {
	GeocentricForwardsResult
} from '../../../operation/coordinate-computations/geocentric-forwards/geocentric-forwards-result';
import { EllipsoidNameSchema } from '../../../operation/misc/ellipsoid/ellipsoid-types';
import { LatitudeSchema, LongitudeSchema } from '../../../components/form-components';
import GeocentricForwardsDisplay
	from '../../../operation/coordinate-computations/geocentric-forwards/geocentric-forwards-display';
import { z } from 'zod';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const edit = context.query['edit'];
	return {
		props: {
			edit: edit ? (Array.isArray(edit) ? edit[0] : edit) : null
		} satisfies PreloadEditProps
	};
}

export default function GeocentricForwardsWizard(props: PreloadEditProps) {
	const { createInstance, operationInstances } = useOperationInstances();

	// FORM DATA
	const [title, setTitle] = useState<string | null>(null);
	const [ellipsoid, setEllipsoid] = useState<EllipsoidName | null>(null);
	const [latitudeHemisphere, setLatitudeHemisphere] = useState<LatitudeHemisphere>('N');
	const [longitudeHemisphere, setLongitudeHemisphere] = useState<LongitudeHemisphere>('W');
	const [latitudeDMS, setLatDMS, setLatDD] = useDMS();
	const [longitudeDMS, setLonDMS, setLonDD] = useDMS();
	const [height, setHeight] = useState<number | null>(null);

	const [waiting, setWaiting] = useState(false);

	function validate() {
		if (!ellipsoid || !title) return false;
		const payload: GeocentricForwardsData = {
			ellipsoid,
			height: height ?? 0,
			latitude: decimalToRadians(DMStoDecimal(latitudeDMS) * (latitudeHemisphere === 'N' ? 1 : -1)),
			longitude: longitudeHemisphere === 'W' ? 2 * Math.PI - DMSToRadiansT(longitudeDMS) : DMSToRadiansT(longitudeDMS)
		};
		setWaiting(true);
		const result = GeocentricForwardsComp(payload);
		createInstance({
			name: title!!,
			result: result,
			id: props.edit ?? uuid(),
			new: true,
			operation: 'geocentric-forwards',
			data: payload,
			timestamp: new Date().valueOf()
		});
		setWaiting(false);
		router.push('/dashboard');
	}

	useEffect(() => {
		if (props.edit && operationInstances) {
			const instance = operationInstances.find(instance => instance.id === props.edit);
			if (instance) {
				const data = instance.data as GeocentricForwardsData;
				setTitle(instance.name);
				setEllipsoid(data.ellipsoid);
				setLatitudeHemisphere(data.latitude > 0 ? 'N' : 'S');
				setLongitudeHemisphere(data.longitude > Math.PI ? 'W' : 'E');
				setLatDD(Math.abs(data.latitude * (180 / Math.PI)));
				let lonDD = data.longitude * (180 / Math.PI);
				setLonDD(lonDD > 180 ? 360 - lonDD : lonDD);
				setHeight(data.height);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.edit, operationInstances]);

	const geocentricForwardsInputSchema = z.object({
		title: z.string(),
		ellipsoid: EllipsoidNameSchema,
		latitude: LatitudeSchema,
		longitude: LongitudeSchema,
		height: z.number()
	});

	return (<CommonPage
		title={OperationName['geocentric-forwards']}
		description={<VStack align={'start'}>
			<Text>{OperationDescription['geocentric-forwards']}</Text>
			<MissingAdjustSupportAlert />
		</VStack>}
	>

		<VStack
			spacing={8}
			align={'start'}
		>
			{/*<FormFactory<GeocentricForwardsData, GeocentricForwardsResult>
				schema={geocentricForwardsInputSchema}
				isTempAble={false}
				captions={{
					ellipsoid: 'Select the ellipsoid to use for the calculation.',
					latitude: 'Enter the latitude of the point in degrees, minutes, and seconds.',
					longitude: 'Enter the longitude of the point in degrees, minutes, and seconds.',
					height: 'Enter the ellipsoid height of the point in meters.'
				}}
				transform={values => {
					return {
						ellipsoid: values.ellipsoid,
						latitude: DMSToRadiansT(values.latitude) * (values.latitude.hemisphere === 'S' ? -1 : 1),
						longitude: DMSToRadiansT(values.longitude) * (values.longitude.hemisphere === 'W' ? -1 : 1),
						height: Number(values.height)
					} satisfies GeocentricForwardsData;
				}}
				reverseTransform={instance => {
					const data = instance.data as GeocentricForwardsData;
					return {
						title: instance.name,
						ellipsoid: data.ellipsoid,
						latitude: radiansToLat(data.latitude),
						longitude: radiansToLon(data.longitude),
						height: data.height
					};
				}}
				comp={GeocentricForwardsComp}
				display={GeocentricForwardsDisplay}
				operation={'geocentric-forwards'}
				edit={props.edit}
			/>*/}

			{/* Title */}
			<FormControl isInvalid={title === ''}>
				<StepLabel stepNumber={1} title={'Title'} />
				<Input
					type={'text'}
					value={title ?? ''}
					onChange={e => setTitle(e.target.value)}
				/>
				<FormHelperText>
					Use a name that uniquely identifies this operation.
				</FormHelperText>
				<FormErrorMessage>Title is required.</FormErrorMessage>
			</FormControl>

			{/* Ellipsoid */}
			<FormControl>
				<StepLabel stepNumber={2} title={'Ellipsoid'} />
				<EllipsoidSelect
					value={ellipsoid}
					onChange={ellipsoid => {
						setEllipsoid(ellipsoid);
					}}
				/>
				<FormHelperText>
					Select the ellipsoid to use for the calculation.
				</FormHelperText>
				<FormErrorMessage>Ellipsoid is required.</FormErrorMessage>
			</FormControl>

			{/* Latitude */}
			<FormControl>
				<StepLabel stepNumber={3} title={'Latitude'} />
				<HStack>
					<AngleInput
						DMS={latitudeDMS}
						setDMS={setLatDMS}
					/>
					<RadioGroup
						value={latitudeHemisphere}
						onChange={e => {
							setLatitudeHemisphere(e as LatitudeHemisphere);
						}}
					>
						<Stack direction={'row'}>
							<Radio value={'N'}>N</Radio>
							<Radio value={'S'}>S</Radio>
						</Stack>
					</RadioGroup>
				</HStack>
				<FormHelperText>
					Enter the latitude of the point in degrees, minutes, and seconds.
				</FormHelperText>
				<FormErrorMessage>
					Geodetic coordinates are required.
				</FormErrorMessage>
			</FormControl>

			{/* Longitude */}
			<FormControl>
				<StepLabel stepNumber={4} title={'Longitude'} />
				<HStack>
					<AngleInput
						DMS={longitudeDMS}
						setDMS={setLonDMS}
					/>
					<RadioGroup
						value={longitudeHemisphere}
						onChange={e => {
							setLongitudeHemisphere(e as LongitudeHemisphere);
						}}
					>
						<Stack direction={'row'}>
							<Radio value={'W'}>W</Radio>
							<Radio value={'E'}>E</Radio>
						</Stack>
					</RadioGroup>
				</HStack>
				<FormHelperText>
					Enter the longitude of the point in degrees, minutes, and seconds.
				</FormHelperText>
				<FormErrorMessage>
					Geodetic coordinates are required.
				</FormErrorMessage>
			</FormControl>

			{/* Ellipsoid height */}
			<FormControl>
				<StepLabel stepNumber={5} title={'Ellipsoid height'} />
				<Input
					type={'number'}
					value={height ?? ''}
					onChange={e => setHeight(Number(e.target.value))}
				/>
				<FormHelperText>
					Enter the ellipsoid height of the point in meters.
				</FormHelperText>
				<FormErrorMessage>
					Geodetic coordinates are required.
				</FormErrorMessage>
			</FormControl>

			{/* Submit */}
			<Button
				leftIcon={waiting ? <Spinner size={'sm'} /> : <CheckIcon />}
				isDisabled={!title || !ellipsoid}
				onClick={validate}
			>
				{props.edit ? 'Save changes' : 'Submit'}
			</Button>
		</VStack>
	</CommonPage>);
}
