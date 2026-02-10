// //Vaishnavi Bhavsar

// import React, { useMemo, useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaFilter } from "react-icons/fa";
// import { RxCross1 } from "react-icons/rx";
// import { getAllOrders, getOrderById } from "../../../api/OrderApi";

// /* ----------------- Helpers ----------------- */
// const rupee = (v) => `₹${v}`;
// const PER_PAGE = 7;

// // Default placeholder image
// const PLACEHOLDER_IMAGE = "https://via.placeholder.com/150?text=No+Image";

// // Check if URL is a valid image
// const isValidImageUrl = (url) => {
//   if (!url) return false;
//   try {
//     const urlObj = new URL(url);
//     const path = urlObj.pathname.toLowerCase();
//     return /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(path);
//   } catch {
//     return false;
//   }
// };

// // Categorize product by dietary type
// const getDietaryType = (productName) => {
//   if (!productName) return "OTHER";
//   const name = productName.toLowerCase();

//   // Vegetables/Fruits
//   const vegetables = [
//     "tomato",
//     "potato",
//     "onion",
//     "carrot",
//     "cabbage",
//     "spinach",
//     "broccoli",
//     "lettuce",
//     "cucumber",
//     "pepper",
//     "bean",
//     "pea",
//     "corn",
//     "vegetable",
//   ];
//   const fruits = [
//     "apple",
//     "banana",
//     "orange",
//     "mango",
//     "grape",
//     "berry",
//     "melon",
//     "pear",
//     "peach",
//     "plum",
//     "fruit",
//   ];

//   // Dairy
//   const dairy = [
//     "milk",
//     "cheese",
//     "yogurt",
//     "butter",
//     "cream",
//     "paneer",
//     "curd",
//     "ghee",
//     "dairy",
//   ];

//   // Meat/Seafood
//   const meat = [
//     "chicken",
//     "beef",
//     "pork",
//     "lamb",
//     "mutton",
//     "meat",
//     "sausage",
//     "bacon",
//     "ham",
//   ];
//   const seafood = [
//     "fish",
//     "salmon",
//     "tuna",
//     "shrimp",
//     "prawn",
//     "crab",
//     "lobster",
//     "seafood",
//     "oyster",
//   ];

//   if (
//     vegetables.some((v) => name.includes(v)) ||
//     fruits.some((f) => name.includes(f))
//   ) {
//     return "VEGETABLES_FRUITS";
//   }
//   if (dairy.some((d) => name.includes(d))) {
//     return "DAIRY";
//   }
//   if (
//     meat.some((m) => name.includes(m)) ||
//     seafood.some((s) => name.includes(s))
//   ) {
//     return "SEAFOOD_MEAT";
//   }

//   return "OTHER";
// };

// // Check if order matches dietary filter
// const matchesDietaryFilter = (order, filter) => {
//   if (filter === "ALL") return true;
//   if (!order.items || order.items.length === 0) return false;

//   return order.items.some((item) => {
//     const productType = getDietaryType(item.product?.productName);
//     return productType === filter;
//   });
// };

// // Check if order matches date filter
// const matchesDateFilter = (order, filter) => {
//   if (filter === "ALL") return true;
//   if (!order.createdAt) return false;

//   const orderDate = new Date(order.createdAt);
//   const now = new Date();
//   const daysDiff = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));

//   switch (filter) {
//     case "TODAY":
//       return daysDiff === 0;
//     case "LAST_7_DAYS":
//       return daysDiff <= 7;
//     case "LAST_30_DAYS":
//       return daysDiff <= 30;
//     case "LAST_90_DAYS":
//       return daysDiff <= 90;
//     default:
//       return true;
//   }
// };

// // Get image URL or placeholder
// const getImageUrl = (imagePaths) => {
//   if (!imagePaths) return PLACEHOLDER_IMAGE;

//   // If it's an array, get the first item
//   const imageUrl = Array.isArray(imagePaths) ? imagePaths[0] : imagePaths;

//   // Check if it's a valid image URL
//   if (isValidImageUrl(imageUrl)) {
//     return imageUrl;
//   }

//   // If it's a webpage URL or invalid, return placeholder
//   return PLACEHOLDER_IMAGE;
// };

