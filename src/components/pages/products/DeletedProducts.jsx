
// Static Version


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, RotateCcw } from "lucide-react";
// import toast from "react-hot-toast";

// export default function DeletedProducts() {
//   const navigate = useNavigate();
//   const [deletedProducts, setDeletedProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 8;

//   useEffect(() => {
//     const stored = localStorage.getItem("deletedProducts");
//     if (stored) {
//       const parsed = JSON.parse(stored);

//       setDeletedProducts(
//         parsed.map((p) => ({
//           ...p,
//           minPrice: p.minPrice ?? p.minPice ?? 0,
//           maxPrice: p.maxPrice ?? 0,
//         })),
//       );
//     }
//   }, []);

//   const filtered = deletedProducts.filter((p) => {
//     const q = search.trim().toLowerCase();
//     return (
//       q === "" ||
//       p.productName?.toLowerCase().includes(q) ||
//       String(p.minPrice ?? "").includes(q) ||
//       String(p.maxPrice ?? "").includes(q) ||
//       String(p.merchantName).toLowerCase().includes(q)
//     );
//   });

//   const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
//   const paginated = filtered.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage,
//   );

//   const handleRestore = (productId) => {
//     if (!window.confirm("Do you want to restore this product?")) return;

//     const updatedDeleted = deletedProducts.filter((p) => p.id !== productId);
//     setDeletedProducts(updatedDeleted);
//     localStorage.setItem("deletedProducts", JSON.stringify(updatedDeleted));

//     const allProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");
//     const productToRestore = deletedProducts.find((p) => p.id === productId);
//     if (productToRestore) {
//       allProducts.push(productToRestore);
//       localStorage.setItem("allProducts", JSON.stringify(allProducts));
//     }

//     toast.success("Product successfully restored!");
//   };

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
//         {/* Header */}
//         <div className="mb-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//             {/* Heading on the left */}
//             <h1 className="text-lg md:text-xl font-semibold text-gray-900">
//               Deleted Products ({filtered.length})
//             </h1>

//             {/* Search on the right */}
//             <div className="relative w-full md:w-72">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search deleted products"
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(1);
//                 }}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Desktop Table */}
//         <div className="hidden lg:block bg-white border border-gray-200 rounded overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
//                   Product Name
//                 </th>
//                 <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
//                   Min Price
//                 </th>
//                 <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
//                   Max Price
//                 </th>
//                 <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
//                   Vendor
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
//                 <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">
//                   Status
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
//                     No deleted products found
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
//                     <td className="px-4 py-3 text-sm text-gray-600 text-center">
//                       {p.createdAt
//                         ? new Date(p.createdAt).toLocaleDateString("en-GB")
//                         : p.addedDate || "N/A"}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-900 text-center">
//                       {p.stockStatus}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-900 text-center">
//                       {p.categoryName}
//                     </td>
//                     <td className="text-center">
//                       <span className={`text-sm ${getStatusColor(p.status)}`}>
//                         {p.status}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-center">
//                       <button
//                         onClick={() => handleRestore(p.id)}
//                         className="inline-flex items-center gap-1 px-3 py-1 border border-blue-600 text-blue-600 rounded text-xs hover:bg-blue-50 transition-colors font-medium"
//                       >
//                         <RotateCcw className="w-3 h-3" />
//                         Restore
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Mobile Card View */}
//         <div className="lg:hidden space-y-3">
//           {paginated.length === 0 ? (
//             <div className="bg-white rounded border border-gray-200 p-6 text-center text-gray-500 text-sm">
//               No deleted products found
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
//                       {p.createdAt
//                         ? new Date(p.createdAt).toLocaleDateString("en-GB")
//                         : p.addedDate || "N/A"}
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
//                     onClick={() => handleRestore(p.id)}
//                     className="inline-flex items-center gap-1 px-3 py-1 border border-blue-600 text-blue-600 rounded text-xs hover:bg-blue-50 transition-colors font-medium"
//                   >
//                     <RotateCcw className="w-3 h-3" />
//                     Restore
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Pagination */}
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

