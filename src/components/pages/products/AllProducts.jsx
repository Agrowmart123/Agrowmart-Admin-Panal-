// Static  Version

// import React, { useState, useMemo, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, ChevronDown } from "lucide-react";

// // Dummy data
// const DUMMY_PRODUCTS = [
//   {
//     id: 1,
//     productName: "Kids Black Leather Turin II AC PS Sneakers",
//     code: "09324893092",
//     minPrice: 80,
//     maxPrice: 100,
//     imageUrls: [
//       "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     ],
//     merchantName: "Farm Store",
//     vendorType: "Vegetable & Fruit",
//     vendorImage:
//       "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     createdAt: "2020-02-03",
//     stockStatus: 100,
//     categoryName: "Footwear",
//     status: "Approved",
//   },
//   {
//     id: 2,
//     productName: "Men's The 500-Day T-Shirt",
//     code: "09324893092",
//     minPrice: 150,
//     maxPrice: 200,
//     imageUrls: [
//       "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     ],
//     merchantName: "Farm Store",
//     vendorType: "Seafood & Meat",
//     vendorImage:
//       "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     createdAt: "2020-12-26",
//     stockStatus: 58,
//     categoryName: "Vegetables",
//     status: "Pending Approvals",
//   },
//   {
//     id: 3,
//     productName: "Probass Boost Wireless Bluetooth Headphone - Black",
//     code: "09324893092",
//     minPrice: 45,
//     maxPrice: 70,
//     imageUrls: [
//       "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     ],
//     merchantName: "Fresh Farm Shop",
//     vendorType: "Vegetable & Fruit",
//     vendorImage:
//       "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     createdAt: "2021-04-12",
//     stockStatus: 27,
//     categoryName: "Vegetables",
//     status: "Pending Approvals",
//   },
//   {
//     id: 4,
//     productName: "Half Sleeve Frock For Baby Girls",
//     code: "09324893092",
//     minPrice: 210,
//     maxPrice: 250,
//     imageUrls: [
//       "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     ],
//     merchantName: "Meat Shop",
//     vendorType: "Seafood & Meat",
//     vendorImage:
//       "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     createdAt: "2021-10-19",
//     stockStatus: 89,
//     categoryName: "Meat",
//     status: "Approved",
//   },
//   {
//     id: 5,
//     productName: "Textile Regular Lace Up Mens Sneakers",
//     code: "09324893092",
//     minPrice: 60,
//     maxPrice: 80,
//     imageUrls: [
//       "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     ],
//     merchantName: "Fresh Farm Shop",
//     vendorType: "Vegetable & Fruit",
//     vendorImage:
//       "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     createdAt: "2021-01-21",
//     stockStatus: 58,
//     categoryName: "Vegetables",
//     status: "Approved",
//   },
//   {
//     id: 6,
//     productName: "Water-resistant School Backpack Travel Bag",
//     code: "09324893092",
//     minPrice: 75,
//     maxPrice: 90,
//     imageUrls: [
//       "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     ],
//     merchantName: "Fresh Farm Shop",
//     vendorType: "Vegetable & Fruit",
//     vendorImage:
//       "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     createdAt: "2021-05-05",
//     stockStatus: 83,
//     categoryName: "Vegetables",
//     status: "Approved",
//   },
//   {
//     id: 7,
//     productName: "Stewit Pop It for Kids",
//     code: "09324893092",
//     minPrice: 250,
//     maxPrice: 300,
//     imageUrls: [
//       "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     ],
//     merchantName: "Seafood store",
//     vendorType: "Seafood & Meat",
//     vendorImage:
//       "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     createdAt: "2021-12-10",
//     stockStatus: 23,
//     categoryName: "Seafood",
//     status: "Rejected",
//   },
//   {
//     id: 8,
//     productName: "Stewit Pop It for Kids",
//     code: "09324893092",
//     minPrice: 100,
//     maxPrice: 150,
//     imageUrls: [
//       "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     ],
//     merchantName: "Meat Shop",
//     vendorType: "Seafood & Meat",
//     vendorImage:
//       "https://www.bing.com/th/id/OIP.-2QdepLpzF3_krchZtFKpQHaE8?w=266&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
//     createdAt: "2020-02-25",
//     stockStatus: 93,
//     categoryName: "Meat",
//     status: "Rejected",
//   },
// ];