// // Format date helper
// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   const date = new Date(dateString);
//   return date.toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// // Get order status badge color
// const getStatusColor = (status) => {
//   const colors = {
//     PENDING: "bg-yellow-100 text-yellow-800",
//     ACCEPTED: "bg-blue-100 text-blue-800",
//     REJECTED: "bg-red-100 text-red-800",
//     CANCELLED: "bg-gray-100 text-gray-800",
//     DELIVERED: "bg-green-100 text-green-800",
//   };
//   return colors[status] || "bg-gray-100 text-gray-800";
// };

// /* ----------------- Icons ----------------- */
// const EyeIcon = ({ className }) => (
//   <svg
//     className={className}
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//     />
//   </svg>
// );

// const MagnifyingGlassIcon = ({ className }) => (
//   <svg
//     className={className}
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
//     />
//   </svg>
// );

// const ImageIcon = ({ className }) => (
//   <svg className={className} fill="currentColor" viewBox="0 0 20 20">
//     <path
//       fillRule="evenodd"
//       d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// /* ----------------- Component ----------------- */
// export default function OrdersPage() {
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   // Filter states
//   const [statusFilter, setStatusFilter] = useState("ALL");
//   const [dateFilter, setDateFilter] = useState("ALL");
//   const [dietaryFilter, setDietaryFilter] = useState("ALL");
//   const [showFilters, setShowFilters] = useState(false);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const response = await getAllOrders();
//         console.log("Orders response:", response.data);

//         if (response.data && Array.isArray(response.data)) {
//           setOrders(response.data);
//         } else {
//           console.error("Unexpected response format:", response.data);
//           throw new Error("Invalid response format from server");
//         }
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//         setError(
//           err.response?.data?.message || err.message || "Failed to fetch orders"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();

//     let result = orders;

//     // Apply search filter
//     if (q) {
//       result = result.filter((order) => {
//         try {
//           const orderIdMatch = order.id?.toString().includes(q);
//           const customerMatch =
//             order.customer?.name?.toLowerCase().includes(q) ||
//             order.customer?.username?.toLowerCase().includes(q);
//           const merchantMatch =
//             order.merchant?.name?.toLowerCase().includes(q) ||
//             order.merchant?.username?.toLowerCase().includes(q);
//           const itemsMatch = order.items?.some((item) =>
//             item.product?.productName?.toLowerCase().includes(q)
//           );

//           const promoMatch = order.promoCode?.toLowerCase().includes(q);
//           return (
//             orderIdMatch ||
//             customerMatch ||
//             merchantMatch ||
//             itemsMatch ||
//             promoMatch
//           );
//         } catch (e) {
//           console.error("Filter error for order:", order, e);
//           return false;
//         }
//       });
//     }

//     // Apply status filter
//     if (statusFilter !== "ALL") {
//       result = result.filter((order) => order.status === statusFilter);
//     }

//     // Apply date filter
//     if (dateFilter !== "ALL") {
//       result = result.filter((order) => matchesDateFilter(order, dateFilter));
//     }

//     // Apply dietary filter
//     if (dietaryFilter !== "ALL") {
//       result = result.filter((order) =>
//         matchesDietaryFilter(order, dietaryFilter)
//       );
//     }

//     return result;
//   }, [search, orders, statusFilter, dateFilter, dietaryFilter]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
//   const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

//   paginated.map((order) => (
//     console.log("Product: ", order.items[0].product?.imagePaths)
//   ));

//   if (page > totalPages && totalPages > 0) setPage(1);

//   const handleViewOrder = async (orderId) => {
//     try {
//       const response = await getOrderById(orderId);
//       setSelectedOrder(response.data);
//     } catch (err) {
//       console.error("Error fetching order details:", err);
//       alert("Failed to load order details");
//     }
//   };

//   const closeModal = () => {
//     setSelectedOrder(null);
//   };

//   // Reset all filters
//   const resetFilters = () => {
//     setStatusFilter("ALL");
//     setDateFilter("ALL");
//     setDietaryFilter("ALL");
//     setSearch("");
//     setPage(1);
//     setShowFilters(false);
//   };

//   // Check if any filters are active
//   const hasActiveFilters =
//     statusFilter !== "ALL" ||
//     dateFilter !== "ALL" ||
//     dietaryFilter !== "ALL" ||
//     search !== "";

