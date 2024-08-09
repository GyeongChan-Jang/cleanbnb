import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import useAddPropertyStore from '@/store/useAddPropertyStore';
import { ThemeMode } from '@/types/common';

const BasicInfoScreen = () => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const { basicInfo, setBasicInfo } = useAddPropertyStore();

  // 첫 번째 입력 필드에 대한 ref 생성
  const firstInputRef = useRef<TextInput>(null);

  // 컴포넌트가 마운트되면 첫 번째 입력 필드에 포커스
  useEffect(() => {
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const updateBasicInfo = (key: string, value: number | [number, number]) => {
    setBasicInfo({ ...basicInfo, [key]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>청소가 필요한 공간의 정보를 입력해주세요</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>청소가 필요한 크기 (m²)</Text>
        <TextInput
          ref={firstInputRef} // ref 추가
          style={styles.input}
          keyboardType="numeric"
          value={basicInfo.size.toString()}
          onChangeText={text => updateBasicInfo('size', parseInt(text) || 0)}
          placeholder="면적(m²)을 입력해주세요."
        />
        <Text style={styles.subLabel}>{`${(basicInfo.size * 0.3025).toFixed(2)} 평`}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>침실 개수</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={basicInfo.bedrooms.toString()}
          onChangeText={text => updateBasicInfo('bedrooms', parseInt(text) || 0)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>욕실 개수</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={basicInfo.bathrooms.toString()}
          onChangeText={text => updateBasicInfo('bathrooms', parseInt(text) || 0)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>청소 희망 시간</Text>
        <View style={styles.timeInputContainer}>
          <TextInput
            style={[styles.input, styles.timeInput]}
            keyboardType="numeric"
            placeholder="시작 시간"
            value={basicInfo.cleaningTime[0].toString()}
            onChangeText={text =>
              updateBasicInfo('cleaningTime', [parseInt(text) || 0, basicInfo.cleaningTime[1]])
            }
          />
          <Text style={styles.timeSeparator}>~</Text>
          <TextInput
            style={[styles.input, styles.timeInput]}
            keyboardType="numeric"
            placeholder="종료 시간"
            value={basicInfo.cleaningTime[1].toString()}
            onChangeText={text =>
              updateBasicInfo('cleaningTime', [basicInfo.cleaningTime[0], parseInt(text) || 0])
            }
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>청소 소요 시간 (분)</Text>
        <View style={styles.timeInputContainer}>
          <TextInput
            style={[styles.input, styles.timeInput]}
            keyboardType="numeric"
            placeholder="최소"
            value={basicInfo.cleaningDuration.toString()}
            onChangeText={text => updateBasicInfo('cleaningDuration', parseInt(text) || 0)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: colors[theme].WHITE,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors[theme].BLACK,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 10,
      color: colors[theme].BLACK,
    },
    subLabel: {
      fontSize: 14,
      color: colors[theme].GRAY_500,
      marginTop: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: colors[theme].GRAY_300,
      borderRadius: 8,
      padding: 10,
      fontSize: 16,
    },
    timeInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    timeInput: {
      flex: 1,
    },
    timeSeparator: {
      marginHorizontal: 10,
      fontSize: 18,
      color: colors[theme].BLACK,
    },
  });

export default BasicInfoScreen;
