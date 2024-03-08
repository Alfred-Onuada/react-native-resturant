import { IFood } from "../interfaces/food";
import storage from "../utils/storage";

// const base_url = "https://resturant-server-zgh4.onrender.com";
const base_url = "http://localhost:6777";

export async function getFoodItems() {
  try {
    const respData = await fetch(base_url + '/foods');

    const data = await respData.json();

    return data;
  } catch (error) {
    return [];
  }
}

export async function getTables() {
  try {
    const respData = await fetch(base_url + '/tables');

    const data = await respData.json();

    return data;
  } catch (error) {
    return [];
  }
}

export async function addItemToCart(item: IFood) {
  try {
    let resp = await storage.load({key: 'cart'});

    const itemAlreadyInCart = resp.filter((cartItem: IFood) => cartItem._id === item._id);

    if (itemAlreadyInCart.length > 0) {
      resp = resp.map((cartItem: IFood) => {
        if (cartItem._id === item._id) {
          cartItem.quantity++;
        }
  
        return cartItem;
      });
    } else {
      resp.push({
        ...item,
        quantity: 1
      })
    }

    await storage.save({key: 'cart', data: resp});

    return resp.length;
  } catch (error: any) {
    if (/Not Found/i.test(error.toString())) {
      await storage.save({
        key: 'cart',
        data: [{
          ...item,
          quantity: 1
        }]
      })

      return 1;
    }

    console.log(error);
  }
}

export async function getCartItems() {
  try {
    let resp = await storage.load({key: 'cart'});
    
    return resp;
  } catch (error) {
    return [];
  }
}

export async function updateCart(items: IFood[]) {
  await storage.save({
    key: 'cart',
    data: items
  });

  return;
}

export async function checkoutCart(items: IFood[] | ITable[], amount: number, fees: number, total: number) {
  const userInfo = await storage.load({
    key: 'userInfo'
  })

  const respData = await fetch(base_url + '/cart', {
    method: 'POST',
    body: JSON.stringify({items, userInfo, amount, total, fees}),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await respData.text();

  return data;
}

export async function handleTransferSuccess(ref: string) {
  await fetch(base_url + '/cart/success/' + ref, {
    method: 'PATCH'
  });
};

export async function reserveTableAPI(id: string) {
  await fetch(base_url + '/table/' + id, {
    method: 'PATCH'
  });
}

export async function logoutAPI() {
  await storage.remove({key: 'userInfo'});
}