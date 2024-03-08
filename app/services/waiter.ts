const base_url = "http://localhost:6777";

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

export async function approveFood() {

}

export async function rejectFood() {

}

export async function approveTable() {

}

export async function rejectTable() {
  
}