import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useThemeStore from '@/store/useThemeStore';
import { colors, profileNavigations, propertyNavigations } from '@/constants';
import { ThemeMode } from '@/types/common';
import useUser from '@/hooks/useUser';
import PropertyAddCard from '@/components/property/PropertyAddCard';
import { CompoundList } from '@/components/common/CompoundList';
import { SvgXml } from 'react-native-svg';
import { svg } from '@/assets/svg';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '@/navigation/stack/ProfileNavigator';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { PropertyStackParamList } from '@/navigation/stack/PropertyNavigator';

type ProfileScreenProps = StackScreenProps<ProfileStackParamList>;

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const { user } = useUser();

  const onCardPress = () => {
    navigation.navigate(profileNavigations.PROPERTY, {
      screen: propertyNavigations.ADD_PROPERTY,
    });
  };

  const onPropertyPress = () => {
    navigation.navigate(profileNavigations.PROPERTY, {
      screen: propertyNavigations.MY_PROPERTY,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 헤더 */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>프로필</Text>
          <Ionicons name="notifications-outline" size={32} />
        </View>
        {/* 프로필 */}
        <View style={styles.profileContainer}>
          <View style={styles.profile}>
            <View style={styles.profileImageContainer}>
              <Image
                style={styles.profileImage}
                source={
                  user?.profile_image
                    ? { uri: user?.profile_image }
                    : require('../../assets/images/profile_default.png')
                }
              />
            </View>
            <View style={styles.profileTextContainer}>
              <Text style={styles.profileTextTitle}>{user?.name}</Text>
              <Text style={{ color: colors[theme].GRAY_700 }}>프로필 보기</Text>
            </View>
          </View>
          <View style={styles.arrowRight}>
            <FontAwesome name="angle-right" size={30} />
          </View>
        </View>

        <View style={styles.divider} />

        {/* 숙소 등록 Card */}
        <PropertyAddCard
          onPress={onCardPress}
          title="당신의 숙소를 청소하세요."
          description={['간단히 숙소를 등록하고', '숙소 청소 클리너를 모집하세요.']}
        />

        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>나의 정보</Text>
        </View>
        {/* 나의 정보 */}
        {/* {user?.role === userRoles.host ? <MyProperty /> : <MyJobProfile />} */}
        <CompoundList onItemPress={onPropertyPress}>
          <CompoundList.Item
            id="1"
            icon={
              <SvgXml width="24" height="24" xml={svg.property} color={colors[theme].GRAY_500} />
            }
            title="숙소 관리"
          />
          <CompoundList.Divider />
          {/* <CompoundList.Item
          id="2"
          icon={<MaterialIcons name="person" size={24} color={colors[theme].GRAY_500} />}
          title="프로필"
        />
        <CompoundList.Divider /> */}
        </CompoundList>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: 'white',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 36,
    },
    headerText: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    profileContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    profile: {
      flexDirection: 'row',
      gap: 10,
    },
    profileTextContainer: {
      justifyContent: 'center',
      gap: 5,
    },
    profileTextTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    profileImageContainer: {
      width: 50, // 컨테이너 크기 지정
      height: 50,
      borderRadius: 40, // 원형으로 만들기 위해 width/2
      overflow: 'hidden', // 이미지가 컨테이너를 벗어나지 않도록
      borderWidth: 2,
      borderColor: colors[theme].GRAY_300,
    },
    profileImage: {
      width: '100%', // 컨테이너에 맞추기
      height: '100%',
      borderRadius: 40, // 원형 이미지
    },
    arrowRight: {
      paddingRight: 5,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: colors[theme].GRAY_300,
      marginVertical: 20,
    },
    menuContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    menuTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
