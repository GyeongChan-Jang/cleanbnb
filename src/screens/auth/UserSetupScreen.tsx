import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import useAuthStore from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { AuthStackParamList } from '@/navigation/stack/AuthStackNavigator';
import { ThemeMode } from '@/types/common';
import CustomButton from '@/components/common/CustomButton';

type UserSetupScreenProps = StackScreenProps<AuthStackParamList, 'UserSetup'>;

const deviceHeight = Dimensions.get('screen').height;

const UserSetupScreen: React.FC<UserSetupScreenProps> = ({ navigation }) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const { user, setUser } = useAuthStore();

  const [role, setRole] = useState<'host' | 'cleaner'>('host');
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const defaultImage = require('../../assets/profile_default.png');

  const imageSource = user?.user_metadata?.picture
    ? { uri: user.user_metadata.picture }
    : defaultImage;

  const handleSubmit = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .update({ role, nickname, profile_image: profileImage })
        .eq('id', user.id);

      if (error) throw error;

      // setUser({ ...user, role, nickname, profile_image: profileImage });
      // Navigate to main app
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      keyboardVerticalOffset={Platform.OS === 'ios' ? deviceHeight * 0.1 : 20}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.contentContainer}>
          <View style={styles.profileContainer}>
            <Pressable style={[styles.imageContainer, styles.emptyImageContainer]}>
              <Image style={styles.image} resizeMode="cover" source={imageSource} />
            </Pressable>
          </View>
          <TextInput
            style={styles.input}
            placeholder="닉네임"
            value={nickname}
            onChangeText={setNickname}
          />

          <View style={styles.roleContainer}>
            <CustomButton
              style={{ flex: 1 }}
              label="호스트"
              variant={role === 'host' ? 'filled' : 'outlined'}
              size="medium"
              onPress={() => setRole('host')}
            />
            <CustomButton
              style={{ flex: 1 }}
              label="클리너"
              variant={role === 'cleaner' ? 'filled' : 'outlined'}
              size="medium"
              onPress={() => setRole('cleaner')}
            />
          </View>
        </View>
      </ScrollView>

      {/* 프로필 이미지 선택 로직 추가 */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors[theme].WHITE,
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    profileContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonContainer: {
      paddingBottom: Platform.OS === 'ios' ? deviceHeight * 0.04 : 20, // iOS에서 하단 여백 추가
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
    },
    imageContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    emptyImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors[theme].GRAY_200,
      borderRadius: 50,
      borderWidth: 1,
    },
    roleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      gap: 10,
    },
    roleButton: {
      padding: 10,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_300,
      borderRadius: 5,
    },
    selectedRole: {
      backgroundColor: colors[theme].SKY_500,
    },
    input: {
      borderWidth: 1,
      borderColor: colors[theme].GRAY_300,
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
    },
    submitButton: {
      backgroundColor: colors[theme].SKY_MAIN,
      // backgroundColor: colors[theme].DARK_MAIN,
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    submitButtonText: {
      color: colors[theme].WHITE,
      fontWeight: 'bold',
      fontSize: 18,
    },
  });

export default UserSetupScreen;
