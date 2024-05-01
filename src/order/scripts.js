import { MenuItem } from "../menu/menu-item.js";
import { RetrieveUserCart } from "../user-cart/retrieve-user-cart.js";
import { UserCart } from "../user-cart/user-cart.js";
import { UserCartTable } from "./user-cart-table.js";
import { OrderFormTotalCounter } from "./order-form-total-counter.js";

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

const userCartData = RetrieveUserCart();
const userCart = new UserCart(userCartData, menuItems);

const tbodyElement = document.querySelector("#user-cart-table");
const userCartTable = new UserCartTable(userCart, tbodyElement);
const totalCounterElement = document.querySelector("#total-cost-counter");
const orderFormTotalCounter = new OrderFormTotalCounter(
  userCartTable,
  totalCounterElement
);