//   if (loading) {
//     return (
//       <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
//         <div className="flex flex-col justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//           <p className="mt-4 text-gray-600">Loading orders...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
//           <h3 className="font-semibold mb-2 text-lg">Error Loading Orders</h3>
//           <p className="text-sm mb-4">{error}</p>
//           <div className="space-y-2 text-sm bg-red-100 p-3 rounded">
//             <p>
//               <strong>Troubleshooting steps:</strong>
//             </p>
//             <ul className="list-disc list-inside space-y-1 ml-2">
//               <li>Check if backend is running on http://localhost:8094</li>
//               <li>Verify CORS is enabled in Spring Boot</li>
//               <li>Check browser console for detailed error logs</li>
//               <li>Ensure the /api/orders/all endpoint exists</li>
//               <li>Verify JWT token is valid if authentication is required</li>
//             </ul>
//           </div>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
//         <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-6">
//           Orders (0)
//         </h2>
//         <div className="bg-white rounded-lg shadow-sm p-12 text-center">
//           <div className="text-gray-400 mb-4">
//             <svg
//               className="w-16 h-16 mx-auto"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//               />
//             </svg>
//           </div>
//           <h3 className="text-lg font-semibold text-gray-700 mb-2">
//             No Orders Found
//           </h3>
//           <p className="text-gray-500">
//             There are no orders in the system yet.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
//       <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">
//         <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
//           Orders ({filtered.length})
//         </h2>

//         <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//           <div className="w-full sm:w-64 lg:w-80 relative">
//             <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//             <input
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setPage(1);
//               }}
//               placeholder="Search by order ID, customer or product"
//               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm outline-none bg-white"
//             />
//           </div>
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
//               hasActiveFilters
//                 ? "bg-green-600 text-white"
//                 : "bg-white border border-gray-300 text-gray-600 shadow-sm hover:bg-gray-50"
//             }`}
//           >
//             <FaFilter className="w-3 h-3" /> Filter
//             {hasActiveFilters && (
//               <span className="bg-white text-green-600 px-2 py-0.5 rounded-full text-xs font-bold">
//                 {
//                   [
//                     statusFilter !== "ALL",
//                     dateFilter !== "ALL",
//                     dietaryFilter !== "ALL",
//                     search !== "",
//                   ].filter(Boolean).length
//                 }
//               </span>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Filter Panel */}
//       {showFilters && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           // className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
//           className="fixed inset-0 z-50 pointer-events-none bg-black/50"
//           onClick={() => setShowFilters(false)}
//         >
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             // className="bg-white border rounded-lg p-4 shadow-sm"
//             className="absolute top-40 right-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-md pointer-events-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="font-semibold text-gray-800">Filters</h3>

