import {
  FaUsers,
  FaProductHunt,
  FaChartLine,
  FaUserShield,
  FaStar,
} from "react-icons/fa";
import { FaOpencart, FaLeaf } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { IoPricetagOutline, IoSettings } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";
import { GiPlantRoots, GiPlantWatering, GiWheat } from "react-icons/gi";
import {
  MdSupportAgent,
  MdPayment,
  MdOutlineAppShortcut,
  MdHistory,
} from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { WiDaySunny } from "react-icons/wi";

export const menuConfig = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: AiOutlineProduct,
  },
  {
    label: "Users",
    icon: FaUsers,
    subItems: [
      { label: "Customers", path: "/customers" },
      { label: "Sellers", path: "/sellers" },
      { label: "Delivery Partners", path: "/delivery" },
    ],
  },
  {
    label: "Products",
    icon: FaProductHunt,
    subItems: [
      { label: "All Products", path: "/products" },
      { label: "Deleted Products", path: "/deletedproducts" },
    ],
  },

  {
    label: "Agri Products",
    path: "/agri-products",           
    icon: GiWheat,           
  },

  {
    label: "Orders",
    icon: FaOpencart,
    subItems: [
      { label: "In Progress", path: "/orders?status=in-progress" },
      { label: "Shipped", path: "/orders?status=shipped" },
      { label: "Completed", path: "/orders?status=completed" },
      { label: "Cancelled", path: "/orders?status=cancelled" },
    ],
  },
  { label: "Reviews", path: "/review", icon: FaStar },
  { label: "Categories", path: "/categories", icon: BiCategory },
  { label: "Market Rates", path: "/market-rates", icon: FaChartLine },
  { label: "Weather Settings", path: "/weather-settings", icon: WiDaySunny },
  { label: "Websites", path: "/websites", icon: CgWebsite },
  { label: "Offers", path: "/offers", icon: IoPricetagOutline },
  {
    label: "Admins",
    path: "/admins",
    icon: FaUserShield,
  },
  { label: "Tickets / Support", path: "/support", icon: MdSupportAgent },
  { label: "Refer & Earn", path: "/refer-earn", icon: MdOutlineAppShortcut },
  { label: "Payments", path: "/payment", icon: MdPayment },
  { label: "Activity Log", path: "/activity-log", icon: MdHistory },
  { label: "Settings", path: "/settings", icon: IoSettings },
];
