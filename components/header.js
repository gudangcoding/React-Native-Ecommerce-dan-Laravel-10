import { View, Text ,TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
      <TouchableOpacity onPress={() => navigation.navigate('UserPage')}>
        <Icon name="person" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>My App</Text>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.navigate('CartPage')}>
          <Icon name="shopping-cart" size={24} color="black" style={{ marginRight: 16 }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('UserPage')}>
          <Icon name="notifications" size={24} color="black" />
        </TouchableOpacity>
      </View>
     
    </View>
    
  )
}


export default Header