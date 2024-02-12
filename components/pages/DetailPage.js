import React, {useState, useEffect} from 'react'
import { View, ScrollView, Image} from 'react-native'
import { Text, Button, Icon} from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'

import config from '../../config.json'

const DetailPage = ({route, navigation}) => {
  const {product} = route.params
  const [cart, setCart] = useState([])
  
  //1. Mengambil data keranjang dari storage
  useEffect(() => { getCart() },[])

  const getCart = async () => {
    let cartData = await AsyncStorage.getItem('cart')
    try{
      cartData = JSON.parse(cartData)
      if(cartData) setCart(cartData)
    }catch(e){ console.log(e) }
  }

  //2. Menambahkan data ke keranjang
  const addToCart = async () => {
    let cartData = cart

    let cartIndex = cartData.findIndex(object => {
      return object.productId === product._id;
    });
    
    if(cartIndex !== -1){
      cartData[cartIndex].qty += 1;
    }else{
      cartData.push({
        productId: product.id,
        photo: product.gambar,
        name: product.nama_barang,
        price: product.harga,
        qty: 1,
      })
    }

    await AsyncStorage.setItem('cart', JSON.stringify(cartData))
    navigation.navigate('Cart')
  }

  const rupiah = (number) => {
    let formated = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')
    return "Rp " + formated.substring(0, formated.length-3)
  }

  return (
    <View style={{flex: 1}}>
    {/*3. Membuat area yang dapat di-scroll */}
      <ScrollView>
        <View style={{padding: 15}}>
          <Image 
            source={
              {uri: product.gambar} 
            }
            style={{width: '100%', aspectRatio: 1}}
          />

          <Text h3 h3Style={{textAlign:'center'}} >{product.nama_barang}</Text>      
          <Text h4 h4Style={{textAlign:'center'}}> {rupiah(product.harga)}</Text> 

          <Text style={{paddingTop: 20}}>Description:</Text>
          <Text>{product.keterangan}</Text>
        </View>
      </ScrollView>
      {/*4. Tombol tambah produk ke keranjang */}
      <View>
        <Button onPress={addToCart}>
            <Icon name="cart-plus" type="font-awesome" color="white"/> Add to Cart
        </Button>
      </View>
    </View>
  )
}

export default DetailPage