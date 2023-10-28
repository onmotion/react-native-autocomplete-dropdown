import React, { memo, useMemo, useState } from 'react'
import { Text, View } from 'react-native'
import { AutocompleteDropdown, TAutocompleteDropdownItem } from 'react-native-autocomplete-dropdown'
import { generateDataSet } from '../helpers'

export const LocalDataSetExample = memo(() => {
  const [selectedItem, setSelectedItem] = useState<TAutocompleteDropdownItem | null>(null)

  const dataSet = useMemo(generateDataSet, [])

  return (
    <>
      <AutocompleteDropdown
        clearOnFocus={false}
        closeOnBlur={true}
        initialValue={{ id: '2' }} // or just '2'
        onSelectItem={item => setSelectedItem(item)}
        dataSet={[
          { id: '1', title: 'Alpha' },
          { id: '2', title: 'Beta' },
          { id: '3', title: 'Gamma' }
        ]}
        ItemSeparatorComponent={<View style={{ height: 1, width: '100%', backgroundColor: '#d8e1e6' }} />}
      />
      <Text style={{ color: '#668', fontSize: 13 }}>Selected item: {JSON.stringify(selectedItem)}</Text>
    </>
  )
})
