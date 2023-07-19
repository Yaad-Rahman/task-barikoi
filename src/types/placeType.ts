export type PlaceType = {
  id: number;
  longitude: string;
  latitude: string;
  address: string;
  city: string;
  area: string;
  postCode: number;
  pType: string;
  uCode: string;
};

export interface PlacesGetResponse {
  places: PlaceType[] | [];
  status: number;
}
