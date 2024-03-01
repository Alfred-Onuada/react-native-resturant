import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function BottomNav() {
  return (
    <View style={styles.bottomNav}>
      <Link href='/admin/menu-management'>
        <MaterialIcons name="restaurant-menu" size={24} color="black" />
      </Link>
      <Link href='/admin/waiters'>
        <FontAwesome5 name="users" size={24} color="black" />
      </Link>
      <Link href='/admin/purchase-history'>
        <MaterialIcons name="history" size={24} color="black" />
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 15,
  },
})