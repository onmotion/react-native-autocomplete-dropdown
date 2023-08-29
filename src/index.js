import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { Dimensions, Keyboard, LogBox, TextInput, TouchableOpacity, View } from 'react-native'
import { Dropdown } from './Dropdown'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { NothingFound } from './NothingFound'
import { RightButton } from './RightButton'
import { ScrollViewListItem } from './ScrollViewListItem'
import { useContext } from 'react'
import {
  AutocompleteDropdownContext,
  AutocompleteDropdownContextProvider
} from './AutocompleteDropdownContext'
import { useKeyboardHeight } from './useKeyboardHeight'
import diacriticless from './diacriticless';

export { AutocompleteDropdownContextProvider }

export const AutocompleteDropdown = memo(
  forwardRef((props, ref) => {
    const inputRef = useRef(null)
    const containerRef = useRef(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const [isOpened, setIsOpened] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [dataSet, setDataSet] = useState(props.dataSet)
    const clearOnFocus = props.clearOnFocus === false ? false : true
    const ignoreAccents = props.ignoreAccents === false ? false : true
    const matchFromStart = props.matchFrom === 'start' ? true : false
    const inputHeight = props.inputHeight ?? moderateScale(40, 0.2)
    const suggestionsListMaxHeight = props.suggestionsListMaxHeight ?? moderateScale(200, 0.2)
    const bottomOffset = props.bottomOffset ?? 0
    const InputComponent = props.InputComponent ?? TextInput
    const kbHeight = useKeyboardHeight()
    const {
      content,
      setContent,
      activeInputRef,
      direction = props.direction,
      setDirection
    } = useContext(AutocompleteDropdownContext)

    useLayoutEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(inputRef.current)
        } else {
          ref.current = inputRef.current
        }
      }
    }, [inputRef, ref])

    useEffect(() => {
      // VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.
      LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    }, [])

    /** Set initial value */
    useEffect(() => {
      if (!Array.isArray(dataSet) || selectedItem) {
        // nothing to set or already setted
        return
      }

      let dataSetItem
      if (typeof props.initialValue === 'string') {
        dataSetItem = dataSet.find(el => el.id === props.initialValue)
      } else if (typeof props.initialValue === 'object' && props.initialValue.id) {
        dataSetItem = dataSet.find(el => el.id === props.initialValue.id)
      }

      if (dataSetItem) {
        setSelectedItem(dataSetItem)
      }
    }, [])

    /** expose controller methods */
    useEffect(() => {
      if (typeof props.controller === 'function') {
        props.controller({ close, blur, open, toggle, clear, setInputText, setItem })
      }
    }, [isOpened, props.controller])

    useEffect(() => {
      if (selectedItem) {
        setSearchText(selectedItem.title ?? '')
      } else {
        setSearchText('')
      }

      if (typeof props.onSelectItem === 'function') {
        props.onSelectItem(selectedItem)
      }
    }, [selectedItem])

    useEffect(() => {
      if (typeof props.onOpenSuggestionsList === 'function') {
        props.onOpenSuggestionsList(isOpened)
      }
      // renew state on close
      if (!isOpened) {
        if (selectedItem && props.resetOnClose !== false) {
          setSearchText(selectedItem.title)
        }
      }
    }, [isOpened])

    const _onSelectItem = useCallback(item => {
      setSelectedItem(item)
      inputRef.current.blur()
      setIsOpened(false)
    }, [])

    const calculateDirection = useCallback(async () => {
      const [, positionY] = await new Promise(resolve =>
        containerRef.current?.measureInWindow((...rect) => {
          resolve(rect)
        })
      )

      const screenHeight = Dimensions.get('window').height
      setDirection((screenHeight - kbHeight) / 2 > positionY ? 'down' : 'up')
      return new Promise(resolve => {
        setTimeout(() => {
          return resolve()
        }, 1)
      })
    }, [kbHeight, setDirection])

    /** methods */
    const close = () => {
      setIsOpened(false)
      setDirection(props.direction)
      setContent(undefined)
    }

    // useEffect(() => {
    //   if (kbHeight && !props.direction) {
    //     calculateDirection()
    //   }
    // }, [kbHeight, props.direction])

    const open = async () => {
      if (!props.direction) {
        await calculateDirection()
      }

      setIsOpened(true)
    }

    const toggle = () => {
      isOpened ? close() : open()
    }

    const blur = () => {
        inputRef.current.blur()
      }

    const clear = () => {
      onClearPress()
    }

    const setInputText = text => {
      setSearchText(text)
    }

    const setItem = item => {
      setSelectedItem(item)
    }

    useEffect(() => {
      setDataSet(props.dataSet)
    }, [props.dataSet])

    useEffect(() => {
      if (!searchText?.length) {
        setDataSet(props.dataSet)
        return
      }

      if (!Array.isArray(props.dataSet) || props.useFilter === false) {
        return
      }

      const findWhat = ignoreAccents ? diacriticless( searchText.toLowerCase()) : searchText.toLowerCase()

        const newSet = props.dataSet.filter((item) => {
            const findWhere = ignoreAccents ? diacriticless(item.title.toLowerCase()) : item.title.toLowerCase()

            if (matchFromStart) {
                return typeof item.title === 'string' && findWhere.startsWith( findWhat )
            } else {
                return typeof item.title === 'string' && findWhere.indexOf(findWhat) !== -1
            }

        });

      setDataSet(newSet)
    }, [searchText, props.dataSet, props.useFilter])

    const renderItem = useCallback(
      ({ item }) => {
        if (typeof props.renderItem === 'function') {
          const EL = props.renderItem(item, searchText)
          return <TouchableOpacity onPress={() => _onSelectItem(item)}>{EL}</TouchableOpacity>
        }

        return (
          <ScrollViewListItem
            key={item.id}
            title={item.title}
            highlight={searchText}
            style={props.suggestionsListTextStyle}
            onPress={() => _onSelectItem(item)}
            ignoreAccents={ignoreAccents}
          />
        )
      },
      [props.renderItem, searchText, props.suggestionsListTextStyle]
    )

    const ListEmptyComponent = useMemo(() => {
      return props.EmptyResultComponent ?? <NothingFound emptyResultText={props.emptyResultText} />
    }, [props.EmptyResultComponent])

    const onClearPress = useCallback(() => {
      setSearchText('')
      setSelectedItem(null)
      setIsOpened(false)
      inputRef.current.blur()
      if (typeof props.onClear === 'function') {
        props.onClear()
      }
    }, [props.onClear])

    const debouncedEvent = useCallback(
      debounce(text => {
        if (typeof props.onChangeText === 'function') {
          props.onChangeText(text)
        }
      }, props.debounce ?? 0),
      [props.onChangeText]
    )

    const onChangeText = useCallback(
      text => {
        setSearchText(text)
        debouncedEvent(text)
      },
      [debouncedEvent]
    )

    const onChevronPress = useCallback(() => {
      toggle()
      Keyboard.dismiss()

      if (typeof props.onChevronPress === 'function') {
        props.onChevronPress()
      }
    }, [props.onChevronPress, toggle])

    const onFocus = useCallback(
      e => {
        if (clearOnFocus) {
          setSearchText('')
        }
        if (typeof props.onFocus === 'function') {
          props.onFocus(e)
        }
        open()
      },
      [dataSet, clearOnFocus, props.onFocus]
    )

    const onBlur = useCallback(
      e => {
        if (props.closeOnBlur) {
          close()
        }
        if (typeof props.onBlur === 'function') {
          props.onBlur(e)
        }
      },
      [props.closeOnBlur, props.onBlur]
    )

    const onSubmit = useCallback(
      e => {
        inputRef.current.blur()
        if (props.closeOnSubmit) {
          close()
        }

        if (typeof props.onSubmit === 'function') {
          props.onSubmit(e)
        }
      },
      [props.closeOnSubmit, props.onSubmit, close]
    )

    useEffect(() => {
      if (!content) {
        setIsOpened(false)
      }
    }, [content])

    useEffect(() => {
      if (dataSet && inputRef.current?.isFocused()) {
        setIsOpened(true)
      }
    }, [dataSet, selectedItem])

    useEffect(() => {
      if (isOpened && Array.isArray(dataSet)) {
        if (activeInputRef) {
          activeInputRef.current = containerRef.current
        }

        setContent(
          <Dropdown
            {...{
              ...props,
              direction,
              inputHeight,
              dataSet,
              suggestionsListMaxHeight,
              renderItem,
              ListEmptyComponent
            }}
          />
        )
      } else {
        setContent(undefined)
      }
    }, [
      isOpened,
      dataSet,
      props,
      direction,
      inputHeight,
      suggestionsListMaxHeight,
      renderItem,
      ListEmptyComponent,
      activeInputRef,
      setContent
    ])

    return (
      <View style={[styles.container, props.containerStyle]}>
        {/* it's necessary use onLayout here for Androd (bug?) */}
        <View
          ref={containerRef}
          onLayout={_ => {}}
          style={[styles.inputContainerStyle, props.inputContainerStyle]}>
          <InputComponent
            ref={inputRef}
            value={searchText}
            onChangeText={onChangeText}
            autoCorrect={false}
            onBlur={onBlur}
            onFocus={onFocus}
            onSubmitEditing={onSubmit}
            placeholderTextColor="#d0d4dc"
            {...props.textInputProps}
            style={{
              ...styles.Input,
              height: inputHeight,
              ...(props.textInputProps ?? {}).style
            }}
          />
          <RightButton
            isOpened={isOpened}
            inputHeight={inputHeight}
            onClearPress={onClearPress}
            onChevronPress={onChevronPress}
            showChevron={props.showChevron ?? true}
            showClear={props.showClear ?? !!searchText}
            loading={props.loading}
            buttonsContainerStyle={props.rightButtonsContainerStyle}
            ChevronIconComponent={props.ChevronIconComponent}
            ClearIconComponent={props.ClearIconComponent}
            RightIconComponent={props.RightIconComponent}
            onRightIconComponentPress={props.onRightIconComponentPress}
          />
        </View>
      </View>
    )
  })
)

