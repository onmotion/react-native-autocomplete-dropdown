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
import { Keyboard, ScrollView, TextInput, View } from 'react-native'
import { moderateScale, ScaledSheet } from 'react-native-size-matters'
import { withFadeAnimation } from './HOC/withFadeAnimation'
import { NothingFound } from './NothingFound'
import { RightButton } from './RightButton'
import { ScrollViewListItem } from './ScrollViewListItem'

export const AutocompleteDropdown = memo(
  forwardRef((props, ref) => {
    const inputRef = useRef(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const [isOpened, setIsOpened] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [searchTextCache, setSearchTextCache] = useState('')
    const [dataSet, setDataSet] = useState(props.dataSet) 
    const clearOnFocus = props.clearOnFocus === false ? false : true
    const inputHeight = props.inputHeight ?? moderateScale(40, 0.2)
    const suggestionsListMaxHeight =
      props.suggestionsListMaxHeight ?? moderateScale(200, 0.2)

    useLayoutEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(inputRef.current)
        } else {
          ref.current = inputRef.current
        }
      }
    }, [inputRef])

    useEffect(() => {
      setDataSet(props.dataSet)
    }, [props.dataSet])

    useEffect(() => {
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
        if (selectedItem) {
          setSearchText(selectedItem.title)
        }
      }
    }, [isOpened])

    /**
     * For re-render list while typing and useFilter
     */
    useEffect(() => {
      if (props.useFilter !== false && Array.isArray(props.dataSet)) {
        setDataSet(props.dataSet.slice())
      }
    }, [searchText])

    const _onSelectItem = useCallback((item) => {
      setSelectedItem(item)
      if (item) {
        setSearchText(item.title ?? '')
        setSearchTextCache(item.title ?? '')
      } else {
        setSearchText('')
        setSearchTextCache('')
      }
      inputRef.current.blur()
      setIsOpened(false)
    }, [])

    const ItemSeparatorComponent = props.ItemSeparatorComponent ?? (
      <View
        style={{ height: 1, width: '100%', backgroundColor: '#ddd' }}
      ></View>
    )

    const renderItem = useCallback((item, searchText) => {
      let titleHighlighted = ''
      let titleStart = item.title
      let titleEnd = ''
      if (
        typeof item.title === 'string' &&
        item.title.length > 0 &&
        searchText.length > 0
      ) {
        const substrIndex = item.title
          .toLowerCase()
          .indexOf(searchText.toLowerCase())
        if (substrIndex !== -1) {
          titleStart = item.title.slice(0, substrIndex)
          titleHighlighted = item.title.slice(
            substrIndex,
            substrIndex + searchText.length
          )
          titleEnd = item.title.slice(substrIndex + searchText.length)
        } else {
          if (props.useFilter !== false) {
            return null
          }
        }
      }

      const EL = withFadeAnimation(
        () => (
          <ScrollViewListItem
            {...{ titleHighlighted, titleStart, titleEnd }}
            onPress={() => _onSelectItem(item)}
          ></ScrollViewListItem>
        ),
        {}
      )
      return <EL></EL>
    }, [])


    const scrollContent = useMemo(() => {
      if (!Array.isArray(dataSet)) {
        return null
      }

      const content = []
      const itemsCount = dataSet.length - 1
      dataSet.forEach((item, i) => {
        const listItem = renderItem(item, searchText)
        if (listItem) {
          content.push(
            <View key={item.id}>
              {listItem}
              {i < itemsCount && ItemSeparatorComponent}
            </View>
          )
        }
      })
      return content
    }, [dataSet]) // don't use searchText here because it will rerender list twice every time

    const onClearPress = useCallback(() => {
      setSearchText('')
      setSearchTextCache('')
      setSelectedItem(null)
      setIsOpened(false)
      inputRef.current.blur()
      if (typeof props.onClear === 'function') {
        props.onClear()
      }
    }, [])

    const debouncedEvent = useCallback(
      debounce((text) => {
        if (typeof props.onChangeText === 'function') {
          props.onChangeText(text)
        }
      }, props.debounce ?? 0),
      []
    )

    const onChangeText = useCallback((text) => {
      setSearchText(text)
    //  setSearchTextCache(text)
      debouncedEvent(text)
    }, [])

    const onChevronPress = useCallback(() => {
      setIsOpened(!isOpened)
      Keyboard.dismiss()
    }, [isOpened])

    const onFocus = useCallback(() => {
      if (clearOnFocus) {
        setSearchTextCache(searchText)
        setSearchText('')
      }
      setIsOpened(true)
    }, [dataSet, clearOnFocus])

    const onBlur = useCallback(() => {
      if (props.closeOnBlur) {
        setIsOpened(false)
      }
    }, [searchTextCache])

    const onSubmit = useCallback((e) => {
      inputRef.current.blur()
      setIsOpened(false)
      setSearchTextCache(e.nativeEvent.text)
      if (typeof props.onSubmit === 'function') {
        props.onSubmit(e)
      }
    }, [])

    return (
      <View style={[styles.container, props.containerStyle]}>
        <View style={[props.inputContainerStyle]}>
          <TextInput
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
              ...(props.textInputProps ?? {}).style,
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
          ></RightButton>
        </View>

        {isOpened && Array.isArray(dataSet) && (
          <View
            style={{
              ...styles.listContainer,
              top: inputHeight + 5,
            }}
          >
            <ScrollView
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              style={{ maxHeight: suggestionsListMaxHeight }}
              nestedScrollEnabled={true}
              onScrollBeginDrag={Keyboard.dismiss}
            >
              {
                <View>
                  {scrollContent.length > 0
                    ? scrollContent
                    : !!searchText && <NothingFound />}
                </View>
              }
            </ScrollView>
          </View>
        )}
      </View>
    )
  })
)

AutocompleteDropdown.propTypes = {
  dataSet: PropTypes.array,
  loading: PropTypes.bool,
  useFilter: PropTypes.bool,
  showClear: PropTypes.bool,
  showChevron: PropTypes.bool,
  closeOnBlur: PropTypes.bool,
  clearOnFocus: PropTypes.bool,
  debounce: PropTypes.number,
  suggestionsListMaxHeight: PropTypes.number,
  onChangeText: PropTypes.func,
  onSelectItem: PropTypes.func,
  onOpenSuggestionsList: PropTypes.func,
  onClear: PropTypes.func,
  onSubmit: PropTypes.func,
  containerStyle: PropTypes.object,
  rightButtonsContainerStyle: PropTypes.object,
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    marginVertical: 2,
    zIndex: 1,
    
  },
  Input: {
    width: '100%',
    backgroundColor: '#e5ecf2',
    borderRadius: 5,
    overflow: 'hidden',
    paddingHorizontal: 13,
    fontSize: 16
  },

  listContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    width: '100%',
    zIndex: 9,
    borderRadius: 5,
    shadowColor: '#00000099',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 15.46,

    elevation: 20,
  },
})
