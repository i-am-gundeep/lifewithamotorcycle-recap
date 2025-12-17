import { VStack, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <VStack spacing={8} pt={20}>
      <Heading>LIFE WITH A MOTORCYCLE</Heading>
      <Text>Create your riding recap</Text>

      <Link href="/generate">
        <Button colorScheme="orange" size="lg">
          Create Your Recap
        </Button>
      </Link>
    </VStack>
  );
}
