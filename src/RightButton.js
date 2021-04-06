import React, { memo, useEffect, useRef } from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button } from 'react-native-elements'

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
          <Button
            onPress={onClearPress}
            TouchableComponent={TouchableOpacity}
            type="clear"
            loading={loading}
            icon={{
              type: 'ant-design',
              name: 'closecircle',
              size: 17,
              color: '#c5d2dd',
            }}
            buttonStyle={{ paddingRight: 3 }}
          ></Button>
        )}
        {showChevron && (
          <Animated.View style={{ transform: [{ rotate: chevronSpin }] }}>
            <Button
              TouchableComponent={TouchableOpacity}
              icon={{
                type: 'feather',
                name: 'chevron-down',
              }}
              type="clear"
              buttonStyle={{ paddingHorizontal: 0 }}
              onPress={onChevronPress}
            ></Button>
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
})
