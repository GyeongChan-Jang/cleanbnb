const mainNavigations = {
  HOME: 'Home',
  CHAT: 'Chat',
  JOB: 'Job',
  PROFILE: 'Profile',
} as const;

const homeNavigations = { HOME_MAIN: 'HomeMain' } as const;

const chatNavigations = { CHAT_MAIN: 'ChatMain' } as const;

const jobNavigations = { JOB_MAIN: 'JobMain' } as const;

const profileNavigations = { PROFILE_MAIN: 'ProfileMain' } as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  APPLE: 'Apple',
  KAKAO: 'Kakao',
} as const;

export {
  mainNavigations,
  homeNavigations,
  chatNavigations,
  jobNavigations,
  profileNavigations,
  authNavigations,
};
