import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { addPropertyNavigations, colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import useAddPropertyStore from '@/store/useAddPropertyStore';
import { ThemeMode } from '@/types/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import { AddPropertyTabParamList } from '@/navigation/tab/AddPropertyTabNavigator';
import { Image as ImageType } from 'react-native-image-crop-picker';
import useUser from '@/hooks/useUser';
import { uploadImages } from '@/utils/uploadImages';
import Config from 'react-native-config';

const NotesScreen = () => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<StackNavigationProp<AddPropertyTabParamList>>();
  const { notes, setNotes } = useAddPropertyStore();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPhoto = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
      });
      setNotes({
        ...notes,
        images: [...notes.images, image],
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '사진을 선택하는데 실패했어요.',
        text2: '다시 시도해주세요.',
        position: 'bottom',
      });
    }
  };

  const handleRemovePhoto = (index: number) => {
    setNotes({
      ...notes,
      images: notes.images.filter((_, i) => i !== index),
    });
  };

  const handleSaveNotes = async () => {
    if (!user?.id) {
      Toast.show({
        type: 'error',
        text1: '로그인이 필요해요.',
        text2: '로그인 후 이용해주세요.',
        position: 'bottom',
      });
      return;
    }

    setIsLoading(true);
    Toast.show({
      type: 'info',
      text1: '이미지 업로드 중...',
      position: 'bottom',
    });

    try {
      // INFO: 개발중이라 이미지 업로드는 주석 처리
      // const uploadedUrls = await uploadImages(
      //   Config.PROPERTY_IMAGES_BUCKET,
      //   user.id,
      //   notes.images.map(image => image),
      // );

      Toast.show({
        type: 'success',
        text1: '이미지 업로드 완료',
        position: 'bottom',
      });

      navigation.navigate(addPropertyNavigations.PRICING);
    } catch (error) {
      console.error('Image upload error:', error);
      Toast.show({
        type: 'error',
        text1: '이미지 업로드 실패',
        text2: '다시 시도해 주세요.',
        position: 'bottom',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      onNextPress: handleSaveNotes,
    } as Partial<StackNavigationOptions>);
  }, [navigation, handleSaveNotes]);

  console.log(Config.PROPERTY_IMAGES_BUCKET);

  const renderPhotos = () => {
    if (notes.images.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
            <Icon name="plus" size={40} color={colors[theme].GRAY_500} />
            <Text style={styles.addPhotoText}>사진 추가</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoContainer}>
        {notes.images.map((photo, index) => (
          <View key={index} style={styles.photoItem}>
            <Image source={{ uri: photo.path }} style={styles.photo} />
            <TouchableOpacity
              style={styles.removePhotoButton}
              onPress={() => handleRemovePhoto(index)}>
              <Icon name="close-circle" size={24} color={colors[theme].RED_500} />
            </TouchableOpacity>
            {index === 0 && (
              <View style={styles.mainPhotoTag}>
                <Text style={styles.mainPhotoTagText}>대표</Text>
              </View>
            )}
          </View>
        ))}
        {notes.images.length < 10 && (
          <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
            <Icon name="plus" size={40} color={colors[theme].GRAY_500} />
            <Text style={styles.addPhotoText}>사진 추가</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>숙소 사진과 설명을 입력해주세요</Text>

        <Text style={styles.label}>숙소 사진 (첫 번째 사진이 대표 사진이 됩니다)</Text>
        {renderPhotos()}

        <Text style={styles.label}>숙소 설명</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={4}
          value={notes.description}
          onChangeText={text => setNotes({ ...notes, description: text })}
          placeholder="숙소에 대한 간단한 설명을 입력해주세요."
        />

        <Text style={styles.label}>특이사항</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={4}
          value={notes.cleaningNotes}
          onChangeText={text => setNotes({ ...notes, cleaningNotes: text })}
          placeholder="청소 시 주의해야 할 특이사항이 있다면 입력해주세요."
        />
      </ScrollView>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors[theme].SKY_MAIN} />
        </View>
      )}
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
    contentContainer: {
      padding: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      color: colors[theme].BLACK,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 10,
      color: colors[theme].BLACK,
    },
    centerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 170, // 사진 높이 + 여백
    },
    photoContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    photoItem: {
      width: 150,
      height: 150,
      marginRight: 10,
      borderRadius: 8,
      overflow: 'hidden',
    },
    photo: {
      width: '100%',
      height: '100%',
    },
    removePhotoButton: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: colors[theme].WHITE,
      borderRadius: 12,
    },
    mainPhotoTag: {
      position: 'absolute',
      bottom: 5,
      left: 5,
      backgroundColor: colors[theme].SKY_MAIN,
      borderRadius: 4,
      padding: 4,
    },
    mainPhotoTagText: {
      color: colors[theme].WHITE,
      fontSize: 12,
      fontWeight: 'bold',
    },
    addPhotoButton: {
      width: 150,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors[theme].GRAY_100,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_300,
      borderStyle: 'dashed',
    },
    addPhotoText: {
      marginTop: 10,
      color: colors[theme].GRAY_500,
    },
    input: {
      borderWidth: 1,
      borderColor: colors[theme].GRAY_300,
      borderRadius: 8,
      padding: 10,
      marginBottom: 20,
      minHeight: 100,
      textAlignVertical: 'top',
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default NotesScreen;
