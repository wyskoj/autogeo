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

export default function HelpButton(props: {
	modalTitle: string;
	modalContent: JSX.Element;
}) {
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
