
import React, { useState } from 'react'
import {
  View, ScrollView,
  KeyboardAvoidingView, Image,
  TextInput, TouchableOpacity, Text,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import config from '../../config.json'
import styles from './style'

const Login = ({ navigation }) => {
  //1. Membuat state data dan error
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState({
    email: '',
    password: ''
  })

  //2. ketika submit form
  const handleSubmit = () => {
    fetch(config.SERVER_URL + 'user/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)

        //3. ketika ada pesan error
        setError({
          email: data.email ? data.email.message : null,
          password: data.password ? data.password.message : null,
        })

        //4. Jika login berhasil
        if (data.isLoggedIn) {
          AsyncStorage.setItem('token', data.token).then(
            navigation.navigate('TabPage')
          )
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <KeyboardAvoidingView
          behavior="padding"
          styles={styles.content} >

          <Image
            source={require('../../assets/logo.png')}
            style={styles.image}
          />

          <TextInput
            placeholder="Enter email"
            onChangeText={(val) => setData((data) => ({ ...data, email: val }))}
            style={styles.input}
          />
          <Text style={styles.error}>{error.email}</Text>

          <TextInput
            placeholder="Enter password"
            onChangeText={(val) => setData((data) => ({ ...data, password: val }))}
            style={styles.input}
            secureTextEntry
          />
          <Text style={styles.error}>{error.password}</Text>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.textButton}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.textLink}>SIGN UP</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  )
}

export default Login