import { ADD_PENDING_WORKERS } from "../constants";

export function addPendingWorkers(payload) {
  return { type: ADD_PENDING_WORKERS, payload };
}
