import React, { memo, useState, useRef, useMemo } from 'react'
import { Text } from 'react-native'
import type { IAutocompleteDropdownRef, AutocompleteDropdownItem } from 'react-native-autocomplete-dropdown'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { Smile } from 'react-native-feather'
import { generateDataSet } from '../helpers'

export const CustomRightIconExample = memo(() => {
  const [selectedItem, setSelectedItem] = useState<AutocompleteDropdownItem | null>(null)
  const dropdownController = useRef<IAutocompleteDropdownRef | null>(null)

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
