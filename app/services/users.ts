export async function getFoodItems() {
  try {
    const respData = await fetch('http://localhost:6777/foods');

    const data = await respData.json();

    return data;
  } catch (error) {
    return [];
  }
}