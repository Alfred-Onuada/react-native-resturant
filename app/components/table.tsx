import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function Table({data, reserveTable}: {data: ITable, reserveTable: (id: string) => void}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{data.number}</Text>
        <Text style={styles.capacity}>{data.capacity} seat(s)</Text>
        <Text style={styles.price}>₦{data.price}</Text>
      </View>
      {
        data.status === 'available' ? 
          <TouchableOpacity style={styles.book} onPress={() => reserveTable(data._id)}>
            <Text style={styles.btnText}>Reserve</Text>
          </TouchableOpacity>
        :
          <TouchableOpacity style={styles.booked} disabled>
            <Text style={styles.btnText}>Not Available</Text>
          </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20
  },
  name: {
    fontWeight: '400',
    fontSize: 18
  },
  capacity: {
    fontWeight: '400',
    fontSize: 18,
    marginVertical: 5
  },
  price: {
    fontWeight: '600',
    fontSize: 20
  },
  btnText: {
    fontSize: 18,
    color: 'white'
  },
  book: {
    backgroundColor: '#cbc0aa',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  booked: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'gray'
  }
});
