import { QuestionIcon } from '@chakra-ui/icons';
import {
	Heading,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';

type HelpButtonProps = {
	/** Title of the help screen. */
	modalTitle: string;
	/** Content of the help screen. */
	modalContent: JSX.Element;
};
/**
 * Help button that opens a modal with help content, passed as props.
 */
export default function HelpButton(props: HelpButtonProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size={'xl'}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Heading
							as="h3"
							size="lg"
						>
							{props.modalTitle}
						</Heading>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{props.modalContent}</ModalBody>

					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
			<IconButton
				aria-label={'Help'}
				icon={<QuestionIcon />}
				size={'xs'}
				variant={'ghost'}
				ml={2}
				onClick={onOpen}
			/>
		</>
	);
}
