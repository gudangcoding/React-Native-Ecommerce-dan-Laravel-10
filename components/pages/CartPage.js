import React, {useState, useEffect} from 'react'
import { View, ScrollView, StatusBar, Text, TouchableOpacity} from 'react-native'
import { ListItem, Icon, Avatar, Button} from '@rneui/themed'
import { useFocusEffect } from '@react-navigation/native'
import SafeAreaView from 'react-native-safe-area-view'
import AsyncStorage from '@react-native-async-storage/async-storage'

import config from '../../config.json'

const CartPage = ({navigation}) => {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [userToken, setUserToken] = useState(null)

  useEffect(() => { getToken() },[])
  const getToken = async () => {
    let token = await AsyncStorage.getItem('token')
    if(token) setUserToken(token)
  }

  //1. Mengambil data keranjang dari storage
  useFocusEffect(
    React.useCallback(() => { getCart() }, [])
  )
  const getCart = async () => {
    let cartData = await AsyncStorage.getItem('cart')
    try{
      cartData = JSON.parse(cartData)
      if(cartData) setCart(cartData)
    }catch(e){ console.log(e) }
  }

  //2. Menghitung total harga dan menyimpan ke storage setiap state cart berubah
  useEffect(() => { 
    countTotal() 
    AsyncStorage.setItem('cart', JSON.stringify(cart))
  },[cart])

  const countTotal = () => {   
    let totalPrice = 0;
    for(let c of cart){
      totalPrice += (c.qty*c.price)
    }
    setTotal(totalPrice)
  }

  //3. Ketika tombol tambah jumlah diklik
  const incQty = (id) => {
    setCart(prevState => {
      const newState = prevState.map(obj => {
        if (obj.productId === id)  return {...obj, qty: obj.qty+1};
        return obj;
      });

      return newState;
    });
  }

  //4. Ketika tombol kurang jumlah diklik
  const decQty = (id) => {
    setCart(prevState => {
      const newState = prevState.map(obj => {
        if (obj.productId === id && obj.qty>1)  return  {...obj, qty: obj.qty-1};
        return obj;
      });

      return newState;
    });
  }
  
  //5. Ketika tombol hapus diklik
  const removeItem = (id) => {
    const newState = cart.filter((item) => item.productId !== id);
    setCart(newState);
  }

  //6. Mengirim data keranjang ke server untuk disimpan ke database
  const checkOut = () => {
    let cartData = {
      total: total,
      products: cart
    }
    fetch(config.SERVER_URL+'order/store', {
      method: 'POST',
      headers: {
        'token' :  '7|wH9M9QlZ8ZvkGWex7ko8bZNTU9W9fqkR2CHl1jhZ38b658b0',
        // 'token' :  userToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartData)
    })
    .then(response => response.json())
    .then(data => {
      if(data.success){
        setCart([])
        AsyncStorage.removeItem('cart')
        navigation.navigate('Home')
      }
    })
    .catch(error => {
        console.log(error)
    })
  }

  const rupiah = (number) => {
    let formated = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')
    return "Rp " + formated.substring(0, formated.length-3)
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar
        backgroundColor={config.THEME_COLORS.PRIMARY}
      />

      {/*7. Menampilkan item produk pada keranjang */}
      <ScrollView>
      {cart.map((c, i) => (
        <ListItem bottomDivider key={i}>
          <Avatar size='large'
            source={{uri: config.SERVER_URL+'/images/'+c.photo}} />
          <ListItem.Content>
            <ListItem.Title style={{fontWeight:'bold'}}>{c.name}</ListItem.Title>
            <ListItem.Subtitle>{c.qty} x {rupiah(c.price)} = {rupiah(c.qty*c.price)}</ListItem.Subtitle>
            
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'flex-end'}}>
              <TouchableOpacity style={{margin: 10}} onPress={()=>decQty(c.productId)}>
                <Icon name="minus-circle" size={18} type="font-awesome"/>
              </TouchableOpacity>
              <TouchableOpacity style={{margin: 10}} onPress={()=>incQty(c.productId)}>
                <Icon name="plus-circle" size={18} type="font-awesome"/>
              </TouchableOpacity>
              <TouchableOpacity style={{margin: 10}} onPress={()=>removeItem(c.productId)}>
                <Icon name="trash" size={18} type="font-awesome"/>
              </TouchableOpacity>
            </View>
          </ListItem.Content>
        </ListItem>
      ))}
      </ScrollView>
      
      {/*8. Menampilkan total harga dan tombol checkout */}
      <View>
        <ListItem bottomDivider>
          <ListItem.Content>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text style={{fontWeight: 'bold'}}>Total</Text>
              </View>
              <View style={{flex: 1, textAlign: 'right'}}>
                <Text style={{fontWeight: 'bold'}}>{rupiah(total)}</Text>
              </View>
            </View>
          </ListItem.Content>
        </ListItem>
        <Button onPress={checkOut} disabled={total===0}>
            <Icon name="cart-arrow-down" type="font-awesome" color="white"/> Check Out
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default CartPage