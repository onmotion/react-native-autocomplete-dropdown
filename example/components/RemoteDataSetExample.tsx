import React, { memo, useCallback, useState } from 'react'
import { Text } from 'react-native'
import type { AutocompleteDropdownItem, IAutocompleteDropdownProps } from 'react-native-autocomplete-dropdown'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

export const RemoteDataSetExample = memo((props: Omit<IAutocompleteDropdownProps, 'ref' | 'dataSet'>) => {
  const [loading, setLoading] = useState(false)
  const [remoteDataSet, setRemoteDataSet] = useState<AutocompleteDropdownItem[] | null>(null)
  const [selectedItem, setSelectedItem] = useState<AutocompleteDropdownItem | null>(null)

  const getSuggestions = useCallback(async (q: string) => {
    const filterToken = q.toLowerCase()
    console.log('getSuggestions', filterToken)
    if (typeof q !== 'string' || q.length < 3) {
      setRemoteDataSet(null)
      return
    }
    setLoading(true)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      .then(
        data =>
          new Promise(res => {
            setTimeout(() => res(data.json()), 2000) // imitate of a long response
          }),
      )
      .catch(error => {
        console.error('Error fetching data:', error)
        throw error
      })
      .finally(() => {
        setLoading(false)
      })
    const items = (await response) as Record<string, string>[]

    const suggestions = items
      .filter(item => item.title?.toLowerCase().includes(filterToken))
      .map(item => ({
        id: item.id || '0',
        title: item.title || '',
      }))

    setRemoteDataSet(suggestions)
    setLoading(false)
  }, [])

  return (
    <>
      <AutocompleteDropdown
        dataSet={remoteDataSet}
        closeOnBlur={false}
        useFilter={false}
        clearOnFocus={false}
        textInputProps={{
          placeholder: 'Start typing "lorem"...',
        }}
        onSelectItem={setSelectedItem}
        loading={loading}
        onChangeText={getSuggestions}
        suggestionsListTextStyle={{
          color: '#8f3c96',
        }}
        EmptyResultComponent={<Text style={{ padding: 10, fontSize: 15 }}>Oops ¯\_(ツ)_/¯</Text>}
        {...props}
      />
      <Text style={{ color: '#668', fontSize: 13 }}>Selected item: {JSON.stringify(selectedItem)}</Text>
    </>
  )
})
