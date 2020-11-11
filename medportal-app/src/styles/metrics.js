import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

export default {
  baseMargin: 10,
  basePadding: 20,
  baseRaius: 3,

  screenWidth,
  screenHeight,

  ...Platform.select({
    ios: {headerHeight: 64, headerPadding: 20},
    android: {headerHeight: 44, headerPadding: 0},
  }),

  responsive: (n) => {
    const widthBase = 411.428571428571;
    return (screenWidth * n) / widthBase;
  },
};
