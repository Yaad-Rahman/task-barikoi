import { createSlice } from "@reduxjs/toolkit";
import { ThemeSliceInitialProps } from "../types";

const initialState: ThemeSliceInitialProps = {
  darkMode: false,
};

export const dataSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state, action: { payload: boolean }) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setMode } = dataSlice.actions;

export default dataSlice.reducer;
