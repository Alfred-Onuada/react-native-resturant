import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import MenuItem from '../components/menu-item';
import { Link, router, Stack, useNavigation } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addItemToCart, getCartItems, getFoodItems } from '../services/users';
import showToast from '../utils/showToast';
import { RootSiblingParent } from 'react-native-root-siblings';
import { IFood } from '../interfaces/food';

export default function Menu() {
  const [foods, setFoods]= useState([]);
  const [noItemsInCart, setNoItemsInCart] = useState(0);
  const navigation = useNavigation();

  function openCart() {
    router.navigate('/user/cart');
  }

  async function updateItemsInCart(item: IFood) {
    const itemsInCartCount = await addItemToCart(item);

    setNoItemsInCart(itemsInCartCount);
  }

  async function loadMenu() {
    try {
      const foodItems = await getFoodItems();

      if (foodItems.length === 0) {
        showToast({ msg: 'No Item in the menu right now' });
      }

      setFoods(foodItems);

      const cartItems = await getCartItems();
      setNoItemsInCart(cartItems.length);
    } catch (error: any) {
      showToast({ msg: error.message, danger: true });
    }
  }

  useEffect(() => {
    loadMenu()
  }, []);

  navigation.addListener("focus", loadMenu);

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
          renderItem={({item}) => <MenuItem data={item} updateItemsInCart={updateItemsInCart} />} />

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
