import { useRef, useState } from 'react';
import {
	Button,
	Collapse,
	HStack,
	Icon,
	StackDivider,
	Td,
	Tooltip,
	Tr,
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
import {
	DeleteAlertDialog,
	ExportAlertDialog,
	NewBadge,
} from './operation-display';
import ExportOperationInstance from '../../utils/operation-export';
import DownloadBlob from '../../utils/download-blob';
import { OperationInstance } from '../../operation/operation-instance';
import {
	getOperationCategory,
	OperationDisplay,
	OperationIcon,
	OperationName,
	OperationParsable,
	OperationParsableSchema,
} from '../../operation/operation';
import { useSettings } from '../../hooks/use-settings';

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
	const {
		isOpen: isExportConfirmOpen,
		onOpen: onExportConfirmOpen,
		onClose: onExportConfirmClose,
	} = useDisclosure();
	const cancelRef = useRef(null);
	let category = getOperationCategory(props.instance.operation);
	const { settings } = useSettings();
	return (
		<>
			<Tr key={props.instance.id}>
				<Td>
					<NewBadge isNew={props.instance.new} />
					{category.info.name}
					<ChevronRightIcon />
					{OperationName[props.instance.operation]}
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
							{OperationDisplay[props.instance.operation]({
								data: props.instance.data,
								result: props.instance.result,
							})}
							<HStack spacing={4}>
								<Link
									href={`/operations/${category.category}/${
										props.instance.operation
									}${
										OperationParsableSchema.safeParse(props.instance.operation)
											.success
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
						</VStack>
					</Collapse>
				</Td>
			</Tr>
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
					const export1 = ExportOperationInstance(props.instance, format, settings!!);
					DownloadBlob(export1);
					onExportConfirmClose();
				}}
			/>
		</>
	);
}
