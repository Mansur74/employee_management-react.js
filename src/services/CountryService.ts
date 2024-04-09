import axios from "axios"
import { Country, DataResult } from "../db";
import { getAccessToken, getRefreshToken } from "./AuthorizationService";

export const updateCountry = async (countryId: number, country: Country) => {
  const refreshToken: string = getRefreshToken()!;
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = axios.put<DataResult<Country>>(`http://localhost:8080/api/country/${countryId}`, country, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const getAllCountries = async () => {
  const refreshToken: string = getRefreshToken()!;
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = axios.get<DataResult<Country[]>>(`http://localhost:8080/api/countries`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}