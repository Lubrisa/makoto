import { retrieveOrderData } from "./retrieve-order-data.js";

const orderData = retrieveOrderData();

document.querySelector("#order-number").textContent = orderData.orderNumber;
document.querySelector("#order-value").textContent = orderData.orderValue;
document.querySelector("#payment-method").textContent = orderData.paymentMethod;
