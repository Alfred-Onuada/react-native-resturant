import { Stack, router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, Text } from "react-native";
import History from "../components/history";
import BottomNav from "../components/bottom-nav";
import { getPurchases } from "../services/admin";
import { logoutAPI } from "../services/users";

export default function PurchaseHistory() {
  const [purchases, setPurchases] = useState<IPurchase[]>([]);
  const navigation = useNavigation();

  async function loadPurchases() {
    const data = await getPurchases();
    
    setPurchases(data);
  }

  async function logout() {
    await logoutAPI();

    router.navigate('/');
  }

  useEffect(() => {
    loadPurchases();
  }, []);

  navigation.addListener('focus', loadPurchases);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Purchase History',
          headerStyle: { backgroundColor: '#8d8066' },
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 18
          },
          headerBackTitleVisible: false,
          headerRight: (props) => {
            return (
              <Pressable onPress={() => logout()}>
                <Text style={{color: '#ffffff'}}>Log Out</Text>
              </Pressable>
            );
          }
        }}
      />

      <FlatList
        style={{marginTop: 20, marginBottom: 50}}
        data={purchases}
        renderItem={({item}) => <History data={item} />}
        keyExtractor={(item) => item._id.toString()}
        />

      <BottomNav />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomNav: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 15
  },
})