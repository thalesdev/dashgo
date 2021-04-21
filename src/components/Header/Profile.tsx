import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Text } from "@chakra-ui/layout";

interface ProfileProps {
	showProfileData?: boolean;
}
export function Profile({ showProfileData = true }: ProfileProps) {
	return (
		<Flex align="center">
			{showProfileData && (
				<Box mr="4" textAlign="right">
					<Text>Thales de Oliveira</Text>
					<Text color="gray.300" fontSize="small">
						thalesdev@furg.br
				</Text>
				</Box>
			)}
			<Avatar size="md" name="Thales de Oliveira" src="https://github.com/thalesdev.png" />
		</Flex>
	)
}