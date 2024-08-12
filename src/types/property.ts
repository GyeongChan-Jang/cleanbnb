interface PropertyType { 
  id: string;
  type: string;
  icon: string;
}

interface AddPropertyAddress {
  address: string 
  addressDetail: string
  apartment: string
  bcode: string
  roadAddress: string
  sido: string
  sigungu: string
  sigunguCode: string
  zoneCode: string
  coordinates: {
    latitude: number
    longitude: number
  }
}

export type { PropertyType, AddPropertyAddress };