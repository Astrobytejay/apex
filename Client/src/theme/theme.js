import { extendTheme } from "@chakra-ui/react";
import { CardComponent } from "./additions/card/card";
import { buttonStyles } from "./components/button";
import { badgeStyles } from "./components/badge";
import { inputStyles } from "./components/input";
import { progressStyles } from "./components/progress";
import { sliderStyles } from "./components/slider";
import { textareaStyles } from "./components/textarea";
import { switchStyles } from "./components/switch";
import { linkStyles } from "./components/link";
import { breakpoints } from "./foundations/breakpoints";
import { globalStyles } from "./styles";

// Custom colors for light and dark modes
const colors = {
  brand: {
    50: '#fafafa',  // Light mode text color
    900: '#010412', // Dark mode background
    textLight: '#010412', // Text color for light mode
    textDark: '#fafafa',   // Text color for dark mode
  },
  backgroundDark: '#010412', // For background in dark mode
  backgroundLight: '#ffffff', // For background in light mode
};

const config = {
  initialColorMode: 'light', // Start in light mode
  useSystemColorMode: false,  // Do not use system color mode
};

// Extend the theme to include the custom color modes and color palette
const theme = extendTheme(
  {
    config,    // Color mode config
    colors,    // Custom color palette
    breakpoints, // Breakpoints
    styles: {
      global: {
        body: {
          bg: 'backgroundLight',  // Light mode background
          color: 'brand.textLight',  // Light mode text
          transition: "background-color 0.2s",
          _dark: {
            bg: 'backgroundDark',  // Dark mode background
            color: 'brand.textDark', // Dark mode text
          },
        },
      },
    },
  },
  globalStyles,
  badgeStyles, // badge styles
  buttonStyles, // button styles
  linkStyles, // link styles
  progressStyles, // progress styles  
  sliderStyles, // slider styles
  inputStyles, // input styles
  textareaStyles, // textarea styles
  switchStyles, // switch styles
  CardComponent // card component
);

export default theme;
