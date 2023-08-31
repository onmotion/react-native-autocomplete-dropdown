import React, { FC, ReactElement, useCallback, useRef, useState, useEffect, MutableRefObject } from 'react'
import type { SetStateAction, Dispatch } from 'react'
import { LayoutChangeEvent, View, ViewProps } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { fadeInDownShort, fadeInUpShort } from './helpers'

export interface IAutocompleteDropdownContext {
  content?: ReactElement
  setContent: Dispatch<SetStateAction<ReactElement | undefined>>
  direction?: 'up' | 'down'
  setDirection: Dispatch<SetStateAction<IAutocompleteDropdownContext['direction']>>
  activeInputRef?: MutableRefObject<View | null>
}

export const AutocompleteDropdownContext = React.createContext<IAutocompleteDropdownContext>({
  content: undefined,
  setContent: () => null,
  direction: undefined,
  setDirection: () => null,
  activeInputRef: undefined
})

export const AutocompleteDropdownContextProvider: FC<any> = ({ headerOffset = 0, children }) => {
  const [content, setContent] = useState<IAutocompleteDropdownContext['content']>()
  const [direction, setDirection] = useState<IAutocompleteDropdownContext['direction']>(undefined)
  const [show, setShow] = useState(false)
  const [dropdownHeight, setDropdownHeight] = useState(0)
  const [inputMeasurements, setInputMeasurements] = useState<
    { x: number; y: number; width: number; height: number } | undefined
  >()
  const [opacity, setOpacity] = useState(0)
  const [contentStyles, setContentStyles] = useState<
    { top: number; left: number; width?: number } | undefined
  >(undefined)
  const activeInputRef = useRef<View>(null)

  useEffect(() => {
    if (!inputMeasurements?.height) {
      setOpacity(0)
      return
    }

    if (dropdownHeight && direction === 'up') {
      setContentStyles({
        top: inputMeasurements.y - dropdownHeight - 10 - headerOffset,
        left: inputMeasurements.x,
        width: inputMeasurements.width
      })
      setOpacity(1)
    } else if (direction === 'down') {
      setContentStyles({
        top: inputMeasurements.y + inputMeasurements.height + 5 - headerOffset,
        left: inputMeasurements.x,
        width: inputMeasurements.width
      })
      setOpacity(1)
    }
  }, [
    dropdownHeight,
    direction,
    inputMeasurements?.y,
    inputMeasurements?.x,
    inputMeasurements?.height,
    inputMeasurements?.width
  ])

  useEffect(() => {
    if (content) {
      activeInputRef?.current?.measure((x, y, width, height, pageX, pageY) => {
        setInputMeasurements({ x: pageX, y: pageY, width, height })
        setShow(true)
      })
    } else {
      setInputMeasurements(undefined)
      setDropdownHeight(0)
      setOpacity(0)
      setContentStyles(undefined)
      setShow(false)
    }
  }, [content])

  useEffect(() => {
    let positionTrackingInterval
    if (show && !!opacity) {
      positionTrackingInterval = setInterval(() => {
        requestAnimationFrame(() => {
          activeInputRef?.current &&
            activeInputRef?.current?.measure((_x, _y, width, height, x, y) => {
              setInputMeasurements(prev =>
                JSON.stringify(prev) === JSON.stringify({ x, y, width, height })
                  ? prev
                  : { x, y, width, height }
              )
            })
        })
      }, 16)
    } else {
      positionTrackingInterval && clearInterval(positionTrackingInterval)
    }

    return () => {
      positionTrackingInterval && clearInterval(positionTrackingInterval)
    }
  }, [opacity, show])

  const onLayout: ViewProps['onLayout'] = useCallback((e: LayoutChangeEvent) => {
    setDropdownHeight(e.nativeEvent.layout.height)
  }, [])

  return (
    <AutocompleteDropdownContext.Provider
      value={{ content, setContent, activeInputRef, direction, setDirection }}>
      {children}
      {!!content && show && (
        <View
          onLayout={onLayout}
          style={{
            position: 'absolute',
            opacity,
            ...contentStyles
          }}>
          <Animatable.View
            useNativeDriver
            animation={direction === 'up' ? fadeInUpShort : fadeInDownShort}
            easing="ease-out-quad"
            duration={100}>
            {content}
          </Animatable.View>
        </View>
      )}
    </AutocompleteDropdownContext.Provider>
  )
}
