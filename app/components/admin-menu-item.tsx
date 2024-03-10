import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import { IFood } from '../interfaces/food';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function AdminMenuItem({data, editItem, deleteItem}: {data: IFood, editItem: (id: string) => void, deleteItem: (id: string) => void}) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <Image source={{ uri: data.image }} style={styles.image}></Image>
        <View>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.price}>₦{data.price}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Pressable style={{marginRight: 25}} onPress={() => editItem(data._id)}>
          <FontAwesome name="edit" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => deleteItem(data._id)}>
          <MaterialIcons name="delete" size={24} color="red" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    fontWeight: '600',
    fontSize: 18
  },
  price: {
    fontSize: 16,
    marginTop: 10,
    color: 'gray'
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 10,
    marginRight: 15
  }
});
