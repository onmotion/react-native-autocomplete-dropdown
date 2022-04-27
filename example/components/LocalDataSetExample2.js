import React, { memo, useState } from 'react'
import { Text, View } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

export const LocalDataSetExample2 = memo(() => {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <View>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        onSelectItem={setSelectedItem}
        dataSet={[
          { id: '1', title: '🐑' },
          { id: '2', title: '✨' },
          { id: '3', title: '👌' },
        ]}
        suggestionsListMaxHeight={500}
        renderItem={(item, text) => (
          <Text style={{ color: '#f00', padding: 28, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
            -= {item.title} =-
          </Text>
        )}
      />
      <Text style={{ color: '#668', fontSize: 13 }}>Selected item: {JSON.stringify(selectedItem)}</Text>
    </View>
  )
})
