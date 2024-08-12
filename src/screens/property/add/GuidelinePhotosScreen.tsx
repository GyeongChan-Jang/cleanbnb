import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AddPropertyTabParamList } from '@/navigation/tab/AddPropertyTabNavigator';
import { useEffect } from 'react';

const GuidelinePhotosScreen = () => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const { guidelinePhotos, setGuidelinePhotos } = useAddPropertyStore();
  const navigation = useNavigation<StackNavigationProp<AddPropertyTabParamList>>();
  const { user } = useUser();

  const handleAddPhoto = async () => {
    try {
      const images = await ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: true,
        cropperChooseText: '완료',
        cropperCancelText: '취소',
      });
      setGuidelinePhotos(images.map(image => ({ uri: image.path, description: '' })));
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
    const newPhotos = guidelinePhotos.filter(photo => photo.uri !== uri);
    setGuidelinePhotos(newPhotos);
  };

  const handleChangeDescription = (index: number, description: string) => {
    const newPhotos = [...guidelinePhotos];
    newPhotos[index] = { ...newPhotos[index], description };
    setGuidelinePhotos(newPhotos);
  };

  const handleUploadImages = async () => {
    // Implement your image upload logic here
    console.log('Uploading images...');
    // After successful upload, you can navigate to the next screen
    // navigation.navigate(addPropertyNavigations.SPECIAL_NOTES);
  };

  useEffect(() => {
    navigation.setParams({ onNextPress: handleUploadImages });
  }, [navigation]);

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
          <Image source={{ uri: item.uri }} style={styles.photo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeButton} onPress={() => handleRemovePhoto(item.uri)}>
          <Icon name="close-circle" size={24} color={colors[theme].RED_500} />
        </TouchableOpacity>
        <TextInput
          style={styles.descriptionInput}
          value={item.description}
          onChangeText={text => handleChangeDescription(index as number, text)}
          placeholder="사진 설명 입력"
          multiline
        />
      </View>
    );
  };

  const ListHeader = () => (
    <View>
      <Text style={styles.title}>청소가 완료된 상태의 사진을 첨부해주세요</Text>
      <Text style={styles.subtitle}>클리너들에게 제공되는 가이드라인이 될 수 있습니다</Text>
    </View>
  );

  const ListFooter = () => (
    <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
      <Icon name="plus" size={24} color={colors[theme].GRAY_500} />
      <Text style={styles.addPhotoText}>사진 추가</Text>
    </TouchableOpacity>
  );

  return (
    <DraggableFlatList
      data={guidelinePhotos}
      renderItem={renderItem}
      keyExtractor={(item, index) => `draggable-item-${item.uri}-${index}`}
      onDragEnd={({ data }) => setGuidelinePhotos(data)}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={ListFooter}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      padding: 20,
      backgroundColor: colors[theme].WHITE,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      color: colors[theme].BLACK,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 20,
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
