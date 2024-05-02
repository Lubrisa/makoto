export function finishOrder(orderValue, paymentMethod) {
  const orderNumber = Math.floor(Math.random() * 1000);
  console.log(orderNumber, orderValue, paymentMethod);

  const orderInfo = {
    orderNumber,
    orderValue,
    paymentMethod,
  };

  localStorage.setItem("orderInfo", JSON.stringify(orderInfo));
}
