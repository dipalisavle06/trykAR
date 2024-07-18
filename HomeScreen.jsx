import { StyleSheet, Text, View, Platform, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Header1 from '../component/Header1';
import { AntDesign } from '@expo/vector-icons';
import Category from '../component/Category';
import ProductCard from '../component/ProductCard';
import data from '../data/data.json';


const categories = ["Trending Now", "All", "Accessories", "Footwear"];
const HomeScreen = () => {
  const [products,setProducts] = useState(data.products);
  const [selectedCategory,setSelectedCategory] = useState(null);
  const handleLiked = (item) => {
    const newProducts = products.map((prod) => {
      if(prod.id === item.id) {
        return{
          ...prod,
          isLiked:true,
        };
      }
      return prod;
    });
    setProducts(newProducts);
  }
  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      <Header1 />
      <Text style={styles.tryText}> trykAR Now.... </Text>
{/*Product List */}
<FlatList
  numColumns={2}
  ListHeaderComponent={() => (
    <FlatList
      data={categories}
      renderItem={({ item }) => (
        <Category 
          item={item}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      keyExtractor={(item) => item.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false} 
    />
  )}
  data={products} 
  renderItem={({ item }) => (
    <ProductCard item={item} handleLiked={handleLiked} />
  )}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{paddingBottom:50}}
  keyExtractor={(item) => item.toString()}
/>
    </LinearGradient>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
      paddingTop: Platform.OS === "android" ? 40 : 0,
        padding:20,
    },
    tryText:{
      fontSize:28,
      color:"#000000",
      marginTop:25,
      padding:20,
    },
    inputContainer:{
      backgroundColor:"#FFFFFF",
      marginLeft:5,
      marginRight:15,
      height:48,
      borderRadius:12,
      alignItems:"center",
      flexDirection:"row",
    },
    iconContainer:{
      marginHorizontal:15,
    },
    textInput: {
      flex:1,
    },
});