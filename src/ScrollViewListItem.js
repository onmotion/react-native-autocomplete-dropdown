import React, { memo, useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export const ScrollViewListItem = memo(({ highlight, title, style, onPress, numberOfLines = 2 }) => {
  const titleParts = useMemo(() => {
    let titleHighlighted = ''
    let titleStart = title
    let titleEnd = ''

    if (typeof title === 'string' && title?.length > 0 && highlight?.length > 0) {
      const substrIndex = title.toLowerCase().indexOf(highlight.toLowerCase())
      if (substrIndex !== -1) {
        titleStart = title.slice(0, substrIndex)
        titleHighlighted = title.slice(substrIndex, substrIndex + highlight?.length)
        titleEnd = title.slice(substrIndex + highlight?.length)
      }
    }

    return { titleHighlighted, titleStart, titleEnd }
  }, [title, highlight])

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text numberOfLines={numberOfLines}>
          <Text numberOfLines={1} style={{ ...styles.text, ...style }}>
            {titleParts.titleStart}
          </Text>
          <Text numberOfLines={1} style={{ ...styles.text, ...style, fontWeight: 'bold' }}>
            {titleParts.titleHighlighted}
          </Text>
          <Text numberOfLines={1} style={{ ...styles.text, ...style }}>
            {titleParts.titleEnd}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',

    width: '100%'
  },
  text: {
    color: '#333',
    fontSize: 16,
    flexGrow: 1,
    flexShrink: 0
  }
})
