import { SET_SIDEBAR_OPENED, SET_BGCOLOR, SET_NETWORKSTATUS } from "../constants.js";
import logo from "../../assets/img/simple-logo.png";

const initialState = {
  templateProps: {
    networkStatus: window.navigator.onLine, // [true, false]
    sidebarOpened: true,// [true, false]
    bgColor: "blue", //["primary", "blue", "green"]
    mode: "light", // ["light", "dark"]
    logo: {
      outterLink: "",
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

    // setUserType
    if (action.type === SET_NETWORKSTATUS) {
      return Object.assign(
        {},
        {
          templateProps: {
            ...state.templateProps,
            networkStatus: action.payload,
          },
        }
      );
    }

  return state;
}

export default templateReducer;
