import { IRegister } from "../interfaces/register";
import storage from "../utils/storage";

const base_url = "https://resturant-server-zgh4.onrender.com";
// const base_url = "http://localhost:6777";

export async function registerAPI(data: IRegister) {
  const keys = Object.keys(data);
  const dataIsSet = keys.every(key => (data as any)[key].trim().length > 0);

  if (!dataIsSet) {
    throw Error("Please enter all required values")
  }

  const resp = await fetch(base_url + '/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  if (resp.status.toString().startsWith('2') === false) {
    const respData = await resp.json();
    throw respData;
  }
 
  const respData = await resp.json();

  await storage.save({
    key: 'userInfo',
    data: respData,
  })

  return;
}

export async function loginAPI(email: string, password: string) {
  const dataIsSet = email.trim().length && password.trim().length;

  if (!dataIsSet) {
    throw Error("Please enter all required values")
  }

  const resp = await fetch(base_url + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password})
  })

  if (resp.status.toString().startsWith('2') === false) {
    const respData = await resp.json();
    throw respData;
  }
 
  const respData = await resp.json();

  await storage.save({
    key: 'userInfo',
    data: respData,
  });

  return respData.type;
}

export async function getUserType() {
  const userInfo = await storage.load({
    key: 'userInfo'
  })

  return userInfo.type;
}