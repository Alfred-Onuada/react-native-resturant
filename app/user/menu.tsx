import { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import MenuItem from '../components/menu-item';
import { router, Stack } from 'expo-router';

export default function Menu() {
  const [foods, setFoods]= useState([
    {
      id: 1,
      name: "Pizza",
      price: 10.99,
      image: './../../assets/pizza.jpeg',
      quantity: 0
    },
    {
      id: 2,
      name: "Burger",
      price: 8.99,
      image: './../../assets/pizza.jpeg',
      quantity: 0
    },
    {
      id: 3,
      name: "Sushi",
      price: 15.99,
      image: './../../assets/pizza.jpeg',
      quantity: 0
    },
    {
      id: 4,
      name: "Pasta",
      price: 12.99,
      image: './../../assets/pizza.jpeg',
      quantity: 0
    },
    {
      id: 5,
      name: "Salad",
      price: 7.99,
      image: './../../assets/pizza.jpeg',
      quantity: 0
    },
    {
      id: 6,
      name: "Steak",
      price: 19.99,
      image: './../../assets/pizza.jpeg',
      quantity: 0
    },
    {
      id: 7,
      name: "Tacos",
      price: 9.99,
      image: './../../assets/pizza.jpeg',
      quantity: 0
    },
    {
      id: 8,
      name: "Sandwich",
      price: 6.99,
      image: './../../assets/pizza.jpeg',
      quantity: 0
    },
    {
      id: 9,
      name: "Sushi Roll",
      price: 14.99,
      image: './../../assets/pizza.jpeg',
      quantity: 0
    },
    {
      id: 10,
      name: "Soup",
      price: 5.99,
      image: './../../assets/pizza.jpeg',
      quantity: 0
    }
  ]);
  const [noItemsInCart, setNoItemsInCart] = useState(0);

  function openCart() {
    router.navigate('/user/cart');
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Menu Items',
          headerStyle: { backgroundColor: '#cbc0aa' },
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 18
          },
        }}
      />

      <FlatList
        data={foods}
        renderItem={({item}) => <MenuItem data={item} />} />
      <TouchableOpacity style={styles.button} onPress={() => openCart()}>
        <Text style={styles.buttonText}>View Cart ({noItemsInCart})</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  button: {
    width: 'auto',
    height: 60,
    backgroundColor: '#cbc0aa',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600'
  },
});
