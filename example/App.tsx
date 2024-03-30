import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'
import { LocalDataSetExample } from './components/LocalDataSetExample'
import { LocalDataSetExample2 } from './components/LocalDataSetExample2'
import { RemoteDataSetExample3 } from './components/RemoteDataSetExample3'
import { RemoteDataSetExample } from './components/RemoteDataSetExample'
import { RemoteDataSetExample2 } from './components/RemoteDataSetExample2'
import { CustomRightIconExample } from './components/CustomRightIconExample'
import { ModalExample } from './components/ModalExample'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <AutocompleteDropdownContextProvider>
      <SafeAreaView style={[styles.safeArea, backgroundStyle]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <KeyboardAvoidingView
          style={styles.scrollContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled>
          <ScrollView
            nestedScrollEnabled
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollContainer}>
            <View style={styles.container}>
              <Text style={styles.title}>Autocomplete dropdown</Text>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Local list</Text>
                <LocalDataSetExample />
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Local list customization</Text>
                <LocalDataSetExample2 />
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Remote list</Text>
                <RemoteDataSetExample />
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Remote list customization</Text>
                <RemoteDataSetExample2 />
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Remote list customization 2</Text>
                <RemoteDataSetExample3 />
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Custom Right Icon Example</Text>
                <CustomRightIconExample />
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Modal Example</Text>
                <ModalExample />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AutocompleteDropdownContextProvider>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 50,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
})

export default App
