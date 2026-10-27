import { createContext, useContext } from 'react';

import { lightTheme, type Theme } from './tokens';

export const ThemeContext = createContext<Theme>(lightTheme);

export const useTheme = () => useContext(ThemeContext);