// **********************************************************************************
// Axios Added Version

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, RotateCcw } from "lucide-react";
// import toast from "react-hot-toast";
// import productApi from "../../../api/adminProduct"; // relative path verify

// export default function DeletedProducts() {
//   const navigate = useNavigate();
//   const [deletedProducts, setDeletedProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 8;
//   const [loading, setLoading] = useState(false);

//   const fetchDeleted = async () => {
//     setLoading(true);
//     try {
//       const list = await productApi.getDeletedProducts();
//       // Expecting list items to contain some identifying fields and a __type if possible
//       setDeletedProducts(list);
//     } catch (err) {
//       console.error("Failed to fetch deleted products", err);
//       toast.error("Unable to load deleted products");
//       setDeletedProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDeleted();
//   }, []);

//   const filtered = deletedProducts.filter((p) => {
//     const q = search.trim().toLowerCase();
//     return (
//       q === "" ||
//       (p.productName && p.productName.toLowerCase().includes(q)) ||
//       String(p.minPrice ?? "").includes(q) ||
//       String(p.maxPrice ?? "").includes(q) ||
//       String(p.merchantName ?? "").toLowerCase().includes(q) ||
//       String(p.name ?? "").toLowerCase().includes(q)
//     );
//   });

//   const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
//   const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

//   const handleRestore = async (product) => {
//     if (!window.confirm("Do you want to restore this product?")) return;
//     try {
//       // Restore by approving (best-effort). Backend should ideally provide a restore endpoint.
//       const type = product.__type || "vendor"; // fallback
//       await productApi.restoreProduct(type, product.id);
//       toast.success("Product restored successfully");
//       // refresh list
//       fetchDeleted();
//     } catch (err) {
//       console.error("Restore failed", err);
//       toast.error("Restore failed");
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Approved":
//       case "APPROVED":
//         return "text-green-700";
//       case "Pending Approvals":
//       case "PENDING":
//         return "text-amber-700";
//       case "Rejected":
//       case "REJECTED":
//         return "text-red-700";
//       default:
//         return "text-gray-700";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white p-3 md:p-6">
//       <div className="max-w-full mx-auto">
//         <div className="mb-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//             <h1 className="text-lg md:text-xl font-semibold text-gray-900">Deleted Products ({filtered.length})</h1>

