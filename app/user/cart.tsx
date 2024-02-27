import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import CartItem from '../components/cart-item';

export default function Cart() {
  const [itemsInCart, setItemsInCart] = useState([
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
    }
  ]);
  const [subTotal, setSubTotal] = useState(0);
  const [fees, setFees] = useState(0);
  const [total, setTotal] = useState(0);

  function calculateNewCost() {
    setItemsInCart(prevItems => {
      const newSubTotal = prevItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
      setSubTotal(newSubTotal);
      
      const newFees = newSubTotal * 0.1;
      setFees(newFees);
  
      const newTotal = newSubTotal + newFees;
      setTotal(newTotal);
  
      return prevItems;
    });
  }  

  function increaseQuantity(id: number) {
    setItemsInCart(prev => prev.map(val => {
      if (val.id === id) {
        return {
          ...val,
          quantity: val.quantity + 1,
        };
      }

      return val;
    }))

    calculateNewCost();
  }

  function decreaseQuantity(id: number) {
    setItemsInCart(prev => prev.map(val => {
      if (val.id === id) {
        return {
          ...val,
          quantity: val.quantity - 1,
        };
      }

      return val;
    }))

    const item = itemsInCart.filter(item => item.id === id);

    if (item[0].quantity <= 0) {
      setItemsInCart(prev => prev.filter(item => item.id !== id));
    }

    calculateNewCost();
  }

  return (
    <View style={styles.container}>
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
