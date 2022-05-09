import React, { memo, useState } from 'react'
import { Text, View } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

export const LocalDataSetExample = memo(() => {
  const [selectedItem, setSelectedItem] = useState(null)

  const dataSet = new Array(450)
    .fill({ id: '1', title: 'test' })
    .map((item, i) => ({ ...item, id: i.toString(), title: item.title + i }))

  return (
    <View>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={false}
        initialValue={{ id: '2' }} // or just '2'
        onSelectItem={setSelectedItem}
        dataSet={dataSet}
        ItemSeparatorComponent={<View style={{ height: 1, width: '100%', backgroundColor: '#d8e1e6' }} />}
        getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })}
      />
      <Text style={{ color: '#668', fontSize: 13 }}>Selected item: {JSON.stringify(selectedItem)}</Text>
    </View>
  )
})
