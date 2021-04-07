import React, { memo, useEffect, useRef } from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
// Icons
import Feather from 'react-native-vector-icons/Feather'
Feather.loadFont()

export const RightButton = memo(
  ({
    inputHeight,
    onClearPress,
    onChevronPress,
    isOpened,
    showChevron,
    showClear,
    loading,
    buttonsContainerStyle,
  }) => {
    const isOpenedAnimationValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
      Animated.timing(isOpenedAnimationValue, {
        duration: 350,
        toValue: isOpened ? 1 : 0,
        useNativeDriver: true,
        easing: Easing.bezier(0.3, 0.58, 0.25, 0.99),
      }).start()
    }, [isOpened])

    const chevronSpin = isOpenedAnimationValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    })

    return (
      <View
        style={{
          ...styles.container,
          height: inputHeight,
          ...buttonsContainerStyle,
        }}
      >
        {showClear && (
          <TouchableOpacity onPress={onClearPress} style={styles.clearButton}>
            <Feather name="x" size={18} />
          </TouchableOpacity>
        )}
        {showChevron && (
          <Animated.View style={{ transform: [{ rotate: chevronSpin }] }}>
            <TouchableOpacity
              onPress={onChevronPress}
              style={styles.chevronButton}
            >
              <Feather name="chevron-down" size={20} />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    right: 7,
    top: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5ecf2',
  },
  clearButton: {
    opacity: 0.3,
    width: 25,
    alignItems: 'center',
  },
  chevronButton: {
    width: 25,
    alignItems: 'center',
  },
})