//             <div className="relative w-full md:w-72">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 placeholder="Search deleted products"
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(1);
//                 }}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
//               />
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div className="text-center py-10">Loading...</div>
//         ) : (
//           <>
//             <div className="hidden lg:block bg-white border border-gray-200 rounded overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">Product Name</th>
//                     <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">Min Price</th>
//                     <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">Max Price</th>
//                     <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">Vendor</th>
//                     <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">Added Date</th>
//                     <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">Stock</th>
//                     <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">Category</th>
//                     <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">Status</th>
//                     <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paginated.length === 0 ? (
//                     <tr>
//                       <td colSpan={9} className="px-4 py-8 text-center text-gray-500 text-sm">No deleted products found</td>
//                     </tr>
//                   ) : (
//                     paginated.map((p, index) => (
//                       <tr key={`${p.__type}_${p.id}_${index}`} className={`border-b border-gray-200 hover:bg-gray-50 ${index === paginated.length - 1 ? "border-b-0" : ""}`}>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-3">
//                             <img src={p.imageUrls?.[0] || p.imagePath || ""} alt={p.productName || p.name} className="w-10 h-10 rounded object-cover" />
//                             <div>
//                               <div className="text-sm font-medium text-gray-900 leading-tight">{p.productName || p.name}</div>
//                               <div className="text-xs text-gray-500">{p.code || p.uuid || ""}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-900">₹{p.minPrice ?? "-"}</td>
//                         <td className="px-4 py-3 text-sm text-gray-900">₹{p.maxPrice ?? "-"}</td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-2">
//                             <img src={p.vendorImage || p.seller?.image || ""} alt={p.merchantName || p.seller?.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
//                             <span className="text-sm text-gray-900">{p.merchantName || p.seller?.name}</span>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-sm text-gray-600 text-center">{p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-GB") : p.addedDate || "N/A"}</td>
//                         <td className="px-4 py-3 text-sm text-gray-900 text-center">{p.stockStatus ?? p.stock ?? "-"}</td>
//                         <td className="px-4 py-3 text-sm text-gray-900 text-center">{p.categoryName || p.category || "-"}</td>
//                         <td className="text-center"><span className={`text-sm ${getStatusColor(p.status || p.approvalStatus)}`}>{p.status || p.approvalStatus || "N/A"}</span></td>
//                         <td className="px-4 py-3 text-center">
//                           <button onClick={() => handleRestore(p)} className="inline-flex items-center gap-1 px-3 py-1 border border-blue-600 text-blue-600 rounded text-xs hover:bg-blue-50 transition-colors font-medium">
//                             <RotateCcw className="w-3 h-3" /> Restore
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Mobile */}
//             <div className="lg:hidden space-y-3">
//               {paginated.length === 0 ? (
//                 <div className="bg-white rounded border border-gray-200 p-6 text-center text-gray-500 text-sm">No deleted products found</div>
//               ) : (
//                 paginated.map((p) => (
//                   <div key={`${p.__type}_${p.id}`} className="bg-white rounded border border-gray-200 p-4">
//                     <div className="flex items-start gap-3 mb-3">
//                       <img src={p.imageUrls?.[0] || p.imagePath || ""} alt={p.productName || p.name} className="w-14 h-14 rounded object-cover flex-shrink-0" />
//                       <div className="flex-1 min-w-0">
//                         <h3 className="text-sm font-medium text-gray-900 mb-0.5 truncate">{p.productName || p.name}</h3>
//                         <p className="text-xs text-gray-500 mb-1">{p.code || p.uuid}</p>
//                         <div className="flex items-center gap-1.5">
//                           <img src={p.vendorImage || p.seller?.image || ""} alt={p.merchantName || p.seller?.name} className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
//                           <p className="text-xs text-gray-600">{p.merchantName || p.seller?.name}</p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
//                       <div className="bg-gray-50 p-2 rounded">
//                         <span className="text-gray-500">Min Price:</span>
//                         <div className="text-gray-900 font-medium">₹{p.minPrice ?? "-"}</div>
//                       </div>
//                       <div className="bg-gray-50 p-2 rounded">
//                         <span className="text-gray-500">Max Price:</span>
//                         <div className="text-gray-900 font-medium">₹{p.maxPrice ?? "-"}</div>
//                       </div>
//                       <div className="bg-gray-50 p-2 rounded">
//                         <span className="text-gray-500">Stock:</span>
//                         <div className="text-gray-900 font-medium">{p.stockStatus ?? p.stock ?? "-"}</div>
//                       </div>
//                       <div className="bg-gray-50 p-2 rounded">
//                         <span className="text-gray-500">Category:</span>
//                         <div className="text-gray-900 font-medium">{p.categoryName || p.category || "-"}</div>
//                       </div>
//                       <div className="bg-gray-50 p-2 rounded col-span-2">
//                         <span className="text-gray-500">Date:</span>
//                         <div className="text-gray-900 font-medium">{p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-GB") : p.addedDate || "N/A"}</div>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between">
//                       <span className={`text-xs px-2 py-1 rounded ${getStatusColor(p.status || p.approvalStatus)}`}>{p.status || p.approvalStatus || "N/A"}</span>
//                       <button onClick={() => handleRestore(p)} className="inline-flex items-center gap-1 px-3 py-1 border border-blue-600 text-blue-600 rounded text-xs hover:bg-blue-50 transition-colors font-medium">
//                         <RotateCcw className="w-3 h-3" /> Restore
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center items-center mt-6 gap-2 text-sm select-none">
//               <button onClick={() => page > 1 && setPage(page - 1)} disabled={page === 1} className={`px-3 py-1 rounded ${page === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-green-600"}`}>PREV</button>

//               {(() => {
//                 const pages = [];
//                 const maxShown = 5;
//                 let start = Math.max(1, page - Math.floor(maxShown / 2));
//                 let end = start + maxShown - 1;
//                 if (end > totalPages) {
//                   end = totalPages;
//                   start = Math.max(1, end - maxShown + 1);
//                 }
//                 for (let i = start; i <= end; i++) pages.push(i);
//                 return pages.map((num) => (
//                   <button key={num} onClick={() => setPage(num)} className={`px-2.5 py-1 rounded border text-sm ${page === num ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}>{num}</button>
//                 ));
//               })()}

