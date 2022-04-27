# react-native-autocomplete-dropdown

Dropdown Item picker with search and autocomplete (typeahead) functionality for react native

[![license](https://img.shields.io/github/license/onmotion/react-native-autocomplete-dropdown)](https://img.shields.io/github/license/onmotion/react-native-autocomplete-dropdown)
[![npm](https://img.shields.io/npm/v/react-native-autocomplete-dropdown.svg)](https://npmjs.com/package/react-native-autocomplete-dropdown)
[![npm](https://img.shields.io/npm/dm/react-native-autocomplete-dropdown.svg)](https://npmjs.com/package/react-native-autocomplete-dropdown)

<p style="text-align: center;" align="center">
    <img src="./screens/Example.png" width="500px" >
</p>

## Demo

<p style="text-align: center;" align="center">
    <img src="./screens/android.gif" width="280px" >
    <img src="./screens/ios.gif" width="280px" >
</p>

> Run expo snack demo [@onmotion/react-native-autocomplete-dropdown](https://snack.expo.io/@onmotion/react-native-autocomplete-dropdown)

<img src="./screens/expo-qr.png" width="150">

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
    - [Options](#options)
    - [Troubleshooting](#troubleshooting)
        - [zIndex hell on iOS](#zindex-hell-on-ios)

## Installation

Run: `npm install --save react-native-autocomplete-dropdown` or `yarn add react-native-autocomplete-dropdown`

## Post-install Steps

Make sure **react-native-vector-icons** is installed. Follow the guides
<https://github.com/oblador/react-native-vector-icons>

`yarn add react-native-vector-icons`

### iOS

Run: `npx pod-install` for install react-native-vector-icons dependency (if not installed yet).

### Android

Follow the guides from <https://github.com/oblador/react-native-vector-icons#android> for install react-native-vector-icons dependency (if not installed yet).

## Usage

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

import Feather from 'react-native-vector-icons/Feather'
Feather.loadFont()

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
          ChevronIconComponent={<Feather name="chevron-down" size={20} color="#fff" />}
          ClearIconComponent={<Feather name="x-circle" size={18} color="#fff" />}
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

Run

```bash
cd example
yarn install
yarn add react-native-vector-icons
npx pod-install
npm run ios

```

## Options

| **Option**                      | **Description**                                                                                               | **Type**             | **Default**                                 |
|---------------------------------|---------------------------------------------------------------------------------------------------------------|----------------------|---------------------------------------------|
| `dataSet`                       | set of list items                                                                                             | array                | null                                        |
| `initialValue`                  | string (**id**) or object that contain **id**                                                                 | string \| object     | null                                        |
| `loading`                       | loading state                                                                                                 | bool                 | false                                       |
| `useFilter`                     | whether use local filter by dataSet (useful set to false for remote filtering to prevent rerender twice)      | bool                 | true                                        |
| `showClear`                     | show clear button                                                                                             | bool                 | true                                        |
| `showChevron`                   | show chevron (open/close) button                                                                              | bool                 | true                                        |
| `closeOnBlur`                   | whether to close dropdown on blur                                                                             | bool                 | false                                       |
| `closeOnSubmit`                 | whether to close dropdown on submit                                                                           | bool                 | false                                       |
| `clearOnFocus`                  | whether to clear typed text on focus                                                                          | bool                 | true                                        |
| `debounce`                      | wait **ms** before call `onChangeText`                                                                        | number               | 0                                           |
| `suggestionsListMaxHeight`      | max height of dropdown                                                                                        | number               | 200                                         |
| `direction`                     | "up" or "down"                                                                                                | string               | down + auto calculate                       |
| `position`                      | "relative" or "absolute"                                                                                      | string               | relative                                    |
| `bottomOffset`                  | for calculate dropdown direction (e.g. tabbar)                                                                | number               | 0                                           |
| `onChangeText`                  | event textInput onChangeText                                                                                  | function             |                                             |
| `onSelectItem`                  | event onSelectItem                                                                                            | function             |                                             |
| `onOpenSuggestionsList`         | event onOpenSuggestionsList                                                                                   | function             |                                             |
| `onClear`                       | event on clear button press                                                                                   | function             |                                             |
| `onSubmit`                      | event on submit KB button press                                                                               | function             |                                             |
| `onBlur`                        | event fired on text input blur                                                                                | function             |                                             |
| `onFocus`                       | event on focus text input                                                                                     | function             |                                             |
| `renderItem`                    | JSX for render item `(item, searchText) => JSX \| null` if return null then the element will not be displayed | function             | item.title                                  |
| `controller`                    | return reference to module controller with methods **close, open, toggle, clear, setInputText, setItem**      | function             |                                             |
| `containerStyle`                |                                                                                                               | ViewStyle            |                                             |
| `rightButtonsContainerStyle`    |                                                                                                               | ViewStyle            |                                             |
| `suggestionsListContainerStyle` |                                                                                                               | ViewStyle            |                                             |
| `suggestionsListTextStyle`      |                                                                                                               | TextStyle            | styles of suggestions list text items       |
| `ChevronIconComponent`          |                                                                                                               | React.Component      | Feather chevron icon                        |
| `ClearIconComponent`            |                                                                                                               | React.Component      | Feather x icon                              |
| `ScrollViewComponent`           |                                                                                                               | React.Component name | ScrollView that provide suggestions content |
| `EmptyResultComponent`          | replace the default `<NothingFound>` Component on empty result                                                | React.Component      |                                             |
| `emptyResultText`               | replace the default "Nothing found" text on empty result                                                      | string               | "Nothing found"                             |
| `textInputProps`                | text input props                                                                                              | TextInputProps       |                                             |

## Troubleshooting

### zIndex hell on iOS

As decribed here <https://docs.expo.dev/ui-programming/z-index/> on iOS for absolute positioned items we must respect the zIndex of the element parent.

So for example if you do smth like

```js
          <View style={[styles.section]}>
            <Text style={styles.sectionTitle}>First</Text>
            <AutocompleteDropdown
              dataSet={[
                { id: '1', title: 'Alpha' },
                { id: '2', title: 'Beta' },
                { id: '3', title: 'Gamma' },
              ]}
            />
          </View>
          <View style={[styles.section]}>
            <Text style={styles.sectionTitle}>Second</Text>
            <AutocompleteDropdown
              dataSet={[
                { id: '1', title: 'Alpha' },
                { id: '2', title: 'Beta' },
                { id: '3', title: 'Gamma' },
              ]}
            />
          </View>
```

you would see
<img width="384" alt="Screenshot 2022-04-24 at 20 59 38" src="https://user-images.githubusercontent.com/12899080/164989990-2b4269e1-406a-48a5-9ec7-25e4f53d2fb0.png">

But if it change with calculated zIndex:

```js
          <View
            style={[styles.section, Platform.select({ ios: { zIndex: 10 } })]}>
            <Text style={styles.sectionTitle}>First</Text>
            <AutocompleteDropdown
              dataSet={[
                { id: '1', title: 'Alpha' },
                { id: '2', title: 'Beta' },
                { id: '3', title: 'Gamma' },
              ]}
            />
          </View>
          <View
            style={[styles.section, Platform.select({ ios: { zIndex: 9 } })]}>
            <Text style={styles.sectionTitle}>Second</Text>
            <AutocompleteDropdown
              dataSet={[
                { id: '1', title: 'Alpha' },
                { id: '2', title: 'Beta' },
                { id: '3', title: 'Gamma' },
              ]}
            />
          </View>
```

it will be rendered as expected
<img width="381" alt="Screenshot 2022-04-24 at 21 03 16" src="https://user-images.githubusercontent.com/12899080/164990163-7d2aa98d-3988-4636-97a3-8be229489472.png">

And the same, if you want render dropdown list to **up** direction, you should switch zIndexes respectively

More info about this behaviour: <https://docs.expo.dev/ui-programming/z-index/>
