import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import useAuthStore from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { AuthStackParamList } from '@/navigation/stack/AuthStackNavigator';
import { ThemeMode } from '@/types/common';

type UserSetupScreenProps = StackScreenProps<AuthStackParamList, 'UserSetup'>;

const UserSetupScreen: React.FC<UserSetupScreenProps> = ({ navigation }) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const { user, setUser } = useAuthStore();

  const [role, setRole] = useState<'host' | 'cleaner'>('host');
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const handleSubmit = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase.from('users').update({ role, nickname, profile_image: profileImage }).eq('id', user.id);

      if (error) throw error;

      // setUser({ ...user, role, nickname, profile_image: profileImage });
      // Navigate to main app
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>프로필 설정</Text>

      <View style={styles.roleContainer}>
        <TouchableOpacity style={[styles.roleButton, role === 'host' && styles.selectedRole]} onPress={() => setRole('host')}>
          <Text>호스트</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.roleButton, role === 'cleaner' && styles.selectedRole]} onPress={() => setRole('cleaner')}>
          <Text>청소부</Text>
        </TouchableOpacity>
      </View>

      <TextInput style={styles.input} placeholder="닉네임" value={nickname} onChangeText={setNickname} />

      {/* 프로필 이미지 선택 로직 추가 */}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors[theme].WHITE,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors[theme].BLACK,
    },
    roleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
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
      backgroundColor: colors[theme].SKY_600,
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    submitButtonText: {
      color: colors[theme].WHITE,
      fontWeight: 'bold',
    },
  });

export default UserSetupScreen;
