import React, {useState, useEffect} from 'react'
import { Text, View, StatusBar, FlatList, Image, TouchableOpacity} from 'react-native'
import { Card, SearchBar } from '@rneui/themed'
import SafeAreaView from 'react-native-safe-area-view'
import AsyncStorage from '@react-native-async-storage/async-storage'

import config from '../../config.json'

const SearchPage = ({navigation}) => {
  const [product, setProduct] = useState([])
  const [search, setSearch] = useState("")
  const [userToken, setUserToken] = useState(null)
  
  useEffect(() => { getToken() },[])

  const getToken = async () => {
    let token = await AsyncStorage.getItem('token')
    if(token) setUserToken(token)
  }

  //1. Mengambil data produk sesua kata pencarian
  const updateSearch = (search) => {
    setSearch(search)
    if(search!==""){
      fetch(config.SERVER_URL+'barang/cari?q='+search, {
        method: 'GET',
        headers: {
          'token' :  userToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        setProduct(data.data)
      })
    }
  }

  const rupiah = (number) => {
    let formated = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')
    return "Rp " + formated.substring(0, formated.length-3)
  }

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
        <Text style={{textAlign:'center'}}> {rupiah(item.harga)}</Text>      
      </Card>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar
        backgroundColor={config.THEME_COLORS.PRIMARY}
      />
      
      {/*2. Membuat kotak pencarian */}
      <SearchBar lightTheme
        placeholder="Type Here..."        
        onChangeText={updateSearch}
        value={search}
      />
      <FlatList
        data={product}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        numColumns={2}
      />
    </SafeAreaView>
  )
}

export default SearchPage