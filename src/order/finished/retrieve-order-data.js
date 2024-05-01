export function retrieveOrderData() {
  const orderData = localStorage.getItem("orderInfo");

  return JSON.parse(orderData);
}
