import CommonPage from '../components/common-page';
import SurveyTexpert from '../components/autogeo';
import {
	Heading,
	Link,
	ListItem,
	Text,
	UnorderedList,
	VStack,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { InlineMath } from 'react-katex';
import {
	OperationCategories,
	OperationCategory,
	OperationName,
} from '../operation/operation';

export default function About() {
	return (
		<CommonPage
			title={
				<>
					About <SurveyTexpert size={'4xl'} />
				</>
			}
			description={'The complete geospatial toolbox.'}
			containerWidth={'container.sm'}
		>
			<VStack
				align={'start'}
				spacing={4}
			>
				<Heading
					as="h4"
					size="md"
				>
					👋 Welcome!
				</Heading>
				<Text>
					Thanks for using <SurveyTexpert />! I made this tool as a modern
					alternative of Charles Ghilani&apos;s &quot;ADJUST&quot; software
					package that is used in conjunction with his textbook{' '}
					<i>Adjustment Computations</i>.
				</Text>
				<Text>
					<SurveyTexpert /> improves upon ADJUST by bringing documentation and
					context to the data entry page, thereby maintaining the flow of user
					experience.
				</Text>
				<Heading
					as="h4"
					size="md"
				>
					✨ Features
				</Heading>
				<Text>
					This is a complete list of the features available in <SurveyTexpert />
					.
				</Text>
				<UnorderedList
					spacing={2}
					mt={2}
					pl={6}
				>
					{Object.keys(OperationCategories).map(categoryIndex => {
						let category =
							OperationCategories[categoryIndex as OperationCategory];
						return (
							<ListItem key={categoryIndex}>
								{category.name}
								<UnorderedList>
									{OperationCategories[
										categoryIndex as OperationCategory
									].operations.map((it, i) => (
										<ListItem key={i}>{OperationName[it]}</ListItem>
									))}
								</UnorderedList>
							</ListItem>
						);
					})}
				</UnorderedList>
				<Heading
					as="h4"
					size="md"
				>
					💾 Open source
				</Heading>
				<Text>
					The source code for <SurveyTexpert /> is completely{' '}
					<Link
						href={'https://github.com/wyskoj/autogeo'}
						isExternal={true}
						color="teal.500"
					>
						open source <ExternalLinkIcon mx="2px" />
					</Link>
					, meaning you can inspect both UI-related code and computations code.
				</Text>
				<Heading
					as="h4"
					size="md"
				>
					🖥️ Tech stack
				</Heading>
				<Text>
					<SurveyTexpert /> is written in{' '}
					<Link
						href={'https://www.typescriptlang.org'}
						isExternal={true}
						color="teal.500"
					>
						TypeScript <ExternalLinkIcon mx="2px" />
					</Link>{' '}
					and is built, deployed, and designed using these technologies (in no
					particular order):
				</Text>
				<UnorderedList
					spacing={2}
					mt={2}
					pl={6}
				>
					<ListItem>
						<Link
							href={'https://react.dev'}
							isExternal={true}
							color="teal.500"
						>
							React <ExternalLinkIcon mx="2px" />
						</Link>
					</ListItem>
					<ListItem>
						<Link
							href={'https://nextjs.org'}
							isExternal={true}
							color="teal.500"
						>
							Next.js <ExternalLinkIcon mx="2px" />
						</Link>
					</ListItem>
					<ListItem>
						<Link
							href={'https://chakra-ui.com'}
							isExternal={true}
							color="teal.500"
						>
							Chakra UI <ExternalLinkIcon mx="2px" />
						</Link>
					</ListItem>
					<ListItem>
						<Link
							href={'https://katex.org'}
							isExternal={true}
							color="teal.500"
						>
							<InlineMath>{`\\KaTeX`}</InlineMath> <ExternalLinkIcon mx="2px" />
						</Link>
					</ListItem>
					<ListItem>
						<Link
							href={'https://zod.dev'}
							isExternal={true}
							color="teal.500"
						>
							Zod <ExternalLinkIcon mx="2px" />
						</Link>
					</ListItem>
					<ListItem>
						<Link
							href={'https://www.framer.com/motion/'}
							isExternal={true}
							color="teal.500"
						>
							Framer Motion <ExternalLinkIcon mx="2px" />
						</Link>
					</ListItem>
					<ListItem>
						<Link
							href={'https://www.netlify.com'}
							isExternal={true}
							color="teal.500"
						>
							Netlify <ExternalLinkIcon mx="2px" />
						</Link>
					</ListItem>
					<ListItem>
						<Link
							href={'https://firebase.google.com'}
							isExternal={true}
							color="teal.500"
						>
							Firebase <ExternalLinkIcon mx="2px" />
						</Link>
					</ListItem>
					<ListItem>
						<Link
							href={'https://deviceframes.com'}
							isExternal={true}
							color="teal.500"
						>
							DeviceFrames <ExternalLinkIcon mx="2px" />
						</Link>
					</ListItem>
				</UnorderedList>
			</VStack>
		</CommonPage>
	);
}
