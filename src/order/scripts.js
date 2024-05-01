import { MenuItem } from "../menu/menu-item.js";
import { retrieveUserCart } from "../user-cart/retrieve-user-cart.js";
import { UserCart } from "../user-cart/user-cart.js";
import { UserCartTable } from "./user-cart-table.js";
import { OrderFormTotalCounter } from "./order-form-total-counter.js";
import { finishOrder } from "./finish-order.js";

const menuItems = [
  new MenuItem(0, "Mix", 59.99),
  new MenuItem(1, "Lula a dorê", 59.99),
  new MenuItem(2, "Sashimi com temaki", 59.99),
  new MenuItem(3, "Filadélfia assado", 59.99),
  new MenuItem(4, "Jiron", 59.99),
  new MenuItem(5, "Barca de sashimi", 59.99),
  new MenuItem(6, "Mix de peças", 59.99),
  new MenuItem(7, "Sashimi temperado", 59.99),
  new MenuItem(8, "Temaki filadelfia", 59.99),
  new MenuItem(9, "Filadelfia", 59.99),
];

const userCartData = retrieveUserCart();
const userCart = new UserCart(userCartData, menuItems);

const tbodyElement = document.querySelector("#user-cart-table");
const userCartTable = new UserCartTable(userCart, tbodyElement);
const totalCounterElement = document.querySelector("#total-cost-counter");
const orderFormTotalCounter = new OrderFormTotalCounter(
  userCartTable,
  totalCounterElement
);

const phoneInput = document.querySelector("#phone");

phoneInput.addEventListener("input", (event) => {
  let { value } = event.target;
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  event.target.value = value;
});

document.querySelector("#finish-order-btn").addEventListener("click", (submitEvent) => {
  submitEvent.preventDefault();
  const paymentMethod = document.querySelector("#payment-method").value;
  finishOrder(orderFormTotalCounter.total, paymentMethod);
  window.location.href = "http://localhost:5500/src/order/finished";
});
