import React, {useState, useEffect} from 'react'
import { View, StatusBar } from 'react-native'
import { Button, Icon} from '@rneui/themed'
import { ListItem } from '@rneui/themed'
import SafeAreaView from 'react-native-safe-area-view'
import AsyncStorage from '@react-native-async-storage/async-storage'

import config from '../../config.json'

const UserPage = ({navigation}) => {
  const [user, setUser] = useState(null)
  const [userToken, setUserToken] = useState(null)

  useEffect(() => { getToken() },[])

  const getToken = async () => {
    let token = await AsyncStorage.getItem('token')
    if(token) setUserToken(token)
  }

  useEffect(() => {
    if(userToken){
      fetch(config.SERVER_URL+'/api/auth/isAuth', {
        method: 'GET',
        headers: {
          'token' :  userToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        setUser(data)
      })
    }
  },[userToken])

  const signOut = async () => {
    await AsyncStorage.removeItem('token')
    navigation.popToTop()
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar
        backgroundColor={config.THEME_COLORS.PRIMARY}
      /> 
      
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Username:</ListItem.Title>
          <ListItem.Subtitle>{(user) ? user.username : ''}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Email:</ListItem.Title>
          <ListItem.Subtitle>{(user) ? user.email : ''}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      
      <Button style={{paddingTop: 30, margin: 20}} onPress={signOut}>
            <Icon name="sign-out" type='font-awesome' color="white"/> Logout
        </Button>
    </SafeAreaView>
  )
}

export default UserPage