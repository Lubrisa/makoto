import { MenuItem } from "./menu-item.js";
import { MenuTable } from "./menu-table.js";
import { MenuTableController } from "./menu-table-controller.js";
import { UserCart } from "../user-cart/user-cart.js";
import { UserCartController } from "../user-cart/user-cart-controller.js";
import { OrderValueCounter } from "./order-value-counter.js";
import { SaveUserCart } from "../user-cart/save-user-cart.js";
import { retrieveUserCart } from "../user-cart/retrieve-user-cart.js";

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

const cartData = retrieveUserCart();
const userCart = new UserCart(cartData, menuItems);

const menuTable = new MenuTable(menuItems);
const menuTableController = new MenuTableController(
  menuTable,
  userCart.cartItems
);
const tbodyElement = document.querySelector("#menu-table");

const costCounterElement = document.querySelector("#cost-counter");
const orderValueCounter = new OrderValueCounter(
  menuTableController,
  costCounterElement
);

const userCartController = new UserCartController(
  userCart,
  menuTableController
);
userCartController.addCartUpdateListener(() => SaveUserCart(userCart));

menuTableController.renderMenuTableItems(tbodyElement);

const finishOrderButton = document.querySelector("#finish-order");
const toggleOrderButton = (orderValue) => {
  if (orderValue > 0) finishOrderButton.style.display = "";
  else finishOrderButton.style.display = "none";
};
userCartController.addCartUpdateListener(() => {
  toggleOrderButton(orderValueCounter.currentPrice);
});
toggleOrderButton(orderValueCounter.currentPrice);