import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { IFood } from '../interfaces/food';

export default function CartItem({data, increaseQuantity, decreaseQuantity}: {data: IFood, increaseQuantity: (id: number) => void, decreaseQuantity: (id: number) => void }) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <Image source={require('./../../assets/pizza.jpeg')} style={styles.image}></Image>
        <View>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.price}>${data.price}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => decreaseQuantity(data.id)}>
          <Text style={styles.actionBtn}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityCount}>{data.quantity}</Text>
        <TouchableOpacity onPress={() => increaseQuantity(data.id)}>
          <Text style={styles.actionBtn}>+</Text>
        </TouchableOpacity>
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
  addToCart: {
    fontWeight: '600',
    fontSize: 30
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 10,
    marginRight: 15
  },
  quantityCount: {
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: '600'
  },
  actionBtn: {
    fontSize: 24
  },
});
