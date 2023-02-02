import { QuestionIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

export default function HelpButton(props: {
	help: (arg0: string) => void;
	parameter: string;
}) {
	return (
		<IconButton
			aria-label={'Help'}
			icon={<QuestionIcon />}
			size={'xs'}
			variant={'ghost'}
			onClick={() => {
				props.help(props.parameter);
			}}
			ml={2}
		/>
	);
}
