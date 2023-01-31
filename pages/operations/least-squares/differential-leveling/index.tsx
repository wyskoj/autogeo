import CommonPage from '../../../../components/common-page';
import DataFileType from '../../../../components/data-file-type';

export default function DifferentialLeveling() {
	return (
		<CommonPage
			title={'Differential Leveling'}
			description={
				'This operation requires a data file. How would you like to proceed?'
			}
		>
			<DataFileType operation={'differential-leveling'} />
		</CommonPage>
	);
}
