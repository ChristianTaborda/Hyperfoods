import { SET_SIDEBAR_OPENED, SET_BGCOLOR, SET_USERTYPE } from "../constants.js";

export function setSidebarOpened(payload) {
  return { type: SET_SIDEBAR_OPENED, payload };
}

export function setBgColor(payload) {
  return { type: SET_BGCOLOR, payload };
}

export function setUserType(payload) {
  return { type: SET_USERTYPE, payload };
}