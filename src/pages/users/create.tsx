import {
	Box,
	Divider,
	Flex,
	Heading,
	VStack,
	SimpleGrid,
	HStack,
	Button
} from '@chakra-ui/react';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';


import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header'
import { SideBar } from '../../components/SideBar';
import { SubmitHandler, useForm } from 'react-hook-form';


type UserCreateFormData = {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
};

const userCreateFormSchema = yup.object().shape({
	name: yup.string().required('Nome é obrigatório'),
	email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
	password: yup.string().required('Senha obrigatória').min(6, 'No minimo 6 caracteres'),
	password_confirm: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
});



export default function UserCreate() {

	const { formState, handleSubmit, register } = useForm({ resolver: yupResolver(userCreateFormSchema) })
	const { errors } = formState

	const handleCreateUser: SubmitHandler<UserCreateFormData> = async (values) => {
		console.log(values)
		await new Promise(resolve => setTimeout(resolve, 2000))
	}

	return (
		<Box>
			<Header />
			<Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
				<SideBar />

				<Box
					flex="1"
					borderRadius={8}
					bg="gray.800"
					p={["6",
						"8"]}
					as="form"
					onSubmit={handleSubmit(handleCreateUser)}
				>
					<Heading size="lg" fontWeight="normal">
						Criar usuário
					</Heading>
					<Divider my="6" borderColor="gray.700" />
					<VStack spacing="8">
						<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
							<Input
								name="name"
								label="Nome Completo"
								{...register('name')}
								error={errors.name}
							/>
							<Input
								name="email"
								type="email"
								label="E-mail"
								{...register('email')}
								error={errors.email}
							/>
						</SimpleGrid>

						<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
							<Input
								name="password"
								type="password"
								label="Senha"
								{...register('password')}
								error={errors.password}
							/>
							<Input
								name="password_confirm"
								type="password"
								label="Confirmação da Senha"
								{...register('password_confirm')}
								error={errors.password_confirm}
							/>
						</SimpleGrid>
					</VStack>

					<Flex mt="8" justify="flex-end">
						<HStack spacing="4">
							<Link href="/users" passHref>
								<Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
							</Link>
							<Button colorScheme="pink" type="submit" isLoading={formState.isSubmitting}>
								Salvar
							</Button>
						</HStack>
					</Flex>

				</Box>
			</Flex>
		</Box>
	);
}
