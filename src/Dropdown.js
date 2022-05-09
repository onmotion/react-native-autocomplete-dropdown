import React, { memo, useMemo } from 'react'
import { StyleSheet, FlatList, View, Keyboard } from 'react-native'

export const Dropdown = memo(
  ({
    position,
    direction,
    inputHeight,
    dataSet,
    suggestionsListMaxHeight,
    renderItem,
    ListEmptyComponent,
    ...props
  }) => {
    const ItemSeparatorComponent = useMemo(() => {
      return () =>
        props.ItemSeparatorComponent ?? <View style={{ height: 1, width: '100%', backgroundColor: '#ddd' }} />
    }, [props.ItemSeparatorComponent])

    return (
      <View
        style={{
          ...styles.listContainer,
          position,
          ...(position === 'relative'
            ? { marginTop: 5 }
            : {
                [direction === 'down' ? 'top' : 'bottom']: inputHeight + 5
              }),
          ...props.suggestionsListContainerStyle
        }}>
        <FlatList
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          onScrollBeginDrag={Keyboard.dismiss}
          data={dataSet}
          style={{ maxHeight: suggestionsListMaxHeight }}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={ListEmptyComponent}
          ItemSeparatorComponent={ItemSeparatorComponent}
          {...props.flatListProps}
        />
      </View>
    )
  }
)

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
