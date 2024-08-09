interface PropertyType { 
  id: string;
  type: string;
  icon: string;
}

interface AddPropertyAddress {
  address: string 
  address_detail: string
  apartment: string
  bcode: string
  road_address: string
  sido: string
  sigungu: string
  sigungu_code: string
  zonecode: string
}

export type { PropertyType, AddPropertyAddress };