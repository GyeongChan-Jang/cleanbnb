const common = {
  // SKY_MAIN: '#70D6FF',
  SKY_MAIN: '#5CCEF8',
  SKY_100: '#F0F8FF',
  SKY_200: '#94E1FF',
  SKY_300: '#9EE5FF',
  SKY_400: '#41B3F0',
  SKY_500: '#4AA0E6',
  SKY_600: '#0077CC',
  BLUE_500: '#0D8AFF',
  CORAL: '#FF9770',
  YELLOW: '#FFD670',
  PINK: '#FF70A6',
  GREEN: '#1dd3b0',
  UNCHANGE_WHITE: '#FFF',
  UNCHANGE_BLACK: '#000',
  RED_500: '#FF5F5F',
  DARK_MAIN: '#484848',
} as const;

const colors = {
  light: {
    WHITE: '#FFF',
    GRAY_100: '#F0F0F0',
    GRAY_200: '#E7E7E7',
    GRAY_300: '#D8D8D8',
    GRAY_500: '#8E8E8E',
    GRAY_700: '#575757',
    BLACK: '#222222',
    ...common,
  },
  dark: {
    WHITE: '#333333',
    GRAY_100: '#202124',
    GRAY_200: '#3C4043',
    GRAY_300: '#5e5e5e',
    GRAY_500: '#8E8E8E',
    GRAY_700: '#F0F0F0',
    BLACK: '#FFF',
    ...common,
  },
} as const;

export { colors };

// 보완색 (강조용):

// #FF9770 (연한 코랄)

// 유사색 (조화로운 느낌):

// #41B3F0 (더 진한 파랑)
// #9EE5FF (더 연한 하늘색)

// 중성색 (배경 및 텍스트용):

// #F0F0F0 (매우 연한 회색)
// #333333 (진한 회색 / 거의 검정)

// 악센트 컬러:

// #FFD670 (파스텔 노랑)
// #FF70A6 (파스텔 핑크)

// 그라데이션용:

// #4CBEFF (약간 더 진한 하늘색)
// #94E1FF (약간 더 연한 하늘색)

// 이 색상들은 #70D6FF와 잘 어울리며, 다양한 용도로 사용할 수 있습니다. 예를 들어:

// #70D6FF (메인 컬러): 주요 요소, 헤더, 버튼 등
// #FF9770 (보완색): 강조가 필요한 요소, 콜투액션 버튼 등
// #41B3F0 및 #9EE5FF: 그라데이션, 보조 요소
// #F0F0F0 및 #333333: 배경, 텍스트 색상
// #FFD670 및 #FF70A6: 특별한 강조가 필요한 요소, 아이콘 등
