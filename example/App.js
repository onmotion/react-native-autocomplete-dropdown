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
  KeyboardAvoidingView
} from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import { LocalDataSetExample } from './components/LocalDataSetExample'
import { LocalDataSetExample2 } from './components/LocalDataSetExample2'
import { RemoteDataSetExample3 } from './components/RemoteDataSetExample3'
import { RemoteDataSetExample } from './components/RemoteDataSetExample'
import { RemoteDataSetExample2 } from './components/RemoteDataSetExample2'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }

  return (
    <SafeAreaView style={(backgroundStyle, { flex: 1 })}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
        <ScrollView
          nestedScrollEnabled
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ paddingBottom: 200 }}
          style={styles.scrollContainer}>
          <View style={[styles.container]}>
            <Text style={styles.title}>Autocomplete dropdown</Text>
            <View style={[styles.section, Platform.select({ ios: { zIndex: 100 } })]}>
              <Text style={styles.sectionTitle}>Local list</Text>
              <LocalDataSetExample />
            </View>
            <View style={[styles.section, Platform.select({ ios: { zIndex: 99 } })]}>
              <Text style={styles.sectionTitle}>Local list customization</Text>
              <LocalDataSetExample2 />
            </View>
            <View style={[styles.section, Platform.select({ ios: { zIndex: 98 } })]}>
              <Text style={styles.sectionTitle}>Remote list</Text>
              <RemoteDataSetExample />
            </View>
            <View style={[styles.section, Platform.select({ ios: { zIndex: 97 } })]}>
              <Text style={styles.sectionTitle}>Remote list customization</Text>
              <RemoteDataSetExample2 />
            </View>
            <View style={[styles.section, Platform.select({ ios: { zIndex: 96 } })]}>
              <Text style={styles.sectionTitle}>Remote list customization 2</Text>
              <RemoteDataSetExample3 />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  container: {
    padding: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 50
  },
  section: {
    marginBottom: 40
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 3
  }
})

export default App
