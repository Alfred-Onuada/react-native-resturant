import { useEffect, useState, useRef, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import CartItem from '../components/cart-item';
import { Stack } from 'expo-router';
import { checkoutCart, getCartItems, handleTransferSuccess, updateCart } from '../services/users';
import { IFood } from '../interfaces/food';
import PaymentWebView from '../components/payment-webview';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import showToast from '../utils/showToast';
import { WebViewNavigation } from 'react-native-webview';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function Cart() {
  const [itemsInCart, setItemsInCart] = useState<IFood[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [fees, setFees] = useState(0);
  const [total, setTotal] = useState(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState('https://google.com');

  async function handleNavigationChange(event: WebViewNavigation) {
    const url = new URL(event.url);
    const params = new URLSearchParams(url.search);
    const ref = params.get("reference") || '';

    if (event.url.startsWith("https://google.com")) {
      await handleTransferSuccess(ref);
      await updateCart([]);
      bottomSheetRef.current?.close();
    }
  }

  async function handleCheckout() {
    try {
      const data = await checkoutCart(itemsInCart, subTotal, fees, total);
      setCheckoutUrl(data)

      bottomSheetRef.current?.snapToPosition('100%');
      setBottomSheetIsOpen(true);
    } catch (error: any) {
      bottomSheetRef.current?.snapToPosition('1%');
      setBottomSheetIsOpen(false);

      showToast({msg: error.message, danger: true})
    }
  };

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
    <GestureHandlerRootView style={styles.container}>
      <RootSiblingParent>
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

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['1%','100%']}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: 'white' }}
          onClose={() => setBottomSheetIsOpen(false)}>
            <PaymentWebView url={checkoutUrl} handleNavigationChange={handleNavigationChange} />
        </BottomSheet>

        <View style={bottomSheetIsOpen ? {zIndex: -1, flex: 1} : {flex: 1}}>
          <FlatList 
            data={itemsInCart}
            renderItem={({item}) => <CartItem data={item} 
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              />}/>
          <View style={{...styles.costRow, marginTop: 25}}>
            <Text style={styles.costTitle}>Subtotal</Text>
            <Text style={styles.cost}>₦{subTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.costRow}>
            <Text style={styles.costTitle}>Fees</Text>
            <Text style={styles.cost}>₦{fees.toFixed(2)}</Text>
          </View>
          <View style={styles.costRow}>
            <Text style={styles.costTitle}>Total</Text>
            <Text style={styles.cost}>₦{total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => handleCheckout()}>
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </RootSiblingParent>
    </GestureHandlerRootView>
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
  contentContainer: {
    flex: 1,
  }
});
