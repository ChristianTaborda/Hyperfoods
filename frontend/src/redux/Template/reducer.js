import { SET_SIDEBAR_OPENED, SET_BGCOLOR } from "../constants.js";
import logo from "../../assets/img/simple-logo.png";

const initialState = {
  templateProps: {
    sidebarOpened: true,
    bgColor: "blue", //["primary", "blue", "green"]
    mode: "light", // ["light", "dark"]
    logo: {
      outterLink: "https://github.com/esneidermanzano/hyperfoods",
      text: "HyperFoods",
      imgSrc: logo,
    },
  },
};

function templateReducer(state = initialState, action) {
  // setSidebarOpened
  if (action.type === SET_SIDEBAR_OPENED) {
    return Object.assign(
      {},
      {
        templateProps: {
          ...state.templateProps,
          sidebarOpened: action.payload,
        },
      }
    );
  }

  // setBgColor
  if (action.type === SET_BGCOLOR) {
    return Object.assign(
      {},
      {
        templateProps: {
          ...state.templateProps,
          bgColor: action.payload,
        },
      }
    );
  }

  return state;
}

export default templateReducer;