// export default function AllProducts() {
//   const navigate = useNavigate();

//   const sortOptions = [
//     "Sort By : Most Popular",
//     "Sort By : Newest First",
//     "Sort By : Price Low to High",
//     "Sort By : Price High to Low",
//   ];

//   const vendorOptions = [
//     "Vegetable & Fruit",
//     "Seafood & Meat",
//     "Dairy Vendor",
//     "Agri Vendor",
//     "Women Empowerment",
//     "Handcrafts",
//   ];

//   const statusOptions = ["Pending Approvals", "Approved", "Rejected"];

//   const [selectedCategory, setSelectedCategory] = useState("All Categories");
//   const [sortBy, setSortBy] = useState("Sort By : Most Popular");
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [statusFilter, setStatusFilter] = useState("");
//   const [vendorFilter, setVendorFilter] = useState("");

//   const itemsPerPage = 8;

//   const [products, setProducts] = useState(() => {
//     return DUMMY_PRODUCTS;
//   });

//   const [categories, setCategories] = useState([
//     { id: 0, name: "All Categories" },
//     { id: 1, name: "Vegetables" },
//     { id: 2, name: "Meat" },
//     { id: 3, name: "Seafood" },
//     { id: 4, name: "Footwear" },
//   ]);

//   // useEffect(() => {
//   //   if (products.length > 0) {
//   //     localStorage.setItem("allProducts", JSON.stringify(products));
//   //   }
//   // }, [products]);

//   // ================= FILTER + SORT =================
//   const filtered = useMemo(() => {
//     let list = products.filter((p) => {
//       const q = search.trim().toLowerCase();

//       const matchesCategory =
//         selectedCategory === "All Categories" ||
//         p.categoryName === selectedCategory;

//       const matchesSearch =
//         q === "" ||
//         p.productName?.toLowerCase().includes(q) ||
//         String(p.minPrice ?? "").includes(q) ||
//         String(p.maxPrice ?? "").includes(q) ||
//         String(p.merchantName).toLowerCase().includes(q);

//       const matchesVendor = !vendorFilter || p.vendorType === vendorFilter;

//       const matchesStatus = !statusFilter || p.status === statusFilter;

//       return matchesCategory && matchesSearch && matchesVendor && matchesStatus;
//     });

//     if (sortBy.includes("Price Low to High")) {
//       list.sort((a, b) => (a.minPrice ?? 0) - (b.minPrice ?? 0));
//     } else if (sortBy.includes("Price High to Low")) {
//       list.sort((a, b) => (b.maxPrice ?? 0) - (a.maxPrice ?? 0));
//     } else if (sortBy.includes("Newest")) {
//       list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     }

//     return list;
//   }, [products, selectedCategory, search, sortBy, vendorFilter, statusFilter]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

//   useEffect(() => {
//     if (page > totalPages) {
//       setPage(1);
//     }
//   }, [page, totalPages]);

//   const paginated = filtered.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage,
//   );

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Approved":
//         return "text-green-700";
//       case "Pending Approvals":
//         return "text-amber-700";
//       case "Rejected":
//         return "text-red-700";
//       default:
//         return "text-gray-700";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white p-3 md:p-6">
//       <div className="max-w-full mx-auto">
//         {/* ================= HEADER SECTION ================= */}
//         <div className="mb-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//             {/* Title */}
//             <h1 className="text-lg md:text-xl font-semibold text-gray-900 whitespace-nowrap">
//               All Products ({filtered.length})
//             </h1>

//             {/* Filters Row */}
//             <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
//               {/* Search */}
//               <div className="relative flex-1 md:w-72">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search by name, email or phone"
//                   value={search}
//                   onChange={(e) => {
//                     setSearch(e.target.value);
//                     setPage(1);
//                   }}
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
//                 />
//               </div>

//               {/* Sort */}
//               <div className="relative w-full sm:w-56">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded appearance-none bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
//                 >
//                   {sortOptions.map((opt) => (
//                     <option key={opt}>{opt}</option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
//               </div>

