import React, { memo, useMemo } from 'react'
import type { ListRenderItem } from 'react-native'
import { StyleSheet, FlatList, View, useColorScheme } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { fadeInDownShort, fadeInUpShort } from './helpers'
import { theme as defaultTheme } from './theme'
import type { AutocompleteDropdownItem, IAutocompleteDropdownProps } from './types'
interface DropdownProps extends Omit<IAutocompleteDropdownProps, 'renderItem' | 'ref'> {
  ListEmptyComponent: React.ReactElement
  renderItem: ListRenderItem<AutocompleteDropdownItem>
}

export const Dropdown = memo((props: DropdownProps) => {
  const {
    dataSet,
    suggestionsListMaxHeight,
    renderItem,
    ListEmptyComponent,
    ItemSeparatorComponent,
    direction,
    theme,
    ...rest
  } = props
  const systemTheme = useColorScheme()
  const themeName = theme || systemTheme
  const styles = useMemo(() => getStyles(themeName || 'light'), [themeName])

  const defaultItemSeparator = useMemo(() => {
    return () => <View style={styles.itemSeparator} />
  }, [styles.itemSeparator])

  return (
    <Animatable.View
      useNativeDriver
      animation={direction === 'up' ? fadeInUpShort : fadeInDownShort}
      easing="ease-out-quad"
      delay={direction === 'up' ? 150 : 0}
      duration={150}
      style={{
        ...styles.listContainer,
        ...(rest.suggestionsListContainerStyle as object),
      }}>
      <FlatList
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        data={dataSet}
        style={{ maxHeight: suggestionsListMaxHeight }}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={ItemSeparatorComponent ?? defaultItemSeparator}
        {...rest.flatListProps}
      />
    </Animatable.View>
  )
})

const getStyles = (themeName: 'light' | 'dark' = 'light') =>
  StyleSheet.create({
    container: {},
    listContainer: {
      backgroundColor: defaultTheme[themeName].suggestionsListBackgroundColor,
      width: '100%',
      zIndex: 9,
      borderRadius: 5,
      shadowColor: defaultTheme[themeName || 'light'].shadowColor,
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.3,
      shadowRadius: 15.46,

      elevation: 20,
    },
    itemSeparator: {
      height: 1,
      width: '100%',
      backgroundColor: defaultTheme[themeName || 'light'].itemSeparatorColor,
    },
  })
