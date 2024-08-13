import ImagePicker from 'react-native-image-crop-picker';
import { useState, useCallback } from 'react';
import Toast from 'react-native-toast-message';
import { ImageUri } from '@/types/domain';
import { uploadImages } from '@/utils/uploadImages';

interface UseImagePickerProps {
  initialImages: ImageUri[];
  mode?: 'multiple' | 'single';
  onSettled?: () => void;
  maxImages?: number;
}

const useImagePicker = ({ initialImages, mode = 'single', onSettled, maxImages = 10 }: UseImagePickerProps) => {
  const [imageUris, setImageUris] = useState<ImageUri[]>(initialImages);

  const deleteImageUri = useCallback((uri: string) => {
    setImageUris(prev => prev.filter(image => image.uri !== uri));
  }, []);

  const changeImageUrisOrder = useCallback((fromIndex: number, toIndex: number) => {
    setImageUris(prev => {
      const copyImageUris = [...prev];
      const [removedImage] = copyImageUris.splice(fromIndex, 1);
      copyImageUris.splice(toIndex, 0, removedImage);
      return copyImageUris;
    });
  }, []);

  const handleChange = useCallback(async (
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

      const imagesToUpload = Array.isArray(images) ? images : [images];
      const remainingSlots = maxImages - imageUris.length;
      const imagesToProcess = imagesToUpload.slice(0, remainingSlots);

      const uploadedUrls = await uploadImages(bucketName, userId, imagesToProcess, folderName);

      if (uploadedUrls.length > 0) {
        setImageUris(prev => {
          const newImages = uploadedUrls.map(uri => ({ uri }));
          const uniqueNewImages = newImages.filter(
            newImg => !prev.some(existingImg => existingImg.uri === newImg.uri)
          );
          return [...prev, ...uniqueNewImages].slice(0, maxImages);
        });
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
  }, [imageUris.length, maxImages, mode, onSettled]);

  return {
    imageUris,
    handleChange,
    delete: deleteImageUri,
    changeOrder: changeImageUrisOrder,
  };
};

export default useImagePicker;