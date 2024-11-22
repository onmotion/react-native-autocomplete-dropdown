import React, { memo, useState } from 'react'
import { Button, Dimensions, Modal, SafeAreaView, View } from 'react-native'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
import { RemoteDataSetExample } from './RemoteDataSetExample'
import { LocalDataSetExample } from './LocalDataSetExample'

export const ModalExample = memo(() => {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <Button onPress={() => setOpened(prev => !prev)} title="Open modal" />
      <Modal
        visible={opened}
        presentationStyle="formSheet"
        animationType="slide"
        onRequestClose={() => setOpened(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
          <AutocompleteDropdownContextProvider>
            <View style={{ paddingHorizontal: 20, flex: 1, paddingTop: 20 }}>
              <LocalDataSetExample />
              <View style={{ height: Dimensions.get('screen').height - 300 }} />
              <RemoteDataSetExample />
              <Button onPress={() => setOpened(false)} title="Close modal" />
            </View>
          </AutocompleteDropdownContextProvider>
        </SafeAreaView>
      </Modal>
    </>
  )
})
