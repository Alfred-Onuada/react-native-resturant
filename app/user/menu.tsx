import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import MenuItem from '../components/menu-item';
import { Link, router, Stack } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getFoodItems } from '../services/users';
import showToast from '../utils/showToast';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function Menu() {
  const [foods, setFoods]= useState([]);
  const [noItemsInCart, setNoItemsInCart] = useState(0);

  function openCart() {
    router.navigate('/user/cart');
  }

  useEffect(() => {
    (async () => {
      try {
        const foodItems = await getFoodItems();
  
        if (foodItems.length === 0) {
          showToast({msg: 'No Item in the menu right now'});
        }
  
        setFoods(foodItems);
      } catch (error: any) {
        showToast({msg: error.message, danger: true})
      }
    })()
  }, []);

  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Menu Items',
            headerStyle: { backgroundColor: '#cbc0aa' },
            headerTitleStyle: {
              fontWeight: '400',
              fontSize: 18
            },
            headerBackVisible: false
          }}
        />

        <FlatList
          data={foods}
          renderItem={({item}) => <MenuItem data={item} />} />

        <View style={styles.bottom}> 
          <TouchableOpacity style={styles.button} onPress={() => openCart()}>
            <Text style={styles.buttonText}>View Cart ({noItemsInCart})</Text>
          </TouchableOpacity>
          <Link href='/user/seat-reservation' style={styles.seatLink}>
            <View style={styles.seatContainer}>
              <MaterialCommunityIcons name="seat" size={40} color="white" />
            </View>
          </Link>
        </View>
      </View>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  button: {
    width: '80%',
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
  seatLink: {
    marginLeft: '2.5%',
    marginVertical: 0,
    paddingVertical: 0
  },
  seatContainer: {
    backgroundColor: '#cbc0aa',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderRadius: 5,
    width: 70,
    height: 60,
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center'
  }
});
