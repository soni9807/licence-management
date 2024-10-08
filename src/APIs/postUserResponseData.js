import axios from "axios";
import { BASE_URL } from "../util/urls";

const postUserResponseData = async (data) => {
  try {
    console.log(data);
    const url = `${BASE_URL}/update-user-response`;
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error posting user data:", error);
    throw error;
  }
};

export default postUserResponseData;
