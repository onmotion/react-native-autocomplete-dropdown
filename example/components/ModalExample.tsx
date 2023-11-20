import React, { memo, useState } from 'react'
import { Button, Modal, View } from 'react-native'
import { RemoteDataSetExample } from './RemoteDataSetExample'
import { AutocompleteDropdownContextProvider } from '../../src'

export const ModalExample = memo(() => {
  const [opened, setOpened] = useState(false)
  return (
    <>
      <Button onPress={() => setOpened(prev => !prev)} title="Open modal" />
      <Modal visible={opened}>
        <AutocompleteDropdownContextProvider>
          <View style={{ paddingHorizontal: 20, flex: 1 }}>
            <RemoteDataSetExample />
            <Button onPress={() => setOpened(false)} title="Close modal" />
          </View>
        </AutocompleteDropdownContextProvider>
      </Modal>
    </>
  )
})
