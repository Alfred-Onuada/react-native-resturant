import { StyleSheet, View, FlatList, TouchableOpacity, Text, TextInput, Modal } from 'react-native';
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
import DateTimePicker from '@react-native-community/datetimepicker';

export default function SeatReservation() {
  const [tables, setTables] = useState<ITable[]>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState('https://google.com');
  const [timeModalIsOpen, setTimeModalIsOpen] = useState(false);
  const [tableToReserve, setTableToReserve] = useState<ITable>({
    _id: '',
    number: '',
    price: 0,
    status: 'available',
    capacity: 0,
    time: new Date(),
  });

  async function handleNavigationChange(event: WebViewNavigation) {
    try {
      const url = new URL(event.url);
      const params = new URLSearchParams(url.search);
      const ref = params.get("reference") || '';
  
      if (ref && tableToReserve && event.url.startsWith("https://google.com")) {
        bottomSheetRef.current?.close();
  
        await reserveTableAPI(tableToReserve);
  
        showToast({msg: 'Table reserved successfully'});
      }
    } catch (error: any) {
      showToast({msg: error.message, danger: true});
    }
  }

  async function reserveTable(id: string) {
    const table = tables.find(table => table._id === id);

    if (!table) {
      showToast({msg: 'Table not found', danger: true});
      return;
    }

    setTableToReserve(table);
    setTimeModalIsOpen(true);
  }

  async function confirmReservation() {
    try {
      const data = await checkoutCart([tableToReserve], tableToReserve.price, 0, tableToReserve.price);
      setCheckoutUrl(data)

      setTimeModalIsOpen(false);
      bottomSheetRef.current?.snapToPosition('100%');
      setBottomSheetIsOpen(true);

      loadTables();
    } catch (error: any) {
      bottomSheetRef.current?.snapToPosition('1%');
      setBottomSheetIsOpen(false);

      showToast({msg: error.message, danger: true})
    }
  }

  async function loadTables() {
    const data: ITable[] = await getTables();

    setTables(data);
  }

  useEffect(() => {
   loadTables();
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

        <Modal
          animationType="slide"
          visible={timeModalIsOpen}
          >
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{marginBottom: 20}}>
              <Text style={{fontSize: 20, textAlign: 'center'}}>Select A Day</Text>
            </View>

            <DateTimePicker
              mode='date'
              minimumDate={new Date()}
              maximumDate={new Date((new Date()).getTime() + 7 * 24 * 60 * 60 * 1000)}
              value={tableToReserve.time instanceof Date ? tableToReserve.time : new Date()}
              onChange={(event, date) => {
                if (date) {
                  setTableToReserve(prev => ({...prev, time: date}));
                }
              }}
              style={{alignSelf: 'center', marginBottom: 15}}
            />

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setTimeModalIsOpen(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSaveBtn} onPress={confirmReservation}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
  modalCancelBtn: {
    width: '40%',
    height: 50,
    backgroundColor: 'red',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSaveBtn: {
    width: '40%',
    height: 50,
    backgroundColor: 'green',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
