interface IPurchase {
  _id: number;
  customerName: string;
  amount: number;
  type: string;
  approvedBy: string;
  date: Date;
}