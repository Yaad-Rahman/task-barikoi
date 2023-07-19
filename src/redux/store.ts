import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "redux";

import dataSliceReducer from "./slices/dataSlice";
import themeSliceReducer from "./slices/themeSlice";

const reducers = combineReducers({
  data: dataSliceReducer,
  theme: themeSliceReducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootReducerState = ReturnType<typeof reducers>;
