import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";

export const ForgetPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { onLoginSubmit, setPageMode, onForgetEmailSubmit } =
    useContext(AuthContext);

  return (
    <form
      style={{ width: "100%" }}
      onSubmit={handleSubmit(onForgetEmailSubmit)}
    >
      <FormControl p="0.5rem 0" isInvalid={errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />
        <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
      </FormControl>

      <Button
        mt={4}
        w="100%"
        type="submit"
        colorScheme="green"
        // isLoading={submitLoading}
      >
        Submit
      </Button>
      <VStack p="1rem 0" w="100%" alignItems="center">
        <Button
          variant="link"
          fontSize="0.8rem"
          textDecoration="underline"
          onClick={() => setPageMode("login")}
        >
          Go back to login page
        </Button>
      </VStack>
    </form>
  );
};
