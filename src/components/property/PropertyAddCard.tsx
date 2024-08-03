import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
interface PropertyAddCardProps {
  title: string;
  description: string[];
  image?: string;
}

const PropertyAddCard = ({ title, description, image }: PropertyAddCardProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        {description.map((line, index) => (
          <Text key={index} style={styles.descriptionText}>
            {line}
          </Text>
        ))}
      </View>
      <View style={styles.ImageContainer}>
        <Image style={styles.image} source={require('../../assets/images/building.png')} />
      </View>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 10,
      marginVertical: 10,
      backgroundColor: theme === 'light' ? 'white' : 'black',
      borderRadius: 10,
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.17,
          shadowRadius: 18,
        },
        android: {
          elevation: 8,
        },
      }),
    },
    textContainer: {
      flex: 1,
    },
    ImageContainer: {
      width: 100,
      height: 100,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    titleText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    descriptionText: {
      fontSize: 14,
      color: colors[theme].GRAY_700,
      width: 210,
      marginBottom: 3,
    },
  });

export default PropertyAddCard;
