import React, {useState, useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider, createTheme } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'

import TabPage from './components/pages/TabPage'
import LoginPage from './components/auth/LoginPage'
import DetailPage from './components/Pages/DetailPage'
import RegisterPage from './components/Auth/RegisterPage'
import config from './config.json'
const token = AsyncStorage.getItem('token');

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
 

  return (
  <SafeAreaProvider>
    <ThemeProvider >
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        //5. Mengatur style header sesuai tema
        headerStyle: { backgroundColor: config.THEME_COLORS.PRIMARY },
        headerTintColor: '#fff' 
      }}>
        {!token && ( 
          //6. Jika token tidak tersedia */}
          <Stack.Screen name="Login" component={LoginPage} 
            options={{headerShown: false}}
          />
         )}
        <Stack.Screen name="TabPage" component={TabPage}
          options={{headerShown: false}}
        />
        <Stack.Screen name="DetailPage" component={DetailPage}
          options={{title: "Product Detail"}}
        />
        <Stack.Screen name="Register" component={RegisterPage} 
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
  </SafeAreaProvider>
  )
}

export default AppNavigation