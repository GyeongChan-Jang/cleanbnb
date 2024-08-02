import { alerts } from '@/constants/messages';
import { Alert, Linking, Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS, Permission } from 'react-native-permissions';

type PermissionType = 'LOCATION' | 'PHOTO';

type PermissionOS = {
  [key in PermissionType]: Permission;
};

const androidPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermissions: PermissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

const usePermission = () => {
  const checkAndRequestPermission = async (type: PermissionType): Promise<boolean> => {
    const isAndroid = Platform.OS === 'android';
    const permissionOS = isAndroid ? androidPermissions : iosPermissions;

    const checked = await check(permissionOS[type]);

    const showPermissionAlert = () => {
      return new Promise<boolean>(resolve => {
        Alert.alert(alerts[`${type}_PERMISSION`].TITLE, alerts[`${type}_PERMISSION`].DESCRIPTION, [
          {
            text: '설정하기',
            onPress: () => {
              Linking.openSettings();
              resolve(false);
            },
            style: 'default',
          },
          {
            text: '취소',
            onPress: () => resolve(false),
            style: 'cancel',
          },
        ]);
      });
    };

    switch (checked) {
      case RESULTS.DENIED:
        if (isAndroid) {
          return await showPermissionAlert();
        }
        const result = await request(permissionOS[type]);
        return result === RESULTS.GRANTED;

      case RESULTS.BLOCKED:
      case RESULTS.LIMITED:
        return await showPermissionAlert();

      case RESULTS.GRANTED:
        return true;

      default:
        return false;
    }
  };

  return { checkAndRequestPermission };
};

export default usePermission;
