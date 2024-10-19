import { VStack } from "@chakra-ui/react";

export const Container = ({ children }) => {
  return (
    <VStack data-testid="container" w="100%" maxW="1280px" m="auto">
      {children}
    </VStack>
  );
};
