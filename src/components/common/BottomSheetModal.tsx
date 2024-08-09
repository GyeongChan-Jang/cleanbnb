import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  PropsWithChildren,
  ReactNode,
} from 'react';
import {
  View,
  Modal,
  Animated,
  PanResponder,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types/common';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.85;

interface BottomSheetContextValue {
  animatedValue: Animated.Value;
}

const BottomSheetContext = createContext<BottomSheetContextValue | undefined>(undefined);

interface BottomSheetModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BottomSheetModal = ({ isVisible, onClose, children }: BottomSheetModalProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, { dy: animatedValue }], { useNativeDriver: false })(
            _,
            gestureState,
          );
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > MODAL_HEIGHT / 3) {
          closeModal();
        } else {
          Animated.spring(animatedValue, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const closeModal = () => {
    Animated.timing(animatedValue, {
      toValue: MODAL_HEIGHT,
      duration: 300,
      useNativeDriver: false,
    }).start(onClose);
  };

  useEffect(() => {
    if (isVisible) {
      Animated.spring(animatedValue, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, MODAL_HEIGHT],
                  outputRange: [0, MODAL_HEIGHT],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
        {...panResponder.panHandlers}>
        <View style={styles.draggableArea}>
          <View style={styles.draggableBar} />
        </View>
        <BottomSheetContext.Provider value={{ animatedValue }}>
          {children}
        </BottomSheetContext.Provider>
      </Animated.View>
    </Modal>
  );
};

const Content = ({ children }: PropsWithChildren) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  return <View style={styles.content}>{children}</View>;
};

export const CompoundBottomSheet = Object.assign(BottomSheetModal, {
  Content,
});

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    bottomSheet: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: MODAL_HEIGHT,
      backgroundColor: colors[theme].WHITE,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    draggableArea: {
      width: '100%',
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    draggableBar: {
      width: 40,
      height: 4,
      backgroundColor: colors[theme].GRAY_300,
      borderRadius: 2,
    },
    content: {
      flex: 1,
      padding: 20,
    },
  });

export default CompoundBottomSheet;
