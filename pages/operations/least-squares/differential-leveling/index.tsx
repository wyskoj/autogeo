import CommonPage from '../../../../components/common-page';
import DataFileType from '../../../../components/data-file-type';
import { dataFileTypeQuestion } from '../../../../utils/strings';
import { Button } from '@chakra-ui/react';
import { MdMenuBook } from 'react-icons/md';
import Link from 'next/link';

export default function DifferentialLeveling() {
	return (
		<CommonPage
			title={'Differential Leveling'}
			description={dataFileTypeQuestion}
			action={
				<Link
					href={'/docs/least-squares/differential-leveling'}
					passHref
				>
					<Button
						leftIcon={<MdMenuBook />}
						colorScheme={'blue'}
					>
						Read about it
					</Button>
				</Link>
			}
		>
			<DataFileType operation={'differential-leveling'} />
		</CommonPage>
	);
}
