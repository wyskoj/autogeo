import { SimpleGrid } from '@chakra-ui/react';
import {
	operationCategories,
	OperationCategory,
} from '../../types/operation-category';
import OperationCategoryCard from '../../components/operation-category-card';
import CommonPage from '../../components/common-page';

export default function OperationSelect() {
	return (
		<CommonPage
			title={'New operation'}
			description={'Select an operation.'}
		>
			<SimpleGrid
				minChildWidth="250px"
				spacing={4}
			>
				{Object.keys(operationCategories).map((it, i) => {
					return (
						<OperationCategoryCard
							category={it as OperationCategory}
							info={operationCategories[it as OperationCategory]}
							key={i}
						/>
					);
				})}
			</SimpleGrid>
		</CommonPage>
	);
}
