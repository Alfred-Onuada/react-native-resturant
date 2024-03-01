import { Stack } from "expo-router";
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from "react-native";
import BottomNav from "../components/bottom-nav";
import { useState } from "react";
import WaiterItem from "../components/waiter-item";

export default function Waiters() {
  const [waiters, setWaiters] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Emma Johnson', email: 'emma@example.com', phone: '234-567-8901' },
    { id: 3, name: 'Michael Williams', email: 'michael@example.com', phone: '345-678-9012' },
    { id: 4, name: 'Olivia Brown', email: 'olivia@example.com', phone: '456-789-0123' },
    { id: 5, name: 'William Jones', email: 'william@example.com', phone: '567-890-1234' },
    { id: 6, name: 'Sophia Miller', email: 'sophia@example.com', phone: '678-901-2345' },
    { id: 7, name: 'James Davis', email: 'james@example.com', phone: '789-012-3456' },
    { id: 8, name: 'Isabella Wilson', email: 'isabella@example.com', phone: '890-123-4567' },
    { id: 9, name: 'Daniel Taylor', email: 'daniel@example.com', phone: '901-234-5678' },
    { id: 10, name: 'Ava Garcia', email: 'ava@example.com', phone: '012-345-6789' }
  ]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Waiters',
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
        data={waiters}
        renderItem={({item}) => <WaiterItem data={item} />} 
        keyExtractor={(item) => item.id.toString()}
        />

      <View style={{paddingHorizontal: 20}}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Waiter</Text>
        </TouchableOpacity>
      </View>

      <BottomNav />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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