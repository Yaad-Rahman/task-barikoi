import { MapSection } from "./components/MapSection";
import { Box } from "@mui/material";
import { SearchDrawer } from "./components/SearchDrawer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootReducerState } from "./redux/store";

function App() {
  const isDarkMode = useSelector(
    (state: RootReducerState) => state.theme.darkMode
  );

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex">
        <SearchDrawer />
        <MapSection />
      </Box>
    </ThemeProvider>
  );
}

export default App;
