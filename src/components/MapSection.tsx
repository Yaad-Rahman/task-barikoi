import Map, { NavigationControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH } from "../constants/variables";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "../redux/store";
import {
  PinDrop as PinDropIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { PinColor } from "../utils/PinColor";
import { Box, IconButton } from "@mui/material";
import { setOpen } from "../redux/slices/dataSlice";

const Main = styled("main", {
  shouldForwardProp: (prop: string) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export const MapSection = () => {
  const dispatch = useDispatch();
  const selectedPlace = useSelector(
    (state: RootReducerState) => state.data.selectedPlace
  );
  const open = useSelector((state: RootReducerState) => state.data.open);
  const places = useSelector((state: RootReducerState) => state.data.places);

  console.log("places", places);
  console.log("selectedPlace", selectedPlace);

  return (
    <Main open={open}>
      <IconButton
        sx={{
          position: "absolute",
          left: 50,
          top: 30,
          zIndex: 1000,
          background: "white",
        }}
        onClick={() => dispatch(setOpen(true))}
      >
        <ChevronRightIcon />
      </IconButton>
      <Box>
        <Map
          latitude={selectedPlace ? Number(selectedPlace.latitude) : 23.8103}
          longitude={selectedPlace ? Number(selectedPlace.longitude) : 90.4125}
          mapboxAccessToken="pk.eyJ1IjoieWFhZDk1IiwiYSI6ImNsazcwb2Z5OTAzcngza21sdzJjZnRzamUifQ.p-gwOGh3F6vnsHmSVDko3w"
          initialViewState={{
            longitude: 90.4125,
            latitude: 23.8103,
            zoom: 14,
          }}
          style={{ width: `calc(100vw - ${DRAWER_WIDTH})`, height: "100vh" }}
          onRender={(event) => event.target.resize()}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {places.length > 0 &&
            places.map((place) => (
              <Marker
                latitude={Number(place.latitude)}
                longitude={Number(place.longitude)}
              >
                <div>
                  <PinDropIcon
                    sx={{ color: PinColor(place.pType), fontSize: "24px" }}
                  />
                </div>
              </Marker>
            ))}

          {/* selected marker  */}
          {selectedPlace && (
            <Marker
              latitude={Number(selectedPlace.latitude)}
              longitude={Number(selectedPlace.longitude)}
            >
              <div>
                <PinDropIcon
                  sx={{
                    color: PinColor(selectedPlace.pType),
                    fontSize: "24px",
                  }}
                />
              </div>
            </Marker>
          )}

          <NavigationControl position="top-left" />
        </Map>
      </Box>
    </Main>
  );
};
