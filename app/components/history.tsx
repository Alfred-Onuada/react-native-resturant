import { StyleSheet, View, Text } from "react-native";

export default function History({data}: {data: IPurchase}) {
  return (
    <View style={styles.row}>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.name}>{data.customerName}</Text>
        <Text style={styles.spent}>${data.amount}</Text>
      </View>
      <Text style={styles.text}>Spent on: {data.type}</Text>
      <Text style={styles.text}>Approved By: {data.approvedBy}</Text>
      <Text style={styles.text}>Date: {data.date.toLocaleDateString()}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: '400'
  },
  spent: {
    fontSize: 18,
    marginBottom: 5,
    color: 'green'
  },
  text: {
    fontSize: 16,
    marginBottom: 5
  },
  row: {
    marginHorizontal: 20,
    marginBottom: 20
  }
});