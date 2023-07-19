import { PlaceType } from "../types/placeType";

export type DataSliceInitialProps = {
  open: boolean;
  places: PlaceType[] | [];
  selectedPlace: PlaceType | null;
};

export type ThemeSliceInitialProps = {
  darkMode: boolean;
};
