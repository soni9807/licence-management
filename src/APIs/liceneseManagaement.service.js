import axios from "axios";
import { BASE_URL } from "../util/urls";
import { setAllTenants } from "../reduxStore/slices/licenceSlice";

export const fetchTenantsData = () => async (dispatch) => {
  try {
    const url = `${BASE_URL}/all-tenants`;
    const response = await axios.get(url);
    dispatch(setAllTenants(response?.data));
  } catch (err) {
    console.error("Error fetching tenants:", err);
  }
};