//               <button
//                 onClick={resetFilters}
//                 className="text-xs text-gray-600 hover:text-gray-700 font-medium"
//               >
//                 <RxCross1 className="w-4 h-4" />
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-rows-3 gap-4">
//               {/* Status Filter */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">
//                   Status
//                 </label>
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => {
//                     setStatusFilter(e.target.value);
//                     setPage(1);
//                   }}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-white outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   <option value="ALL">All Statuses</option>
//                   <option value="PENDING">Pending</option>
//                   <option value="ACCEPTED">Accepted</option>
//                   <option value="DELIVERED">Delivered</option>
//                   <option value="REJECTED">Rejected</option>
//                   <option value="CANCELLED">Cancelled</option>
//                 </select>
//               </div>

//               {/* Date Filter */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">
//                   Date Range
//                 </label>
//                 <select
//                   value={dateFilter}
//                   onChange={(e) => {
//                     setDateFilter(e.target.value);
//                     setPage(1);
//                   }}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-white outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   <option value="ALL">All Time</option>
//                   <option value="TODAY">Today</option>
//                   <option value="LAST_7_DAYS">Last 7 Days</option>
//                   <option value="LAST_30_DAYS">Last 30 Days</option>
//                   <option value="LAST_90_DAYS">Last 90 Days</option>
//                 </select>
//               </div>

//               {/* Dietary Type Filter */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-700 mb-1">
//                   Product Type
//                 </label>
//                 <select
//                   value={dietaryFilter}
//                   onChange={(e) => {
//                     setDietaryFilter(e.target.value);
//                     setPage(1);
//                   }}
//                   className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-white outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   <option value="ALL">All Types</option>
//                   <option value="VEGETABLES_FRUITS">
//                     🥗 Vegetables/Fruits
//                   </option>
//                   <option value="DAIRY">🥛 Dairy Products</option>
//                   <option value="SEAFOOD_MEAT">🍖 Seafood/Meat</option>
//                   <option value="OTHER">📦 Other</option>
//                 </select>
//               </div>
//             </div>

//             {/* Active Filter Tags */}
//             {hasActiveFilters && (
//               <div className="mt-3 pt-3 border-t flex flex-wrap gap-2">
//                 {statusFilter !== "ALL" && (
//                   <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
//                     Status: {statusFilter}
//                     <button
//                       onClick={() => setStatusFilter("ALL")}
//                       className="hover:bg-blue-200 rounded"
//                     >
//                       <RxCross1 className="w-3 h-3" />
//                     </button>
//                   </span>
//                 )}
//                 {dateFilter !== "ALL" && (
//                   <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-xs">
//                     Date: {dateFilter.replace(/_/g, " ")}
//                     <button
//                       onClick={() => setDateFilter("ALL")}
//                       className="hover:bg-purple-200 rounded"
//                     >
//                       <RxCross1 className="w-3 h-3" />
//                     </button>
//                   </span>
//                 )}
//                 {dietaryFilter !== "ALL" && (
//                   <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs">
//                     Type: {dietaryFilter.replace(/_/g, " ")}
//                     <button
//                       onClick={() => setDietaryFilter("ALL")}
//                       className="hover:bg-green-200 rounded"
//                     >
//                       <RxCross1 className="w-3 h-3" />
//                     </button>
//                   </span>
//                 )}
//                 {search !== "" && (
//                   <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs">
//                     Search: "{search}"
//                     <button
//                       onClick={() => setSearch("")}
//                       className="hover:bg-gray-200 rounded"
//                     >
//                       <XIcon className="w-3 h-3" />
//                     </button>
//                   </span>
//                 )}
//               </div>
//             )}

//             <div className="flex justify-end gap-3 mt-5">
//               <button
//                 onClick={() => setShowFilters(false)}
//                 className="px-4 py-2 rounded-lg border border-gray-200"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={() => setShowFilters(false)}
//                 className="px-4 py-2 rounded-lg text-green-600 bg-white border border-gray-200"
//               >
//                 Apply Filters
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}

//       {/* Desktop Table */}
//       <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-sm">
//         <table className="w-full text-sm text-left">
//           <thead className="bg-gray-100 font-semibold text-gray-600 text-xs">
//             <tr>
//               <th className="px-4 py-3">Order ID</th>
//               <th className="px-4 py-3">Products</th>
//               <th className="px-4 py-3">Customer</th>
//               <th className="px-4 py-3">Merchant</th>
//               <th className="px-4 py-3 text-right">Subtotal</th>
//               <th className="px-4 py-3 text-right">Discount</th>
//               <th className="px-4 py-3 text-right">Delivery</th>
//               <th className="px-4 py-3 text-right">Total</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3">Date</th>
//               <th className="px-4 py-3 text-right">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {paginated.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={11}
//                   className="px-4 py-6 text-center text-gray-500"
//                 >
//                   No orders found matching your search.
//                 </td>
//               </tr>
//             ) : (
//               paginated.map((order) => (
//                 <tr
//                   key={order.id}
//                   className="border-b border-gray-200 hover:bg-gray-50 text-gray-600 text-sm"
//                 >
//                   <td className="px-4 py-3 font-medium text-gray-800">
//                     {order.id}
//                   </td>

//                   <td className="px-4 py-3">
//                     {order.items && order.items.length > 0 ? (
//                       <div className="flex items-center gap-2">
//                         <div className="w-10 h-10 rounded border border-gray-200 flex items-center justify-center bg-gray-50 overflow-hidden flex-shrink-0">
//                           <img
//                             src={getImageUrl(
//                               order.items[0].product?.imagePaths
//                             )}
//                             alt={
//                               order.items[0].product?.productName || "Product"
//                             }
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.style.display = "none";
//                               e.target.parentElement.innerHTML =
//                                 '<svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" /></svg>';
//                             }}
//                           />
//                         </div>
//                         <div className="min-w-0">
//                           <div className="text-xs font-medium text-gray-700 truncate">
//                             {order.items[0].product?.productName || "N/A"}
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             {order.items.length} item
//                             {order.items.length > 1 ? "s" : ""}
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <span className="text-gray-400">No items</span>
//                     )}
//                   </td>

