import { MenuItem } from "./menu-item.js";
import { MenuTable } from "./menu-table.js";
import { MenuTableController } from './menu-table-controller.js';
import { UserCart } from './user-cart.js';

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
    new MenuItem(9, "Filadelfia", 59.99)
]

const menuTable = new MenuTable(menuItems);

const tbodyElement = document.querySelector("#menu-table");
const menuTableController = new MenuTableController(menuTable, tbodyElement);
menuTableController.renderMenuTableItems(tbodyElement);
const userCart = new UserCart(menuTableController);