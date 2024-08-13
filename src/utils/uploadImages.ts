import { supabase } from '@/lib/supabase';
import { Image } from 'react-native-image-crop-picker';

const CHUNK_SIZE = 10; // 한 번에 업로드할 이미지 수

export const uploadImages = async (
  bucketName: string,
  userId: string,
  images: Image[],
  folderName: string = '',
): Promise<string[]> => {
  const uploadChunk = async (chunk: Image[]): Promise<string[]> => {
    const uploadPromises = chunk.map(async (image) => {
      const fileExt = image.path.split('.').pop();
      const fileName = `${folderName ? `${folderName}/` : ''}${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

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

      const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      return publicUrl;
    });

    return Promise.all(uploadPromises);
  };

  try {
    let uploadedUrls: string[] = [];

    for (let i = 0; i < images.length; i += CHUNK_SIZE) {
      const chunk = images.slice(i, i + CHUNK_SIZE);
      const chunkUrls = await uploadChunk(chunk);
      uploadedUrls = [...uploadedUrls, ...chunkUrls];
    }

    console.log('Uploaded image URLs:', uploadedUrls);
    return uploadedUrls;
  } catch (error) {
    console.error('Error uploading images:', error);
    return [];
  }
};