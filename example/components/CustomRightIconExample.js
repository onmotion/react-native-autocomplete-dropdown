import React, { memo, useState } from 'react'
import { useMemo } from 'react'
import { Text, View } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import Feather from 'react-native-vector-icons/Feather'
import { generateDataSet } from '../helpers'
Feather.loadFont()

export const CustomRightIconExample = memo(() => {
  const [selectedItem, setSelectedItem] = useState(null)

  const dataSet = useMemo(generateDataSet, [])

  return (
    <View>
      <AutocompleteDropdown
        clearOnFocus={false}
        onSelectItem={setSelectedItem}
        dataSet={dataSet}
        direction="down"
        suggestionsListMaxHeight={200}
        renderItem={(item, text) => (
          <Text style={{ color: '#f00', padding: 28, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
            -= {item.title} =-
          </Text>
        )}
        RightIconComponent={<Feather name="smile" size={18} color="#f55" />}
        showChevron={false}
      />
      <Text style={{ color: '#668', fontSize: 13 }}>Selected item: {JSON.stringify(selectedItem)}</Text>
    </View>
  )
})
