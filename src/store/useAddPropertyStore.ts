// src/store/useAddPropertyStore.ts
import { addPropertyNavigations } from '@/constants';
import create from 'zustand';

const mapRouteToStepKey = (routeName: string): keyof AddPropertyState => {
  switch (routeName) {
    case addPropertyNavigations.PROPERTY_TYPE:
      return 'propertyType';
    case addPropertyNavigations.BASIC_INFO:
      return 'basicInfo';
    case addPropertyNavigations.LOCATION:
      return 'location';
    case addPropertyNavigations.CLEANING_TOOLS:
      return 'cleaningTools';
    case addPropertyNavigations.CLEANING_AREAS:
      return 'cleaningAreas';
    case addPropertyNavigations.GUIDELINE_PHOTOS:
      return 'guidelinePhotos';
    case addPropertyNavigations.SPECIAL_NOTES:
      return 'specialNotes';
    case addPropertyNavigations.PRICING:
      return 'pricing';
    default:
      return 'propertyType'; // 기본값 설정
  }
}

export interface AddPropertyState {
  propertyType: string;
  basicInfo: {
    size: number;
    bedrooms: number;
    bathrooms: number;
    cleaningTime: [number, number];
    cleaningDuration: number;
  };
  location: string;
  cleaningTools: string[];
  cleaningAreas: string[];
  guidelinePhotos: string[];
  specialNotes: string;
  pricing: number;
  setPropertyType: (type: string) => void;
  setBasicInfo: (info: Partial<AddPropertyState['basicInfo']>) => void;
  setLocation: (location: string) => void;
  setCleaningTools: (tools: string[]) => void;
  setCleaningAreas: (areas: string[]) => void;
  setGuidelinePhotos: (photos: string[]) => void;
  setSpecialNotes: (notes: string) => void;
  setPricing: (price: number) => void;
  isStepValid: (routeName: string) => boolean;
}

const useAddPropertyStore = create<AddPropertyState>((set, get) => ({
  propertyType: '',
  basicInfo: { 
    size: 0, 
    bedrooms: 0, 
    bathrooms: 0, 
    cleaningTime: [0, 0],
    cleaningDuration: 0,
  },
  location: '',
  cleaningTools: [],
  cleaningAreas: [],
  guidelinePhotos: [],
  specialNotes: '',
  pricing: 0,
  setPropertyType: (type) => set({ propertyType: type }),
  setBasicInfo: (info) => set((state) => ({ 
    basicInfo: { ...state.basicInfo, ...info } 
  })),
  setLocation: (location) => set({ location }),
  setCleaningTools: (tools) => set({ cleaningTools: tools }),
  setCleaningAreas: (areas) => set({ cleaningAreas: areas }),
  setGuidelinePhotos: (photos) => set({ guidelinePhotos: photos }),
  setSpecialNotes: (notes) => set({ specialNotes: notes }),
  setPricing: (price) => set({ pricing: price }),
  isStepValid: (routeName: string) => {
    const state = get();
    const step = mapRouteToStepKey(routeName);
    switch (step) {
      case 'propertyType':
        return state.propertyType !== '';
      case 'basicInfo':
        return (
          state.basicInfo.size > 0 &&
          state.basicInfo.bedrooms > 0 &&
          state.basicInfo.bathrooms > 0 &&
          state.basicInfo.cleaningTime[0] > 0 &&
          state.basicInfo.cleaningTime[1] > 0 &&
          state.basicInfo.cleaningDuration > 0
        );
      case 'location':
        return state.location !== '';
      case 'cleaningTools':
        return state.cleaningTools.length > 0;
      case 'cleaningAreas':
        return state.cleaningAreas.length > 0;
      case 'guidelinePhotos':
        return state.guidelinePhotos.length > 0;
      case 'specialNotes':
        return state.specialNotes !== '';
      case 'pricing':
        return state.pricing > 0;
      default:
        return false;
    }
  },
}));

export default useAddPropertyStore;