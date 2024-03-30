import React, { memo, useState } from 'react'
import { Dimensions, Text } from 'react-native'
import type { AutocompleteDropdownItem } from 'react-native-autocomplete-dropdown'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

export const LocalDataSetExample2 = memo(() => {
  const [selectedItem, setSelectedItem] = useState<AutocompleteDropdownItem | null>(null)

  return (
    <>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        editable={false}
        //  direction="up"
        onSelectItem={setSelectedItem}
        LeftComponent={
          <Text style={{ color: '#668', fontSize: 14, paddingLeft: 8, alignSelf: 'center' }}>Selected:</Text>
        }
        dataSet={[
          { id: '1', title: '🐑' },
          { id: '2', title: '✨' },
          { id: '3', title: '👌' },
          { id: '4', title: '💩' },
          { id: '5', title: '🟢' },
          { id: '6', title: '💎' },
        ]}
        suggestionsListMaxHeight={Dimensions.get('window').height / 1.5}
        renderItem={(item, text) => (
          <Text style={{ color: '#f00', padding: 28, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
            -= {item.title} =-
          </Text>
        )}
      />
      <Text style={{ color: '#668', fontSize: 13 }}>Selected item: {JSON.stringify(selectedItem)}</Text>
    </>
  )
})
