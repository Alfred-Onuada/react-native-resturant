import { Stack, useNavigation } from "expo-router";
import { StyleSheet, View, TouchableOpacity, Text, FlatList, Modal, TextInput } from "react-native";
import BottomNav from "../components/bottom-nav";
import { useEffect, useState } from "react";
import WaiterItem from "../components/waiter-item";
import { addWaiterAPI, deleteWaiterAPI, getWaiters } from "../services/admin";
import showToast from "../utils/showToast";

export default function Waiters() {
  const [waiters, setWaiters] = useState<IWaiter[]>([]);
  const [addWaiterModalIsOpen, setAddWaiterModalIsOpen] = useState(false);
  const [waiterModal, setWaiterModal] = useState<IWaiter>({ _id: '', fullname: '', email: '', phone: '', password: ''})
  const navigation = useNavigation();

  useEffect(() => {
    loadWaiters();
  }, []);

  async function loadWaiters() {
    const data = await getWaiters();

    setWaiters(data);
  }

  async function deleteWaiter(id: string) {
    try {
      await deleteWaiterAPI(id);
      loadWaiters();
    } catch (error) {
      showToast({msg: 'Error deleting waiter', danger: true});
    }
  }

  async function addWaiter() {
    try {
      await addWaiterAPI(waiterModal);

      setAddWaiterModalIsOpen(false);
      setWaiterModal({ _id: '', fullname: '', email: '', phone: '', password: ''});
      loadWaiters();
    } catch (error) {
      showToast({msg: 'Error adding waiter', danger: true});
    }
  }

  navigation.addListener('focus', loadWaiters);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Waiters',
          headerStyle: { backgroundColor: '#8d8066' },
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 18
          },
          headerBackTitleVisible: false
        }}
      />
      
      <Modal
          visible={addWaiterModalIsOpen}
          animationType="slide">
            <View style={{flex: 1, marginTop: 70, marginHorizontal: 40}}>
              <Text style={{fontSize: 17, marginBottom: 10}}>Full Name</Text>
              <TextInput
                placeholder="Enter new waiter name"
                value={waiterModal.fullname}
                style={styles.input}
                placeholderTextColor="#A9A9A9"
                autoCapitalize="none"
                autoCorrect={true}
                onChangeText={(text) => {
                  setWaiterModal(prev => ({...prev, fullname: text}))
                }} />

              <Text style={{fontSize: 17, marginBottom: 10}}>Email</Text>
              <TextInput
                placeholder="Enter new email"
                value={waiterModal.email}
                style={styles.input}
                keyboardType="email-address"
                placeholderTextColor="#A9A9A9"
                autoCapitalize="none"
                autoCorrect={true}
                onChangeText={(text) => {
                  setWaiterModal(prev => ({...prev, email: text}))
                }} />

              <Text style={{fontSize: 17, marginBottom: 10}}>Phone</Text>
              <TextInput
                placeholder="Enter new phone"
                value={waiterModal.phone}
                style={styles.input}
                placeholderTextColor="#A9A9A9"
                autoCapitalize="none"
                autoCorrect={true}
                onChangeText={(text) => {
                  setWaiterModal(prev => ({...prev, phone: text}))
                }} />

              <Text style={{fontSize: 17, marginBottom: 10}}>Password</Text>
              <TextInput
                placeholder="Enter new password"
                value={waiterModal.password}
                style={styles.input}
                placeholderTextColor="#A9A9A9"
                autoCapitalize="none"
                autoCorrect={true}
                onChangeText={(text) => {
                  setWaiterModal(prev => ({...prev, password: text}))
                }} />

              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setAddWaiterModalIsOpen(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalSaveBtn} onPress={addWaiter}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>

      <FlatList
        style={{marginTop: 20}}
        data={waiters}
        renderItem={({item}) => <WaiterItem deleteWaiter={deleteWaiter} data={item} />} 
        keyExtractor={(item) => item._id.toString()}
        />

      <View style={{paddingHorizontal: 20}}>
        <TouchableOpacity style={styles.button} onPress={() =>setAddWaiterModalIsOpen(true)}>
          <Text style={styles.buttonText}>Add Waiter</Text>
        </TouchableOpacity>
      </View>

      <BottomNav />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: '#8d8066',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
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
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 18
  }
})