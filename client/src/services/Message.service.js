import { getRequest, postRequest } from "../api";
import { throwServerError } from "./../utils/custom_errors";

const MODEL_NAME = "/message";

export async function sendMessage(payload) {
  try {
    const result = await postRequest(`${MODEL_NAME}/send`, payload);
    return result;
  } catch (err) {
    return throwServerError(err);
  }
}

export async function getAllMessages(id) {
  try {
    const result = await getRequest(`${MODEL_NAME}/${id}`);
    console.log("Result", result);

    return result;
  } catch (err) {
    return throwServerError(err);
  }
}