//               {/* Category */}
//               <div className="relative w-full sm:w-48">
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded appearance-none bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
//                 >
//                   {categories.map((cat) => (
//                     <option key={cat.id ?? cat.name} value={cat.name}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ================= DESKTOP TABLE VIEW ================= */}
//         <div className="hidden lg:block bg-white border border-gray-200 rounded overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
// <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">                  Product Name
//                 </th>
// <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">                  Min Price
//                 </th>
// <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">                  Max Price
//                 </th>

//                 <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase relative group tracking-wider">
//                   <div className="flex items-center gap-1 cursor-pointer">
//                     Vendor
//                     <ChevronDown className="w-3 h-3" />
//                   </div>
//                   <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg py-1 z-10 hidden group-hover:block min-w-[180px]">
//                     {vendorOptions.map((vendor) => (
//                       <button
//                         key={vendor}
//                         onClick={() => setVendorFilter(vendor)}
//                         className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 text-gray-700"
//                       >
//                         {vendor}
//                       </button>
//                     ))}
//                   </div>
//                 </th>
//                 <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">
//                   Added Date
//                 </th>
//                 <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">
//                   Stock
//                 </th>
//                 <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">
//                   Category
//                 </th>
//                 <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase relative group tracking-wider">
//                   <div className="flex items-center justify-center gap-1 cursor-pointer">
//                     Status
//                     <ChevronDown className="w-3 h-3" />
//                   </div>

//                   <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-white border border-gray-200 rounded shadow-lg py-1 z-10 hidden group-hover:block min-w-[160px]">
//                     {statusOptions.map((status) => (
//                       <button
//                         key={status}
//                         onClick={() => setStatusFilter(status)}
//                         className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 text-gray-700"
//                       >
//                         {status}
//                       </button>
//                     ))}
//                   </div>
//                 </th>

//                 <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginated.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={9}
//                     className="px-4 py-8 text-center text-gray-500 text-sm"
//                   >
//                     No products found
//                   </td>
//                 </tr>
//               ) : (
//                 paginated.map((p, index) => (
//                   <tr
//                     key={p.id}
//                     className={`border-b border-gray-200 hover:bg-gray-50 ${
//                       index === paginated.length - 1 ? "border-b-0" : ""
//                     }`}
//                   >
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={p.imageUrls?.[0]}
//                           alt={p.productName}
//                           className="w-10 h-10 rounded object-cover"
//                         />
//                         <div>
//                           <div className="text-sm font-medium text-gray-900 leading-tight">
//                             {p.productName}
//                           </div>
//                           <div className="text-xs text-gray-500">{p.code}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-900">
//                       ₹{p.minPrice}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-900">
//                       ₹{p.maxPrice}
//                     </td>

