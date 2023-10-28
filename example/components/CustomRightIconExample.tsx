import React, { memo, useState } from 'react'
import { useRef } from 'react'
import { useMemo } from 'react'
import { Text } from 'react-native'
import { AutocompleteDropdown, AutocompleteDropdownRef, TAutocompleteDropdownItem } from 'react-native-autocomplete-dropdown'
import { generateDataSet } from '../helpers'
import { Smile } from 'react-native-feather'

export const CustomRightIconExample = memo(() => {
  const [selectedItem, setSelectedItem] = useState<TAutocompleteDropdownItem | null>(null)
  const dropdownController = useRef<AutocompleteDropdownRef>()

  const dataSet = useMemo(generateDataSet, [])

  return (
    <>
      <AutocompleteDropdown
        controller={controller => {
          dropdownController.current = controller
        }}
        clearOnFocus={false}
        onSelectItem={setSelectedItem}
        dataSet={dataSet}
        // direction="down"
        suggestionsListMaxHeight={200}
        renderItem={(item, text) => (
          <Text style={{ color: '#f00', padding: 28, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
            -= {item.title} =-
          </Text>
        )}
        RightIconComponent={<Smile color="#f55" />}
        onRightIconComponentPress={() => {
          dropdownController.current?.toggle()
        }}
        showChevron={false}
      />
      <Text style={{ color: '#668', fontSize: 13 }}>Selected item: {JSON.stringify(selectedItem)}</Text>
    </>
  )
})
