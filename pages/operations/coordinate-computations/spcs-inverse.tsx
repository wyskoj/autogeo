import { GetServerSidePropsContext } from 'next';
import { PreloadEditProps } from '../../../types/operation/preload-props';
import { z } from 'zod';
import { DMSSchema, XYSchema } from '../../../components/form-components';
import { EllipsoidNameSchema } from '../../../operation/misc/ellipsoid/ellipsoid-types';
import { SpcsZoneSchema } from '../../../operation/misc/spcs/spcs-zones';
import CommonPage from '../../../components/common-page';
import { SpcsInverseData } from '../../../operation/coordinate-computations/spcs-inverse/spcs-inverse-data';
import { FormFactory } from '../../../components/form-factory';
import { SpcsInverseComp } from '../../../operation/coordinate-computations/spcs-inverse/spcs-inverse-comp';
import { SpcsInverseResult } from '../../../operation/coordinate-computations/spcs-inverse/spcs-inverse-result';
import SpcsInverseDisplay from '../../../operation/coordinate-computations/spcs-inverse/spcs-inverse-display';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const edit = context.query['edit'];
	return {
		props: {
			edit: edit ? (Array.isArray(edit) ? edit[0] : edit) : null,
		} satisfies PreloadEditProps,
	};
}

export default function SpcsInverse(props: PreloadEditProps) {
	const spcsInverseInputSchema = z.object({
		title: z.string(),
		station: XYSchema,
		ellipsoid: EllipsoidNameSchema,
		zone: SpcsZoneSchema,
	});

	return (
		<CommonPage
			title="State Plane Coordinates — Inverse"
			description="Converts State Plane Coordinates to latitude and longitude."
		>
			<FormFactory<SpcsInverseData, SpcsInverseResult>
				schema={spcsInverseInputSchema}
				isTempAble={true}
				captions={{
					title: 'Title',
					station: 'Enter the station coordinates.',
					ellipsoid: 'Select the ellipsoid to use for the calculation.',
					zone: 'Select the zone to use for the calculation.',
				}}
				transform={values => {
					return {
						ellipsoid: values.ellipsoid,
						easting: values.station.x,
						northing: values.station.y,
						zone: values.zone,
					} satisfies SpcsInverseData;
				}}
				reverseTransform={instance => {
					const data = instance.data as SpcsInverseData;
					return {
						title: instance.name,
						station: {
							x: data.easting,
							y: data.northing,
						},
						ellipsoid: data.ellipsoid,
						zone: data.zone,
					};
				}}
				comp={SpcsInverseComp}
				display={SpcsInverseDisplay}
				edit={props.edit}
				operation={'spcs-inverse'}
			/>
		</CommonPage>
	);
}