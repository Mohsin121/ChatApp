import { getRequest, postRequest } from "../api";
import { throwServerError } from "./../utils/custom_errors";

const MODEL_NAME = "/user";

export async function getAllUsers() {
  try {
    const result = await getRequest(`${MODEL_NAME}`);
    return result?.user || result;
  } catch (err) {
    return throwServerError(err);
  }
}
