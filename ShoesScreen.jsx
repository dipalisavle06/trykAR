// ShoeScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header1 from '../component/Header1';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../contexts/CartContext';
const sizes = ['S', 'M', 'L', 'XL'];

const ShoesScreen = () => {
  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);
  const [shoesData, setShoesData] = useState([]);

  // Mock shoe data (Replace this with your shoes.json import)
  const mockShoesData = [
    {
      id:1,
      title:"BlackSneaker",
      image: "https://www.jiomart.com/images/product/original/450119362_black/textured-lace-up-casual-shoes-model4-450119362_black-4-202305170352.jpg?im=Resize=(600,750)",
      tryLink:"https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=2e3ef1734ada4783ad32449bc0fa2b30&metadata=01",
      price: 2999
    },
    {
      id:2,
      title:"NikeRosheRun",
      image: "https://i.ebayimg.com/images/g/rTIAAOSwqGBj9~zb/s-l500.jpg",
      tryLink:"https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=477477cb85a3420e8c6d30ba9f6f0647&metadata=01",
      price: 3999
    },
    {
      id:3,
      title:"UltraBoots",
      image: "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2023%2F04%2Fadidas-xplrboost-silver-pebble-hp3129-release-date-4.jpg?cbr=1&q=90",
      tryLink:"https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=8ba6a896d34f4c1f80c76d138322e612&metadata=01",
      price: 1999
    },
    {
      id:4,
      title:"Mens_Sneakers",
      image: "https://m.media-amazon.com/images/I/81uiml-a9iL._AC_SY395_.jpg",
      tryLink:"https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=c8516c2b2d28457198d1369466451205&metadata=01",
      price: 4999
    },
    {
      id:5,
      title:"WovenRunning Sneakers",
      image: "https://di2ponv0v5otw.cloudfront.net/posts/2023/01/21/63cc0ad0a0e6c66095429d53/m_wp_63cc0b2e02760b24369fb754.webp",
      tryLink:"https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=c3491e16550a4eab8b91cebab0eaa53f&metadata=01",
      price: 1999
    },
    {
      id:6,
      title:"CasualShoesBlack",
      image: "https://m.media-amazon.com/images/I/51yuBx7kibL._AC_SX425_.jpg",
      tryLink:"https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=86691394e784435889ce27e4c66346e2&metadata=01",
      price: 2999
    },
    {
      id:7,
      title:"CasualShoesRed",
      image: "https://barabasmen.com/cdn/shop/files/3SH39-RED1.jpg?v=1701392864&width=360",
      tryLink:"https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=dcbb0462ed7546dca5a1c26c8b6e3cad&metadata=01",
      price: 2999
    }
    // Add more shoe products as needed
  ];

  useEffect(() => {
    // Set shoe data
    setShoesData(mockShoesData);
  }, []);

  const handleTryLinkPress = async (tryLink) => {
    try {
      const supported = await Linking.canOpenURL(tryLink);
      if (supported) {
        await Linking.openURL(tryLink);
      } else {
        console.log(`Don't know how to open URL: ${tryLink}`);
      }
    } catch (error) {
      console.error('An error occurred while opening the URL:', error);
    }
  };

  const handleAddToCart = (item) => {
    // Add item to cart
    addToCart(item);
    navigation.navigate('Cart'); // Navigate to Cart screen
  };

  return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.container}>
      <View style={styles.headerContainer}>
        <Header1 />
      </View>
      <FlatList
        data={shoesData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.shoeItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.brand}>{item.brand}</Text>
            <Text style={styles.price}>Rs.{item.price}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleTryLinkPress(item.tryLink)}>
                <FontAwesome name="camera-retro" size={35} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginLeft: 50 }}
                onPress={() => {
                  handleAddToCart(item)
                }}
              >
                <FontAwesome6 name="cart-plus" size={35} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    padding: 20,
    flex: 1,
  },
  headerContainer: {
    padding: 20,
  },
  shoeItem: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  brand: {
    fontSize: 16,
    color: '#888',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4D4C4C',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
});

export default ShoesScreen;
