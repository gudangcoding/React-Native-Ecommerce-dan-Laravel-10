import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import config from '../../config.json'

const Tab = createBottomTabNavigator()

import HomePage from './HomePage'
import SearchPage from './SearchPage'
import CartPage from './CartPage'
import UserPage from './UserPage'

const TabPage = () => {
  return (
    <SafeAreaProvider>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({  color, size }) => {
            let iconName

            if (route.name === 'Home') iconName = 'home'
            else if (route.name === 'Search') iconName = 'search'
            else if (route.name === 'Cart') iconName = 'shopping-cart'
            else if (route.name === 'User Profile') iconName = 'user-circle'

            return <FontAwesome name={iconName} size={size} color={color} />
          },
          // headerStyle: { backgroundColor: config.THEME_COLORS.PRIMARY },
          headerTintColor: '#fff',
          // tabBarActiveTintColor: config.THEME_COLORS.PRIMARY,
          // tabBarInactiveTintColor: config.THEME_COLORS.SECONDARY,
          headerShown: false
        })}
      >
          <Tab.Screen name="Home" component={HomePage}/>
          <Tab.Screen name="Search" component={SearchPage} />
          <Tab.Screen name="Cart" component={CartPage} options={{headerShown: true}}/>
          <Tab.Screen name="User Profile" component={UserPage} options={{headerShown: true}}/>
      </Tab.Navigator>
    </SafeAreaProvider>
  )
}

export default TabPage