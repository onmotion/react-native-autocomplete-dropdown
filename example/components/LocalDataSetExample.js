import React, { memo, useMemo, useState } from 'react'
import { Text, View } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { generateDataSet } from '../helpers'

export const LocalDataSetExample = memo(() => {
  const [selectedItem, setSelectedItem] = useState(null)

  const dataSet = useMemo(generateDataSet, [])

  return (
    <View>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={false}
        initialValue={{ id: '2' }} // or just '2'
        onSelectItem={setSelectedItem}
        //  dataSet={dataSet}
        dataSet={[
          { id: '1', title: 'Alpha' },
          { id: '2', title: 'Beta' },
          { id: '3', title: 'Gamma' }
        ]}
        ItemSeparatorComponent={<View style={{ height: 1, width: '100%', backgroundColor: '#d8e1e6' }} />}
        getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })}
      />
      <Text style={{ color: '#668', fontSize: 13 }}>Selected item: {JSON.stringify(selectedItem)}</Text>
    </View>
  )
})
