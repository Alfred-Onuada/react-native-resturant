import storage from "../utils/storage";

const base_url = "http://localhost:6777";
// const base_url = "https://resturant-server-zgh4.onrender.com";

export async function getIncomingFood() {
  const resp = await fetch(base_url + '/incoming/food');

  const data = await resp.json();

  return data;
}

export async function getIncomingTables() {
  const resp = await fetch(base_url + '/incoming/table');

  const data = await resp.json();

  return data;
}

export async function approveFood(ref: string) {
  const userInfo = await storage.load({key: 'userInfo'});

  const resp = await fetch(base_url + '/incoming/food?fulfiled=true&waiter=' + userInfo._id + '&ref=' + ref, {
    method: 'PATCH'
  });
}

export async function rejectFood(ref: string) {
  const userInfo = await storage.load({key: 'userInfo'});

  const resp = await fetch(base_url + '/incoming/food?fulfiled=false&waiter=' + userInfo._id + '&ref=' + ref, {
    method: 'PATCH'
  });

  const data = await resp.json();

  return data;
}

export async function approveTable(id: string) {
  const userInfo = await storage.load({
    key: 'userInfo'
  });

  await fetch(base_url + '/purchases/' + id + '/approve/' + userInfo._id, {
    method: 'PATCH'
  });

  return;
}

export async function rejectTable(name: string, purchaseId: string, table: IReservation) {
  const userInfo = await storage.load({
    key: 'userInfo'
  });

  await fetch(base_url + '/tables/' + name + '/purchases/' + purchaseId + '/reject/' + userInfo._id, {
    method: 'PATCH',
    body: JSON.stringify(table),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return;
}