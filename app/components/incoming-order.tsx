import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function OrderItem({ item, handleApprove, handleReject }: {item: IOrder, handleApprove: (id: string) => void, handleReject: (id: string) => void}) {
  return (
    <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text style={styles.customerName}>{item.userInfo.fullname}</Text>
      <Text style={{ ...styles.amountPaid, marginVertical: 5 }}>₦{item.amount}</Text>
      <Text style={styles.orderDetailsTitle}>Order Details</Text>
      {item.items.map((detail, index) => (
        <View key={index} style={styles.rowDown}>
          <Text style={styles.orderName}>{detail.name}</Text>
          <Text style={styles.quantity}>x{detail.quantity}</Text>
        </View>
      ))}
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleApprove(item._id.toString())} style={styles.approveBtn}>
          <Text style={styles.approveText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleReject(item._id.toString())} style={styles.rejectBtn}>
          <Text style={styles.rejectText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  approveText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'white'
  },
  rejectText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'white'
  },
  approveBtn: {
    backgroundColor: 'green',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10
  },
  rejectBtn: {
    backgroundColor: 'red',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10
  },
  amountPaid: {
    fontSize: 22,
    fontWeight: '500'
  },
  customerName: {
    fontSize: 18,
    fontWeight: '300',
  },
  orderDetailsTitle: {
    fontSize: 18,
    textAlign: 'center'
  },
  rowDown: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  quantity: {
    fontSize: 16
  },
  orderName: {
    fontSize: 16
  }
});