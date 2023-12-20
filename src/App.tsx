import React from "react";
import AuthProvider from "./context/AuthProvider";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "context/SnackbarContext";
import "@fontsource/ubuntu";
export const ColorModeContext = React.createContext({ toggleColorMode: () => { }, mode: "light" });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const theme = React.useMemo(
    () =>
      createTheme({
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: '50px',
              }
            }
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 50,
                border: 0,
                boxShadow: 'none',
              },
            },
          },
          MuiTypography: {
            defaultProps: {
              variantMapping: {
                h1: 'h1',
                h2: 'h2',
                h3: 'h3',
                h4: 'h4',
                h5: 'h5',
                h6: 'h6',
                subtitle1: 'span',
                subtitle2: 'span',
                body1: 'span',
                body2: 'span',
              },
            },
          },
        },
        
        typography: {
          fontFamily: 'Ubuntu, tahoma',
          fontSize: 14,
          body1: {
            fontWeight: 500,
          },
          button: {
            fontWeight: '500',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontSize: '14px',
          },
          h1: {
            fontWeight: '700',
            letterSpacing: '6px',
            textTransform: 'uppercase',
          },
          h2: {
            fontWeight: '700',
            letterSpacing: '6px',
            textTransform: 'uppercase',
          },
          h3: {
            fontWeight: '700',
            letterSpacing: '6px',
            textTransform: 'uppercase',
          },
          h4: {
            fontWeight: '700',
            letterSpacing: '6px',
            textTransform: 'uppercase',
          },
          h5: {
            fontWeight: '700',
            letterSpacing: '6px',
            textTransform: 'uppercase',
          },
          h6: {
            fontWeight: '700',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            color: '#333',
          },
        },
        palette: {
          primary: {
            light: '#d74041',
            main: '#d74041',
          },
          secondary: {
            light: '#d74041',
            main: '#d74041',
          },
        },
      }),
    [],
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
