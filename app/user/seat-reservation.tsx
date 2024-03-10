import { StyleSheet, View, FlatList, TouchableOpacity, Text, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import Table from '../components/table';
import { checkoutCart, getTables, reserveTableAPI } from '../services/users';
import { RootSiblingParent } from 'react-native-root-siblings';
import showToast from '../utils/showToast';
import BottomSheet from '@gorhom/bottom-sheet';
import { WebViewNavigation } from 'react-native-webview';
import PaymentWebView from '../components/payment-webview';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function SeatReservation() {
  const [tables, setTables] = useState<ITable[]>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState('https://google.com');
  const [tableId, setTableId] = useState('');

  async function handleNavigationChange(event: WebViewNavigation) {
    const url = new URL(event.url);
    const params = new URLSearchParams(url.search);
    const ref = params.get("reference") || '';

    if (ref && tableId.length) {
      bottomSheetRef.current?.close();

      await reserveTableAPI(tableId);

      setTables(prev => prev.map(val => {
        if (val._id === tableId) {
          val.status = 'occupied';
        }

        return val;
      }))

      showToast({msg: 'Table reserved successfully'});
    }
  }

  async function reserveTable(id: string) {
    try {
      const table = tables.filter(table => table._id === id);
      const data = await checkoutCart(table, table[0].price, 0, table[0].price);
      setCheckoutUrl(data)

      bottomSheetRef.current?.snapToPosition('100%');
      setBottomSheetIsOpen(true);
      
      setTableId(id);
    } catch (error: any) {
      bottomSheetRef.current?.snapToPosition('1%');
      setBottomSheetIsOpen(false);

      showToast({msg: error.message, danger: true})
    }
  }

  useEffect(() => {
    (async () => {
      const data: ITable[] = await getTables();

      setTables(data);
    })();
  }, [])

  return (
    <RootSiblingParent>
      <GestureHandlerRootView style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Book A Seat',
            headerStyle: { backgroundColor: '#8d8066' },
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
            data={tables}
            renderItem={({item}) => <Table reserveTable={reserveTable} data={item} />} />
        </View>
      </GestureHandlerRootView>
    </RootSiblingParent>
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
    backgroundColor: '#8d8066',
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
