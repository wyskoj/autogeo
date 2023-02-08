import * as _chakra_ui_system from '@chakra-ui/system';
import { TextProps } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';

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
