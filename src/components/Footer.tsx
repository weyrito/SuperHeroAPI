import { Box, Container, Flex, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box 
      as="footer"
      bg="linear-gradient(to right, #1a1a1a, #e53935, #1a1a1a)"
      boxShadow="0 -4px 20px rgba(229, 57, 53, 0.4)"
      color="white"
      mt="auto"
    >
      <Container maxW="container.xl" py={4}>
        <Flex 
          flexDir={{ base: "column", md: "row" }}
          justify="space-between" 
          align="center"
          gap={4}
        >
          <Text
            fontSize="sm"
            textShadow="0 0 10px rgba(255, 255, 255, 0.3)"
          >
            © {new Date().getFullYear()} BATMAN. Tous Bat-droits de Gotham réservés.
          </Text>
          
          
        </Flex>
      </Container>
    </Box>
  )
}