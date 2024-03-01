import { Stack } from "expo-router";
import { FlatList, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import BottomNav from "../components/bottom-nav";
import { useState } from "react";
import AdminMenuItem from "../components/admin-menu-item";

export default function MenuManagement() {
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
  ]);
  
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Menu Management',
          headerStyle: { backgroundColor: '#cbc0aa' },
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 18
          },
          headerBackTitleVisible: false
        }}
      />

      <FlatList
        style={{marginTop: 20}}
        data={foods}
        renderItem={({item}) => <AdminMenuItem data={item} />} 
        keyExtractor={(item) => item.id.toString()}
        />

      <View style={{paddingHorizontal: 20}}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
      
      <BottomNav />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: '#cbc0aa',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600'
  },
})