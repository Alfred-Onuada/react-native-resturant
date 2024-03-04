import { IRegister } from "../interfaces/register";
import storage from "../utils/storage";

export async function registerAPI(data: IRegister) {
  const keys = Object.keys(data);
  const dataIsSet = keys.every(key => (data as any)[key].trim().length > 0);

  if (!dataIsSet) {
    throw Error("Please enter all required values")
  }

  const resp = await fetch('http://localhost:6777/register', {
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