//                   <td className="px-4 py-3">
//                     <div className="font-medium text-gray-800">
//                       {order.customer?.name ||
//                         order.customer?.username ||
//                         "N/A"}
//                     </div>
//                     <div className="text-xs text-gray-400">
//                       ID: {order.customer?.id || "N/A"}
//                     </div>
//                   </td>

//                   <td className="px-4 py-3">
//                     <div className="font-medium text-gray-800">
//                       {order.merchant?.name ||
//                         order.merchant?.username ||
//                         "N/A"}
//                     </div>
//                     <div className="text-xs text-gray-400">
//                       ID: {order.merchant?.id || "N/A"}
//                     </div>
//                   </td>

//                   <td className="px-4 py-3 text-right">
//                     {rupee(order.subtotal || 0)}
//                   </td>

//                   <td className="px-4 py-3 text-right text-green-600">
//                     -{rupee(order.discountAmount || 0)}
//                   </td>

//                   <td className="px-4 py-3 text-right">
//                     {rupee(order.deliveryCharge || 0)}
//                   </td>

//                   <td className="px-4 py-3 text-right font-semibold text-gray-800">
//                     {rupee(order.totalPrice || 0)}
//                   </td>

//                   <td className="px-4 py-3">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                         order.status
//                       )}`}
//                     >
//                       {order.status || "UNKNOWN"}
//                     </span>
//                   </td>

//                   <td className="px-4 py-3">
//                     <div className="text-xs">
//                       {formatDate(order.createdAt).split(",")[0]}
//                     </div>
//                     <div className="text-xs text-gray-400">
//                       {formatDate(order.createdAt).split(",")[1]}
//                     </div>
//                   </td>

//                   <td className="px-4 py-3 text-right">
//                     <button
//                       onClick={() => handleViewOrder(order.id)}
//                       className="px-3 py-1 text-xs border rounded-md text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition inline-flex items-center gap-1"
//                     >
//                       <EyeIcon className="w-4 h-4" />
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Cards */}
//       <div className="md:hidden space-y-4">
//         {paginated.length === 0 ? (
//           <div className="p-6 text-center text-gray-500 bg-white rounded-lg">
//             No orders found matching your search.
//           </div>
//         ) : (
//           paginated.map((order) => (
//             <motion.div
//               key={order.id}
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.18 }}
//               className="bg-white shadow-sm rounded-lg p-4 border border-gray-200"
//             >
//               <div className="flex justify-between items-start mb-3">
//                 <div>
//                   <h3 className="font-semibold text-gray-800">
//                     Order {order.id}
//                   </h3>
//                   <span
//                     className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                       order.status
//                     )}`}
//                   >
//                     {order.status || "UNKNOWN"}
//                   </span>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-sm font-semibold text-gray-700">
//                     {rupee(order.totalPrice || 0)}
//                   </div>
//                   <div className="text-xs text-gray-400">
//                     {order.items?.length || 0} item(s)
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-3 text-sm text-gray-600 space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Customer:</span>
//                   <span className="font-medium">
//                     {order.customer?.name || order.customer?.username || "N/A"}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Merchant:</span>
//                   <span className="font-medium">
//                     {order.merchant?.name || order.merchant?.username || "N/A"}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Subtotal:</span>
//                   <span>{rupee(order.subtotal || 0)}</span>
//                 </div>
//                 {order.discountAmount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Discount:</span>
//                     <span>-{rupee(order.discountAmount)}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Delivery:</span>
//                   <span>{rupee(order.deliveryCharge || 0)}</span>
//                 </div>
//                 <div className="text-xs text-gray-400 pt-2 border-t">
//                   {formatDate(order.createdAt)}
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <button
//                   onClick={() => handleViewOrder(order.id)}
//                   className="w-full px-3 py-2 text-sm border rounded-md text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition flex items-center justify-center gap-2"
//                 >
//                   <EyeIcon className="w-4 h-4" />
//                   View Details
//                 </button>
//               </div>
//             </motion.div>
//           ))
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-end items-center mt-6 gap-2 text-sm">
//           <button
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={page === 1}
//             className="px-3 py-1 rounded-md disabled:opacity-50 hover:text-green-600 disabled:hover:text-inherit"
//           >
//             Prev
//           </button>

