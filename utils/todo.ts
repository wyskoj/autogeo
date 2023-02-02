import { useToast } from '@chakra-ui/react';

export default function useTodo() {
	const toast = useToast();

	function todo() {
		toast({
			title: 'Todo',
			description: "This button doesn't do anything yet :(",
			status: 'warning',
			duration: 5000,
			isClosable: true,
		});
	}

	return todo;
}
