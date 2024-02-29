import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function ReservationItem({ item }: { item: IReservation }) {
  const handleApprove = (orderId: number) => {
    console.log('Approve order:', orderId);
  };
  
  const handleReject = (orderId: number) => {
    console.log('Reject order:', orderId);
  };

  return (
    <View style={styles.reservationContainer}>
      <Text style={styles.tableName}>{item.tableName}</Text>
      <Text style={styles.customerInfo}>{item.customerInfo}</Text>
      <Text style={styles.amountPaid}>${item.amountPaid}</Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleApprove(item.id)} style={styles.approveBtn}>
          <Text style={styles.approveText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleReject(item.id)} style={styles.rejectBtn}>
          <Text style={styles.rejectText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reservationContainer: {
    marginVertical: 15,
    paddingHorizontal: 20
  },
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
  tableName: {
    fontSize: 18,
    fontWeight: '400'
  },
  customerInfo: {
    fontSize: 18,
    fontWeight: '300',
    marginVertical: 5
  },
  amountPaid: {
    fontSize: 22,
    fontWeight: '500'
  }
});
