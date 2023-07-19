import { createSlice } from "@reduxjs/toolkit";
import { DataSliceInitialProps } from "../types";
import { PlacesGetResponse } from "@/src/types/placeType";

const initialState: DataSliceInitialProps = {
  open: true,
  places: [],
  selectedPlace: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setOpen: (state, action: { payload: boolean }) => {
      state.open = action.payload;
    },
    setPlaces: (state, action: { payload: PlacesGetResponse }) => {
      state.places = action.payload.places;
    },
    setSelectedPlace: (
      state,
      action: { payload: Pick<DataSliceInitialProps, "selectedPlace"> }
    ) => {
      state.selectedPlace = action.payload.selectedPlace;
    },
  },
});

export const { setOpen, setPlaces, setSelectedPlace } = dataSlice.actions;

export default dataSlice.reducer;
