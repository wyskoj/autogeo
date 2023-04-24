import { HStack, VStack } from '@chakra-ui/react';
import OperationCategoryCard from '../../components/operation-category-card';
import CommonPage from '../../components/common-page';
import { StaggerContainer, StaggerItem } from '../../components/stagger';
import {
	OperationCategories,
	OperationCategory,
} from '../../operation/operation';
import { useSize } from '@chakra-ui/react-use-size';
import { useEffect, useRef, useState } from 'react';

export default function OperationSelect() {
	const ref = useRef(null);
	const dimensions = useSize(ref);
	const [columnCount, setColumnCount] = useState(3);

	useEffect(() => {
		if (!dimensions) return;
		if (dimensions.width < 500) {
			setColumnCount(1);
		} else if (dimensions.width < 800) {
			setColumnCount(2);
		} else {
			setColumnCount(3);
		}
	}, [dimensions]);

	return (
		<CommonPage
			title={'✏️ New operation'}
			description={'Select an operation.'}
		>
			<StaggerContainer>
				<HStack
					align={'start'}
					spacing={4}
					ref={ref}
				>
					{[...Array(columnCount).keys()].map(it => (
						<Column
							key={it}
							columnNumber={it}
							columnCount={columnCount}
						/>
					))}
				</HStack>
			</StaggerContainer>
		</CommonPage>
	);
}

function Column(props: { columnNumber: number; columnCount: number }) {
	return (
		<VStack
			w={`${100 / props.columnCount}%`}
			align={'start'}
			spacing={4}
		>
			{Object.keys(OperationCategories).map((it, i) => {
				if (i % props.columnCount === props.columnNumber) {
					return (
						<StaggerItem
							key={i}
							style={{ width: '100%' }}
						>
							<OperationCategoryCard
								category={it as OperationCategory}
								info={OperationCategories[it as OperationCategory]}
							/>
						</StaggerItem>
					);
				} else {
					return null;
				}
			})}
		</VStack>
	);
}
