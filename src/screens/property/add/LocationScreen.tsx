import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import useAddPropertyStore from '@/store/useAddPropertyStore';
import { ThemeMode } from '@/types/common';
import Postcode from 'react-native-daum-postcode';
import BottomSheetModal from '@/components/common/BottomSheetModal';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import Config from 'react-native-config';
import { AddPropertyAddress } from '@/types/property';

const LocationScreen = () => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const { location, setLocation } = useAddPropertyStore();

  const [modalVisible, setModalVisible] = useState(false);

  const handleComplete = async (data: any) => {
    const fullAddress = data.address + (data.buildingName ? ` (${data.buildingName})` : '');

    const newLocation = {
      ...location,
      address: fullAddress,
      roadAddress: data.roadAddress,
      zoneCode: data.zonecode,
      sido: data.sido,
      sigungu: data.sigungu,
      sigunguCode: data.sigunguCode,
      bcode: data.bcode,
    };

    setLocation(newLocation);
    setModalVisible(false);
    await getCoordinates(fullAddress, newLocation);
  };

  const onPressSearchAddress = () => setModalVisible(true);

  const getCoordinates = async (address: string, newLocation: AddPropertyAddress) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
        {
          headers: {
            Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
          },
        },
      );

      if (response.data.documents.length > 0) {
        const { x, y } = response.data.documents[0].address;
        const updatedLocation = {
          ...newLocation,
          coordinates: {
            latitude: parseFloat(y),
            longitude: parseFloat(x),
          },
        };
        setLocation(updatedLocation);
      } else {
        console.log('No results found for the given address');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>숙소 주소를 등록해주세요</Text>
        <View style={styles.inner}>
          <View style={styles.formContainer}>
            {location.address && (
              <>
                <View style={styles.addressContainer}>
                  <Text style={styles.addressText}>{location.address}</Text>
                </View>
                <TextInput
                  style={styles.addressDetailInput}
                  value={location.addressDetail}
                  onChangeText={text => setLocation({ ...location, addressDetail: text })}
                  placeholder="상세 주소를 입력해주세요."
                />
              </>
            )}
            <TouchableOpacity style={styles.button} onPress={onPressSearchAddress}>
              <Entypo name="magnifying-glass" size={26} color={colors[theme].WHITE} />
              <Text style={styles.buttonText}>주소 검색</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <BottomSheetModal isVisible={modalVisible} onClose={() => setModalVisible(false)}>
        <Postcode
          style={styles.postcode}
          jsOptions={{ animation: true }}
          onSelected={handleComplete}
          onError={error => console.error(error)}
        />
        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
          <Text style={styles.closeButtonText}>닫기</Text>
        </TouchableOpacity>
      </BottomSheetModal>
    </>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors[theme].WHITE,
    },
    inner: {
      flex: 1,
      justifyContent: 'center',
    },
    formContainer: {
      width: '100%',
      gap: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors[theme].BLACK,
    },
    button: {
      gap: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: colors[theme].BLUE_500,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: colors[theme].WHITE,
      fontSize: 22,
      fontWeight: 'bold',
    },
    addressContainer: {
      marginTop: 20,
      padding: 15,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_300,
      borderRadius: 8,
    },
    addressText: {
      fontSize: 18,
      color: colors[theme].BLACK,
    },
    addressDetailInput: {
      padding: 15,
      borderWidth: 1,
      borderColor: colors[theme].GRAY_300,
      borderRadius: 8,
      fontSize: 18,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '100%',
      height: '80%',
      backgroundColor: colors[theme].WHITE,
      borderRadius: 10,
      overflow: 'hidden',
    },
    postcode: {
      flex: 1,
    },
    closeButton: {
      backgroundColor: colors[theme].RED_500,
      padding: 15,
      alignItems: 'center',
    },
    closeButtonText: {
      color: colors[theme].WHITE,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default LocationScreen;
{
  /* <CompoundBottomSheet isVisible={modalVisible} onClose={() => setModalVisible(false)}>
          <CompoundBottomSheet.Content>
            <Text>This is the content of the bottom sheet</Text>
          </CompoundBottomSheet.Content>
        </CompoundBottomSheet> */
}

{
  /* <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Postcode
                style={styles.postcode}
                jsOptions={{ animation: true }}
                onSelected={handleComplete}
                onError={error => console.error(error)}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */
}
