import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { Stack } from 'expo-router';
import { useState } from 'react';
import Table from '../components/table';

export default function SeatReservation() {
  const [tables, setTables] = useState([
    { id: 1, number: "Table 1", capacity: 4, status: "available", price: 50 },
    { id: 2, number: "Table 2", capacity: 2, status: "occupied", price: 30 },
    { id: 3, number: "Table 3", capacity: 6, status: "available", price: 80 },
  ]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Book A Seat',
          headerStyle: { backgroundColor: '#cbc0aa' },
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 18
          },
          headerBackTitleVisible: false
        }}
      />

      <FlatList
        data={tables}
        renderItem={({item}) => <Table data={item} />} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirm Reservation</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: '#cbc0aa',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600'
  },
});
