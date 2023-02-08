import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Badge,
	Button,
	Collapse,
	HStack,
	StackDivider,
	Td,
	Tooltip,
	Tr,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import { OperationInstance } from '../../types/operation-instance';
import {
	categoryByOperation,
	operationInfo,
	operationName,
} from '../../types/operation';
import { operationCategories } from '../../types/operation-category';
import timestampFormat from '../../utils/date';
import { timeAgo } from '../../pages/_app';
import {
	ChevronRightIcon,
	DeleteIcon,
	DownloadIcon,
	EditIcon,
} from '@chakra-ui/icons';
import ToggleIconButton from '../toggle-icon-button';
import { MdInfo, MdInfoOutline } from 'react-icons/md';
import { useRef, useState } from 'react';

export default function OperationDisplay(props: {
	instance: OperationInstance;
	onDelete: () => void;
	onOpen: () => void;
}) {
	const [showDetails, setShowDetails] = useState(false);
	const {
		isOpen: isDeleteConfirmOpen,
		onOpen: onDeleteConfirmOpen,
		onClose: onDeleteConfirmClose,
	} = useDisclosure();
	const cancelRef = useRef(null);

	return (
		<>
			<Tr key={props.instance.id}>
				<Td>
					{props.instance.new && (
						<Badge
							colorScheme="purple"
							mr={2}
						>
							New
						</Badge>
					)}
					{
						operationCategories[categoryByOperation(props.instance.operation)!!]
							.name
					}
					<ChevronRightIcon />
					{operationName(props.instance.operation)}
				</Td>
				<Td>{props.instance.name}</Td>

				<Td>
					<Tooltip label={timeAgo.format(new Date(props.instance.timestamp))}>
						{timestampFormat(props.instance.timestamp)}
					</Tooltip>
				</Td>

				<Td>
					<ToggleIconButton
						iconFalse={<MdInfoOutline fontSize={20} />}
						iconTrue={<MdInfo fontSize={20} />}
						ariaLabel={'Show details'}
						value={showDetails}
						onClick={() => {
							setShowDetails(!showDetails);
							props.onOpen();
						}}
					/>
				</Td>
			</Tr>
			<Tr>
				<Td
					colSpan={4}
					width={'100%'}
					border={showDetails ? '' : 'none'}
					p={showDetails ? 4 : 0}
					transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
				>
					<Collapse in={showDetails}>
						<VStack
							divider={<StackDivider />}
							spacing={4}
						>
							{operationInfo(props.instance.operation)?.display({
								data: props.instance.data,
								results: props.instance.result,
							})}
							<HStack spacing={4}>
								<Button
									leftIcon={<EditIcon />}
									onClick={() => {}}
								>
									Edit
								</Button>
								<Button
									leftIcon={<DownloadIcon />}
									onClick={() => {}}
								>
									Export
								</Button>
								<Button
									leftIcon={<DeleteIcon />}
									colorScheme={'red'}
									onClick={onDeleteConfirmOpen}
								>
									Delete
								</Button>
							</HStack>
						</VStack>
					</Collapse>
				</Td>
			</Tr>
			<AlertDialog
				motionPreset="slideInBottom"
				leastDestructiveRef={cancelRef}
				onClose={onDeleteConfirmClose}
				isOpen={isDeleteConfirmOpen}
				isCentered
			>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogHeader>Delete operation?</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						Are you sure you want to delete this operation? This action cannot
						be undone.
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button
							ref={cancelRef}
							onClick={onDeleteConfirmClose}
						>
							No
						</Button>
						<Button
							colorScheme="red"
							ml={3}
							onClick={() => {
								props.onDelete();
								onDeleteConfirmClose();
							}}
						>
							Yes
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
