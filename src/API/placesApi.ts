import axios, { AxiosResponse } from "axios";
import { BARIKOI_API_KEY } from "../constants/variables";
import { PlacesGetResponse } from "../types/placeType";

export const getPlaces = (
  place: string
): Promise<AxiosResponse<PlacesGetResponse>> => {
  console.log("it called");
  return axios.get(
    `https://barikoi.xyz/v1/api/search/autocomplete/${BARIKOI_API_KEY}/place?q=${place}`
  );
};
