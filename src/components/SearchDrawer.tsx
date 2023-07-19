import {
  Autocomplete,
  Box,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH } from "../constants/variables";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedPlace,
  setOpen,
  setPlaces,
} from "../redux/slices/dataSlice";
import { RootReducerState } from "../redux/store";
import { getPlaces } from "../API/placesApi";
import { PlaceType } from "../types/placeType";
import { Place as PlaceIcon } from "@mui/icons-material";
import { PinColor } from "../utils/PinColor";
import { useCallback } from "react";
import { setMode } from "../redux/slices/themeSlice";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

export const SearchDrawer = () => {
  const dispatch = useDispatch();
  const open = useSelector((state: RootReducerState) => state.data.open);
  const places = useSelector((state: RootReducerState) => state.data.places);
  const selectedPlace = useSelector(
    (state: RootReducerState) => state.data.selectedPlace
  );

  const handleClear = () => {
    dispatch(setSelectedPlace({ selectedPlace: null }));
    dispatch(setPlaces({ places: [], status: 200 }));
  };

  const handleInputChange = (
    _event: React.ChangeEvent<{}>,
    _value: string,
    reason: string
  ) => {
    if (reason === "clear") {
      handleClear();
    }
  };

  const handleSearch = useCallback(
    (place: string | PlaceType) => {
      if (typeof place === "string") {
        if (place === "") {
          handleClear();
        } else {
          getPlaces(place)
            .then((response) => {
              if (response.status === 200) {
                dispatch(setPlaces(response.data));
                console.log("api data", response.data);
              } else {
                dispatch(setPlaces({ places: [], status: 200 }));
              }
            })
            .catch((error) => console.error("API ERROR", error));
        }
      }
    },
    [dispatch]
  );

  const handleOnChange = (value: PlaceType | string) => {
    if (typeof value !== "string") {
      dispatch(setSelectedPlace({ selectedPlace: value }));
      dispatch(setPlaces({ places: [], status: 200 }));
    }
  };

  const handleDrawerClose = () => {
    dispatch(setOpen(false));
  };

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        // paddingX: 5,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Typography variant="h3" fontWeight="bold" color="teal">
          Barikoi Task
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>

      <FormGroup sx={{ mt: 5, px: 3 }}>
        <FormControlLabel
          control={
            <Switch
              onChange={(event) => dispatch(setMode(event.target.checked))}
            />
          }
          label="Dark Mode"
        />
      </FormGroup>

      <Box marginX={2} mt={5}>
        <Autocomplete
          freeSolo
          onInputChange={handleInputChange}
          clearOnEscape
          id="map-search"
          getOptionLabel={(option) => {
            if (typeof option === "string") {
              return "No Options";
            } else {
              return option.address;
            }
          }}
          options={places}
          onChange={(_, value) => handleOnChange(value ?? "")}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search Location"
              onChange={(event) => handleSearch(event.target.value)}
              onKeyPress={(event) => {
                const pattern = /^[A-Za-z0-9\s]+$/;
                if (!pattern.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.id}>
              <Box display="flex" gap={2}>
                <PlaceIcon />
                <Box display="flex" flexDirection="column">
                  <Typography variant="h6">
                    {option.address.split(",")[0]?.trim()}
                  </Typography>
                  <Typography variant="body1">
                    {option.address},{option.area},{option.city}
                  </Typography>
                  <Chip
                    label={option.pType}
                    sx={{
                      backgroundColor: PinColor(option.pType),
                      color: "white",
                      width: "fit-content",
                    }}
                  />
                </Box>
              </Box>
            </li>
          )}
        />
        {selectedPlace && (
          <Box sx={{ mt: 10 }}>
            <Typography variant="h3">
              {selectedPlace.address.split(",")[0]?.trim()}
            </Typography>
            <Typography variant="h6" mt={2}>
              {selectedPlace.address},{selectedPlace.area},{selectedPlace.city}
            </Typography>
            <Box display="flex" gap={2} mt={2} alignItems="center">
              <Typography variant="body1">Place Type:</Typography>
              <Typography
                variant="body1"
                sx={{
                  backgroundColor: PinColor(selectedPlace.pType),
                  color: "whitesmoke",
                  p: 1,
                  borderRadius: 10,
                }}
              >
                {selectedPlace.pType}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};
