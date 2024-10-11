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
  const [searchStr, setSearchStr] = useState();
  const { applyFilter, search } = useContext(ProductsContext);

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
            setSearchStr(e?.target?.value?.toLowerCase());
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
            {/* MenuItems are not rendered unless Menu is open */}
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
                onChange={(e) =>
                  e?.target?.checked
                    ? setCheckedItems((ci) => [...ci, "toy"])
                    : setCheckedItems((ci) =>
                        ci?.filter((item) => item != "toy")
                      )
                }
              >
                Toys
              </Checkbox>
              <Checkbox
                size="sm"
                colorScheme="green"
                onChange={(e) =>
                  e?.target?.checked
                    ? setCheckedItems((ci) => [...ci, "flower"])
                    : setCheckedItems((ci) =>
                        ci?.filter((item) => item != "flower")
                      )
                }
              >
                Flowers
              </Checkbox>
              <Checkbox
                size="sm"
                colorScheme="green"
                onChange={(e) =>
                  e?.target?.checked
                    ? setCheckedItems((ci) => [...ci, "feel warm"])
                    : setCheckedItems((ci) =>
                        ci?.filter((item) => item != "feel warm")
                      )
                }
              >
                Feel Warm
              </Checkbox>
              <Checkbox
                size="sm"
                colorScheme="green"
                onChange={(e) =>
                  e?.target?.checked
                    ? setCheckedItems((ci) => [...ci, "chocolate"])
                    : setCheckedItems((ci) =>
                        ci?.filter((item) => item != "chocolate")
                      )
                }
              >
                Chocolates
              </Checkbox>
              <Checkbox
                size="sm"
                colorScheme="green"
                onChange={(e) =>
                  e?.target?.checked
                    ? setCheckedItems((ci) => [...ci, "home decoration"])
                    : setCheckedItems((ci) =>
                        ci?.filter((item) => item != "home decoration")
                      )
                }
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
              _focus={{ borderColor: "green.500", boxShadow: "none" }}
            >
              <option value="new">New Addition</option>
              <option value="htl">Price: High to Low</option>
              <option value="lth">Price: Low to High</option>
            </Select>
          </MenuList>
        </Menu>
      </HStack>
    </VStack>
  );
};
