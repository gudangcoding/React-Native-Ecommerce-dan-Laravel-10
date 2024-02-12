import React, {useState, useEffect} from 'react'
import { Text, View, StatusBar, FlatList, Image, TouchableOpacity} from 'react-native'
import { Card} from '@rneui/themed'
import SafeAreaView from 'react-native-safe-area-view'
import AsyncStorage from '@react-native-async-storage/async-storage'

import config from '../../config.json'

const HomePage = ({navigation}) => {
  const [product, setProduct] = useState([])
  const [userToken, setUserToken] = useState(null)

  //1. ambil token
  useEffect(() => { getToken() },[])

  const getToken = async () => {
    let token = await AsyncStorage.getItem('token')
    if(token) setUserToken(token)
  }

  //2. mengambil data produk
  useEffect(() => {
    fetch(config.SERVER_URL+'barang', {
      headers: {'token' :  userToken}
    })
    .then(response => response.json())
    .then(data => {
      setProduct(data.data.data)
    })
  },[userToken])

  //3. konversi angka ke rupiah
  const rupiah = (number) => {
    let formated = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')
    return "Rp " + formated.substring(0, formated.length-3)
  }

  //4. mengatur desain setiap item produk
  const renderItem = ({ item }) => (
    <View style={{flex:1/2}}>
      <TouchableOpacity onPress={()=>navigation.navigate('DetailPage',{product: item})}>
      <Card>
        <Image 
          source={
            {uri: item.gambar} 
          }
          style={{width: '100%', aspectRatio: 1}}
        />
              
        <Card.Title>{item.nama_barang}</Card.Title>      
        <Text style={{textAlign:'center'}}>{rupiah(item.harga)}</Text>      
      </Card>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar
        backgroundColor={config.THEME_COLORS.PRIMARY}
      />

      {/*5. menampilkan produk dengan FlatList dalam 2 kolom */}
      <FlatList
        data={product}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </SafeAreaView>
  )
}

export default HomePage