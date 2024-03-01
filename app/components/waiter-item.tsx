import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function WaiterItem({data}: {data: IWaiter}) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.email}>{data.email}</Text>
          <Text style={styles.phone}>{data.phone}</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#555',
  },
  phone: {
    fontSize: 16,
    color: '#555',
  },
  deleteButton: {
    padding: 5,
  },
});