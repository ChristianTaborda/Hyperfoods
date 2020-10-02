import { SET_CREDENTIALS } from "../constants";

export function setCredentials(payload) {
  return { type: SET_CREDENTIALS, payload };
}