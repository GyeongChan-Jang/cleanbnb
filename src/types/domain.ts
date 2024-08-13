import {Image} from 'react-native-image-crop-picker';

interface ImageUri {
  id?: number;
  uri: string;
}

interface PhotoWithDescription {
  image: Image
  description: string;
}

export type { ImageUri, PhotoWithDescription };
