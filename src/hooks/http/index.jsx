import { useToast } from "@chakra-ui/react";
import axios from "axios";

export const useHttp = () => {
  const toast = useToast();
  // const { logout } = useContext(AuthContext);

  const get = async ({ url, token, params, getFull }) => {
    try {
      const res = await axios({
        method: "GET",
        url: url,
        //   headers: { token: token },
        params: params,
      });

      if (res && getFull) return res;
      else if (res?.status === 200 && res.data?.data) {
        return res.data.data;
      } else return null;
    } catch (error) {
      toast({
        title: "Error",
        description: JSON.stringify(error?.response?.data),
        status: "error",
      });
      return null;
    }
  };

  const post = async ({ url, token, data, header, extEndpoint }) => {
    try {
      const res = await axios({
        method: "POST",
        url: url,
        // headers: { token: token, ...header },
        data: { ...data },
      });

      // if (res?.status === 201) return true;
      if (res?.status === 201) return res?.data || true;
      else if (res?.status === 200) return res?.data;
      else return null;
    } catch (error) {
      toast({
        title: "Error",
        description: JSON.stringify(error?.response?.data),
        status: "error",
      });

      return null;
      // todo logout
    }
  };

  return { get, post };
};
