import { IFood } from "../interfaces/food";

// const base_url = "https://resturant-server-zgh4.onrender.com";
const base_url = "http://localhost:6777";

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