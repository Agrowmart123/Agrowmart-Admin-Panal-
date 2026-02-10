import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// --- Layout Component ---
import Layout from "../components/layout/Layout"; // Main wrapper with Sidebar/Navbar

// --- Auth Components ---
import LoginPage from "../components/auth/Login"; // Login screen for authentication

import ForgotPasswordPage from "../components/auth/ForgotPassword";
import ResetPasswordPage from "../components/auth/ResetPassword";

// --- Protected Routes---
import ProtectedRoute from "./ProtectedRoutes";

// --- Page Components ---
import Dashboard from "../components/pages/dashboard/Dashboard";
import Customers from "../components/pages/customers/Customers";
import CustomerProfile from "../components/pages/customers/CustomerProfile";
import Sellers from "../components/pages/sellers/Sellers";
import SellerProfile from "../components/pages/sellers/SellerProfile";
import DeliveryPartners from "../components/pages/delivery/DeliveryPartners";
import DeliveryProfile from "../components/pages/delivery/DeliveryProfile";
import AllProducts from "../components/pages/products/AllProducts";
import ProductDetail from "../components/pages/products/ProductDetail";
import AgriProducts from "../components/pages/agri_products/AgriProducts";
import AgriProductDetail from "../components/pages/agri_products/AgriProductDetail";
import Categories from "../components/pages/categories/Categories";
import MarketRates from "../components/pages/market/MarketRates";
import WeatherSettings from "../components/pages/weather/WeatherSettings";
import WebsiteContentMgnt from "../components/pages/website-content/WebsiteContentMgnt";
import Admins from "../components/pages/admins/Admins";
import TicketsSupport from "../components/pages/support/TicketsSupport";
import TicketDetail from "../components/pages/support/TicketDetail";
import Offers from "../components/pages/offers/Offers";
import Notifications from "../components/pages/notifications/Notifications";
import Profile from "../components/pages/profile/Profile";
import Settings from "../components/pages/settings/Settings";
import ActivityLog from "../components/pages/ActivityLog/ActivityLog";
import Payments from "../components/pages/payments/Payments";
import Orders from "../components/pages/orders/Orders";
import OrderDetail from "../components/pages/orders/OrderDetail";
import Review from "../components/pages/reviews/Review";
import ReviewDetail from "../components/pages/reviews/ReviewDetail";
import DeletedProducts from "../components/pages/products/DeletedProducts";
import ReferAndEarn from "../components/pages/refer/ReferAndEarn";

const AllRoutes = () => {
  const [products, setProducts] = useState([]);
  const [deletedProducts, setDeletedProducts] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customer/:id" element={<CustomerProfile />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/seller/:id" element={<SellerProfile />} />
          <Route path="/delivery" element={<DeliveryPartners />} />
          <Route path="/delivery-profile/:id" element={<DeliveryProfile />} />

          <Route
            path="/products"
            element={
              <AllProducts
                products={products}
                setProducts={setProducts}
                deletedProducts={deletedProducts}
                setDeletedProducts={setDeletedProducts}
              />
            }
          />

          <Route path="/product/:type/:id" element={<ProductDetail />} />

          <Route
            path="/deletedproducts"
            element={
              <DeletedProducts
                deletedProducts={deletedProducts}
                setDeletedProducts={setDeletedProducts}
                setProducts={setProducts}
              />
            }
          />

          <Route path="/agri-products" element={<AgriProducts />} />
          <Route path="/agri-product/:id" element={<AgriProductDetail />} />

          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrderDetail />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review/:id" element={<ReviewDetail />} />
          <Route path="/categories" element={<Categories />} />

          <Route path="/market-rates" element={<MarketRates />} />
          <Route path="/weather-settings" element={<WeatherSettings />} />
          <Route path="/websites" element={<WebsiteContentMgnt />} />

          <Route
            path="/admins"
            element={
              <ProtectedRoute requiresSuperAdmin={true}>
                <Admins />
              </ProtectedRoute>
            }
          />

          <Route path="/support" element={<TicketsSupport />} />
          <Route path="/ticket/:id" element={<TicketDetail />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/refer-earn" element={<ReferAndEarn />} />
          <Route path="/payment" element={<Payments />} />
          <Route path="/activity-log" element={<ActivityLog />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
