import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import palette from './palette';
import typography from './typography';

ThemeConfig.prototype = {
  children: PropTypes.node
};
export default function ThemeConfig({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      typography
    }),
    []
  );
  const theme = createTheme(themeOptions);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
