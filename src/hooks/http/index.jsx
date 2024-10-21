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
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        params: params,
      });

      if (res && getFull) return res;
      else if (res?.status === 200 && res.data) {
        return res.data;
      } else return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        toast({
          description: error.response.data.message,
          status: "error",
        });
      }
      return null;
    }
  };

  const post = async ({ url, token, data, header, extEndpoint }) => {
    try {
      const res = await axios({
        method: "POST",
        url: url,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        data: { ...data },
      });

      // if (res?.status === 201) return true;
      if (res?.status === 201) return res?.data || true;
      else if (res?.status === 200) return res?.data;
      else return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        toast({
          title: "Error",
          description: error.response.data.message,
          status: "error",
        });
      }

      return null;
      // todo logout
    }
  };

  const put = async ({ url, token, data, header, extEndpoint }) => {
    try {
      const res = await axios({
        method: "PUT",
        url: url,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        data: { ...data },
      });

      // if (res?.status === 201) return true;
      if (res?.status === 201) return res?.data || true;
      else if (res?.status === 200) return res?.data;
      else return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        toast({
          title: "Error",
          description: error.response.data.message,
          status: "error",
        });
      }

      return null;
      // todo logout
    }
  };

  const del = async ({ url, token, extEndpoint }) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: url,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (res?.status === 201) return res?.data || true;
      else if (res?.status === 200) return res?.data;
      else return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        toast({
          title: "Error",
          description: error.response.data.message,
          status: "error",
        });
      }

      return null;
    }
  };

  return { get, post, put, del };
};
