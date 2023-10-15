import React from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

import AuthProvider from "./context/AuthProvider";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "context/SnackbarContext";

export const ColorModeContext = React.createContext({ toggleColorMode: () => {}, mode: "light" });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // const [mode, setMode] = React.useState<"light" | "dark">(
  //   useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light"
  // );

  // const colorMode = React.useMemo(
  //   () => ({
  //     toggleColorMode: () => {
  //       setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  //     },
  //   }),
  //   []
  // );

  const theme = React.useMemo(
    () =>
      createTheme({
        // typography: {
        //   fontFamily: `Vazirmatn`,
        // },
        palette: {
          // mode,
          primary: {
            main: "#798bff",
          },
          secondary: {
            main: "#db5556",
          },
          background: {
            default: "#f5f6fa",
            paper: "#ffffff",
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <AuthProvider>
          <CssBaseline />
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              {/* <ColorModeContext.Provider value={{ ...colorMode, mode }}> */}
              <AppRoutes />
              {/* </ColorModeContext.Provider> */}
            </QueryClientProvider>
          </BrowserRouter>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
