import React, { memo, useCallback, useState } from "react"
import { Text } from "react-native"
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown"

export const RemoteDataSetExample = memo(() => {
  const [loading, setLoading] = useState(false)
  const [remoteDataSet, setRemoteDataSet] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const getSuggestions = useCallback(async (q) => {
    console.log("getSuggestions", q)
    if (typeof q !== "string" || q.length < 3) {
      setRemoteDataSet(null)
      return
    }
    setLoading(true)
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const items = await response.json()
    const suggestions = items.map((item) => ({
      id: item.id,
      title: item.title
    }))
    setRemoteDataSet(suggestions)
    setLoading(false)
  }, [])

  return (
    <>
      <AutocompleteDropdown
        dataSet={remoteDataSet}
        // closeOnBlur={true}
        clearOnFocus={false}
        textInputProps={{
          placeholder: "Start typing..."
        }}
        onSelectItem={setSelectedItem}
        loading={loading}
        onChangeText={getSuggestions}
      />
      <Text style={{ color: "#668", fontSize: 13 }}>
        Selected item: {JSON.stringify(selectedItem)}
      </Text>
    </>
  )
})
