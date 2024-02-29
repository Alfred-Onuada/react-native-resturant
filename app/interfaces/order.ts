interface IOrder {
  id: number;
  customerName: string;
  amountPaid: number;
  orderDetails: {
    itemName: string;
    quantity: number;
  }[];
}