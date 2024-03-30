import React, { memo, useCallback, useRef, useState } from 'react'
import { Button, Dimensions, Text, View } from 'react-native'
import type { IAutocompleteDropdownRef, AutocompleteDropdownItem } from 'react-native-autocomplete-dropdown'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

export const RemoteDataSetExample2 = memo(() => {
  const [loading, setLoading] = useState(false)
  const [suggestionsList, setSuggestionsList] = useState<AutocompleteDropdownItem[] | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const dropdownController = useRef<IAutocompleteDropdownRef>()

  const searchRef = useRef(null)

  const getSuggestions = useCallback(async (q: string) => {
    const filterToken = q.toLowerCase()
    console.log('getSuggestions', q)
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null)
      return
    }
    setLoading(true)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const items = (await response.json()) as AutocompleteDropdownItem[]
    const suggestions = items
      .filter(item => item.title?.toLowerCase().includes(filterToken))
      .map(item => ({
        id: item.id,
        title: item.title,
      }))
    setSuggestionsList(suggestions)
    setLoading(false)
  }, [])

  const onClearPress = useCallback(() => {
    setSuggestionsList(null)
  }, [])

  const onOpenSuggestionsList = useCallback((isOpened: boolean) => {
    console.log({ isOpened })
  }, [])

  return (
    <>
      <View style={[{ flex: 0, flexDirection: 'row', alignItems: 'center' }]}>
        <AutocompleteDropdown
          ref={searchRef}
          controller={controller => {
            dropdownController.current = controller
          }}
          // initialValue={'1'}
          // direction={Platform.select({ ios: 'down' })}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          onSelectItem={item => {
            console.log('onSelectItem', item)
            item && setSelectedItem(item.id) // prevent reset the value
          }}
          debounce={600}
          suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
          onClear={onClearPress}
          //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
          onOpenSuggestionsList={onOpenSuggestionsList}
          loading={loading}
          useFilter={false} // set false to prevent rerender twice
          textInputProps={{
            placeholder: 'Type 3+ letters (dolo...)',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              borderRadius: 25,
              backgroundColor: '#383b42',
              color: '#fff',
              paddingLeft: 18,
            },
          }}
          rightButtonsContainerStyle={{
            right: 8,
            height: 30,

            alignSelf: 'center',
          }}
          inputContainerStyle={{
            backgroundColor: '#383b42',
            borderRadius: 25,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: '#383b42',
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item, text) => <Text style={{ color: '#fff', padding: 15 }}>{item.title}</Text>}
          //   ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
          //   ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
          inputHeight={50}
          showChevron={false}
          closeOnBlur={false}
          //  showClear={false}
        />
        <View style={{ width: 10 }} />
        <Button title="Toggle" onPress={() => dropdownController.current?.toggle()} />
      </View>
      <Text style={{ color: '#668', fontSize: 13 }}>Selected item id: {JSON.stringify(selectedItem)}</Text>
    </>
  )
})
