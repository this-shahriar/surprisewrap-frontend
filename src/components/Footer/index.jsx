import { Divider, Text, VStack } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <VStack w="100%" p="1rem">
      <Divider />
      <Text fontSize="0.9rem" opacity={0.5}>
        2024 Surprisewrap. All rights reserved.
      </Text>
    </VStack>
  );
};
