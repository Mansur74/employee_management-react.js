import axios from "axios"
import { Country } from "../db";

export const getAllCountries = async () => {
  try {
    const result = axios.get<Country[]>("http://localhost:3005/api/country");
    return result;
  } 
  catch (error) {
    if (axios.isAxiosError(error))
      return error.message;

    else
      return "Anexpected Error!";

  }
}