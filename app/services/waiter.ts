import storage from "../utils/storage";

// const base_url = "http://localhost:6777";
const base_url = "https://resturant-server-zgh4.onrender.com";

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

  const data = await resp.json();

  return data;
}

export async function rejectFood(ref: string) {
  const userInfo = await storage.load({key: 'userInfo'});

  const resp = await fetch(base_url + '/incoming/food?fulfiled=false&waiter=' + userInfo._id + '&ref=' + ref, {
    method: 'PATCH'
  });

  const data = await resp.json();

  return data;
}

export async function approveTable() {

}

export async function rejectTable() {
  
}