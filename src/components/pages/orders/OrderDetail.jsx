import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockOrders, rupee } from "./Orders";
import { ArrowLeft } from "lucide-react";

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");

  // Find order by ID - convert to string for comparison
  const order = mockOrders.find((o) => String(o.id) === String(orderId));

  if (!order) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 mb-6 hover:text-black transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <h2 className="text-lg font-semibold">Order not found</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 mb-6 hover:text-black transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="bg-white rounded-lg shadow-md">
        {/* Product Section */}
        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Product Image */}
          <img
            src={order.productImage}
            alt={order.productName}
            className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg border border-gray-200 flex-shrink-0"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150?text=Product";
            }}
          />

          {/* Product Info */}
          <div className="flex-1 w-full md:w-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-8">
            {/* Product Info */}
            <div className="flex-1 w-full md:w-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-8">
              <div className="flex flex-col gap-2 md:gap-1">
                <div className="text-green-600 font-medium text-sm">
                  {order.orderNumber}
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  {order.productName}
                </h1>

                {/* Quantity */}
                <div className="flex pb-2">
                  <p className="text-gray-700 font-medium w-40">Quantity:</p>
                  <p className="text-gray-600">{order.quantity}</p>
                </div>

                {/* Payment Mode - moved up just below Quantity */}
                <div className="flex pb-4">
                  <p className="text-gray-700 font-medium w-40">
                    Payment Mode:
                  </p>
                  <p className="text-gray-600">{order.paymentMode}</p>
                </div>
              </div>

              {/* Amount */}
              <div className="mt-4 md:mt-0 text-right md:text-left">
                <p className="text-xl text-gray-500 font-bold">Amount</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600">
                  ₹{order.amount}.00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex gap-0 px-6">
            <button
              onClick={() => setActiveTab("info")}
              className={`px-4 py-4 font-medium text-sm md:text-base transition ${
                activeTab === "info"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Order Info
            </button>
            <button
              onClick={() => setActiveTab("track")}
              className={`px-4 py-4 font-medium text-sm md:text-base transition ${
                activeTab === "track"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Track Order
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "info" ? (
            <div className="grid grid-cols-[200px_20px_1fr] gap-y-5 items-start">
              {/* Customer Name */}
              <p className="text-gray-700 font-medium text-base">
                Customer Name
              </p>
              <p className="text-gray-600">:</p>
              <p className="text-gray-900 font-semibold">{order.customer}</p>

              {/* Merchant / Seller */}
              <p className="text-gray-700 font-medium text-base">
                Merchant / Seller
              </p>
              <p className="text-gray-600">:</p>
              <div className="flex items-center gap-3">
                <img
                  src={order.merchantImage}
                  alt={order.merchant}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                />
                <p className="text-gray-900 font-semibold">{order.merchant}</p>
              </div>

              {/* Shipping Address */}
              <p className="text-gray-700 font-medium text-base">
                Shipping Address
              </p>
              <p className="text-gray-600">:</p>
              <p className="text-gray-800 leading-relaxed">
                {order.shippingAddress}
              </p>

              {/* Order Date */}
              <p className="text-gray-700 font-medium text-base">Order Date</p>
              <p className="text-gray-600">:</p>
              <p className="text-gray-800">
                {order.orderDate} {order.orderTime}
              </p>

              {/* Delivery Partner */}
              <p className="text-gray-700 font-medium text-base">
                Delivery Partner
              </p>
              <p className="text-gray-600">:</p>
              <div className="flex items-center gap-3">
                <img
                  src={order.deliveryPartnerImage}
                  alt={order.deliveryPartner}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-gray-900 font-semibold">
                  {order.deliveryPartner}
                </p>
              </div>

              {/* Delivery Date */}
              <p className="text-gray-700 font-medium text-base">
                Delivery Date
              </p>
              <p className="text-gray-600">:</p>
              <p className="text-gray-800">
                {order.deliveryDate} {order.deliveryTime}
              </p>

              {/* Color */}
              <p className="text-gray-700 font-medium text-base">Color</p>
              <p className="text-gray-600">:</p>
              <p className="text-gray-800">{order.color}</p>

              {/* Quantity */}
              <p className="text-gray-700 font-medium text-base">Quantity</p>
              <p className="text-gray-600">:</p>
              <p className="text-gray-800 font-medium">{order.quantity}</p>
            </div>
          ) : (
            /* Track Order Timeline */
            <div className="py-4">
              <div className="flex gap-6">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className="flex flex-col items-center gap-0">
                    {/* Ordered - Active */}
                    <div className="w-4 h-4 rounded-full bg-green-600 ring-4 ring-green-100" />
                    <div className="w-1 h-16 bg-green-300" />

                    {/* Packed - Inactive */}
                    <div className="w-4 h-4 rounded-full bg-gray-300" />
                    <div className="w-1 h-16 bg-gray-300" />

                    {/* Shipped - Inactive */}
                    <div className="w-4 h-4 rounded-full bg-gray-300" />
                    <div className="w-1 h-16 bg-gray-300" />

                    {/* Delivery - Inactive */}
                    <div className="w-4 h-4 rounded-full bg-gray-300" />
                  </div>
                </div>

                {/* Timeline content */}
                <div className="flex-1 space-y-12 pt-1">
                  {/* Ordered */}
                  <div>
                    <p className="font-semibold text-gray-900 text-base">
                      Ordered
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {order.orderDate} {order.orderTime}
                    </p>
                  </div>

                  {/* Packed */}
                  <div>
                    <p className="font-semibold text-gray-400 text-base">
                      Packed
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Expected by {order.deliveryDate}
                    </p>
                  </div>

                  {/* Shipped */}
                  <div>
                    <p className="font-semibold text-gray-400 text-base">
                      Shipped
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Expected by {order.deliveryDate}
                    </p>
                  </div>

                  {/* Delivery */}
                  <div>
                    <p className="font-semibold text-gray-400 text-base">
                      Delivery
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Expected by {order.deliveryDate} {order.deliveryTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
