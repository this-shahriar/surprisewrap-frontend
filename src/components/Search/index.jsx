import { Button, HStack, Icon, Input, VStack } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";

export const SearchBar = () => {
  return (
    <VStack pt="5rem" w="100%" maxW="700px">
      <HStack pt="1rem" w="100%" spacing={0}>
        <Input
          variant="filled"
          borderRadius="100px 0 0 100px"
          placeholder="Looking for flowers?"
          _focus={{ borderColor: "green.500" }}
        />
        <Button
          pr="2rem"
          colorScheme="green"
          borderRadius="0 100px 100px 0"
          leftIcon={<Icon as={MdSearch} />}
        >
          Search
        </Button>
      </HStack>
    </VStack>
  );
};