//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-2">
//                         <img
//                           src={p.vendorImage}
//                           alt={p.merchantName}
//                           className="w-8 h-8 rounded-full object-cover flex-shrink-0"
//                         />
//                         <span className="text-sm text-gray-900">
//                           {p.merchantName}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-600">
//                       {new Date(p.createdAt).toLocaleDateString("en-GB")}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-900">
//                       {p.stockStatus}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-900">
//                       {p.categoryName}
//                     </td>
//                     <td className="text-center">
//                       <span className={`text-sm  ${getStatusColor(p.status)}`}>
//                         {p.status}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">
//                       <button
//                         onClick={() => navigate(`/product/${p.id}`)}
//                         className="px-3 py-1 border border-green-600 text-green-600 rounded text-xs hover:bg-green-50 transition-colors font-medium"
//                       >
//                         View Detail
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* ================= MOBILE/TABLET CARD VIEW ================= */}
//         <div className="lg:hidden space-y-3">
//           {paginated.length === 0 ? (
//             <div className="bg-white rounded border border-gray-200 p-6 text-center text-gray-500 text-sm">
//               No products found
//             </div>
//           ) : (
//             paginated.map((p) => (
//               <div
//                 key={p.id}
//                 className="bg-white rounded border border-gray-200 p-4"
//               >
//                 <div className="flex items-start gap-3 mb-3">
//                   <img
//                     src={p.imageUrls?.[0]}
//                     alt={p.productName}
//                     className="w-14 h-14 rounded object-cover flex-shrink-0"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-sm font-medium text-gray-900 mb-0.5 truncate">
//                       {p.productName}
//                     </h3>
//                     <p className="text-xs text-gray-500 mb-1">{p.code}</p>
//                     <div className="flex items-center gap-1.5">
//                       <img
//                         src={p.vendorImage}
//                         alt={p.merchantName}
//                         className="w-6 h-6 rounded-full object-cover flex-shrink-0"
//                       />
//                       <p className="text-xs text-gray-600">{p.merchantName}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
//                   <div className="bg-gray-50 p-2 rounded">
//                     <span className="text-gray-500">Min Price:</span>
//                     <div className="text-gray-900 font-medium">
//                       ₹{p.minPrice}
//                     </div>
//                   </div>
//                   <div className="bg-gray-50 p-2 rounded">
//                     <span className="text-gray-500">Max Price:</span>
//                     <div className="text-gray-900 font-medium">
//                       ₹{p.maxPrice}
//                     </div>
//                   </div>
//                   <div className="bg-gray-50 p-2 rounded">
//                     <span className="text-gray-500">Stock:</span>
//                     <div className="text-gray-900 font-medium">
//                       {p.stockStatus}
//                     </div>
//                   </div>
//                   <div className="bg-gray-50 p-2 rounded">
//                     <span className="text-gray-500">Category:</span>
//                     <div className="text-gray-900 font-medium">
//                       {p.categoryName}
//                     </div>
//                   </div>
//                   <div className="bg-gray-50 p-2 rounded col-span-2">
//                     {" "}
//                     {/* Optional: Make Date full-width if needed */}
//                     <span className="text-gray-500">Date:</span>
//                     <div className="text-gray-900 font-medium">
//                       {new Date(p.createdAt).toLocaleDateString("en-GB")}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <span
//                     className={`text-xs px-2 py-1 rounded ${getStatusColor(p.status)}`}
//                   >
//                     {p.status}
//                   </span>
//                   <button
//                     onClick={() => navigate(`/product/${p.id}`)}
//                     className="px-3 py-1 border border-green-600 text-green-600 rounded text-xs hover:bg-green-50 transition-colors font-medium"
//                   >
//                     View Detail
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* ================= PAGINATION ================= */}
//         <div className="flex justify-center items-center mt-6 gap-2 text-sm select-none">
//           <button
//             onClick={() => page > 1 && setPage(page - 1)}
//             disabled={page === 1}
//             className={`px-3 py-1 rounded ${
//               page === 1
//                 ? "text-gray-300 cursor-not-allowed"
//                 : "text-gray-700 hover:text-green-600"
//             }`}
//           >
//             PREV
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

//             for (let i = start; i <= end; i++) pages.push(i);

//             return pages.map((num) => (
//               <button
//                 key={num}
//                 onClick={() => setPage(num)}
//                 className={`px-2.5 py-1 rounded border text-sm ${
//                   page === num
//                     ? "bg-green-600 text-white border-green-600"
//                     : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
//                 }`}
//               >
//                 {num}
//               </button>
//             ));
//           })()}

//           <button
//             onClick={() => page < totalPages && setPage(page + 1)}
//             disabled={page === totalPages}
//             className={`px-3 py-1 rounded ${
//               page === totalPages
//                 ? "text-gray-300 cursor-not-allowed"
//                 : "text-gray-700 hover:text-green-600"
//             }`}
//           >
//             NEXT
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// *****************************************************************************************

