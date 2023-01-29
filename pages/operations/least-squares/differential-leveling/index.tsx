import CommonPage from '../../../../components/common-page';
import {
	Badge,
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Code,
	Flex,
	Heading,
	Icon,
	SimpleGrid,
	Text,
	VStack,
} from '@chakra-ui/react';
import { MdUpload } from 'react-icons/md';
import DataFileType from '../../../../components/data-file-type';

export default function DifferentialLeveling() {
	return (
		<CommonPage
			title={'Differential Leveling'}
			description={
				'This operation requires a data file. How would you like to proceed?'
			}
		>
			<DataFileType />
		</CommonPage>
	);
}
