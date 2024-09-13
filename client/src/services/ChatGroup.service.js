import { getRequest, postRequest } from "../api";
import { throwServerError } from "./../utils/custom_errors";

const MODEL_NAME = "/chatGroup";

export async function createChatGroup(payload) {
  try {
    const result = await postRequest(`${MODEL_NAME}/create`, payload);
    return result;
  } catch (err) {
    return throwServerError(err);
  }
}

export async function getAllChatsOfUser(id) {
  try {
    const result = await getRequest(`${MODEL_NAME}/chats/${id}`);
    return result;
  } catch (err) {
    return throwServerError(err);
  }
}
