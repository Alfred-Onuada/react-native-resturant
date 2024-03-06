import { IFood } from "../interfaces/food";
import storage from "../utils/storage";

export async function getFoodItems() {
  try {
    const respData = await fetch('http://localhost:6777/foods');

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