//           {(() => {
//             const pages = [];
//             const maxShown = 5;
//             let start = Math.max(1, page - Math.floor(maxShown / 2));
//             let end = start + maxShown - 1;
//             if (end > totalPages) {
//               end = totalPages;
//               start = Math.max(1, end - maxShown + 1);
//             }
//             for (let i = start; i <= end; i++) {
//               pages.push(i);
//             }
//             return pages.map((num) => (
//               <button
//                 key={num}
//                 onClick={() => setPage(num)}
//                 className={`px-3 py-1 border rounded-md ${
//                   page === num
//                     ? "bg-green-600 text-white"
//                     : "hover:bg-green-600 hover:text-white"
//                 }`}
//               >
//                 {num}
//               </button>
//             ));
//           })()}

//           <button
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             disabled={page === totalPages}
//             className="px-3 py-1 rounded-md disabled:opacity-50 hover:text-green-600 disabled:hover:text-inherit"
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {/* Order Details Modal */}
//       {selectedOrder && (
//         <div className="fixed inset-0 bg-black/50 bg-opacity-75 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
//               <h3 className="text-lg font-semibold text-gray-800">
//                 Order Details - {selectedOrder.id}
//               </h3>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-400 hover:text-gray-600 text-2xl"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Customer</p>
//                   <p className="font-medium">
//                     {selectedOrder.customer?.name ||
//                       selectedOrder.customer?.username ||
//                       "N/A"}
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     ID: {selectedOrder.customer?.id}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Merchant</p>
//                   <p className="font-medium">
//                     {selectedOrder.merchant?.name ||
//                       selectedOrder.merchant?.username ||
//                       "N/A"}
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     ID: {selectedOrder.merchant?.id}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Status</p>
//                   <span
//                     className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                       selectedOrder.status
//                     )}`}
//                   >
//                     {selectedOrder.status || "UNKNOWN"}
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Order Date</p>
//                   <p className="font-medium text-sm">
//                     {formatDate(selectedOrder.createdAt)}
//                   </p>
//                 </div>
//               </div>

//               {selectedOrder.promoCode && (
//                 <div className="bg-green-50 border border-green-200 rounded p-3">
//                   <p className="text-sm text-gray-600">Promo Code Applied</p>
//                   <p className="font-semibold text-green-700">
//                     {selectedOrder.promoCode}
//                   </p>
//                 </div>
//               )}

//               <div className="border-t pt-4">
//                 <h4 className="font-semibold mb-3">Order Items</h4>
//                 {selectedOrder.items && selectedOrder.items.length > 0 ? (
//                   <div className="space-y-2">
//                     {selectedOrder.items.map((item, idx) => (
//                       <div
//                         key={idx}
//                         className="flex items-center gap-3 p-3 bg-gray-50 rounded"
//                       >
//                         <div className="w-16 h-16 rounded border border-gray-200 flex items-center justify-center bg-white overflow-hidden flex-shrink-0">
//                           <img
//                             src={getImageUrl(item.product?.imagePaths)}
//                             alt={item.product?.productName || "Product"}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.style.display = "none";
//                               e.target.parentElement.innerHTML =
//                                 '<svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" /></svg>';
//                             }}
//                           />
//                         </div>
//                         <div className="flex-1">
//                           <p className="font-medium">
//                             {item.product?.productName || "N/A"}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             Qty: {item.quantity} ×{" "}
//                             {rupee(item.pricePerUnit || 0)}
//                           </p>
//                         </div>
//                         <p className="font-semibold">
//                           {rupee(item.totalPrice || 0)}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-500 text-sm">No items found</p>
//                 )}
//               </div>

