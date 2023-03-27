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
	Radio,
	RadioGroup,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { ExportFormat } from '../../types/export-format';

export function ExportAlertDialog(props: {
	leastDestructiveRef: React.MutableRefObject<null>;
	onClose: () => void;
	open: boolean;
	onClick: (format: ExportFormat) => void;
}) {
	const [format, setFormat] = React.useState<ExportFormat>('plain');
	return (
		<AlertDialog
			leastDestructiveRef={props.leastDestructiveRef}
			isOpen={props.open}
			onClose={props.onClose}
			isCentered
		>
			<AlertDialogOverlay />
			<AlertDialogContent>
				<AlertDialogHeader>Export operation</AlertDialogHeader>
				<AlertDialogCloseButton />
				<AlertDialogBody>
					<VStack
						align="start"
						spacing={4}
					>
						<Text>What format would you like to export this operation in?</Text>

						<RadioGroup
							value={format}
							onChange={value => {
								setFormat(value as ExportFormat);
							}}
						>
							<Stack direction="column">
								<Radio value="plain">Plain text</Radio>
								<Radio value="json">JSON</Radio>
								<Radio isDisabled={true}>More coming soon :)</Radio>
							</Stack>
						</RadioGroup>
					</VStack>
				</AlertDialogBody>
				<AlertDialogFooter>
					<Button
						ref={props.leastDestructiveRef}
						onClick={props.onClose}
					>
						Cancel
					</Button>
					<Button
						colorScheme="blue"
						ml={3}
						onClick={() => {
							props.onClick(format);
						}}
					>
						Export
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export function DeleteAlertDialog(props: {
	leastDestructiveRef: React.MutableRefObject<null>;
	onClose: () => void;
	open: boolean;
	onClick: () => void;
}) {
	return (
		<AlertDialog
			motionPreset="slideInBottom"
			leastDestructiveRef={props.leastDestructiveRef}
			onClose={props.onClose}
			isOpen={props.open}
			isCentered
		>
			<AlertDialogOverlay />
			<AlertDialogContent>
				<AlertDialogHeader>Delete operation?</AlertDialogHeader>
				<AlertDialogCloseButton />
				<AlertDialogBody>
					Are you sure you want to delete this operation? This action cannot be
					undone.
				</AlertDialogBody>
				<AlertDialogFooter>
					<Button
						ref={props.leastDestructiveRef}
						onClick={props.onClose}
					>
						No
					</Button>
					<Button
						colorScheme="red"
						ml={3}
						onClick={props.onClick}
					>
						Yes
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export function NewBadge(props: { isNew: boolean }) {
	return (
		<AnimatePresence>
			{props.isNew && (
				<motion.div
					style={{ display: 'inline-block' }}
					initial={{ scaleX: 0, width: '0rem' }}
					animate={{ scaleX: 1, width: '3rem' }}
					exit={{ scaleX: 0, width: '0rem' }}
					transition={{
						delay: 0.5,
						ease: 'linear',
					}}
				>
					<Badge
						colorScheme="purple"
						mr={2}
					>
						New
					</Badge>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
