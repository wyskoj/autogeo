import CommonPage from '../../../../components/common-page';
import DataFileType from '../../../../components/data-file-type';
import { dataFileTypeQuestion } from '../../../../utils/strings';

export default function DifferentialLeveling() {
	return (
		<CommonPage
			title={'Differential Leveling'}
			description={dataFileTypeQuestion}
		>
			<DataFileType operation={'differential-leveling'} />
		</CommonPage>
	);
}
