import {
	Alert,
	AlertDescription,
	AlertIcon,
	Badge,
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	HStack,
	Input,
	Radio,
	RadioGroup,
	Spinner,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';
import CommonPage from '../../../../components/common-page';
import { useState } from 'react';
import EllipsoidSelect from '../../../../components/ellipsoid-select';
import {
	EllipsoidName,
	LatitudeHemisphere,
	LongitudeHemisphere,
} from '../../../../types/operation/geodetic/ellipsoid';
import AngleInput from '../../../../components/angle-input';
import { CheckIcon } from '@chakra-ui/icons';
import { GetServerSidePropsContext } from 'next';
import { GeocentricForwardData } from '../../../../types/operation/coordinate-computations/geocentric-cartesian-coordinate';
import useDMS from '../../../../hooks/use-dms';
import {
	decimalToRadians,
	DMStoDecimal,
	DMSToRadiansT,
} from '../../../../utils/angle';
import { PreloadEditProps } from '../../../../types/operation/preload-props';
import GeocentricForward from '../../../../comps/operations/coordinate-computations/geocentric-forward';
import { useOperationInstances } from '../../../../hooks/operation-instances';
import { v4 as uuid } from 'uuid';
import router from 'next/router';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const edit = context.query['edit'];
	return {
		props: {
			edit: edit ? (Array.isArray(edit) ? edit[0] : edit) : null,
		} satisfies PreloadEditProps,
	};
}

export default function GeocentricForwardsWizard(props: PreloadEditProps) {
	const { createInstance } = useOperationInstances();

	// FORM DATA
	const [title, setTitle] = useState<string | null>(null);
	const [ellipsoid, setEllipsoid] = useState<EllipsoidName | null>(null);
	const [latitudeHemisphere, setLatitudeHemisphere] =
		useState<LatitudeHemisphere>('N');
	const [longitudeHemisphere, setLongitudeHemisphere] =
		useState<LongitudeHemisphere>('W');
	const [latitudeDMS, setLatDMS] = useDMS();
	const [longitudeDMS, setLonDMS] = useDMS();
	const [height, setHeight] = useState<number | null>(null);

	const [waiting, setWaiting] = useState(false);

	function validate() {
		if (!ellipsoid || !title) return false;
		const payload: GeocentricForwardData = {
			ellipsoid,
			height: height ?? 0,
			latitude: decimalToRadians(
				DMStoDecimal(latitudeDMS) * (latitudeHemisphere === 'N' ? 1 : -1)
			),
			longitude:
				longitudeHemisphere === 'W'
					? 2 * Math.PI - DMSToRadiansT(longitudeDMS)
					: DMSToRadiansT(longitudeDMS),
		};
		setWaiting(true);
		const result = GeocentricForward(payload);
		createInstance({
			name: title!!,
			result: result,
			id: uuid(),
			new: true,
			operation: 'geocentric-forwards',
			data: payload,
			timestamp: new Date().valueOf(),
		});
		setWaiting(false);
		router.push('/dashboard');
	}

	return (
		<CommonPage
			title={'Geocentric Coordinates — Forwards'}
			description={
				<VStack>
					<Text>
						This operation converts geodetic coordinates in latitude, longitude,
						and ellipsoid height to geocentric coordinates in X, Y, and Z.
					</Text>
					<Alert
						status="warning"
						borderRadius={'lg'}
					>
						<AlertIcon />
						<AlertDescription>
							This operation does not yet support loading ADJUST files.
						</AlertDescription>
					</Alert>
				</VStack>
			}
		>
			<VStack
				spacing={8}
				align={'start'}
			>
				{/* Title */}
				<FormControl isInvalid={title === ''}>
					<FormLabel>
						<Badge mr={2}>1</Badge>Title
					</FormLabel>
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
					<FormLabel>
						<Badge mr={2}>2</Badge>Ellipsoid
					</FormLabel>
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
				{/* Geodetic Coordinates */}
				<FormControl>
					<FormLabel>
						<Badge mr={2}>3</Badge>Latitude
					</FormLabel>
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
				<FormControl>
					<FormLabel>
						<Badge mr={2}>4</Badge>Longitude
					</FormLabel>
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
				<FormControl>
					<FormLabel>
						<Badge mr={2}>5</Badge>Ellipsoid Height
					</FormLabel>
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
		</CommonPage>
	);
}
