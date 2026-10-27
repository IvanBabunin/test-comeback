import { createContext, useContext } from 'react';

import { theme, type Theme } from './tokens';

export const ThemeContext = createContext<Theme>(theme);

export const useTheme = () => useContext(ThemeContext);
