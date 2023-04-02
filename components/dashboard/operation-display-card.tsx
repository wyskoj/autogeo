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
	ChevronRightIcon,
	DeleteIcon,
	DownloadIcon,
	EditIcon,
} from '@chakra-ui/icons';
import { timeAgo } from '../../utils/timeago';
import timestampFormat from '../../utils/date';
import ToggleIconButton from '../toggle-icon-button';
import { MdInfo, MdInfoOutline } from 'react-icons/md';
import Link from 'next/link';
import { DeleteAlertDialog, ExportAlertDialog } from './operation-display';
import {
	getOperationCategory,
	OperationDisplay,
	OperationIcon,
	OperationName,
	OperationParsableSchema,
} from '../../operation/operation';
import { OperationInstance } from '../../operation/operation-instance';
import ExportOperationInstance from '../../utils/operation-export';
import DownloadBlob from '../../utils/download-blob';

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
	const {
		isOpen: isExportConfirmOpen,
		onOpen: onExportConfirmOpen,
		onClose: onExportConfirmClose,
	} = useDisclosure();
	return (
		<>
			<Card w={'full'}>
				<CardHeader>
					<HStack spacing={4}>
						<Icon
							as={OperationIcon[props.instance.operation]}
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
								{getOperationCategory(props.instance.operation).info.name}
								<ChevronRightIcon />
								{OperationName[props.instance.operation]}
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
							{OperationDisplay[props.instance.operation]({
								data: props.instance.data,
								result: props.instance.result,
							})}
							<>
								<Show above={'sm'}>
									<HStack spacing={4}>
										<Link
											href={`/operations/${
												getOperationCategory(props.instance.operation).category
											}/${props.instance.operation}${
												OperationParsableSchema.safeParse(
													props.instance.operation
												).success
													? '/wizard'
													: ''
											}?edit=${props.instance.id}`}
										>
											<Button leftIcon={<EditIcon />}>Edit</Button>
										</Link>
										<Button
											leftIcon={<DownloadIcon />}
											onClick={onExportConfirmOpen}
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
										<Link
											href={`/operations/${
												getOperationCategory(props.instance.operation).category
											}/${props.instance.operation}${
												OperationParsableSchema.safeParse(
													props.instance.operation
												).success
													? '/wizard'
													: ''
											}?edit=${props.instance.id}`}
										>
											<IconButton
												aria-label={'Edit'}
												icon={<EditIcon />}
												boxSize={12}
												fontSize={20}
											/>
										</Link>
										<IconButton
											aria-label={'Export'}
											icon={<DownloadIcon />}
											onClick={onExportConfirmOpen}
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
			<ExportAlertDialog
				leastDestructiveRef={cancelRef}
				onClose={onExportConfirmClose}
				open={isExportConfirmOpen}
				onClick={format => {
					const export1 = ExportOperationInstance(props.instance, format);
					DownloadBlob(export1);
					onExportConfirmClose();
				}}
			/>
		</>
	);
}
