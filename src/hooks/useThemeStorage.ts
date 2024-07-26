import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';
import { getEncryptStorage, setEncryptStorage } from '@/utils';

import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

const useThemeStorage = () => {
  const systemTheme = useColorScheme();
  const { theme, isSystem, setTheme, setSystemTheme } = useThemeStore();
  // INFO: 암호화가 필요한 내용으 아니라서 asyncStorage를 설치해서 적용해도 됨.
  const setMode = async (mode: ThemeMode) => {
    await setEncryptStorage('themeMode', mode);
    setTheme(mode);
  };

  const setSystem = async (flag: boolean) => {
    await setEncryptStorage('themeSystem', flag);
    setSystemTheme(flag);
  };

  useEffect(() => {
    (async () => {
      const mode = (await getEncryptStorage('themeMode')) ?? 'light';
      const systemMode = (await getEncryptStorage('systemMode')) ?? false;
      const newMode = systemMode ? systemTheme : mode;
      setMode(newMode);
      setSystemTheme(systemMode);
    })();
  }, [systemTheme]);

  return { theme, isSystem, setMode, setSystem };
};

export default useThemeStorage;
