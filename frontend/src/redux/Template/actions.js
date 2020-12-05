import { SET_SIDEBAR_OPENED, SET_BGCOLOR, SET_MODE, SET_NETWORKSTATUS } from "../constants.js";

export function setSidebarOpened(payload) {
  return { type: SET_SIDEBAR_OPENED, payload };
}

export function setBgColor(payload) {
  return { type: SET_BGCOLOR, payload };
}

export function setMode(payload) {
  return { type: SET_MODE, payload };
}

export function setNetworkStatus(payload) {
  return { type: SET_NETWORKSTATUS, payload };
}