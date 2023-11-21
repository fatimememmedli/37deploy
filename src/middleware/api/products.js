import { base_Url } from "./index";
import axios from "axios";

export async function getAllProducts() {
  let result;
  result = await axios(base_Url + "/products").then((res) => {
    return res.data;
  });
  return result;
}
