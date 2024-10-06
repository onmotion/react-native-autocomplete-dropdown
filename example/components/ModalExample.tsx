import React, { memo, useState } from 'react'
import { Button, Modal, SafeAreaView, View } from 'react-native'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
import { RemoteDataSetExample } from './RemoteDataSetExample'

export const ModalExample = memo(() => {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <Button onPress={() => setOpened(prev => !prev)} title="Open modal" />
      <Modal visible={opened}>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
          <AutocompleteDropdownContextProvider>
            <View style={{ paddingHorizontal: 20, flex: 1, paddingTop: 20 }}>
              <RemoteDataSetExample />
              <Button onPress={() => setOpened(false)} title="Close modal" />
            </View>
          </AutocompleteDropdownContextProvider>
        </SafeAreaView>
      </Modal>
    </>
  )
})
