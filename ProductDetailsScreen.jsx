import { StyleSheet, Text, View, Platform,Image,Linking } from 'react-native';
import React, { useState, useEffect, useContext} from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Header1 from '../component/Header1';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome,FontAwesome6 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CartContext } from '../contexts/CartContext';


const sizes= ['S', 'M','L','XL'];
const ProductDetailsScreen = () => { 
    const navigation = useNavigation();
    const {addToCart} = useContext(CartContext);
    const route = useRoute();
    const item = route.params.item;
    const [selectedSize,setSelectedSize] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(item || null);
    const handleAddToCart = (item) => {
        item.size = selectedSize;
        addToCart(item);
        navigation.navigate("Cart")
    };
    
    const handleTryLinkPress = async () => {
        try {
            console.log('Selected Product:', selectedProduct);
            if (selectedProduct && selectedProduct.tryLink) {
                const supported = await Linking.canOpenURL(selectedProduct.tryLink);
                if (supported) {
                    await Linking.openURL(selectedProduct.tryLink);
                } else {
                    console.log(`Don't know how to open URL: ${selectedProduct.tryLink}`);
                }
            } else {
                console.log('Invalid product or tryLink is missing');
            }
        } catch (error) {
            console.error('An error occurred while opening the URL:', error);
        }
    };
    return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
    <View style={styles.headerContainer}>
    <Header1 />
    </View>
      <Image source={{uri:item.image}} style={styles.coverImage} />
    <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={[styles.title,styles.price]}>Rs.{item.price}</Text>
    </View>
{/*Size Container */}
<Text style={[styles.title,styles.sizeText]}>Size</Text>
    <View style={styles.sizeContainer}>
      {sizes.map((size) => {
        return(
            <TouchableOpacity style={styles.sizeValueContainer} onPress={() => {
                setSelectedSize(size);
            }}>
            <Text style={[styles.sizeValue,selectedSize == size && {color:"#E55B5B"}]}>{size}</Text>
            </TouchableOpacity>
        )
      })} 
    </View>
    <View style={{flexDirection: "row", justifyContent:"center",paddingTop:20}}>
    <TouchableOpacity  onPress={handleTryLinkPress}>
           <FontAwesome name="camera-retro" size={35} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:50}} onPress={()=>{handleAddToCart(item);}}>
           <FontAwesome6 name="cart-plus" size={35} color="black" />
            </TouchableOpacity>
            </View>
    </LinearGradient>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
    container:{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        padding:20,
        flex:1,
    },
    headerContainer:{
        padding:20,

    },
    coverImage:{
        width:"100%",
        height:430,
    },
    contentContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    title:{
        fontSize:20,
        color:"#444444",
        fontWeight:"500",
    },
    price:{
        color:"#4D4C4C",
    },
    sizeText:{
        marginHorizontal:8,
    },
    sizeContainer:{
      flexDirection:"row",
      marginHorizontal:20,  
    },
    sizeValueContainer:{
        height:36,
        width:36,
        borderRadius:18,
        backgroundColor:"#FFFFFF",
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:10,
    },
    sizeValue:{
        fontSize:18,
        fontWeight:"600",
    },
    buttonContainer:{
    backgroundColor:"#E96E6E",
    
    },
 cart:{
    marginTop:20,
 }
});