//               <button onClick={() => page < totalPages && setPage(page + 1)} disabled={page === totalPages} className={`px-3 py-1 rounded ${page === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-green-600"}`}>NEXT</button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


// ***********************************************************************


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

export default function DeletedProducts() {
  const navigate = useNavigate();
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const stored = localStorage.getItem("deletedProducts");
    if (stored) {
      const parsed = JSON.parse(stored);

      setDeletedProducts(
        parsed.map((p) => ({
          ...p,
          minPrice: p.minPrice ?? p.minPice ?? 0,
          maxPrice: p.maxPrice ?? 0,
        })),
      );
    }
  }, []);

  const filtered = deletedProducts.filter((p) => {
    const q = search.trim().toLowerCase();
    return (
      q === "" ||
      p.productName?.toLowerCase().includes(q) ||
      String(p.minPrice ?? "").includes(q) ||
      String(p.maxPrice ?? "").includes(q) ||
      String(p.merchantName).toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const handleRestore = (productId) => {
    if (!window.confirm("Do you want to restore this product?")) return;

    const updatedDeleted = deletedProducts.filter((p) => p.id !== productId);
    setDeletedProducts(updatedDeleted);
    localStorage.setItem("deletedProducts", JSON.stringify(updatedDeleted));

    const allProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");
    const productToRestore = deletedProducts.find((p) => p.id === productId);
    if (productToRestore) {
      allProducts.push(productToRestore);
      localStorage.setItem("allProducts", JSON.stringify(allProducts));
    }

    toast.success("Product successfully restored!");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-700";
      case "Pending Approvals":
        return "text-amber-700";
      case "Rejected":
        return "text-red-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-white p-3 md:p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Heading on the left */}
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">
              Deleted Products ({filtered.length})
            </h1>

            {/* Search on the right */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search deleted products"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Desktop Table */}
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
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  Vendor
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
                <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  Status
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
                    No deleted products found
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
                        <img
                          src={p.imageUrls?.[0]}
                          alt={p.productName}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 leading-tight">
                            {p.productName}
                          </div>
                          <div className="text-xs text-gray-500">{p.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      ₹{p.minPrice}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      ₹{p.maxPrice}
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
                    <td className="px-4 py-3 text-sm text-gray-600 text-center">
                      {p.createdAt
                        ? new Date(p.createdAt).toLocaleDateString("en-GB")
                        : p.addedDate || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">
                      {p.stockStatus}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">
                      {p.categoryName}
                    </td>
                    <td className="text-center">
                      <span className={`text-sm ${getStatusColor(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleRestore(p.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 border border-blue-600 text-blue-600 rounded text-xs hover:bg-blue-50 transition-colors font-medium"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Restore
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-3">
          {paginated.length === 0 ? (
            <div className="bg-white rounded border border-gray-200 p-6 text-center text-gray-500 text-sm">
              No deleted products found
            </div>
          ) : (
            paginated.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded border border-gray-200 p-4"
              >
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={p.imageUrls?.[0]}
                    alt={p.productName}
                    className="w-14 h-14 rounded object-cover flex-shrink-0"
                  />
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
                      ₹{p.minPrice}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-500">Max Price:</span>
                    <div className="text-gray-900 font-medium">
                      ₹{p.maxPrice}
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
                    {" "}
                    {/* Optional: Make Date full-width if needed */}
                    <span className="text-gray-500">Date:</span>
                    <div className="text-gray-900 font-medium">
                      {p.createdAt
                        ? new Date(p.createdAt).toLocaleDateString("en-GB")
                        : p.addedDate || "N/A"}
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
                    onClick={() => handleRestore(p.id)}
                    className="inline-flex items-center gap-1 px-3 py-1 border border-blue-600 text-blue-600 rounded text-xs hover:bg-blue-50 transition-colors font-medium"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Restore
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
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
