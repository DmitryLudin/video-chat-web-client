import { ThemeModeSwitch } from 'components/theme-mode-switch';
import {
  ColorModeContext,
  TColorModeContext,
} from 'shared/contexts/color-mode.context';
import { useContext } from 'react';

export function ThemeSwitch() {
  const { mode, toggleColorMode } = useContext(
    ColorModeContext
  ) as TColorModeContext;

  return (
    <ThemeModeSwitch
      sx={{ m: 1 }}
      onChange={toggleColorMode}
      checked={mode === 'dark'}
    />
  );
}
