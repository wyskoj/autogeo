import { OperationInstance } from '../../types/operation-instance';
import { useRef, useState } from 'react';
import {
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
	Tooltip,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import {
	categoryByOperation,
	operationInfo,
	operationName,
} from '../../utils/operation';
import { operationCategories } from '../../types/operation-category';
import {
	ChevronRightIcon,
	DeleteIcon,
	DownloadIcon,
	EditIcon,
} from '@chakra-ui/icons';
import { timeAgo } from '../../pages/_app';
import timestampFormat from '../../utils/date';
import ToggleIconButton from '../toggle-icon-button';
import { MdInfo, MdInfoOutline } from 'react-icons/md';
import Link from 'next/link';
import { OperationSupportsAdjustFile } from '../../types/operation';
import { DeleteAlertDialog } from './operation-display';

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
		<>
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
												OperationSupportsAdjustFile[props.instance.operation]
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
			<DeleteAlertDialog
				leastDestructiveRef={cancelRef}
				onClose={onDeleteConfirmClose}
				open={isDeleteConfirmOpen}
				onClick={() => {
					props.onDelete();
					onDeleteConfirmClose();
				}}
			/>
		</>
	);
}
