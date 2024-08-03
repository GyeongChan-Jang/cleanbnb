// @/lib/uploadImage.ts

import { supabase } from '@/lib/supabase';
import { Image } from 'react-native-image-crop-picker';

export const uploadImage = async (
  bucketName: string,
  userId: string,
  image: Image,
  folderName: string = '',
): Promise<string | null> => {
  try {
    const fileExt = image.path.split('.').pop();
    const fileName = `${folderName ? `${folderName}/` : ''}${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    // 새 이미지 업로드
    const { data, error: uploadError } = await supabase.storage.from(bucketName).upload(
      filePath,
      {
        uri: image.path,
        type: image.mime,
        name: fileName,
      },
      { upsert: true },
    );

    if (uploadError) {
      throw uploadError;
    }

    // 업로드된 이미지의 public URL 가져오기
    const {
      data: { publicUrl },
      // error: urlError,
    } = supabase.storage.from(bucketName).getPublicUrl(filePath);

    // if (urlError) {
    //   throw urlError;
    // }

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
