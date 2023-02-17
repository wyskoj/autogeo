import { Text } from '@chakra-ui/react';

/**
 * A component that displays the name of the app, "SurveyTexpert".
 * @param props.size The size of the text.
 * @returns A component that displays the name of the app, "SurveyTexpert".
 * @example
 * <>
 *   <SurveyTexpert /> is a great program!
 *   I will say it louder for those in the back. <SurveyTexpert size='4xl' /> is a great program!
 * </>
 */
export default function SurveyTexpert(props: { size?: string }) {
	return (
		<Text
			fontSize={props.size ?? 'md'}
			display={'inline'}
			fontWeight={'bold'}
		>
			<Text
				fontSize={props.size ?? 'md'}
				display={'inline'}
			>
				Survey
			</Text>
			<Text
				fontSize={props.size ?? 'md'}
				display={'inline'}
				color={'blue.500'}
			>
				T
			</Text>
			<Text
				fontSize={props.size ?? 'md'}
				display={'inline'}
			>
				expert
			</Text>
		</Text>
	);
}
