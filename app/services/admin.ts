import { IFood } from "../interfaces/food";

const base_url = "https://resturant-server-zgh4.onrender.com";
// const base_url = "http://localhost:6777";

export async function deleteItemAPI(id: string) {
  await fetch(base_url + '/foods/' + id, {
    method: 'DELETE'
  });

  return;
}

export async function saveItemEditAPI(food: IFood) {
  const data = JSON.parse(JSON.stringify(food));
  delete (data as any)._id;

  await fetch(base_url + '/foods/' + food._id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return;
}

export async function addItemAPI(food: IFood) {
  const data = JSON.parse(JSON.stringify(food));
  delete (data as any)._id;
  
  await fetch(base_url + '/foods', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return;
}

export async function getPurchases() {
  const response = await fetch(base_url + '/purchase-history');
  const data = await response.json();

  return data;
}

export async function getWaiters() {
  const response = await fetch(base_url + '/waiters');
  const data = await response.json();

  return data;
}

export async function deleteWaiterAPI(id: string) {
  await fetch(base_url + '/waiters/' + id, {
    method: 'DELETE'
  });

  return;
}

export async function addWaiterAPI(waiter: IWaiter) {
  const data = JSON.parse(JSON.stringify(waiter));
  delete (data as any)._id;
  
  await fetch(base_url + '/waiters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return;
}