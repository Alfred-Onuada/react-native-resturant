import { Stack } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import History from "../components/history";
import BottomNav from "../components/bottom-nav";

export default function PurchaseHistory() {
  const [purchases, setPurchases] = useState([
    { id: 1, customerName: 'John Doe', amount: 500, type: 'table', date: new Date('2024-02-29'), approvedBy: 'Alice' },
    { id: 2, customerName: 'Alice Johnson', amount: 20, type: 'food', date: new Date('2024-02-28'), approvedBy: 'Bob' },
    { id: 3, customerName: 'Jane Smith', amount: 200, type: 'table', date: new Date('2024-02-27'), approvedBy: 'Emma' },
    { id: 4, customerName: 'Bob Brown', amount: 30, type: 'food', date: new Date('2024-02-26'), approvedBy: 'David' },
    { id: 5, customerName: 'James Onoja', amount: 400, type: 'table', date: new Date('2024-02-25'), approvedBy: 'Sophia' },
    { id: 6, customerName: 'Emma Wilson', amount: 25, type: 'food', date: new Date('2024-02-24'), approvedBy: 'Olivia' },
    { id: 7, customerName: 'David Lee', amount: 600, type: 'table', date: new Date('2024-02-23'), approvedBy: 'Michael' },
    { id: 8, customerName: 'Olivia Martinez', amount: 35, type: 'food', date: new Date('2024-02-22'), approvedBy: 'Jane' },
    { id: 9, customerName: 'Michael Davis', amount: 450, type: 'table', date: new Date('2024-02-21'), approvedBy: 'John' },
    { id: 10, customerName: 'Sophia Garcia', amount: 40, type: 'food', date: new Date('2024-02-20'), approvedBy: 'James' },
  ]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Purchase History',
          headerStyle: { backgroundColor: '#cbc0aa' },
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 18
          },
          headerBackTitleVisible: false
        }}
      />

      <FlatList
        style={{marginTop: 20, marginBottom: 50}}
        data={purchases}
        renderItem={({item}) => <History data={item} />}
        keyExtractor={(item) => item.id.toString()}
        />

      <BottomNav />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomNav: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 15
  },
})