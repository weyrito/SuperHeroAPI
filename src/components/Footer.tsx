import { Box, Container, Flex, Link, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

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
            © {new Date().getFullYear()} SuperHero Database. Tous droits réservés.
          </Text>
          
          <Flex gap={6}>
            <motion.div whileHover={{ filter: 'brightness(1.2)' }}>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                fontWeight="500"
                _hover={{ 
                  color: "#64b5f6", 
                  textShadow: "0 0 12px #64b5f6",
                  textDecoration: "none"
                }}
                transition="all 0.3s ease"
              >
                GITHUB
              </Link>
            </motion.div>

            <motion.div whileHover={{ filter: 'brightness(1.2)' }}>
              <Link
                href="https://superheroapi.com"
                target="_blank"
                rel="noopener noreferrer"
                fontWeight="500"
                _hover={{ 
                  color: "#64b5f6", 
                  textShadow: "0 0 12px #64b5f6",
                  textDecoration: "none"
                }}
                transition="all 0.3s ease"
              >
                API
              </Link>
            </motion.div>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}