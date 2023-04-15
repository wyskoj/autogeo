import CommonPage from '../../../components/common-page';
import { FormFactory } from '../../../components/form-factory';
import { SpcsForwardsData } from '../../../operation/coordinate-computations/spcs-forwards/spcs-forwards-data';
import { SpcsForwardsResult } from '../../../operation/coordinate-computations/spcs-forwards/spcs-forwards-result';
import { GetServerSidePropsContext } from 'next';
import { PreloadEditProps } from '../../../types/operation/preload-props';
import { DMSSchema } from '../../../components/form-components';
import { z } from 'zod';
import { SpcsForwardsComp } from '../../../operation/coordinate-computations/spcs-forwards/spcs-forwards-comp';
import { SpcsForwardsDisplay } from '../../../operation/coordinate-computations/spcs-forwards/spcs-forwards-display';
import { SpcsZoneSchema } from '../../../operation/misc/spcs/spcs-zones';
import { EllipsoidNameSchema } from '../../../operation/misc/ellipsoid/ellipsoid-types';
import { DMSToRadians, radiansToDMS } from '../../../utils/angle';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const edit = context.query['edit'];
	return {
		props: {
			edit: edit ? (Array.isArray(edit) ? edit[0] : edit) : null,
		} satisfies PreloadEditProps,
	};
}

export default function SpcsForwards(props: PreloadEditProps) {
	const spcsForwardsInputSchema = z.object({
		title: z.string(),
		latitude: DMSSchema,
		longitude: DMSSchema,
		ellipsoid: EllipsoidNameSchema,
		zone: SpcsZoneSchema,
	});

	return (
		<CommonPage
			title="State Plane Coordinates — Forwards"
			description="Converts latitude and longitude to State Plane Coordinates."
		>
			<FormFactory<SpcsForwardsData, SpcsForwardsResult>
				schema={spcsForwardsInputSchema}
				isTempAble={true}
				captions={{
					title: 'Title',
					latitude: 'Enter the latitude of the point.',
					longitude: 'Enter the longitude of the point.',
					ellipsoid: 'Select the ellipsoid to use for the calculation.',
					zone: 'Select the zone to use for the calculation.',
				}}
				transform={values => {
					return {
						ellipsoid: values.ellipsoid,
						latitude: DMSToRadians(
							values.latitude.degrees,
							values.latitude.minutes,
							values.latitude.seconds
						),
						longitude: -DMSToRadians(
							values.longitude.degrees,
							values.longitude.minutes,
							values.longitude.seconds
						),
						zone: values.zone,
					} satisfies SpcsForwardsData;
				}}
				reverseTransform={instance => {
					const data = instance.data as SpcsForwardsData;
					return {
						title: instance.name,
						latitude: {
							degrees: radiansToDMS(data.latitude).d,
							minutes: radiansToDMS(data.latitude).m,
							seconds: radiansToDMS(data.latitude).s?.toFixed(5),
						},
						longitude: {
							degrees: Math.abs(radiansToDMS(data.longitude).d ?? 0),
							minutes: radiansToDMS(data.longitude).m,
							seconds: radiansToDMS(data.longitude).s?.toFixed(5),
						},
						zone: data.zone,
						ellipsoid: data.ellipsoid,
					};
				}}
				comp={SpcsForwardsComp}
				display={SpcsForwardsDisplay}
				operation={'spcs-forwards'}
				edit={props.edit}
				dmsExtensions={{
					latitude: "N",
					longitude: "W",
				}}
			/>
		</CommonPage>
	);
}
