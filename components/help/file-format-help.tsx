import HelpButton from './help-button';
import { Code, Divider, Heading, Text, VStack } from '@chakra-ui/react';
import SurveyTexpert from '../autogeo';

/**
 * Help button for AutoGeo documentation specification.
 */
export default function FileFormatHelp() {
	return (
		<HelpButton
			modalTitle={'File format specification'}
			modalContent={
				<VStack align={'start'}>
					<Text>
						<SurveyTexpert /> uses a specific syntax to convey the format of
						data files.
					</Text>
					<Divider />
					<Heading
						as="h5"
						size="sm"
					>
						Fields
					</Heading>
					<Text>
						Files are primarily defined by fields&mdash;instances of data. It
						could be text or a number. It is represented in angle brackets. For
						example, <Code>{`<benchmark>`}</Code> would represent a field called
						&quot;benchmark&quot;.{' '}
						<Text as="mark">
							Do not type angle brackets when entering the data.
						</Text>
					</Text>
					<Heading
						as="h5"
						size="sm"
					>
						&quot;Number of&quot;
					</Heading>
					<Text>
						If the name of the field ends with <Code>#</Code>, the field can be
						interpreted as &quot;number of&quot;. For example, the field{' '}
						<Code>{`<benchmarks#>`}</Code> may be read as &quot;number of
						benchmarks&quot;.
					</Text>
					<Heading
						as="h5"
						size="sm"
					>
						Optional
					</Heading>
					<Text>
						If the name of the field ends with <Code>?</Code>, the requirement
						of the field is dependant on some other variable or state. For
						example, if an observation could be performed with or without
						weights, the weight field is denoted as <Code>{`<station?>`}</Code>.
					</Text>
					<Heading
						as="h5"
						size="sm"
					>
						Array
					</Heading>
					<Text>
						If a line ends with <Code>{`[]`}</Code>, the fields within the line
						may be repeated to define more than one instance.
					</Text>
				</VStack>
			}
		/>
	);
}