AutocompleteDropdown.propTypes = {
  dataSet: PropTypes.array,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  loading: PropTypes.bool,
  useFilter: PropTypes.bool,
  showClear: PropTypes.bool,
  showChevron: PropTypes.bool,
  closeOnBlur: PropTypes.bool,
  closeOnSubmit: PropTypes.bool,
  clearOnFocus: PropTypes.bool,
  resetOnClose: PropTypes.bool,
  ignoreAccents: PropTypes.bool,
  matchFrom: PropTypes.oneOf(['any', 'start']),
  debounce: PropTypes.number,
  direction: PropTypes.oneOf(['down', 'up']),
  suggestionsListMaxHeight: PropTypes.number,
  bottomOffset: PropTypes.number,
  onChangeText: PropTypes.func,
  onSelectItem: PropTypes.func,
  onOpenSuggestionsList: PropTypes.func,
  onChevronPress: PropTypes.func,
  onClear: PropTypes.func,
  onSubmit: PropTypes.func,
  onBlur: PropTypes.func,
  controller: PropTypes.func,
  containerStyle: PropTypes.object,
  rightButtonsContainerStyle: PropTypes.object,
  suggestionsListContainerStyle: PropTypes.object,
  suggestionsListTextStyle: PropTypes.object,
  ChevronIconComponent: PropTypes.element,
  RightIconComponent: PropTypes.element,
  ClearIconComponent: PropTypes.element,
  ScrollViewComponent: PropTypes.elementType,
  EmptyResultComponent: PropTypes.element,
  emptyResultText: PropTypes.string,
  flatListProps: PropTypes.object
}

const styles = ScaledSheet.create({
  container: {
    marginVertical: 2
  },
  inputContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#e5ecf2',
    borderRadius: 5
  },
  Input: {
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'hidden',
    paddingHorizontal: 13,
    fontSize: 16
  }
})
