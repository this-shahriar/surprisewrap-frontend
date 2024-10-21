import {
  Button,
  Divider,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ProductsContext } from "../../contexts/ProductsContext";
import { MdDelete, MdEdit } from "react-icons/md";

export const ProductMan = () => {
  const {
    createProductModal,
    setCreateProductModal,
    getProducts,
    products,
    deleteProduct,
  } = useContext(ProductsContext);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <VStack w="100%" p="5rem 2rem 1rem 2rem">
      <HStack w="100%" justifyContent="space-between">
        <Text fontSize="1.1rem" fontWeight="bold">
          Products managment panel
        </Text>
        <Button
          size="sm"
          colorScheme="green"
          onClick={() => setCreateProductModal(true)}
        >
          Add new
        </Button>
      </HStack>
      <Divider />
      {products?.length > 0 && (
        <VStack w="100%">
          <TableContainer w="100%">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Product name</Th>
                  <Th>Price</Th>
                  <Th>Search key</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <Tr key={product.id}>
                    <Td>
                      <HStack>
                        <Image
                          src={product?.image}
                          h="4rem"
                          w="4rem"
                          objectFit="contain"
                          borderRadius="8px"
                          overflow="hidden"
                        />
                        <Text>{product?.name}</Text>
                      </HStack>
                    </Td>
                    <Td>
                      <HStack>
                        <Text>{product?.price}</Text>
                        <Text>{product?.currency}</Text>
                      </HStack>
                    </Td>
                    <Td>{product?.searchKey}</Td>
                    <Td>
                      <HStack>
                        <IconButton
                          size="sm"
                          variant="outline"
                          icon={<Icon as={MdEdit} />}
                          onClick={() =>
                            setCreateProductModal({ edit: product })
                          }
                        />
                        <IconButton
                          size="sm"
                          variant="outline"
                          icon={<Icon as={MdDelete} />}
                          onClick={() => deleteProduct({ id: product?.id })}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      )}
      <Modal
        isOpen={createProductModal}
        onClose={() => setCreateProductModal()}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="1rem">
            <Create edit={createProductModal?.edit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

const Create = ({ edit }) => {
  const { handleSubmit, register, watch, setValue } = useForm({
    defaultValues: edit,
  });

  const nameW = watch("name");
  const catW = watch("category");

  const { createProduct, updateProduct } = useContext(ProductsContext);

  useEffect(() => {
    if (nameW && catW) setValue("searchKey", `${nameW} ${catW}`.toLowerCase());
  }, [nameW, catW]);

  return (
    <form
      style={{ width: "100%" }}
      onSubmit={handleSubmit((values) =>
        edit ? updateProduct({ id: edit?.id, values }) : createProduct(values)
      )}
    >
      <FormControl p="0.5rem 0">
        <Input
          id="name"
          placeholder="Name"
          {...register("name", { required: true })}
        />
      </FormControl>
      <FormControl p="0.5rem 0">
        <Input
          id="price"
          placeholder="Price"
          {...register("price", { required: true, isNumber: true })}
        />
      </FormControl>
      <FormControl p="0.5rem 0">
        <Input
          id="currency"
          placeholder="Currency"
          defaultValue="kr"
          {...register("currency", { required: true })}
        />
      </FormControl>
      <FormControl p="0.5rem 0">
        <Input
          id="category"
          placeholder="Category"
          {...register("category", { required: true })}
        />
      </FormControl>
      <FormControl p="0.5rem 0">
        <Input
          id="searchKey"
          placeholder="Search Key"
          {...register("searchKey", { required: true })}
        />
      </FormControl>
      <FormControl p="0.5rem 0">
        <Input
          id="image"
          placeholder="Image url"
          {...register("image", { required: true })}
        />
      </FormControl>
      <Button w="100%" type="submit" colorScheme="green">
        Submit
      </Button>
    </form>
  );
};
