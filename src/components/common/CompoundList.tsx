import React, { createContext, PropsWithChildren, ReactNode, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, ViewProps } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';

interface ListContextValue {
  onItemPress?: (itemId: string) => void;
}

const ListContext = createContext<ListContextValue | undefined>(undefined);

interface ListMainProps extends ViewProps {
  children: ReactNode;
  onItemPress?: (itemId: string) => void;
}

const ListMain = ({ children, onItemPress, ...props }: ListMainProps) => {
  return (
    <ListContext.Provider value={{ onItemPress }}>
      <View {...props}>{children}</View>
    </ListContext.Provider>
  );
};

interface ItemProps {
  id: string;
  icon: ReactNode;
  title: string;
  onPress?: () => void;
}

const Item = ({ id, icon, title, onPress }: ItemProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const listContext = useContext(ListContext);

  const handlePress = () => {
    onPress?.();
    listContext?.onItemPress?.(id);
  };

  return (
    <Pressable onPress={handlePress} style={styles.itemContainer}>
      <View style={styles.leftContent}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
      <FontAwesome name="angle-right" size={24} />
    </Pressable>
  );
};

const Divider = () => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  return <View style={styles.divider} />;
};

export const CompoundList = Object.assign(ListMain, {
  Item,
  Divider,
});

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
    },
    leftContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    title: {
      fontSize: 16,
      color: colors[theme].BLACK,
    },
    divider: {
      height: 1,
      backgroundColor: colors[theme].GRAY_200,
    },
  });
