# react-native-autocomplete-dropdown

Dropdown Item picker with search and autocomplete (typeahead) functionality for react native

[![license](https://img.shields.io/github/license/onmotion/react-native-autocomplete-dropdown)](https://img.shields.io/github/license/onmotion/react-native-autocomplete-dropdown)
[![npm](https://img.shields.io/npm/v/react-native-autocomplete-dropdown.svg)](https://npmjs.com/package/react-native-autocomplete-dropdown)
[![npm](https://img.shields.io/npm/dm/react-native-autocomplete-dropdown.svg)](https://npmjs.com/package/react-native-autocomplete-dropdown)

> This is documentation for version 4.x, if you are looking docs for version 3.x, you can find it [here](https://github.com/onmotion/react-native-autocomplete-dropdown/blob/main/README%5E3.md)

<p style="text-align: center;" align="center">
    <img src="./screens/Example.png" width="500px" >
</p>

## Demo

<p style="text-align: center;" align="center">
    <img src="./screens/android.gif" width="280px" >
    <img src="./screens/ios.gif" width="280px" >
</p>

> Run expo snack demo [@onmotion/react-native-autocomplete-dropdown](https://snack.expo.dev/@onmotion/react-native-autocomplete-dropdown-v4)

or download the [Expo Go](https://expo.dev/go) app and scan the QR code below

<img src="./screens/expo-example-qr-v4.png" width="150">

## Nav

- [react-native-autocomplete-dropdown](#react-native-autocomplete-dropdown)
        - [Demo](#demo)
        - [Nav](#nav)
        - [Installation](#installation)
        - [Post-install Steps](#post-install-steps)
                - [iOS](#ios)
                - [Android](#android)
        - [Usage](#usage)
                - [Dataset item format](#dataset-item-format)
                - [Example with local Dataset](#example-with-local-dataset)
                - [Example with remote requested Dataset](#example-with-remote-requested-dataset)
        - [Playground](#playground)
        - [Options](#options)
        - [Usage with a Modal](#usage-with-a-modal)

## Installation

Run:

 or

 ```bash
 yarn add react-native-autocomplete-dropdown
 ```

 or for v3.x

 ```bash
 yarn add react-native-autocomplete-dropdown@3.1.5
 ```

## Post-install Steps

Make sure **react-native-svg** is installed. Follow the guide
<https://github.com/software-mansion/react-native-svg>

```bash
yarn add react-native-svg
```

### iOS

Run: `npx pod-install` for install `react-native-svg` dependency (if not installed yet).

### Android

No additional steps are necessary

## Usage

Wrap your root component in `AutocompleteDropdownContextProvider` from `react-native-autocomplete-dropdown` as you can see in [example](https://github.com/onmotion/react-native-autocomplete-dropdown/blob/main/example/App.js)

```js
<AutocompleteDropdownContextProvider>
    <AppRootOrWhatever/>
</AutocompleteDropdownContextProvider>
```

The dropdown position is relative to the `AutocompleteDropdownContextProvider`, so put this in the right place, it should cover all the screen/modal.

If you have a header component, you can pass an offset.  For example with react navigation

```js
//...
import { useHeaderHeight } from '@react-navigation/elements';
//...
const headerHeight = useHeaderHeight();
//...

<AutocompleteDropdownContextProvider headerOffset={headerHeight} >
    <AppRootOrWhatever/>
</AutocompleteDropdownContextProvider>
```

import the package

```js
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
```

### Dataset item format

`dataSet` property must be an **array of objects** or **null**. Object required keys are:

```js
{
    id: 'some uniq string id',
    title: 'list item title'
}
```

### Example with local Dataset

```js
const [selectedItem, setSelectedItem] = useState(null);

<AutocompleteDropdown
  clearOnFocus={false}
  closeOnBlur={true}
  closeOnSubmit={false}
  initialValue={{ id: '2' }} // or just '2'
  onSelectItem={setSelectedItem}
  dataSet={[
    { id: '1', title: 'Alpha' },
    { id: '2', title: 'Beta' },
    { id: '3', title: 'Gamma' },
  ]}
/>;
```

### Example with remote requested Dataset

```js
import React, { memo, useCallback, useRef, useState } from 'react'
import { Button, Dimensions, Text, View, Platform } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

export const RemoteDataSetExample2 = memo(() => {
  const [loading, setLoading] = useState(false)
  const [suggestionsList, setSuggestionsList] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const dropdownController = useRef(null)

  const searchRef = useRef(null)

  const getSuggestions = useCallback(async q => {
    const filterToken = q.toLowerCase()
    console.log('getSuggestions', q)
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionsList(null)
      return
    }
    setLoading(true)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const items = await response.json()
    const suggestions = items
      .filter(item => item.title.toLowerCase().includes(filterToken))
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

  const onOpenSuggestionsList = useCallback(isOpened => {}, [])

  return (
    <>
      <View
        style={[
          { flex: 1, flexDirection: 'row', alignItems: 'center' },
          Platform.select({ ios: { zIndex: 1 } }),
        ]}>
        <AutocompleteDropdown
          ref={searchRef}
          controller={controller => {
            dropdownController.current = controller
          }}
          // initialValue={'1'}
          direction={Platform.select({ ios: 'down' })}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          onSelectItem={item => {
            item && setSelectedItem(item.id)
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
        <Button style={{ flexGrow: 0 }} title="Toggle" onPress={() => dropdownController.current.toggle()} />
      </View>
      <Text style={{ color: '#668', fontSize: 13 }}>Selected item id: {JSON.stringify(selectedItem)}</Text>
    </>
  )
})

```

More examples see at <https://github.com/onmotion/react-native-autocomplete-dropdown/tree/main/example>

## Playground

To play around with the examples, you can run the following commands

```bash
cd example
yarn install
yarn pods

yarn ios
yarn android
```

## Options

| **Option** 	| **Description** 	                                                                                               | **Type** 	| **Default** 	                                 |
|---	|-----------------------------------------------------------------------------------------------------------------|---	|-----------------------------------------------|
| `dataSet` 	| set of list items 	                                                                                             | array 	| null 	                                        |
| `initialValue` 	| string (**id**) or object that contain **id** 	                                                                 | string \| object 	| null 	                                        |
| `loading` 	| loading state 	                                                                                                 | bool 	| false 	                                       |
| `useFilter` 	| whether use local filter by dataSet (useful set to false for remote filtering to prevent rerender twice) 	      | bool 	| true 	                                        |
| `showClear` 	| show clear button 	                                                                                             | bool 	| true 	                                        |
| `showChevron` 	| show chevron (open/close) button 	                                                                              | bool 	| true 	                                        |
| `closeOnBlur` 	| whether to close dropdown on blur 	                                                                             | bool 	| false 	                                       |
| `closeOnSubmit` 	| whether to close dropdown on submit 	                                                                           | bool 	| false 	                                       |
| `clearOnFocus` 	| whether to clear typed text on focus 	                                                                          | bool 	| true 	                                        |
| `caseSensitive`   | whether to perform case-sensitive search 	                                                                          | bool  | false
| `ignoreAccents` 	| ignore diacritics 	                                                                                             | bool 	| true 	                                        |
| `trimSearchText` | trim the searched text                                                                                         | bool 	| true 	                                        |
| `editable` | is textInput editable                                                                                         | bool 	| true 	                                        |
| `debounce` 	| wait **ms** before call `onChangeText` 	                                                                        | number 	| 0 	                                           |
| `suggestionsListMaxHeight` 	| max height of dropdown 	                                                                                        | number 	| 200 	                                         |
| `direction` 	| "up" or "down" 	                                                                                                | string 	| down + auto calculate 	                       |
| `matchFrom` 	| whether match suggestions from start of titles or anywhere in the title. Possible values are "any" or "start" 	 | string 	| any 	                                         |
| `bottomOffset` 	| for calculate dropdown direction (e.g. tabbar) 	                                                                | number 	| 0 	                                           |
| `onChangeText` 	| event textInput onChangeText 	                                                                                  | function 	| 	                                             |
| `onSelectItem` 	| event onSelectItem 	                                                                                            | function 	| 	                                             |
| `onOpenSuggestionsList` 	| event onOpenSuggestionsList 	                                                                                   | function 	| 	                                             |
| `onChevronPress` 	| event onChevronPress 	                                                                                          | function 	| 	                                             |
| `onClear` 	| event on clear button press 	                                                                                   | function 	| 	                                             |
| `onSubmit` 	| event on submit KB button press 	                                                                               | function 	| 	                                             |
| `onBlur` 	| event fired on text input blur 	                                                                                | function 	| 	                                             |
| `onFocus` 	| event on focus text input 	                                                                                     | function 	| 	                                             |
| `renderItem` 	| JSX for render item `(item, searchText) => JSX \| null` if return null then the element will not be displayed 	 | function 	| item.title 	                                  |
| `controller` 	| return reference to module controller with methods **close, open, toggle, clear, setInputText, setItem** 	      | function 	| 	                                             |
| `containerStyle` 	| 	                                                                                                               | ViewStyle 	| 	                                             |
| `rightButtonsContainerStyle` 	| 	                                                                                                               | ViewStyle 	| 	                                             |
| `suggestionsListContainerStyle` 	| 	                                                                                                               | ViewStyle 	| 	                                             |
| `suggestionsListTextStyle` 	| 	                                                                                                               | TextStyle 	| styles of suggestions list text items 	       |
| `ChevronIconComponent` 	| 	                                                                                                               | React.Component 	| Feather chevron icon 	                        |
| `ClearIconComponent` 	| 	                                                                                                               | React.Component 	| Feather x icon 	                              |
| ~~ScrollViewComponent~~ 	| removed in 2.0.0 based on FlatList 	                                                                            | React.Component name 	| ScrollView that provide suggestions content 	 |
| `EmptyResultComponent` 	| replace the default `` Component on empty result 	                                                              | React.Component 	| 	                                             |
| `InputComponent` 	| input element component 	                                                                                       | React.ComponentType 	| TextInput 	                                   |
| `emptyResultText` 	| replace the default "Nothing found" text on empty result 	                                                      | string 	| "Nothing found" 	                             |
| `textInputProps` 	| text input props 	                                                                                              | TextInputProps 	| 	                                             |
| `flatListProps` 	| props for \ component 	                                                                                         | FlatListProps\ 	| 	                                             |

## Usage with a Modal

if you want to use the dropdown in a modal, you need to wrap the dropdown in another `AutocompleteDropdownContextProvider` inside the modal component

```js
    <Modal
        visible={opened}
        presentationStyle="formSheet"
        animationType="slide"
        onRequestClose={() => setOpened(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
          <AutocompleteDropdownContextProvider>
            <View style={{ paddingHorizontal: 20, flex: 1, paddingTop: 20 }}>
              <AutocompleteDropdown {...props}/>
            </View>
          </AutocompleteDropdownContextProvider>
        </SafeAreaView>
    </Modal>
```
