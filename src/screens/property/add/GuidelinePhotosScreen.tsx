import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { addPropertyNavigations, colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import useAddPropertyStore from '@/store/useAddPropertyStore';
import { ThemeMode } from '@/types/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { PhotoWithDescription } from '@/types/domain';
import useUser from '@/hooks/useUser';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import {
  AddPropertyTabParamList,
  CustomStackNavigationOptions,
} from '@/navigation/tab/AddPropertyTabNavigator';
import { useCallback, useEffect, useState } from 'react';
import { uploadImages } from '@/utils/uploadImages';
import Config from 'react-native-config';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

const GuidelinePhotosScreen = () => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const { guidelinePhotos, setGuidelinePhotos } = useAddPropertyStore();
  const navigation = useNavigation<StackNavigationProp<AddPropertyTabParamList>>();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPhoto = async () => {
    try {
      const images = await ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: true,
        cropperChooseText: '완료',
        cropperCancelText: '취소',
        maxFiles: 10,
      });

      setGuidelinePhotos(images.map(image => ({ image, description: '' })));
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '사진을 불러오는데 실패했어요.',
        text2: '다시 시도해주세요.',
        position: 'bottom',
      });
    }
  };

  const handleRemovePhoto = (uri: string) => {
    const newPhotos = guidelinePhotos.filter(photo => photo.image.path !== uri);
    setGuidelinePhotos(newPhotos);
  };

  const handleChangeDescription = (index: number, description: string) => {
    const newPhotos = [...guidelinePhotos];
    newPhotos[index] = { ...newPhotos[index], description };
    setGuidelinePhotos(newPhotos);
  };

  const handleUploadImages = useCallback(async () => {
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
      //   Config.GUIDELINE_IMAGES_BUCKET,
      //   user.id,
      //   guidelinePhotos.map(({ image }) => image),
      // );

      Toast.show({
        type: 'success',
        text1: '이미지 업로드 완료',
        position: 'top',
      });

      navigation.navigate(addPropertyNavigations.NOTES);
    } catch (error) {
      console.error('Image upload error:', error);
      Toast.show({
        type: 'error',
        text1: '이미지 업로드 실패',
        text2: '다시 시도해 주세요.',
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, guidelinePhotos, navigation]);

  useEffect(() => {
    navigation.setOptions({
      onNextPress: handleUploadImages,
    } as Partial<StackNavigationOptions>);
  }, [navigation, handleUploadImages]);

  const renderItem = ({
    item,
    drag,
    getIndex,
    isActive,
  }: RenderItemParams<PhotoWithDescription>) => {
    const index = getIndex();
    return (
      <View style={styles.photoWrapper}>
        <TouchableOpacity onLongPress={drag}>
          <Image source={{ uri: item.image.path }} style={styles.photo} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemovePhoto(item.image.path)}>
          <Icon name="close-circle" size={24} color={colors[theme].RED_500} />
        </TouchableOpacity>
        <TextInput
          style={styles.descriptionInput}
          value={item.description}
          onChangeText={text => handleChangeDescription(index as number, text)}
          placeholder="사진 설명 입력"
          multiline
          numberOfLines={4}
        />
      </View>
    );
  };

  const ListHeader = () => (
    <View>
      <Text style={styles.title}>청소가 완료된 상태의 사진을 첨부해주세요.</Text>
      <Text style={styles.subtitle}>* 클리너들에게 제공되는 가이드라인이 될 수 있습니다</Text>
      <Text style={styles.subtitle}>* 최대 10장까지 등록 가능합니다.</Text>
    </View>
  );

  const ListFooter = () => (
    <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
      {isLoading ? (
        <ActivityIndicator size="small" color={colors[theme].GRAY_500} />
      ) : (
        <>
          <Icon name="plus" size={24} color={colors[theme].GRAY_500} />
          <Text style={styles.addPhotoText}>사진 추가</Text>
        </>
      )}
    </TouchableOpacity>
  );

  return (
    <View>
      <DraggableFlatList
        data={guidelinePhotos}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.image.path}-${index}`}
        onDragEnd={({ data }) => setGuidelinePhotos(data)}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        contentContainerStyle={styles.contentContainer}
      />
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
      backgroundColor: colors[theme].WHITE,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      color: colors[theme].BLACK,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 10,
      color: colors[theme].GRAY_500,
    },
    photoWrapper: {
      width: '100%',
      marginBottom: 20,
    },
    photo: {
      width: '100%',
      height: 200,
      borderRadius: 8,
    },
    removeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: colors[theme].WHITE,
      borderRadius: 12,
    },
    descriptionInput: {
      marginTop: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_300,
      borderRadius: 8,
      // height: 200,
      // textAlignVertical: 'top',
    },
    addPhotoButton: {
      width: '100%',
      height: 100,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_300,
      borderStyle: 'dashed',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    addPhotoText: {
      marginTop: 5,
      fontSize: 14,
      color: colors[theme].GRAY_500,
    },
  });

export default GuidelinePhotosScreen;
