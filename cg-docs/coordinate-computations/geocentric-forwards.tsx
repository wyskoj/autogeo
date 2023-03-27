import { CGDocs } from '../../types/ghilani';

export const GeocentricForwardsDocs: CGDocs = {
	description:
		'This operation converts geodetic coordinates in latitude, longitude, and ellipsoid height to geocentric coordinates in X, Y, and Z.',
	examples: [
		{
			title: '',
			data: `1 41 35 16.4581 75 32 04.9872 124.235
2 41 29 15.5469 75 31 59.0246 253.768`,
		},
	],
	schema: [
		{
			repeated: true,
			repetition_description: 'This line is repeated for each point.',
			properties: [
				{
					description: 'An ID to uniquely identify this point.',
					label: 'id',
					optional: false,
					number_of: false,
				},
				{
					description:
						'The latitude in degrees, minutes, and seconds. Components are separated by whitespace.',
					label: 'latitude',
					optional: false,
					number_of: false,
				},
				{
					description:
						'The longitude in degrees, minutes, and seconds. Components are separated by whitespace.',
					label: 'longitude',
					optional: false,
					number_of: false,
				},
				{
					description: 'The ellipsoidal height.',
					label: 'id',
					optional: false,
					number_of: false,
				},
			],
		},
	],
};
