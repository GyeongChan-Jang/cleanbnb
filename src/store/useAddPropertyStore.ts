import { addPropertyNavigations } from '@/constants';
import { PhotoWithDescription } from '@/types/domain';
import { AddPropertyAddress, PropertyNote } from '@/types/property';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

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
    case addPropertyNavigations.NOTES:
      return 'notes';
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
  location: AddPropertyAddress;
  cleaningTools: string[];
  cleaningAreas: string[];
  guidelinePhotos: PhotoWithDescription[];
  notes: PropertyNote;
  pricing: number;
  setPropertyType: (type: string) => void;
  setBasicInfo: (info: Partial<AddPropertyState['basicInfo']>) => void;
  setLocation: (location: AddPropertyAddress) => void;
  setCleaningTools: (tools: string[]) => void;
  setCleaningAreas: (areas: string[]) => void;
  setGuidelinePhotos: (photos: PhotoWithDescription[]) => void;
  setNotes: (notes: PropertyNote) => void;
  setPricing: (price: number) => void;
  isStepValid: (routeName: string) => boolean;
}

const useAddPropertyStore = create(
  subscribeWithSelector<AddPropertyState>((set, get) => ({
  propertyType: '',
  basicInfo: { 
    size: 0, 
    bedrooms: 0, 
    bathrooms: 0, 
    cleaningTime: [0, 0],
    cleaningDuration: 0,
  },
  location: {
    address: '',
    addressDetail: '',
    apartment: '',
    bcode: '',
    roadAddress: '',
    sido: '',
    sigungu: '',
    sigunguCode: '',
    zoneCode: '',
    coordinates: {
      latitude: 0,
      longitude: 0,
    }
  },
  cleaningTools: [],
  cleaningAreas: [],
  guidelinePhotos: [],
  notes: {
    images: [],
    description: '',
    cleaningNotes: '',
  },
  pricing: 0,
  setPropertyType: (type) => set({ propertyType: type }),
  setBasicInfo: (info) => set((state) => ({ 
    basicInfo: { ...state.basicInfo, ...info } 
  })),
  setLocation: (newLocation) => set((state) => ({
  location: { ...state.location, ...newLocation }
})),
  setCleaningTools: (tools) => set({ cleaningTools: tools }),
  setCleaningAreas: (areas) => set({ cleaningAreas: areas }),
  setGuidelinePhotos: (photos) => set({ guidelinePhotos: photos }),
  setNotes: (notes) => set({ notes }),
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
        return state.location.address !== '';
      case 'cleaningTools':
        return state.cleaningTools.length > 0;
      case 'cleaningAreas':
        return state.cleaningAreas.length > 0;
      case 'guidelinePhotos':
        return state.guidelinePhotos.length > 0;
      case 'notes':
        return state.notes.cleaningNotes !== '';
      case 'pricing':
        return state.pricing > 0;
      default:
        return false;
    }
  },
}))
)

export default useAddPropertyStore;