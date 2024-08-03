// useImagePicker.ts

import ImagePicker from 'react-native-image-crop-picker';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { ImageUri } from '@/types/domain';
import { uploadImage } from '@/utils/uploadImage';

interface UseImagePickerProps {
  initialImages: ImageUri[];
  mode?: 'multiple' | 'single';
  onSettled?: () => void;
}

const useImagePicker = ({ initialImages, mode = 'single', onSettled }: UseImagePickerProps) => {
  const [imageUris, setImageUris] = useState<ImageUri[]>(initialImages);

  const deleteImageUri = (uri: string) => {
    const newImageUris = imageUris.filter(image => image.uri !== uri);
    setImageUris(newImageUris);
  };

  const changeImageUrisOrder = (fromIndex: number, toIndex: number) => {
    const copyImageUris = [...imageUris];
    const [removedImage] = copyImageUris.splice(fromIndex, 1);
    copyImageUris.splice(toIndex, 0, removedImage);
    setImageUris(copyImageUris);
  };

  const handleChange = async (
    bucketName: string | undefined,
    userId: string | undefined,
    folderName: string = '',
  ) => {
    if (!bucketName) return console.error('bucketName is required');
    if (!userId) {
      Toast.show({
        type: 'error',
        text1: '로그인이 필요해요.',
        text2: '로그인 후 이용해주세요.',
        position: 'bottom',
      });
      return;
    }

    try {
      const images = await ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: mode === 'multiple',
        cropping: mode === 'single',
        cropperChooseText: '완료',
        cropperCancelText: '취소',
      });

      const uploadPromises = (Array.isArray(images) ? images : [images]).map(image =>
        uploadImage(bucketName, userId, image, folderName),
      );

      const uploadedUrls = await Promise.all(uploadPromises);

      const validUrls = uploadedUrls.filter((url): url is string => url !== null);

      if (validUrls.length > 0) {
        if (mode === 'single') {
          setImageUris([{ uri: validUrls[0] }]);
        } else {
          setImageUris(prev => [...prev, ...validUrls.map(uri => ({ uri }))]);
        }
        if (onSettled) onSettled();
      } else {
        Toast.show({
          type: 'error',
          text1: '이미지 업로드 실패',
          text2: '다시 시도해주세요.',
          position: 'bottom',
        });
      }
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Toast.show({
          type: 'error',
          text1: '갤러리를 열 수 없어요.',
          text2: '권한을 허용했는지 확인해주세요.',
          position: 'bottom',
        });
      }
    }
  };

  return {
    imageUris,
    handleChange,
    delete: deleteImageUri,
    changeOrder: changeImageUrisOrder,
  };
};

export default useImagePicker;
