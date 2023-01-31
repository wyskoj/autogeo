import { SimpleGrid } from '@chakra-ui/react';
import { operationCategories } from '../../types/operation-category';
import OperationCategoryCard from '../../components/operation-category-card';
import CommonPage from '../../components/common-page';

export default function OperationSelect() {
	return (
		<CommonPage
			title={'New operation'}
			description={'Select an operation.'}
		>
			<SimpleGrid
				columns={3}
				spacing={4}
			>
				{/*{operationCategories.map((it, i) => (*/}
				{/*	<OperationCategoryCard*/}
				{/*		info={it}*/}
				{/*		key={i}*/}
				{/*	/>*/}
				{/*))}*/}
			</SimpleGrid>
		</CommonPage>
	);
}
