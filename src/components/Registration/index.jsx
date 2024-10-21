import {
  Alert,
  AlertIcon,
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

export const Registration = () => {
  const {
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const passWatch = watch("password");
  const conPassWatch = watch("confirm_password");

  const { onRegistrationSubmit, setPageMode, authLoader } =
    useContext(AuthContext);

  return (
    <form
      style={{ width: "100%" }}
      onSubmit={handleSubmit(onRegistrationSubmit)}
    >
      <FormControl p="0.5rem 0" isInvalid={errors.username}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          type="username"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
        />
        <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
      </FormControl>

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
      </FormControl>

      {passWatch && passWatch?.length < 8 && (
        <Alert
          fontSize="0.85rem"
          status="error"
          p="0.5rem 1rem"
          borderRadius="6px"
        >
          <AlertIcon />
          Minimum password length is 8
        </Alert>
      )}

      <FormControl p="0.5rem 0" isInvalid={errors.confirm_password}>
        <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
        <Input
          id="confirm_password"
          type="password"
          placeholder="Confirm Password"
          {...register("confirm_password", {
            required: "Please confirm password",
          })}
        />
        <FormErrorMessage>{errors?.confirm_password?.message}</FormErrorMessage>
      </FormControl>

      {passWatch &&
        conPassWatch &&
        passWatch?.length >= 8 &&
        passWatch != conPassWatch && (
          <Alert
            fontSize="0.85rem"
            status="error"
            p="0.5rem 1rem"
            borderRadius="6px"
          >
            <AlertIcon />
            Passwords do not match!
          </Alert>
        )}

      <Button
        mt={4}
        w="100%"
        type="submit"
        colorScheme="green"
        isDisabled={passWatch?.length < 8 || passWatch != conPassWatch}
        isLoading={authLoader?.onRegistrationSubmit}
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
          Already have an account? Login
        </Button>
      </VStack>
    </form>
  );
};
