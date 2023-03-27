import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	UserCredential,
} from 'firebase/auth';
import {
	Box,
	Button,
	Center,
	Container,
	Heading,
	Icon,
	Spinner,
	Text,
	VStack,
} from '@chakra-ui/react';
import AutoGeo from '../components/autogeo';
import { ImGoogle } from 'react-icons/im';
import { useDefaultAuthState } from '../hooks/firebase';
import { useEffect, useState } from 'react';
import router from 'next/router';
import { StaggerContainer, StaggerItem } from '../components/stagger';
import { doc, setDoc } from '@firebase/firestore';
import { getFirestore } from 'firebase/firestore';

function SignInWithGoogle(props: { onClick: () => void }) {
	return (
		<Button
			onClick={props.onClick}
			leftIcon={
				<Icon
					as={ImGoogle}
					mr={1}
					fontSize={'1.2rem'}
				/>
			}
			w={'80%'}
		>
			Sign in with Google
		</Button>
	);
}

export default function Login() {
	const { user, loading } = useDefaultAuthState();

	useEffect(() => {
		if (user) {
			router.push('/dashboard');
		}
	}, [user]);

	async function registerUser(userCredential: UserCredential) {
		await setDoc(doc(getFirestore(), `/users/${userCredential.user.uid}`), {
			displayName: userCredential.user.displayName,
			email: userCredential.user.email,
			photoURL: userCredential.user.photoURL,
		});
	}

	let onLoginInButtonClick = () => {
		signInWithPopup(getAuth(), new GoogleAuthProvider()).then(result => {
			registerUser(result);
		});
	};

	return (
		<Container
			maxW={'container.sm'}
			mt={4}
		>
			{loading || user ? (
				<Center>
					<Spinner size="xl" />
				</Center>
			) : (
				<StaggerContainer>
					<VStack spacing={4}>
						<StaggerItem>
							<Box textAlign="center">
								<Heading size="xl">👋 Welcome!</Heading>
								<Heading size="md">
									To start using <AutoGeo />, sign in with Google.
								</Heading>
							</Box>
						</StaggerItem>
						<StaggerItem style={{ width: '100%', textAlign: 'center' }}>
							<SignInWithGoogle onClick={onLoginInButtonClick} />
						</StaggerItem>
						<StaggerItem>
							<Text
								textAlign={'center'}
								fontSize={'xs'}
							>
								We use your Google account to store your operations on the
								cloud.
							</Text>
						</StaggerItem>
					</VStack>
				</StaggerContainer>
			)}
		</Container>
	);
}
