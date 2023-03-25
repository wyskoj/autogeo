import { Code, Heading, Text, Tooltip, VStack } from '@chakra-ui/react';
import FileFormatHelp from '../components/help/file-format-help';
import { CGDocs } from '../types/ghilani';
import { Operation } from '../types/operation';
import { operationName } from '../utils/operation';
export function CGDocsRender(props: { docs: CGDocs; operation: Operation }) {
	return (
		<VStack align={'start'}>
			<Heading
				as="h4"
				size="md"
			>
				{operationName(props.operation)}
			</Heading>
			<Text>{props.docs.description}</Text>
			<Heading
				as="h5"
				size="sm"
			>
				File Format
				<FileFormatHelp />
			</Heading>
			<Code
				display={'block'}
				whiteSpace={'pre'}
				width={'100%'}
				p={2}
			>
				{props.docs.schema.map((line, i) => (
					<div key={i}>
						{line.properties.map((property, j) => {
							let extra = '';
							if (property.number_of) extra = '#';
							if (property.optional) extra = '?';

							// Compute spacing at end of property (don't put a space after the
							// last property)
							let space = '';
							if (j !== line.properties.length - 1) space = ' ';

							return (
								<>
									<Tooltip
										label={property.description}
									>{`<${property.label}${extra}>`}</Tooltip>
									{space}
								</>
							);
						})}
						{line.repeated ? (
							<Tooltip label={line.repetition_description}>[]</Tooltip>
						) : (
							''
						)}
					</div>
				))}
			</Code>
			<Heading
				as="h5"
				size="sm"
			>
				{props.docs.examples.length > 1 ? 'Examples' : 'Example'}
			</Heading>
			{props.docs.examples.map(example => (
				<>
					{example.title.length !== 0 && (
						<Heading
							as="h6"
							size="xs"
						>
							{example.title}
						</Heading>
					)}
					<Code
						display={'block'}
						whiteSpace={'pre'}
						width={'100%'}
						p={2}
					>
						{example.data}
					</Code>
				</>
			))}
		</VStack>
	);
}
