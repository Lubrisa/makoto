export function finishOrder(orderValue, paymentMethod) {
  const orderNumber = Math.random() * 1000;

  const orderInfo = {
    orderNumber,
    orderValue,
    paymentMethod,
  };

  localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
}
