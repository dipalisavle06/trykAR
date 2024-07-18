import { StyleSheet, Text, View, Platform,FlatList,TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Header1 from '../component/Header1';
import CartCard from '../component/CartCard';
import { CartContext } from '../contexts/CartContext';


const CartScreen = (item) => {
  const {carts, totalPrice, deleteItemFromCart} = useContext(CartContext);
  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <View style={styles.headerContainer}>
       <Header1 isCart={true} />
       </View>
<FlatList 
data={carts}
renderItem={({ item }) => <CartCard item={item} deleteItemFromCart={deleteItemFromCart}/>}
ListFooterComponent={
  <>
<View style={styles.priceContainer}>
       <View style={styles.priceAndTitle}>
       <Text style={{fontSize:18,color:"black"}}>Total:</Text>
       <Text style={{fontSize:18,color:"black"}}>{totalPrice}</Text>
       </View>
       <View style={styles.priceAndTitle}>
       <Text style={{fontSize:18,color:"black"}}>Shipping:</Text>
       <Text style={{fontSize:18,color:"black"}}>Rs.00</Text>
       </View>
       </View>
       <View style={styles.divider} />
       <View style={styles.priceAndTitle}>
       <Text style={{fontSize:18,color:"black"}}>Grand Total:</Text>
       <Text style={{fontSize:18,color:"black",fontWeight:"700"}}>{totalPrice}</Text>
       </View>
  </>
}
showsVerticalScrollIndicator={false}
contentContainerStyle={{ paddingBottom:100,}}/>



    </LinearGradient>
  )
}

export default CartScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop: Platform.OS === "android" ? 40 : 0,
    padding:20,
  },
  headerContainer:{
    marginVertical:10,
  },
  priceAndTitle:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginHorizontal:20,
    marginVertical:10,
  },
  priceContainer:{
    marginTop:50,
  },
  divider:{
    borderWidth:1,
    borderColor:"#C0C0C0",
    marginVertical:10,
  }
})