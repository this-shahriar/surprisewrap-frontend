import {
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  HStack,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {
  MdFilter,
  MdFilter1,
  MdFilter2,
  MdOutlineFilter,
  MdOutlineFilterList,
  MdOutlineSettings,
  MdSearch,
} from "react-icons/md";
import { ProductsContext } from "../../contexts/ProductsContext";

export const SearchBar = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  const { applyFilter, search, setSearchParams, searchParams } =
    useContext(ProductsContext);

  useEffect(() => {
    if (checkedItems) applyFilter(checkedItems);
  }, [checkedItems]);

  return (
    <VStack pt="5rem" w="100%" maxW="700px">
      <HStack pt="1rem" w="100%" spacing={0}>
        <Input
          variant="filled"
          borderRadius="100px 0 0 100px"
          placeholder="Looking for flowers?"
          onChange={(e) => {
            setSearchParams((p) => ({
              ...p,
              search: e?.target?.value?.toLowerCase(),
            }));
            search(e?.target?.value?.toLowerCase());
          }}
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
        <Menu>
          <MenuButton>
            <IconButton
              size="lg"
              variant="link"
              colorScheme="green"
              icon={<Icon as={MdOutlineSettings} />}
            />
          </MenuButton>
          <MenuList p="1rem" boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px">
            <HStack pb="0.5rem" w="100%">
              <Text fontSize="0.8rem" fontWeight="bold" opacity={0.6}>
                Filters
              </Text>
              <Divider />
            </HStack>
            <VStack w="100%" alignItems="start">
              <Checkbox
                size="sm"
                colorScheme="green"
                isChecked={searchParams?.category == "toy"}
                onChange={(e) => {
                  e?.target?.checked
                    ? setSearchParams((p) => ({ ...p, category: "toy" }))
                    : setSearchParams((p) => ({ ...p, category: "" }));
                }}
              >
                Toys
              </Checkbox>
              <Checkbox
                size="sm"
                colorScheme="green"
                isChecked={searchParams?.category == "flower"}
                onChange={(e) => {
                  e?.target?.checked
                    ? setSearchParams((p) => ({ ...p, category: "flower" }))
                    : setSearchParams((p) => ({ ...p, category: "" }));
                }}
              >
                Flowers
              </Checkbox>
              <Checkbox
                size="sm"
                colorScheme="green"
                isChecked={searchParams?.category == "cloths"}
                onChange={(e) => {
                  e?.target?.checked
                    ? setSearchParams((p) => ({ ...p, category: "cloths" }))
                    : setSearchParams((p) => ({ ...p, category: "" }));
                }}
              >
                Feel Warm
              </Checkbox>
              <Checkbox
                size="sm"
                colorScheme="green"
                isChecked={searchParams?.category == "chocolate"}
                onChange={(e) => {
                  e?.target?.checked
                    ? setSearchParams((p) => ({ ...p, category: "chocolate" }))
                    : setSearchParams((p) => ({ ...p, category: "" }));
                }}
              >
                Chocolates
              </Checkbox>
              <Checkbox
                size="sm"
                colorScheme="green"
                isChecked={searchParams?.category == "decor"}
                onChange={(e) => {
                  e?.target?.checked
                    ? setSearchParams((p) => ({ ...p, category: "decor" }))
                    : setSearchParams((p) => ({ ...p, category: "" }));
                }}
              >
                Home Decoration
              </Checkbox>
            </VStack>
            <HStack p="1rem 0" w="100%">
              <Text
                fontSize="0.8rem"
                fontWeight="bold"
                opacity={0.6}
                whiteSpace="nowrap"
              >
                Sort By
              </Text>
              <Divider />
            </HStack>
            <Select
              size="sm"
              onChange={(e) =>
                setSearchParams((p) => ({ ...p, order: e?.target?.value }))
              }
              _focus={{ borderColor: "green.500", boxShadow: "none" }}
            >
              <option value="htl">Price: High to Low</option>
              <option value="lth">Price: Low to High</option>
            </Select>
          </MenuList>
        </Menu>
      </HStack>
    </VStack>
  );
};
