import React, { memo, useCallback, useRef, useState } from 'react'
import { Button, Dimensions, Text, View } from 'react-native'
import type { IAutocompleteDropdownRef, AutocompleteDropdownItem } from 'react-native-autocomplete-dropdown'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

export const RemoteDataSetExample3 = memo(() => {
  const [loading, setLoading] = useState(false)
  const [suggestionsList, setSuggestionsList] = useState<AutocompleteDropdownItem[] | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const dropdownController = useRef<IAutocompleteDropdownRef>()

  const searchRef = useRef(null)

  const getSuggestions = useCallback(async (q: string) => {
    console.log('getSuggestions', q)
    const filterToken = q.toLowerCase()
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

  return (
    <>
      <View style={[{ flex: 0, flexDirection: 'row', alignItems: 'center' }]}>
        <Button title="Clear" onPress={() => dropdownController.current?.clear()} />
        <View style={{ width: 10 }} />
        <AutocompleteDropdown
          ref={searchRef}
          closeOnBlur={false}
          // direction={Platform.select({ ios: 'down' })}
          controller={controller => {
            dropdownController.current = controller
          }}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          onSelectItem={item => {
            setSelectedItem(item?.id || null)
          }}
          onBlur={() => {
            console.log('onBlur triggered')
          }}
          onFocus={() => {
            console.log('onFocus triggered')
          }}
          onOpenSuggestionsList={() => {
            console.log('onOpenSuggestionsList triggered')
          }}
          debounce={600}
          suggestionsListMaxHeight={Dimensions.get('window').height * 0.3}
          onClear={onClearPress}
          onSubmit={e => console.log(e.nativeEvent.text)}
          loading={loading}
          useFilter={false} // prevent rerender twice
          textInputProps={{
            placeholder: 'Type 3+ letters (dolo...)',
            autoCorrect: false,
            autoCapitalize: 'none',
            style: {
              borderRadius: 25,
              color: '#383b42',
              paddingLeft: 18,
            },
          }}
          rightButtonsContainerStyle={{
            height: 30,
            alignSelf: 'center',
          }}
          inputContainerStyle={{
            borderRadius: 25,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#383b42',
            shadowColor: '#00000099',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.3,
            shadowRadius: 8.46,

            elevation: 13,
          }}
          suggestionsListContainerStyle={{
            backgroundColor: '#fff',
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item, text) => {
            console.log('custom renderItem fn called', item)
            return (
              <Text style={{ color: '#383b42', padding: 15 }}>
                ({text}) - {item.title}
              </Text>
            )
          }}
          //inputHeight={50}
          //   showChevron={false}
          showClear={false}
        />
      </View>
      <Text style={{ color: '#668', fontSize: 13, marginTop: 15 }}>
        Selected item id: {JSON.stringify(selectedItem)}
      </Text>
    </>
  )
})
