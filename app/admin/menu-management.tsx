import { Stack, router, useNavigation } from "expo-router";
import { FlatList, StyleSheet, View, TouchableOpacity, Text, Modal, TextInput, Button, Pressable } from "react-native";
import BottomNav from "../components/bottom-nav";
import { useEffect, useState } from "react";
import AdminMenuItem from "../components/admin-menu-item";
import { IFood } from "../interfaces/food";
import { getFoodItems, logoutAPI } from "../services/users";
import showToast from "../utils/showToast";
import { addItemAPI, deleteItemAPI, saveItemEditAPI } from "../services/admin";
import { RootSiblingParent } from 'react-native-root-siblings';
import * as ImagePicker from 'expo-image-picker';

export default function MenuManagement() {
  const [foods, setFoods]= useState<IFood[]>([]);
  const [modalFood, setModalFood] = useState<IFood>({name: '', _id: '', image: '', price: 0, quantity: 0});
  const [newFoodModal, setNewFoodModal] = useState<IFood>({name: '', _id: '', image: '', price: 0, quantity: 0});
  const [foodModalIsOpen, setFoodModalIsOpen] = useState(false);
  const [newFoodModalIsOpen, setNewFoodModalIsOpen] = useState(false);
  const navigation = useNavigation();
  
  async function loadMenu() {
    try {
      const foodItems = await getFoodItems();

      if (foodItems.length === 0) {
        showToast({ msg: 'No Item in the menu right now' });
      }

      setFoods(foodItems);
    } catch (error: any) {
      showToast({ msg: error.message, danger: true });
    }
  }

  async function editItem(id:string) {
    try {
      setFoodModalIsOpen(true);
      const selectedFood = foods.find(food => food._id === id);

      if (!selectedFood) {
        showToast({msg: "No Info for selected food", danger: true})
        return;
      }

      setModalFood(selectedFood);
    } catch (error: any) {
      showToast({msg: error.message, danger: true})
    }
  }

  async function deleteItem(id:string) {
    try {
      await deleteItemAPI(id);
      
      showToast({msg: 'Item Deleted'});

      setFoods(prev => prev.filter(p => p._id !== id));
    } catch (error: any) {
      showToast({msg: error.message, danger: true})
    }
  }

  async function saveItemEdit() {
    try {
      await saveItemEditAPI(modalFood);

      showToast({msg: 'Food Updates'});

      await loadMenu();
      setFoodModalIsOpen(false);
    } catch (error: any) {
      showToast({msg: error.message, danger: true})
    }
  }

  async function addFood() {
    try {
      await addItemAPI(newFoodModal);

      showToast({msg: 'Food Added Successfully'});

      await loadMenu();
      setNewFoodModalIsOpen(false);
    } catch (error: any) {
      showToast({msg: error.message, danger: true})
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled === false) {
      setModalFood(prev => ({...prev, image: (result.assets as any)[0].uri}));
    }    
  };

  const pickNewImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled === false) {
      setNewFoodModal(prev => ({...prev, image: (result.assets as any)[0].uri}));
    }    
  };

  async function logout() {
    await logoutAPI();

    router.navigate('/');
  }

  useEffect(() => {
    loadMenu()
  }, []);

  navigation.addListener('focus', loadMenu);

  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: 'Menu Management',
            headerStyle: { backgroundColor: '#cbc0aa' },
            headerTitleStyle: {
              fontWeight: '400',
              fontSize: 18
            },
            headerBackTitleVisible: false,
            headerRight: (props) => {
              return (
                <Pressable onPress={() => logout()}>
                  <Text>Log Out</Text>
                </Pressable>
              );
            }
          }}
        />

        <Modal
          visible={foodModalIsOpen}
          animationType="slide">
            <View style={{flex: 1, marginTop: 70, marginHorizontal: 40}}>
              <Text style={{fontSize: 17, marginBottom: 10}}>Name</Text>
              <TextInput
                placeholder="Enter new food name"
                value={modalFood.name}
                style={styles.input}
                placeholderTextColor="#A9A9A9"
                autoCapitalize="none"
                autoCorrect={true}
                onChangeText={(text) => {
                  setModalFood(prev => ({...prev, name: text}))
                }} />
              <Text style={{fontSize: 17, marginBottom: 10}}>Price</Text>
              <TextInput
                placeholder="Enter new price"
                value={modalFood.price.toString()}
                style={styles.input}
                placeholderTextColor="#A9A9A9"
                autoCapitalize="none"
                autoCorrect={true}
                onChangeText={(text) => {
                  setModalFood(prev => ({...prev, price: +text}))
                }} />
              <Pressable onPress={pickImage}>
                <Text style={{marginBottom: 10, fontSize: 20, color: 'blue'}}>Select an Image</Text>
              </Pressable>


              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setFoodModalIsOpen(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalSaveBtn} onPress={saveItemEdit}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>

        <Modal
          visible={newFoodModalIsOpen}
          animationType="slide">
            <View style={{flex: 1, marginTop: 70, marginHorizontal: 40}}>
              <Text style={{fontSize: 17, marginBottom: 10}}>Name</Text>
              <TextInput
                placeholder="Enter new food name"
                value={newFoodModal.name}
                style={styles.input}
                placeholderTextColor="#A9A9A9"
                autoCapitalize="none"
                autoCorrect={true}
                onChangeText={(text) => {
                  setNewFoodModal(prev => ({...prev, name: text}))
                }} />
              <Text style={{fontSize: 17, marginBottom: 10}}>Price</Text>
              <TextInput
                placeholder="Enter new price"
                value={newFoodModal.price.toString()}
                style={styles.input}
                placeholderTextColor="#A9A9A9"
                autoCapitalize="none"
                autoCorrect={true}
                onChangeText={(text) => {
                  setNewFoodModal(prev => ({...prev, price: +text}))
                }} />
              <Pressable onPress={pickNewImage}>
                <Text style={{marginBottom: 10, fontSize: 20, color: 'blue'}}>Select an Image</Text>
              </Pressable>


              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setNewFoodModalIsOpen(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalSaveBtn} onPress={addFood}>
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>

        <FlatList
          style={{marginTop: 20}}
          data={foods}
          renderItem={({item}) => <AdminMenuItem data={item} editItem={editItem} deleteItem={deleteItem} />} 
          keyExtractor={(item) => item._id}
          />

        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity style={styles.button} onPress={() => setNewFoodModalIsOpen(true)}>
            <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
        </View>
        
        <BottomNav />
      </View>
    </RootSiblingParent>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: '#cbc0aa',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
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
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600'
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