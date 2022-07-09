export function save(array) {
  localStorage.setItem("elevatorsInfo", JSON.stringify(array));
}
