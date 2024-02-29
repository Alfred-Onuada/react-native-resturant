import { Stack } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Pressable } from 'react-native';

export default function Incoming() {
  const [activeTab, setActiveTab] = useState("orders");

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
        <View>
          <View style={styles.reservationContainer}>
            <Text style={styles.customerName}>James Onoja</Text>
            <Text style={{ ...styles.amountPaid, marginVertical: 5 }}>$500</Text>
            <Text style={styles.orderDetailsTitle}>Order Details</Text>
            <View style={styles.rowDown}>
              <Text style={styles.orderName}>French Fries</Text>
              <Text style={styles.quantity}>x18</Text>
            </View>
            <View style={styles.rowDown}>
              <Text style={styles.orderName}>Pizza</Text>
              <Text style={styles.quantity}>x5</Text>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.approveBtn}>
                <Text style={styles.approveText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rejectBtn}>
                <Text style={styles.approveText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }

      {/* Seats */}
      {
        activeTab === 'reservation' &&
        <View>
          <View style={styles.reservationContainer}>
            <Text style={styles.tableName}>Table 1</Text>
            <Text style={styles.customerInfo}>1:30pm, James Onoja</Text>
            <Text style={styles.amountPaid}>$500</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.approveBtn}>
                <Text style={styles.approveText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rejectBtn}>
                <Text style={styles.approveText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