import React, { useRef, useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import { getAllProductsForAdmin } from "../../../api/adminProduct";

export default function AllProducts() {
  const navigate = useNavigate();
  const location = useLocation();

  const sortOptions = [
    "Sort By : Most Popular",
    "Sort By : Newest First",
    "Sort By : Price Low to High",
    "Sort By : Price High to Low",
  ];

  const vendorOptions = ["ALL", "VEGETABLE", "WOMEN", "DAIRY", "SEAFOOD"];

  // Normalize vendor type (ONE STANDARD)
  const normalizeVendorType = (type) => {
    if (!type) return "";

    const t = type.toLowerCase();

    if (t.includes("vegetable")) return "VEGETABLE";
    if (t.includes("women")) return "WOMEN";
    if (t.includes("dairy")) return "DAIRY";
    if (t.includes("seafood") || t.includes("meat")) return "SEAFOOD";

    return "";
  };

  const statusOptions = ["PENDING", "APPROVED", "REJECTED"];

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Sort By : Most Popular");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [vendorFilter, setVendorFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const firstLoadRef = useRef(true);

  const itemsPerPage = 8;

  const [allProducts, setAllProducts] = useState({
    vendorProducts: [],
    womenProducts: [],
  });

  const [categories, setCategories] = useState([
    { id: 0, name: "All Categories" },
  ]);

  const deletedRef = useRef({
    id: null,
    type: null,
  });

  // Fetch products from backend

  useEffect(() => {
    let intervalId;

    const fetchProducts = async () => {
      try {
        const data = await getAllProductsForAdmin();

        if (firstLoadRef.current) {
          setLoading(true);
        }

        if (data.success) {
          let vendorProducts = data.vendorProducts || [];
          let womenProducts = data.womenProducts || [];

          const deleted = deletedRef.current;

          if (deleted?.id && deleted?.type === "VENDOR") {
            vendorProducts = vendorProducts.filter(
              (p) => String(p.id) !== deleted.id,
            );
          }

          if (deleted?.id && deleted?.type === "WOMEN") {
            womenProducts = womenProducts.filter(
              (p) => String(p.id) !== deleted.id,
            );
          }

          setAllProducts({
            vendorProducts,
            womenProducts,
          });

          const uniqueCategories = new Set();

          vendorProducts.forEach((p) => {
            if (p.categoryName) uniqueCategories.add(p.categoryName);
          });
          womenProducts.forEach((p) => {
            if (p.category) uniqueCategories.add(p.category);
          });

          setCategories([
            { id: 0, name: "All Categories" },
            ...Array.from(uniqueCategories).map((name, idx) => ({
              id: idx + 1,
              name,
            })),
          ]);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        if (firstLoadRef.current) {
          setLoading(false);
          firstLoadRef.current = false;
        }
      }
    };

    // First load
    fetchProducts();

    //  Poll every 5 seconds (REAL-TIME FEEL)
    intervalId = setInterval(fetchProducts, 3000);

    //  Refetch when admin comes back to tab
    const onFocus = () => fetchProducts();
    window.addEventListener("focus", onFocus);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  useEffect(() => {
    const deletedId = location.state?.deletedProductId;
    const deletedType = location.state?.deletedProductType;

    if (!deletedId || !deletedType) return;

    deletedRef.current = {
      id: String(deletedId),
      type: deletedType,
    };

    setAllProducts((prev) => {
      if (deletedType === "VENDOR") {
        return {
          ...prev,
          vendorProducts: prev.vendorProducts.filter(
            (p) => String(p.id) !== String(deletedId),
          ),
        };
      }

      if (deletedType === "WOMEN") {
        return {
          ...prev,
          womenProducts: prev.womenProducts.filter(
            (p) => String(p.id) !== String(deletedId),
          ),
        };
      }

      return prev;
    });

    navigate(location.pathname, { replace: true });
  }, [location.state]);

  // Combine and normalize products
  const normalizedProducts = useMemo(() => {
    const vendorProds = (allProducts.vendorProducts ?? []).map((p) => ({
      id: p?.id ? `vendor-${p.id}` : null,
      productId: p?.id ?? null,
      productType: "VENDOR",
      productName: p?.productName ?? null,
      code: p?.id?.toString() ?? null,
      minPrice: p?.details?.minPrice ?? null,
      maxPrice: p?.details?.maxPrice ?? null,
      imageUrls: Array.isArray(p?.imageUrls)
        ? p.imageUrls
        : p?.imageUrls
          ? [p.imageUrls]
          : [],

      merchantName: p?.shop?.shopName ?? null,
      vendorImage: p?.shop?.shopPhoto ?? null,
      vendorType: normalizeVendorType(p?.productType),

      createdAt: p?.details?.product?.createdAt ?? null,
      stockStatus: p?.stockStatus ?? null,
      categoryName: p?.categoryName ?? null,
      status: p?.details?.product?.approvalStatus ?? null,
      serialNo: p?.serialNo ?? null,
    }));

    const womenProds = (allProducts.womenProducts ?? []).map((p) => ({
      id: p?.id ? `women-${p.id}` : null,
      productId: p?.id ?? null,
      productType: "WOMEN",
      productName: p?.name ?? null,
      code: p?.id?.toString() ?? null,
      minPrice: p?.minPrice ?? null,
      maxPrice: p?.maxPrice ?? null,

      imageUrls: Array.isArray(p?.imageUrls)
        ? p.imageUrls
        : p?.imageUrls
          ? [p.imageUrls]
          : [],

      merchantName: p?.shop?.shopName ?? null,
      vendorImage: p?.shop?.shopPhoto ?? null,
      vendorType: "WOMEN",

      createdAt: p?.createdAt ?? null,
      stockStatus: p?.stock ?? null,
      categoryName: p?.category ?? null,
      status: p?.status ?? null,
      serialNo: null,
    }));

    return [...vendorProds, ...womenProds];
  }, [allProducts]);

  // Filter & Sort
  const filtered = useMemo(() => {
    let list = normalizedProducts.filter((p) => {
      const q = search.trim().toLowerCase();

      const matchesCategory =
        selectedCategory === "All Categories" ||
        p.categoryName === selectedCategory;

      const matchesSearch =
        q === "" ||
        p.productName?.toLowerCase().includes(q) ||
        String(p.minPrice ?? "").includes(q) ||
        String(p.maxPrice ?? "").includes(q) ||
        String(p.merchantName).toLowerCase().includes(q);

      const matchesVendor = !vendorFilter || p.vendorType === vendorFilter;
      const matchesStatus = !statusFilter || p.status === statusFilter;

      return matchesCategory && matchesSearch && matchesVendor && matchesStatus;
    });

    if (sortBy.includes("Price Low to High")) {
      list.sort((a, b) => (a.minPrice ?? 0) - (b.minPrice ?? 0));
    } else if (sortBy.includes("Price High to Low")) {
      list.sort((a, b) => (b.maxPrice ?? 0) - (a.maxPrice ?? 0));
    } else if (sortBy.includes("Newest")) {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return list;
  }, [
    normalizedProducts,
    selectedCategory,
    search,
    sortBy,
    vendorFilter,
    statusFilter,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "text-green-700";
      case "PENDING":
        return "text-amber-700";
      case "REJECTED":
        return "text-red-700";
      default:
        return "text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-3 md:p-6">
      <div className="max-w-full mx-auto">
        {/* ================= HEADER SECTION ================= */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Title */}
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 whitespace-nowrap">
              All Products ({filtered.length})
            </h1>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-1 md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, price, or merchant"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>

              {/* Sort */}
              <div className="relative w-full sm:w-56">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded appearance-none bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>

              {/* Category */}
              <div className="relative w-full sm:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded appearance-none bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP TABLE VIEW ================= */}
        <div className="hidden lg:block bg-white border border-gray-200 rounded overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  Min Price
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  Max Price
                </th>

                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase relative group tracking-wider">
                  <div className="flex items-center gap-1 cursor-pointer">
                    Vendor
                    <ChevronDown className="w-3 h-3" />
                  </div>
                  <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded shadow-lg py-1 z-10 hidden group-hover:block min-w-[180px]">
                    {vendorOptions.map((vendor) => (
                      <button
                        key={vendor}
                        onClick={() =>
                          setVendorFilter(vendor === "ALL" ? "" : vendor)
                        }
                        className={`w-full text-left px-3 py-2 text-xs 
    ${
      vendorFilter === vendor || (vendor === "ALL" && !vendorFilter)
        ? "bg-gray-100 font-semibold"
        : "hover:bg-gray-50"
    }
  `}
                      >
                        {vendor}
                      </button>
                    ))}
                  </div>
                </th>
                <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  Added Date
                </th>
                <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase relative group tracking-wider">
                  <div className="flex items-center justify-center gap-1 cursor-pointer">
                    Status
                    <ChevronDown className="w-3 h-3" />
                  </div>

                  <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-white border border-gray-200 rounded shadow-lg py-1 z-10 hidden group-hover:block min-w-[160px]">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 text-gray-700"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </th>

                <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-8 text-center text-gray-500 text-sm"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                paginated.map((p, index) => (
                  <tr
                    key={p.id}
                    className={`border-b border-gray-200 hover:bg-gray-50 ${
                      index === paginated.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.imageUrls?.length && (
                          <img
                            src={p.imageUrls[0]}
                            alt={p.productName || ""}
                            className="w-10 h-10 rounded object-cover"
                          />
                        )}

                        <div>
                          <div className="text-sm font-medium text-gray-900 leading-tight">
                            {p.productName}
                          </div>
                          <div className="text-xs text-gray-500">{p.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {p.minPrice != null ? `₹${p.minPrice}` : ""}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {p.maxPrice != null ? `₹${p.maxPrice}` : ""}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={p.vendorImage}
                          alt={p.merchantName}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <span className="text-sm text-gray-900">
                          {p.merchantName}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {p.createdAt
                        ? new Date(p.createdAt).toLocaleDateString("en-GB")
                        : ""}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-900">
                      {p.stockStatus}
                    </td>
                    <td className="px-4 py-3  text-center text-sm text-gray-900">
                      {p.categoryName}
                    </td>
                    <td className="text-center">
                      <span className={`text-sm  ${getStatusColor(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() =>
                          navigate(
                            `/product/${p.productType.toLowerCase()}/${p.productId}`,
                          )
                        }
                        className="px-3 py-1 border border-green-600 text-green-600 rounded text-xs hover:bg-green-50 transition-colors font-medium"
                      >
                        View Detail
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE/TABLET CARD VIEW ================= */}
        <div className="lg:hidden space-y-3">
          {paginated.length === 0 ? (
            <div className="bg-white rounded border border-gray-200 p-6 text-center text-gray-500 text-sm">
              No products found
            </div>
          ) : (
            paginated.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded border border-gray-200 p-4"
              >
                <div className="flex items-start gap-3 mb-3">
                  {p.imageUrls?.length && (
                    <img
                      src={p.imageUrls[0]}
                      alt={p.productName || ""}
                      className="w-14 h-14 rounded object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 mb-0.5 truncate">
                      {p.productName}
                    </h3>
                    <p className="text-xs text-gray-500 mb-1">{p.code}</p>
                    <div className="flex items-center gap-1.5">
                      <img
                        src={p.vendorImage}
                        alt={p.merchantName}
                        className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                      />
                      <p className="text-xs text-gray-600">{p.merchantName}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">Min Price:</span>
                    <div className="text-gray-900 font-medium">
                      {p.minPrice != null ? `₹${p.minPrice}` : ""}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">Max Price:</span>
                    <div className="text-gray-900 font-medium">
                      {p.maxPrice != null ? `₹${p.maxPrice}` : ""}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">Stock:</span>
                    <div className="text-gray-900 font-medium">
                      {p.stockStatus}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">Category:</span>
                    <div className="text-gray-900 font-medium">
                      {p.categoryName}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded col-span-2">
                    <span className="text-gray-500">Date:</span>
                    <div className="text-gray-900 font-medium">
                      {p.createdAt
                        ? new Date(p.createdAt).toLocaleDateString("en-GB")
                        : ""}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-1 rounded ${getStatusColor(p.status)}`}
                  >
                    {p.status}
                  </span>
                  <button
                    onClick={() =>
                      navigate(
                        `/product/${p.productType.toLowerCase()}/${p.productId}`,
                      )
                    }
                    className="px-3 py-1 border border-green-600 text-green-600 rounded text-xs hover:bg-green-50 transition-colors font-medium"
                  >
                    View Detail
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-center items-center mt-6 gap-2 text-sm select-none">
          <button
            onClick={() => page > 1 && setPage(page - 1)}
            disabled={page === 1}
            className={`px-3 py-1 rounded ${
              page === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-700 hover:text-green-600"
            }`}
          >
            PREV
          </button>

          {(() => {
            const pages = [];
            const maxShown = 5;
            let start = Math.max(1, page - Math.floor(maxShown / 2));
            let end = start + maxShown - 1;

            if (end > totalPages) {
              end = totalPages;
              start = Math.max(1, end - maxShown + 1);
            }

            for (let i = start; i <= end; i++) pages.push(i);

            return pages.map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`px-2.5 py-1 rounded border text-sm ${
                  page === num
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {num}
              </button>
            ));
          })()}

          <button
            onClick={() => page < totalPages && setPage(page + 1)}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded ${
              page === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-700 hover:text-green-600"
            }`}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}
