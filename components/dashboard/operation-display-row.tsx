import { OperationInstance } from '../../types/operation-instance';
import { useRef, useState } from 'react';
import {
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
import { operationCategories } from '../../types/operation-category';
import {
	categoryByOperation,
	operationInfo,
	operationName,
} from '../../utils/operation';
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
import {
	DeleteAlertDialog,
	ExportAlertDialog,
	NewBadge,
} from './operation-display';
import ExportOperationInstance from '../../utils/operation-export';
import DownloadBlob from '../../utils/download-blob';

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
	return (
		<>
			<Tr key={props.instance.id}>
				<Td>
					<NewBadge isNew={props.instance.new} />
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
								result: props.instance.result,
							})}
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
					const export1 = ExportOperationInstance(props.instance, format);
					DownloadBlob(export1);
					onExportConfirmClose();
				}}
			/>
		</>
	);
}