//               <div className="border-t pt-4 space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span>{rupee(selectedOrder.subtotal || 0)}</span>
//                 </div>
//                 {selectedOrder.discountAmount > 0 && (
//                   <div className="flex justify-between text-sm text-green-600">
//                     <span>Discount</span>
//                     <span>-{rupee(selectedOrder.discountAmount)}</span>
//                   </div>
//                 )}
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Delivery Charge</span>
//                   <span>{rupee(selectedOrder.deliveryCharge || 0)}</span>
//                 </div>
//                 <div className="flex justify-between font-semibold text-lg border-t pt-2">
//                   <span>Total</span>
//                   <span>{rupee(selectedOrder.totalPrice || 0)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// *******************************************************************************************

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Helper function
const rupee = (v) => `₹${v}`;

// Mock Orders Data - Exported for use in OrderDetail
const mockOrders = [
  {
    id: 1,
    productImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    productName: "Fresh Red Apples",
    quantity: "1kg",
    orderNumber: "#JHG400824SG",
    merchant: "Fresh Fruits Shop",
    merchantImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    customer: "Anand Patil",
    location: "Baner, Pune",
    shippingAddress: "298, 14 Baner Rd, 45 Kofi Annan St, Pune",
    amount: 120,
    paymentMode: "COD",
    orderDate: "23 Nov 2025",
    orderTime: "3:47 PM",
    deliveryDate: "23 Feb 2025",
    deliveryTime: "4:10 PM",
    color: "Red",
    deliveryPartner: "Dean Smith",
    deliveryPartnerImage:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Dean",
  },
  {
    id: 2,
    productImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    productName: "Black Polyurethane Watch",
    quantity: 1,
    orderNumber: "#JHG400824SG",
    merchant: "Green Farm Store",
    merchantImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    customer: "Vijay Patil",
    location: "Baner, Pune",
    shippingAddress: "123 Main St, Pune",
    amount: 50,
    paymentMode: "Online",
    orderDate: "22 Nov 2025",
    orderTime: "2:10 PM",
    deliveryDate: "22 Nov 2025",
    deliveryTime: "2:40 AM",
    color: "Black",
    deliveryPartner: "John Doe",
    deliveryPartnerImage:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: 3,
    productImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    productName: "Crimson Edge Sandwich...",
    quantity: 1,
    orderNumber: "#JHG400824SG",
    merchant: "Bharat Vegetables",
    merchantImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    customer: "Pavan Panchal",
    location: "Baner, Pune",
    amount: "60",
    orderDate: "22 Nov 2025",
    orderTime: "2:50 PM",
    deliveryDate: "22 Nov 2025",
    deliveryTime: "3:10 AM",
  },
  {
    id: 4,
    productImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    productName: "Green Solid Polo T-Shirt",
    quantity: 1,
    orderNumber: "#JHG400824SG",
    merchant: "Green Farm Store",
    merchantImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    customer: "Vijay Patil",
    location: "Baner, Pune",
    amount: "25",
    orderDate: "19 Nov 2025",
    orderTime: "3:47 PM",
    deliveryDate: "9 Feb 2022",
    deliveryTime: "11:00 AM",
  },
  {
    id: 5,
    productImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    productName: "GTR 2e Smartwatch with...",
    quantity: 1,
    orderNumber: "#JHG400824SG",
    merchant: "Bharat Vegetables",
    merchantImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    customer: "Pavan Panchal",
    location: "Baner, Pune",
    amount: "55",
    orderDate: "7 Feb 2022",
    orderTime: "3:47 PM",
    deliveryDate: "9 Feb 2022",
    deliveryTime: "11:00 AM",
  },
  {
    id: 6,
    productImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    productName: "Slim Men's T-shirt With Flat...",
    quantity: 1,
    orderNumber: "#JHG400824SG",
    merchant: "Green Farm Store",
    merchantImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    customer: "Vijay Patil",
    location: "Baner, Pune",
    amount: "20",
    orderDate: "7 Feb 2022",
    orderTime: "3:47 PM",
    deliveryDate: "9 Feb 2022",
    deliveryTime: "11:00 AM",
  },
  {
    id: 7,
    productImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    productName: "Natural Makeup Lipstick",
    quantity: 2,
    orderNumber: "#JHG400824SG",
    merchant: "Natural Dairy Shop",
    merchantImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    customer: "Gerald Gibson",
    location: "Baner, Pune",
    amount: "80",
    orderDate: "7 Feb 2022",
    orderTime: "3:47 PM",
    deliveryDate: "9 Feb 2022",
    deliveryTime: "11:00 AM",
  },
  {
    id: 8,
    productImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    productName: "Sport Blue Stripes Backpack",
    quantity: 1,
    orderNumber: "#JHG400824SG",
    merchant: "Bharat Vegetables",
    merchantImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    customer: "Pavan Panchal",
    location: "Baner, Pune",
    amount: "35",
    orderDate: "7 Feb 2022",
    orderTime: "3:47 PM",
    deliveryDate: "9 Feb 2022",
    deliveryTime: "11:00 AM",
  },
  {
    id: 9,
    productImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    productName: "Fold Up Baby Rocker/Seat",
    quantity: 1,
    orderNumber: "#JHG400824SG",
    merchant: "Meat Shop",
    merchantImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    customer: "Johnny Cunningham",
    location: "Baner, Pune",
    amount: "210",
    orderDate: "7 Feb 2022",
    orderTime: "3:47 PM",
    deliveryDate: "9 Feb 2022",
    deliveryTime: "11:00 AM",
  },
  {
    id: 10,
    productImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    productName: "Blue Zayn Boots",
    quantity: 1,
    orderNumber: "#JHG400824SG",
    merchant: "Sunshine",
    merchantImage:
      "https://images.wisegeek.com/group-of-fruits-and-vegetables.jpg",
    customer: "Christopher Page",
    location: "Baner, Pune",
    amount: "15",
    orderDate: "7 Feb 2022",
    orderTime: "3:47 PM",
    deliveryDate: "9 Feb 2022",
    deliveryTime: "11:00 AM",
  },
];

