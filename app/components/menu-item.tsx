import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { IFood } from '../interfaces/food';

export default function MenuItem({data, updateItemsInCart}: {data: IFood, updateItemsInCart: (item: IFood) => void}) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <Image source={{uri: 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg', cache: 'force-cache'}} style={styles.image}></Image>
        <View>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.price}>${data.price}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => updateItemsInCart(data)}>
        <Text style={styles.addToCart}>+</Text>
      </TouchableOpacity>
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
  }
});
