import React, { memo, useState } from 'react'
import { Button, Dimensions, KeyboardAvoidingView, Modal, Platform, SafeAreaView, ScrollView, View } from 'react-native'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
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
        <AutocompleteDropdownContextProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={Platform.select({ ios: 75, default: 0 })}>
              <ScrollView
                nestedScrollEnabled
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="handled"
                contentInsetAdjustmentBehavior="automatic"
                style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 20, flex: 1, paddingTop: 20 }}>
                  <LocalDataSetExample />
                  <View style={{ height: Dimensions.get('screen').height - 300 }} />
                  <LocalDataSetExample />
                  <Button onPress={() => setOpened(false)} title="Close modal" />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </AutocompleteDropdownContextProvider>
      </Modal>
    </>
  )
})
