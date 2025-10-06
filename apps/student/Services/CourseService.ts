import { handleError } from "@/Helpers/ErrorHandle";
import { CourseGet } from "@/Models/Course";
import axios from "axios";
const api = "http://localhost:8080/course/get/all";


export const coursesGetAPI = async () => {
  try {
    const data = await axios.get<CourseGet[]>(api);
    return data;
  } catch (error) {
    handleError(error);
  }
};