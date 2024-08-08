const rootNavigations = {
  MAIN_TAB: 'MainTab',
  ADD_PROPERTY: 'AddProperty',
} as const

const mainNavigations = {
  HOME: 'Home',
  CHAT: 'Chat',
  JOB: 'Job',
  PROFILE: 'Profile',
} as const;

const homeNavigations = { HOME_MAIN: 'HomeMain' } as const;

const chatNavigations = { CHAT_MAIN: 'ChatMain' } as const;

const jobNavigations = { JOB_MAIN: 'JobMain' } as const;

const profileNavigations = { PROFILE_MAIN: 'ProfileMain', PROPERTY: 'Property' } as const;

const addPropertyNavigations = {
  ADD_PROPERTY: 'AddProperty',
  PROPERTY_TYPE: 'PropertyType',
  BASIC_INFO: 'BasicInfo',
  LOCATION: 'Location',
  CLEANING_TOOLS: 'CleaningTools',
  CLEANING_AREAS: 'CleaningAreas',
  GUIDELINE_PHOTOS: 'GuidelinePhotos',
  SPECIAL_NOTES: 'SpecialNotes',
  PRICING: 'Pricing',
} as const

const propertyNavigations = {
  MY_PROPERTY: 'MyProperty',
} as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  APPLE: 'Apple',
  KAKAO: 'Kakao',
  USER_SETUP: 'UserSetup',
} as const;

export { mainNavigations, homeNavigations, chatNavigations, jobNavigations, profileNavigations, authNavigations, propertyNavigations, addPropertyNavigations, rootNavigations };
