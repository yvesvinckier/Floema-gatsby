import React from "react";

import { AppProvider } from "./src/context/AppContext";

import CustomLayout from "./src/gatsby/browser/wrapPageElement";
export const wrapPageElement = CustomLayout;

export const wrapRootElement = ({ element }) => (
  <AppProvider>{element}</AppProvider>
);
