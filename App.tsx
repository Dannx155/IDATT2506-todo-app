import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListsProvider } from './src/contexts/ListsContext';
import HomeScreen from './src/screens/HomeScreen';
import ErrorBoundary from './src/components/ErrorBoundary';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
      <SafeAreaProvider>
        <ErrorBoundary>
          <ListsProvider>
            <NavigationContainer>
              <StatusBar barStyle="dark-content" backgroundColor="#fff" />
              <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
              </SafeAreaView>
            </NavigationContainer>
          </ListsProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' }
});