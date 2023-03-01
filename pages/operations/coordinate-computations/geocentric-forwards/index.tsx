import DataFileType from '../../../../components/data-file-type';
import CommonPage from '../../../../components/common-page';

export default function GeocentricForwardsPage() {
	return (
		<CommonPage
			title={'Geocentric Coordinates — Forwards'}
			description={
				'This operation requires a data file. How would you like to proceed?'
			}
		>
			<DataFileType operation={'geocentric-forwards'} />
		</CommonPage>
	);
}
