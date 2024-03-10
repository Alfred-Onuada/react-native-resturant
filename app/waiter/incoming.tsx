import { Stack, router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, FlatList } from 'react-native';
import OrderItem from '../components/incoming-order';
import ReservationItem from '../components/incoming-reservation';
import { logoutAPI } from '../services/users';
import { approveTable, getIncomingFood, getIncomingTables, rejectTable } from '../services/waiter';
import { approveFood, rejectFood } from '../services/waiter';
import showToast from '../utils/showToast';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function Incoming() {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const navigation = useNavigation();

  async function logout() {
    await logoutAPI();

    router.navigate('/');
  }

  async function loadOrders() {
    const orders = await getIncomingFood();

    setOrders(orders);
  }

  async function loadReservations() {
    const tables = await getIncomingTables();

    setReservations(tables);
  }

  const handleApprove = async (orderId: string) => {
    await approveFood(orderId);

    loadOrders();
  };
  
  const handleReject = async (orderId: string) => {
    await rejectFood(orderId);

    loadOrders();
  };

  const handleApproveTable = async (tableId: string) => {
    await approveTable(tableId);

    loadReservations();
  };
  
  const handleRejectTable = async (tableName: string, purchaseId: string) => {
    const table = reservations.find(r => r.tableName === tableName);

    if (!table) {
      showToast({msg: 'Table not found', danger: true});
      return;
    }

    await rejectTable(tableName, purchaseId, table);

    loadReservations();
  };

  useEffect(() => {
    loadOrders();
    loadReservations();
  }, [])

  navigation.addListener("focus", () => {
    loadOrders();
    loadReservations();
  });

  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Incoming',
            headerStyle: { backgroundColor: '#8d8066' },
            headerTitleStyle: {
              fontWeight: '400',
              fontSize: 18
            },
            headerBackTitleVisible: false,
            headerBackVisible: false,
            headerRight: (props) => {
              return (
                <Pressable onPress={() => logout()}>
                  <Text style={{color: '#ffffff'}}>Log Out</Text>
                </Pressable>
              );
            }
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
            renderItem={({item}) => <OrderItem item={item} handleApprove={handleApprove} handleReject={handleReject} />}
            keyExtractor={(item) => item._id.toString()}/>
        }

        {/* Seats */}
        {
          activeTab === 'reservation' &&
          <FlatList
            data={reservations}
            renderItem={({item}) => <ReservationItem item={item} handleApproveTable={handleApproveTable} handleRejectTable={handleRejectTable} />}
            keyExtractor={(item) => item._id.toString()}/>
        }
      </View>
    </RootSiblingParent>
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
