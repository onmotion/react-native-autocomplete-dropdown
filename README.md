# react-native-autocomplete-dropdown
Dropdown Item picker with search and autocomplete (typeahead) functionality for react native

<p style="text-align: center;" align="center">
    <img src="./screens/Example.png" width="500px" >
</p>

Demo
--
<p style="text-align: center;" align="center">
    <img src="./screens/android.gif" width="280px" >
    <img src="./screens/ios.gif" width="280px" >
</p>

- [Installation](#installation)
- [Post-install Steps](#post-install-steps)
  - [iOS](#ios)
  - [Android](#android)
- [Usage](#usage)
  - [Example with local Dataset](#example-with-local-dataset)

## Installation

Run: `npm install --save react-native-autocomplete-dropdown` or `yarn add react-native-autocomplete-dropdown`

## Post-install Steps
Make sure **react-native-vector-icons** is installed. Follow the guides
https://github.com/oblador/react-native-vector-icons

### iOS

Run: `npx pod-install` for install react-native-vector-icons dependency (if not installed yet).

### Android

Follow the guides from https://github.com/oblador/react-native-vector-icons#android for install react-native-vector-icons dependency (if not installed yet).

## Usage

import the package

```js
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
```

### Example with local Dataset

```js
    const [selectedItem, setSelectedItem] = useState(null);

    <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        initialValue={{id: '2'}} // or just '2'
        onSelectItem={setSelectedItem}
        dataSet={[
          {id: '1', title: 'Alpha'},
          {id: '2', title: 'Beta'},
          {id: '3', title: 'Gamma'},
        ]} 
    />
```

### Example with remote requested Dataset

```js
    const [loading, setLoading] = useState(false)
    const [suggestionsList, setSuggestionsList] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const dropdownController = useRef(null)
    const searchRef = useRef(null)

    const getSuggestions = useCallback(async (q) => {
        if (typeof q !== "string" || q.length < 3) {
            setSuggestionsList(null)
            return
        }
        setLoading(true)
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        const items = await response.json()
        const suggestions = items.map((item) => ({
            id: item.id,
            title: item.title
        }))
        setSuggestionsList(suggestions)
        setLoading(false)
    }, [])

    <AutocompleteDropdown
          ref={searchRef}
          controller={(controller) => {
            dropdownController.current = controller
          }}
          dataSet={suggestionsList}
          onChangeText={getSuggestions}
          onSelectItem={(item) => {
            item && setSelectedItem(item.id)
          }}
          debounce={600}
          suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
         // onClear={onClearPress}
          //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
         // onOpenSuggestionsList={onOpenSuggestionsList}
          loading={loading}
          useFilter={false} // prevent rerender twice
          textInputProps={{
            placeholder: "Type 3+ letters",
            autoCorrect: false,
            autoCapitalize: "none",
            style: {
              borderRadius: 25,
              backgroundColor: "#383b42",
              color: "#fff",
              paddingLeft: 18
            }
          }}
          rightButtonsContainerStyle={{
            borderRadius: 25,
            right: 8,
            height: 30,
            top: 10,
            alignSelfs: "center",
            backgroundColor: "#383b42"
          }}
          inputContainerStyle={{
            backgroundColor: "transparent"
          }}
          suggestionsListContainerStyle={{
            backgroundColor: "#383b42"
          }}
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          renderItem={(item, text) => (
            <Text style={{ color: "#fff", padding: 15 }}>{item.title}</Text>
          )}
          ChevronIconComponent={
            <Feather name="x-circle" size={18} color="#fff" />
          }
          ClearIconComponent={
            <Feather name="chevron-down" size={20} color="#fff" />
          }
          inputHeight={50}
          showChevron={false}
          //  showClear={false}
        />
```