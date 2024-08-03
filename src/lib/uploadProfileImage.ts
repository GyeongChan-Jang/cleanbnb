import { supabase } from '@/lib/supabase';
import { getFormDateImages } from '@/utils';
import { Image } from 'react-native-image-crop-picker';

const uploadProfileImage = async (image: Image, userId: string): Promise<string | null> => {
  try {
    // const response = await fetch(uri);
    // const blob = await response.blob();

    const formData = getFormDateImages([image]);
    // const fileExt = uri.split('.').pop();
    // const fileName = `${userId}_${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${userId}-${Date.now()}`;

    const { data, error } = await supabase.storage
      .from('profile_images')
      .upload(`${userId}/${userId}-${Date.now()}`, formData, { upsert: true });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage.from('profile_images').getPublicUrl(filePath);

    return publicUrlData.publicUrl;
    3;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

export { uploadProfileImage };