const Orders = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const orders = mockOrders;

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();

    return (
      order.productName.toLowerCase().includes(search) ||
      order.orderNumber.toLowerCase().includes(search) ||
      order.merchant.toLowerCase().includes(search) ||
      order.customer.toLowerCase().includes(search)
    );
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            In Progress Orders ({filteredOrders.length})
          </h1>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 " />
            <input
              type="text"
              placeholder="Search by name or order id"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            />
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  Product Name
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  Order #
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  Merchant / Seller
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  Customer
                </th>
                <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  Order Date
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  Delivery Date
                </th>
                <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-lg overflow-hidden mr-3 border border-gray-200">
                        <img
                          src={order.productImage}
                          alt={order.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.productName}
                        </div>
                        <div className="text-sm text-gray-500">
                          Quantity: {order.quantity}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border border-gray-200">
                        <img
                          src={order.merchantImage}
                          alt={order.merchant}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <span className="text-sm text-gray-900">
                        {order.merchant}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">
                      {order.customer}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.location}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center text-sm font-medium text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">
                      {order.orderDate}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.orderTime}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">
                      {order.deliveryDate}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.deliveryTime}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => navigate(`/orders/${order.id}`)}
                      className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors text-sm font-medium"
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {paginatedOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                <img
                  src={order.productImage}
                  alt={order.productName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {order.productName}
                </h3>
                <p className="text-xs text-gray-500 mb-1">
                  Quantity: {order.quantity}
                </p>
                <p className="text-xs text-gray-600">{order.orderNumber}</p>
              </div>
              <div className="text-sm font-bold text-gray-900">
                {order.amount}
              </div>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={order.merchantImage}
                    alt={order.merchant}
                    className="w-full h-full object-cover"
                  />
                </div>

                <span className="text-sm text-gray-700">{order.merchant}</span>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">
                  {order.customer}
                </p>
                <p className="text-xs text-gray-500">{order.location}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Order Date</p>
                  <p className="text-sm text-gray-900">{order.orderDate}</p>
                  <p className="text-xs text-gray-500">{order.orderTime}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Delivery Date</p>
                  <p className="text-sm text-gray-900">{order.deliveryDate}</p>
                  <p className="text-xs text-gray-500">{order.deliveryTime}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(`/orders/${order.id}`)}
              className="w-full px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors text-sm font-medium"
            >
              View Detail
            </button>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center text-gray-500 py-10">No orders found</div>
      )}

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-2 text-sm rounded-md ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            PREV
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 text-sm rounded-md ${
                  currentPage === page
                    ? "bg-green-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 text-sm rounded-md ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            NEXT
          </button>
        </div>
      )}
    </div>
  );
};

// Export rupee helper for OrderDetail
export { rupee, mockOrders };

export default Orders;
