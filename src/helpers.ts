import {
  Easing,
  FadeInDown as RNRFadeInDown,
  FadeInUp as RNRFadeInUp,
  FadeOutDown as RNRFadeOutDown,
  FadeOutUp as RNRFadeOutUp,
} from 'react-native-reanimated'

const ANIMATION_DURATION = 150
const ANIMATION_EASING = Easing.quad
export const FadeInUp = RNRFadeInUp.duration(ANIMATION_DURATION)
  .easing(ANIMATION_EASING)
  .withInitialValues({ transform: [{ translateY: -20 }] })
export const FadeOutUp = RNRFadeOutUp.duration(ANIMATION_DURATION)
  .easing(ANIMATION_EASING)
  .withInitialValues({ transform: [{ translateY: 0 }] })
export const FadeInDown = RNRFadeInDown.duration(ANIMATION_DURATION)
  .easing(ANIMATION_EASING)
  .withInitialValues({ transform: [{ translateY: 20 }] })
export const FadeOutDown = RNRFadeOutDown.duration(ANIMATION_DURATION)
  .easing(ANIMATION_EASING)
  .withInitialValues({ transform: [{ translateY: 0 }] })
