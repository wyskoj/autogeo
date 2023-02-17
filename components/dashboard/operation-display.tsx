import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Badge,
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Collapse,
	Heading,
	HStack,
	Icon,
	IconButton,
	Show,
	Spacer,
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
	OperationHasWizard,
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
import Link from 'next/link';

/**
 * Displays a card for an operation instance. This card is used in the dashboard.
 * It displays the name of the operation, the category, and the timestamp.
 * It also displays a button to open the operation, and some buttons to edit or delete the operation.
 *
 * @param props.instance The operation instance to display.
 * @param props.onDelete A function to call when the delete button is pressed.
 * @param props.onOpen A function to call when the operation is opened.
 */
export function OperationDisplayCard(props: {
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
		<Card w={'full'}>
			<CardHeader>
				<HStack spacing={4}>
					<Icon
						as={operationInfo(props.instance.operation)?.icon}
						boxSize={8}
					/>
					<Box>
						<HStack>
							<Heading size={'sm'}>{props.instance.name}</Heading>
							{props.instance.new && (
								<Badge
									colorScheme="purple"
									mr={2}
								>
									New
								</Badge>
							)}
						</HStack>
						<Box>
							{
								operationCategories[
									categoryByOperation(props.instance.operation)!!
								].name
							}
							<ChevronRightIcon />
							{operationName(props.instance.operation)}
						</Box>
						<Box>
							<Tooltip
								label={timeAgo.format(new Date(props.instance.timestamp))}
							>
								{timestampFormat(props.instance.timestamp)}
							</Tooltip>
						</Box>
					</Box>
					<Spacer />
					<ToggleIconButton
						iconFalse={
							<Icon
								as={MdInfoOutline}
								boxSize={6}
							/>
						}
						iconTrue={
							<Icon
								as={MdInfo}
								boxSize={6}
							/>
						}
						ariaLabel={'Show details'}
						value={showDetails}
						onClick={() => {
							setShowDetails(!showDetails);
							props.onOpen();
						}}
					/>
				</HStack>
			</CardHeader>
			<Collapse
				in={showDetails}
				animateOpacity
			>
				<CardBody>
					<VStack
						divider={<StackDivider />}
						spacing={4}
					>
						{operationInfo(props.instance.operation)?.display({
							data: props.instance.data,
							results: props.instance.result,
						})}
						<>
							<Show above={'sm'}>
								<HStack spacing={4}>
									<Link
										href={`/operations/${categoryByOperation(
											props.instance.operation
										)}/${props.instance.operation}${
											OperationHasWizard[props.instance.operation]
												? '/wizard'
												: ''
										}?edit=${props.instance.id}`}
									>
										<Button leftIcon={<EditIcon />}>Edit</Button>
									</Link>
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
							</Show>
							<Show below={'sm'}>
								<HStack>
									<IconButton
										aria-label={'Edit'}
										icon={<EditIcon />}
										onClick={() => {}}
										boxSize={12}
										fontSize={20}
									/>
									<IconButton
										aria-label={'Export'}
										icon={<DownloadIcon />}
										onClick={() => {}}
										boxSize={12}
										fontSize={20}
									/>
									<IconButton
										aria-label={'Delete'}
										icon={<DeleteIcon />}
										colorScheme={'red'}
										onClick={onDeleteConfirmOpen}
										boxSize={12}
										fontSize={20}
									/>
								</HStack>
							</Show>
						</>
					</VStack>
				</CardBody>
			</Collapse>
		</Card>
	);
}

export function OperationDisplayRow(props: {
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
								<Link
									href={`/operations/${categoryByOperation(
										props.instance.operation
									)}/${props.instance.operation}${
										OperationHasWizard[props.instance.operation]
											? '/wizard'
											: ''
									}?edit=${props.instance.id}`}
								>
									<Button leftIcon={<EditIcon />}>Edit</Button>
								</Link>
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
