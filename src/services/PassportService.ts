import axios from "axios";
import { Passport } from "../db";

export const getPassportById = async (id: string) => {
  try {
    const data = await axios.get<Passport>(`http://localhost:3005/api/passport/${id}`);
    console.log(data);  
    return data;
  } 
  catch (error: any) {
    console.log(error)
  }
 
 }