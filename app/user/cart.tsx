import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import CartItem from '../components/cart-item';
import { Stack } from 'expo-router';
import { getCartItems, updateCart } from '../services/users';
import { IFood } from '../interfaces/food';

export default function Cart() {
  const [itemsInCart, setItemsInCart] = useState<IFood[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [fees, setFees] = useState(0);
  const [total, setTotal] = useState(0);

  function calculateNewCost(cartItems: IFood[]) {
    const newSubTotal = cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    setSubTotal(newSubTotal);
    
    const newFees = newSubTotal * 0.1;
    setFees(newFees);

    const newTotal = newSubTotal + newFees;
    setTotal(newTotal);
  }  

  async function increaseQuantity(id: string) {
    setItemsInCart(prev => {
      const newData = prev.map(val => {
        if (val._id === id) {
          return {
            ...val,
            quantity: val.quantity + 1,
          };
        }
  
        return val;
      })

      updateCart(newData);
      calculateNewCost(newData);

      return newData;
    });
  }

  function decreaseQuantity(id: string) {
    setItemsInCart(prev => {
      const newData = prev
        .map(val => {
          if (val._id === id) {
            const data = {
              ...val,
              quantity: val.quantity - 1,
            };

            return data;
          }
    
          return val;
        })
        .filter(val => val.quantity > 0);

      updateCart(newData);
      calculateNewCost(newData);

      return newData;
    });
  }

  useEffect(() => {
    (async () => {
      try {
        const cartItems = await getCartItems();
  
        setItemsInCart(cartItems);
        calculateNewCost(cartItems);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [])

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Your Cart',
          headerStyle: { backgroundColor: '#cbc0aa' },
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 18
          },
          headerBackTitleVisible: false
        }}
      />

      <FlatList 
        data={itemsInCart}
        renderItem={({item}) => <CartItem data={item} 
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          />}/>
      <View style={{...styles.costRow, marginTop: 25}}>
        <Text style={styles.costTitle}>Subtotal</Text>
        <Text style={styles.cost}>${subTotal.toFixed(2)}</Text>
      </View>
      <View style={styles.costRow}>
        <Text style={styles.costTitle}>Fees</Text>
        <Text style={styles.cost}>${fees.toFixed(2)}</Text>
      </View>
      <View style={styles.costRow}>
        <Text style={styles.costTitle}>Total</Text>
        <Text style={styles.cost}>${total.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15
  },
  costRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 20
  },
  costTitle: {
    fontSize: 18,
    fontWeight: '400'
  },
  cost: {
    fontSize: 20,
    fontWeight: '600'
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
