import { Image } from 'react-native-image-crop-picker';

const getFormDateImages = (images: Image[]) => {
  const formData = new FormData();

  images.forEach(({ path, mime }) => {
    const file = {
      uri: path,
      type: mime,
      name: path.split('/').pop(),
    };

    formData.append('images', file);
  });

  return formData;
};

export { getFormDateImages };
