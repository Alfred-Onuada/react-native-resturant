import { Stack } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import OrderItem from '../components/incoming-order';
import ReservationItem from '../components/incoming-reservation';

export default function Incoming() {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([
    { id: 1, customerName: 'James Onoja', amountPaid: 500, orderDetails: [{ itemName: 'French Fries', quantity: 18 }, { itemName: 'Pizza', quantity: 5 }] },
    { id: 2, customerName: 'John Doe', amountPaid: 300, orderDetails: [{ itemName: 'Burger', quantity: 2 }, { itemName: 'Coke', quantity: 3 }] },
    { id: 3, customerName: 'Jane Smith', amountPaid: 700, orderDetails: [{ itemName: 'Salad', quantity: 1 }, { itemName: 'Steak', quantity: 2 }] },
    { id: 4, customerName: 'Alice Johnson', amountPaid: 450, orderDetails: [{ itemName: 'Pasta', quantity: 3 }, { itemName: 'Garlic Bread', quantity: 2 }] },
    { id: 5, customerName: 'Bob Brown', amountPaid: 550, orderDetails: [{ itemName: 'Sushi', quantity: 8 }, { itemName: 'Tempura', quantity: 4 }] }
  ]);
  const [reservations, setReservations] = useState([
    { id: 1, tableName: 'Table 1', customerInfo: '1:30pm, James Onoja', amountPaid: 500 },
    { id: 2, tableName: 'Table 2', customerInfo: '2:00pm, John Doe', amountPaid: 300 },
    { id: 3, tableName: 'Table 3', customerInfo: '2:30pm, Jane Smith', amountPaid: 700 },
    { id: 4, tableName: 'Table 4', customerInfo: '3:00pm, Alice Johnson', amountPaid: 450 },
    { id: 5, tableName: 'Table 5', customerInfo: '3:30pm, Bob Brown', amountPaid: 550 },
  ]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Incoming',
          headerStyle: { backgroundColor: '#cbc0aa' },
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 18
          },
          headerBackTitleVisible: false
        }}
      />

      <View style={styles.tabs}>
        <Pressable style={styles.tabsEach} onPress={() => setActiveTab('orders')}>
          <Text style={styles.tabText}>Orders</Text>
        </Pressable>
        <Pressable style={styles.tabsEach} onPress={() => setActiveTab('reservation')}>
          <Text style={styles.tabText}>Reservation</Text>
        </Pressable>
      </View>
      <View style={{...styles.activeIndicator, ...(activeTab === 'reservation' ? styles.activeRight : {})}}></View>

      {/* Orders */}
      {
        activeTab === 'orders' &&
        <FlatList
          data={orders}
          renderItem={OrderItem}
          keyExtractor={(item) => item.id.toString()}/>
      }

      {/* Seats */}
      {
        activeTab === 'reservation' &&
        <FlatList
          data={reservations}
          renderItem={ReservationItem}
          keyExtractor={(item) => item.id.toString()}/>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    display: 'flex',
    flexDirection: 'row'
  },
  tabsEach: {
    width: '50%',
    paddingVertical: 15
  },
  tabText: {
    textAlign: 'center',
    fontSize: 18
  },
  activeIndicator: {
    width: '50%',
    height: 3,
    backgroundColor: 'black'
  },
  activeRight: {
    marginLeft: '50%'
  },
  reservationContainer: {
    marginVertical: 15,
    paddingHorizontal: 20
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  approveText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'white'
  },
  rejectText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'white'
  },
  approveBtn: {
    backgroundColor: 'green',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10
  },
  rejectBtn: {
    backgroundColor: 'red',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10
  },
  tableName: {
    fontSize: 18,
    fontWeight: '400'
  },
  customerInfo: {
    fontSize: 18,
    fontWeight: '300',
    marginVertical: 5
  },
  amountPaid: {
    fontSize: 22,
    fontWeight: '500'
  },
  customerName: {
    fontSize: 18,
    fontWeight: '300',
  },
  orderDetailsTitle: {
    fontSize: 18,
    textAlign: 'center'
  },
  rowDown: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  quantity: {
    fontSize: 16
  },
  orderName: {
    fontSize: 16
  }
});
