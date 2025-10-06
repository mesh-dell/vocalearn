import axios from "axios";
import { handleError } from "@/Helpers/ErrorHandle";
import { UserProfileToken } from "../Models/User";

const api = "http://localhost:8080/admin/";

export const loginAPI = async (email: string, password: string) => {
  try {
    const data = await axios.post<UserProfileToken>(api + "auth/authenticate", {
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
