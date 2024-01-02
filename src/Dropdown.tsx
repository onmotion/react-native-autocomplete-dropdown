import React, { memo, useMemo } from 'react'
import { StyleSheet, FlatList, View, ListRenderItem } from 'react-native'
import { AutocompleteDropdownProps } from './index.d'

interface DropdownProps extends AutocompleteDropdownProps {
  ListEmptyComponent: JSX.Element
}

export const Dropdown = memo((props: DropdownProps) => {
  const {
    dataSet,
    suggestionsListMaxHeight,
    renderItem,
    ListEmptyComponent,
    ItemSeparatorComponent,
    ...rest
  } = props

  const defaultItemSeparator = useMemo(() => {
    return () => (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#ddd'
        }}
      />
    )
  }, [])

  return (
    <View
      style={{
        ...styles.listContainer,
        ...(rest.suggestionsListContainerStyle as object)
      }}>
      <FlatList
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        data={dataSet}
        style={{ maxHeight: suggestionsListMaxHeight }}
        renderItem={renderItem as unknown as ListRenderItem<any>}
        keyExtractor={item => item.id}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={ItemSeparatorComponent ?? defaultItemSeparator}
        {...rest.flatListProps}
      />
    </View>
  )
})

const styles = StyleSheet.create({
  container: {},
  listContainer: {
    backgroundColor: '#fff',
    width: '100%',
    zIndex: 9,
    borderRadius: 5,
    shadowColor: '#00000099',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.3,
    shadowRadius: 15.46,

    elevation: 20
  }
})
