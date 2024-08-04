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

const propertyNavigations = {
  MY_PROPERTY: 'MyProperty',
  ADD_PROPERTY: 'AddProperty',
} as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  APPLE: 'Apple',
  KAKAO: 'Kakao',
  USER_SETUP: 'UserSetup',
} as const;

export { mainNavigations, homeNavigations, chatNavigations, jobNavigations, profileNavigations, authNavigations, propertyNavigations };
