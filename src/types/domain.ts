interface ImageUri {
  id?: number;
  uri: string;
}

interface PhotoWithDescription extends ImageUri {
  description: string;
}

export type { ImageUri, PhotoWithDescription };
