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

export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { onLoginSubmit, setPageMode, authLoader } = useContext(AuthContext);

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onLoginSubmit)}>
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
      <FormControl p="0.5rem 0" isInvalid={errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        {/* <Button
          opacity={0.8}
          variant="link"
          fontSize="0.7rem"
          textDecoration="underline"
          onClick={() => setPageMode("forgotPassword")}
        >
          Forgot password?
        </Button> */}
      </FormControl>

      <Button
        mt={4}
        w="100%"
        type="submit"
        colorScheme="green"
        isLoading={authLoader?.onLoginSubmit}
      >
        Submit
      </Button>
      <VStack p="1rem 0" w="100%" alignItems="center">
        <Button
          variant="link"
          fontSize="0.8rem"
          textDecoration="underline"
          onClick={() => setPageMode("registration")}
        >
          Don't have an account? Sign Up
        </Button>
      </VStack>
    </form>
  );
};
