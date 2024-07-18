import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screen/HomeScreen';
import { Entypo, AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import CartScreen from './src/screen/CartScreen';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetailsScreen from './src/screen/ProductDetailsScreen';
import { CartProvider } from './src/contexts/CartContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ShoesScreen from './src/screen/ShoesScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MyHomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Product_Details' component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};

const AppContent = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#E96E6E"
        }}>
        <Tab.Screen
          name="Home_Stack"
          component={MyHomeStack}
          options={{
            tabBarLabelStyle: { color: '#008E97' },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="black" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Shoes"
          component={ShoesScreen}
          options={{
            tabBarLabelStyle: { color: '#008E97' },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons name="shoe-sneaker" size={24} color="black" />
              ) : (
                <MaterialCommunityIcons name="shoe-formal" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabelStyle: { color: '#008E97' },
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ position: "relative" }}>
                  <Feather name="shopping-bag" size={24} color="black" />
                  <View style={{
                    height: 14,
                    width: 14,
                    borderRadius: 7,
                    backgroundColor: "black",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    top: -10,
                    right:-5,
                  }}>
                    <Text style={{ fontSize: 10, color: "white", fontWeight: "300" }}>{/* Your cart count logic here */}</Text>
                  </View>
                </View>
              );
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <CartProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppContent />
      </GestureHandlerRootView>
    </CartProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
