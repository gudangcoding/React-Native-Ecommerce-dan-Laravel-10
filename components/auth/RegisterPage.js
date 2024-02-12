
import React, {useState} from 'react'
import {
  View, ScrollView,
  KeyboardAvoidingView,  Image,
  TextInput, TouchableOpacity, Text,
} from 'react-native'

import config from '../../config.json'
import styles from './style'

const RegisterPage = ({navigation}) => {
    const [data, setData] = useState({
      username:'',
      email:'',
      password:''
    })
    const [error, setError] = useState({
      username:'',
      email:'',
      password:''
    })
  
    //nenangani form submit
    const handleSubmit = () => {
      fetch(config.SERVER_URL+'/api/auth/register', {
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
        setError({
          username: data.username ? data.username.message : null,
          email: data.email ? data.email.message : null,
          password:  data.password ? data.password.message : null,
        })

        if(data.success) navigation.goBack()
      })
      .catch(error => {
          console.log(error)
      })
    }
  
    return (
      <View style={styles.container}>
        <ScrollView  style={styles.scrollview}>
          <KeyboardAvoidingView
            behavior="padding"
            styles={styles.content} >

            <Image 
              source={require('../../assets/logo.png')}
              style={styles.image}
            />

            <TextInput
              placeholder="Enter username"
              onChangeText={(val)=>setData((data)=>({...data, username: val}))}
              style={styles.input}
            />
            <Text style={styles.error}>{error.username}</Text>

            <TextInput
              placeholder="Enter email"
              onChangeText={(val)=>setData((data)=>({...data, email: val}))}
              style={styles.input}
            />
            <Text style={styles.error}>{error.email}</Text>

            <TextInput
              placeholder="Enter password"
              onChangeText={(val)=>setData((data)=>({...data, password: val}))}
              style={styles.input}
              secureTextEntry
            />
            <Text style={styles.error}>{error.password}</Text>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.textButton}>REGISTER</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.linkButton} 
              onPress={()=>navigation.goBack()}
            >
              <Text style={styles.textLink}>LOGIN</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
  }
  
  export default RegisterPage