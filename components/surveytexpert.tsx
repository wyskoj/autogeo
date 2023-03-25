import { Text } from '@chakra-ui/react';

/**
 * A component that displays the name of the app, "AutoGeo".
 * @param props.size The size of the text.
 * @returns A component that displays the name of the app, "AutoGeo".
 * @example
 * <>
 *   <SurveyTexpert /> is a great program!
 *   I will say it louder for those in the back. <SurveyTexpert size='4xl' /> is a great program!
 * </>
 */
export default function SurveyTexpert(props: { size?: string }) {
	return <span style={{ fontWeight: 'bold' }}>AutoGeo</span>;
}
