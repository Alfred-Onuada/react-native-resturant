interface Item {
  _id: {
    $oid: string;
  };
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface UserInfo {
  _id: {
    $oid: string;
  };
  fullname: string;
  email: string;
  phone: string;
  password: string;
}

interface IOrder {
  _id: {
    $oid: string;
  };
  items: Item[];
  buyerId: {
    $oid: string;
  };
  total: number;
  amount: number;
  fees: number;
  status: string;
  userInfo: UserInfo;
}