// // components/pages/agri_products/AgriProducts.jsx
// import React, { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { Search, Eye } from "lucide-react";

// export default function AgriProducts() {
//   const navigate = useNavigate();

//   // ── Static dummy data ──
//   const staticAgriProducts = [
//     {
//       id: 1,
//       mainImage:
//         "https://images.unsplash.com/photo-1589924691995-400dc9ecc0af?w=200",
//       AgriproductName: "Urea Fertilizer 46% Nitrogen",
//       category: "FERTILIZER",
//       price: 1250,
//       unit: "50 Kg Bag",
//       quantity: 450,
//       vendorName: "Krishi Agro Suppliers",
//       vendorPhoto:
//         "https://images.unsplash.com/photo-1556155099-490a1ba16284?w=80",
//       createdAt: "2025-02-18",
//       approvalStatus: "APPROVED",
//       visibleToCustomers: true,
//       rejectionReason: null,
//     },
//     {
//       id: 2,
//       mainImage:
//         "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=200",
//       AgriproductName: "High Yield Wheat Seeds",
//       category: "SEEDS",
//       price: 800,
//       unit: "10 Kg Bag",
//       quantity: 200,
//       vendorName: "GreenFields Seed Co.",
//       vendorPhoto:
//         "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80",
//       createdAt: "2025-01-30",
//       approvalStatus: "REJECTED",
//       visibleToCustomers: false,
//       rejectionReason: "Insufficient quality documentation.",
//     },
//     {
//       id: 3,
//       mainImage:
//         "https://images.unsplash.com/photo-1582719478147-1f5a4f6f5f3e?w=200",
//       AgriproductName: "Organic Pesticide Spray",
//       category: "PESTICIDE",
//       price: 950,
//       unit: "5 Litre Bottle",
//       quantity: 150,
//       vendorName: "EcoSafe Agro Products",
//       vendorPhoto: null,
//       createdAt: "2025-02-10",
//       approvalStatus: "APPROVED",
//       visibleToCustomers: true,
//       rejectionReason: null,
//     },
//     {
//       id: 4,
//       mainImage:
//         "https://images.unsplash.com/photo-1590080877777-6c6f3b8f4e1b?w=200",
//       AgriproductName: "PVC Irrigation Pipes",
//       category: "PIPE",
//       price: 120,
//       unit: "Per Meter",
//       quantity: 1000,
//       vendorName: "AquaFlow Supplies",
//       vendorPhoto:
//         "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80",
//       createdAt: "2025-01-25",
//       approvalStatus: "APPROVED",
//       visibleToCustomers: true,
//       rejectionReason: null,
//     },
//     {
//       id: 5,
//       mainImage:
//         "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=200",
//       AgriproductName: "DAP Fertilizer 18-46-0",
//       category: "FERTILIZER",
//       price: 1450,
//       unit: "50 Kg Bag",
//       quantity: 300,
//       vendorName: "AgroChem Distributors",
//       vendorPhoto: null,
//       createdAt: "2025-02-05",
//       approvalStatus: "PENDING",
//       visibleToCustomers: false,
//       rejectionReason: null,
//     },
//     {
//       id: 6,
//       mainImage:
//         "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=200",
//       AgriproductName: "Corn Seeds - Hybrid Variety",
//       category: "SEEDS",
//       price: 900,
//       unit: "10 Kg Bag",
//       quantity: 250,
//       vendorName: "SeedMasters Co.",
//       vendorPhoto:
//         "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80",
//       createdAt: "2025-01-28",
//       approvalStatus: "APPROVED",
//       visibleToCustomers: true,
//       rejectionReason: null,
//     },
//     {
//       id: 7,
//       mainImage:
//         "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=200",
//       AgriproductName: "Glyphosate Herbicide",
//       category: "PESTICIDE",
//       price: 1100,

//       unit: "5 Litre Bottle",
//       quantity: 180,
//       vendorName: "WeedAway Solutions",
//       vendorPhoto:
//         "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80",
//       createdAt: "2025-02-12",
//       approvalStatus: "REJECTED",
//       visibleToCustomers: false,
//       rejectionReason: "Active ingredient concentration not as per standards.",
//     },
//     {
//       id: 8,
//       mainImage:
//         "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=200",
//       AgriproductName: "HDPE Drip Irrigation Pipes",
//       category: "PIPE",
//       price: 150,
//       unit: "Per Meter",
//       quantity: 800,
//       vendorName: "DripTech Supplies",
//       vendorPhoto: null,
//       createdAt: "2025-01-20",
//       approvalStatus: "APPROVED",
//       visibleToCustomers: true,
//       rejectionReason: null,
//     }
//   ];

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All Categories");
//   const [selectedStatus, setSelectedStatus] = useState("All Status");
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 7;

//   const categoryOptions = [
//     "All Categories",
//     "FERTILIZER",
//     "SEEDS",
//     "PESTICIDE",
//     "PIPE",
//   ];
//   const statusOptions = ["All Status", "PENDING", "APPROVED", "REJECTED"];

//   // ── Filtering ──
//   const filteredProducts = useMemo(() => {
//     return staticAgriProducts.filter((p) => {
//       const matchesSearch =
//         p.AgriproductName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         p.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory =
//         selectedCategory === "All Categories" ||
//         p.category === selectedCategory;
//       const matchesStatus =
//         selectedStatus === "All Status" || p.approvalStatus === selectedStatus;

//       return matchesSearch && matchesCategory && matchesStatus;
//     });
//   }, [searchTerm, selectedCategory, selectedStatus]);

//   const paginated = filteredProducts.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage,
//   );
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "APPROVED":
//         return "text-green-700";
//       case "PENDING":
//         return "text-amber-700";
//       case "REJECTED":
//         return "text-red-700";
//       default:
//         return "text-gray-600";
//     }
//   };

//   const getVisibilityColor = (visible) => {
//     return visible ? "text-emerald-700" : "text-rose-700";
//   };

//   if (
//     filteredProducts.length === 0 &&
//     !searchTerm &&
//     selectedCategory === "All Categories" &&
//     selectedStatus === "All Status"
//   ) {
//     // Optional: better empty state when first load + no data
//   }

//   return (
//     <div className="min-h-screen bg-white p-3 md:p-6">
//       <div className="max-w-full mx-auto">
//         {/* HEADER */}
//         <div className="mb-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//             <h1 className="text-xl md:text-2xl font-semibold text-gray-900 whitespace-nowrap">
//               Agri Products Management ({filteredProducts.length})
//             </h1>

//             <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
//               {/* Search */}
//               <div className="relative flex-1 md:w-72">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search products or vendors..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
//                 />
//               </div>

//               {/* Category filter */}
//               <div className="relative w-full sm:w-48">
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
//                 >
//                   {categoryOptions.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Status filter */}
//               <div className="relative w-full sm:w-44">
//                 <select
//                   value={selectedStatus}
//                   onChange={(e) => setSelectedStatus(e.target.value)}
//                   className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
//                 >
//                   {statusOptions.map((status) => (
//                     <option key={status} value={status}>
//                       {status}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* DESKTOP TABLE */}
//         <div className="hidden lg:block bg-white border border-gray-200 rounded overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
//                   Product Name
//                 </th>
//                 <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
//                   Category
//                 </th>
//                 <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
//                   Price / Unit
//                 </th>
//                 <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
//                   Stock
//                 </th>
//                 <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
//                   Vendor
//                 </th>
//                 <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">
//                   Visible
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
//                     colSpan={8}
//                     className="px-4 py-8 text-center text-gray-500 text-sm"
//                   >
//                     No products found
//                   </td>
//                 </tr>
//               ) : (
//                 paginated.map((product) => (
//                   <tr
//                     key={product.id}
//                     className="border-b border-gray-200 hover:bg-gray-50"
//                   >
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-3">
//                         {product.mainImage ? (
//                           <img
//                             src={product.mainImage}
//                             alt={product.AgriproductName}
//                             className="w-10 h-10 rounded object-cover border border-gray-200"
//                           />
//                         ) : (
//                           <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-400">
//                             No Img
//                           </div>
//                         )}
//                         <div>
//                           <div className="text-sm font-medium text-gray-900 leading-tight">
//                             {product.AgriproductName}
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             {product.createdAt}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-900">
//                       {product.category}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-900">
//                       ₹{product.price.toLocaleString()} / {product.unit}
//                     </td>
//                     <td className="px-4 py-3 text-sm text-gray-900 text-center">
//                       {product.quantity}
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-2">
//                         {product.vendorPhoto ? (
//                           <img
//                             src={product.vendorPhoto}
//                             alt={product.vendorName}
//                             className="w-7 h-7 rounded-full object-cover border border-gray-200"
//                           />
//                         ) : (
//                           <div className="w-7 h-7 rounded-full bg-gray-200" />
//                         )}
//                         <span className="text-sm text-gray-900">
//                           {product.vendorName}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3 text-center">
//                       <span
//                         className={`text-xs font-medium ${getStatusColor(product.approvalStatus)}`}
//                       >
//                         {product.approvalStatus}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-center">
//                       <span
//                         className={`text-xs font-medium ${getVisibilityColor(product.visibleToCustomers)}`}
//                       >
//                         {product.visibleToCustomers ? "YES" : "NO"}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-center">
//                       <button
//                         onClick={() => navigate(`/agri-product/${product.id}`)}
//                         className="px-3 py-1 text-xs border border-green-600 text-green-600 rounded hover:bg-green-50 transition-colors font-medium"
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

//         {/* MOBILE CARD VIEW */}
//         <div className="lg:hidden space-y-3">
//           {paginated.length === 0 ? (
//             <div className="bg-white rounded border border-gray-200 p-6 text-center text-gray-500 text-sm">
//               No products found
//             </div>
//           ) : (
//             paginated.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white rounded border border-gray-200 p-4"
//               >
//                 <div className="flex items-start gap-3 mb-3">
//                   {product.mainImage ? (
//                     <img
//                       src={product.mainImage}
//                       alt={product.AgriproductName}
//                       className="w-14 h-14 rounded object-cover border border-gray-200 flex-shrink-0"
//                     />
//                   ) : (
//                     <div className="w-14 h-14 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-400 flex-shrink-0">
//                       No Img
//                     </div>
//                   )}

//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-sm font-medium text-gray-900 mb-0.5 truncate">
//                       {product.AgriproductName}
//                     </h3>
//                     <p className="text-xs text-gray-500 mb-1">
//                       Added: {product.createdAt}
//                     </p>

//                     <div className="flex items-center gap-1.5 mb-2">
//                       {product.vendorPhoto ? (
//                         <img
//                           src={product.vendorPhoto}
//                           alt={product.vendorName}
//                           className="w-6 h-6 rounded-full object-cover border border-gray-200"
//                         />
//                       ) : (
//                         <div className="w-6 h-6 rounded-full bg-gray-200" />
//                       )}
//                       <p className="text-xs text-gray-600">
//                         {product.vendorName}
//                       </p>
//                     </div>

//                     <div className="grid grid-cols-2 gap-2 text-xs">
//                       <div className="bg-gray-50 p-2 rounded">
//                         <span className="text-gray-500 block">Price</span>
//                         <div className="text-gray-900 font-medium">
//                           ₹{product.price.toLocaleString()} / {product.unit}
//                         </div>
//                       </div>
//                       <div className="bg-gray-50 p-2 rounded">
//                         <span className="text-gray-500 block">Stock</span>
//                         <div className="text-gray-900 font-medium">
//                           {product.quantity}
//                         </div>
//                       </div>
//                       <div className="bg-gray-50 p-2 rounded">
//                         <span className="text-gray-500 block">Category</span>
//                         <div className="text-gray-900 font-medium">
//                           {product.category}
//                         </div>
//                       </div>
//                       <div className="bg-gray-50 p-2 rounded col-span-2">
//                         <span className="text-gray-500 block">Status</span>
//                         <div
//                           className={`font-medium ${getStatusColor(product.approvalStatus)}`}
//                         >
//                           {product.approvalStatus}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between mt-3">
//                   <span
//                     className={`text-xs font-medium ${getVisibilityColor(product.visibleToCustomers)}`}
//                   >
//                     {product.visibleToCustomers
//                       ? "Visible to customers"
//                       : "Hidden"}
//                   </span>
//                   <button
//                     onClick={() => navigate(`/agri-product/${product.id}`)}
//                     className="px-3 py-1 text-xs border border-green-600 text-green-600 rounded hover:bg-green-50 transition-colors font-medium"
//                   >
//                     View Detail
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* PAGINATION */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center mt-6 gap-2 text-sm select-none">
//             <button
//               onClick={() => page > 1 && setPage(page - 1)}
//               disabled={page === 1}
//               className={`px-3 py-1 rounded ${page === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-green-600"}`}
//             >
//               PREV
//             </button>

//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//               <button
//                 key={p}
//                 onClick={() => setPage(p)}
//                 className={`px-2.5 py-1 rounded border text-sm ${
//                   page === p
//                     ? "bg-green-600 text-white border-green-600"
//                     : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
//                 }`}
//               >
//                 {p}
//               </button>
//             ))}

//             <button
//               onClick={() => page < totalPages && setPage(page + 1)}
//               disabled={page === totalPages}
//               className={`px-3 py-1 rounded ${page === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-green-600"}`}
//             >
//               NEXT
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// ***************************************************************************************************************************************************

import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { getAllAgriProducts } from "../../../api/agriProduct";
import toast from "react-hot-toast";

export default function AgriProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const categoryOptions = [
    "All Categories",
    "FERTILIZER",
    "SEEDS",
    "PESTICIDE",
    "PIPE",
  ];
  const statusOptions = ["All Status", "PENDING", "APPROVED", "REJECTED"];

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getAllAgriProducts();

      // BACKEND RETURNS OBJECT, NOT ARRAY
      const allProducts = [
        ...(data.approved || []),
        ...(data.pending || []),
        ...(data.rejected || []),
      ];

      const transformedProducts = allProducts.map((product) => ({
        id: product.id,

        mainImage:
          product.AgriimageUrl && product.AgriimageUrl.length > 0
            ? product.AgriimageUrl[0]
            : "",

        AgriproductName: product.AgriproductName ?? "Unnamed Product",
        category: product.category ?? "N/A",
        price: Number(product.Agriprice) || 0,
        unit: product.Agriunit || "-",
        quantity: product.Agriquantity || 0,

        vendorName: product.vendor?.name || "N/A",
        vendorPhoto: product.vendor?.photoUrl || null,

        createdAt: product.createdAt ? product.createdAt.split("T")[0] : "-",

        approvalStatus: product.approvalStatus,
        visibleToCustomers: product.visibleToCustomers ?? false,
        rejectionReason: product.rejectionReason,
      }));

      setProducts(transformedProducts);
      toast.success(`Loaded ${transformedProducts.length} products`);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Filtering
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const productName = (p?.AgriproductName || "").toLowerCase();
      const vendorName = (p?.vendorName || "").toLowerCase();
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        productName.includes(search) || vendorName.includes(search);

      const matchesCategory =
        selectedCategory === "All Categories" ||
        p.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "All Status" || p.approvalStatus === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, selectedCategory, selectedStatus]);

  const paginated = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "text-green-700";
      case "PENDING":
        return "text-amber-700";
      case "REJECTED":
        return "text-red-700";
      default:
        return "text-gray-600";
    }
  };

  const getVisibilityColor = (visible) => {
    return visible ? "text-emerald-700" : "text-rose-700";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-3 md:p-6">
      <div className="max-w-full mx-auto">
        {/* HEADER */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 whitespace-nowrap">
              Agri Products Management ({filteredProducts.length})
            </h1>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-1 md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products or vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>

              {/* Category filter */}
              <div className="relative w-full sm:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status filter */}
              <div className="relative w-full sm:w-44">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden lg:block bg-white border border-gray-200 rounded overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  Price / Unit
                </th>
                <th className="px-4 py-3 text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                  Visible
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
                    colSpan={8}
                    className="px-4 py-8 text-center text-gray-500 text-sm"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                paginated.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {product.mainImage ? (
                          <img
                            src={product.mainImage}
                            alt={product.AgriproductName}
                            className="w-10 h-10 rounded object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                            No Img
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900 leading-tight">
                            {product.AgriproductName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {product.createdAt}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {product.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      ₹{product.price.toLocaleString()} / {product.unit}
                    </td>
                    <td className="px-4 py-3 text-sm  text-gray-900 text-center">
                      {product.quantity}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {product.vendorPhoto ? (
                          <img
                            src={product.vendorPhoto}
                            alt={product.vendorName}
                            className="w-7 h-7 rounded-full object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-gray-200" />
                        )}
                        <span className="text-sm text-gray-900">
                          {product.vendorName}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`text-xs font-medium ${getStatusColor(product.approvalStatus)}`}
                      >
                        {product.approvalStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`text-xs font-medium ${getVisibilityColor(product.visibleToCustomers)}`}
                      >
                        {product.visibleToCustomers ? "YES" : "NO"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => navigate(`/agri-product/${product.id}`)}
                        className="px-3 py-1 text-xs border border-green-600 text-green-600 rounded hover:bg-green-50 transition-colors font-medium"
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

        {/* MOBILE CARD VIEW */}
        <div className="lg:hidden space-y-3">
          {paginated.length === 0 ? (
            <div className="bg-white rounded border border-gray-200 p-6 text-center text-gray-500 text-sm">
              No products found
            </div>
          ) : (
            paginated.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded border border-gray-200 p-4"
              >
                <div className="flex items-start gap-3 mb-3">
                  {product.mainImage ? (
                    <img
                      src={product.mainImage}
                      alt={product.AgriproductName}
                      className="w-14 h-14 rounded object-cover border border-gray-200 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-400 flex-shrink-0">
                      No Img
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 mb-0.5 truncate">
                      {product.AgriproductName}
                    </h3>
                    <p className="text-xs text-gray-500 mb-1">
                      Added: {product.createdAt}
                    </p>

                    <div className="flex items-center gap-1.5 mb-2">
                      {product.vendorPhoto ? (
                        <img
                          src={product.vendorPhoto}
                          alt={product.vendorName}
                          className="w-6 h-6 rounded-full object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-200" />
                      )}
                      <p className="text-xs text-gray-600">
                        {product.vendorName}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-gray-500 block">Price</span>
                        <div className="text-gray-900 font-medium">
                          ₹{product.price.toLocaleString()} / {product.unit}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-gray-500 block">Stock</span>
                        <div className="text-gray-900 font-medium">
                          {product.quantity}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="text-gray-500 block">Category</span>
                        <div className="text-gray-900 font-medium">
                          {product.category}
                        </div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded col-span-2">
                        <span className="text-gray-500 block">Status</span>
                        <div
                          className={`font-medium ${getStatusColor(product.approvalStatus)}`}
                        >
                          {product.approvalStatus}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span
                    className={`text-xs font-medium ${getVisibilityColor(product.visibleToCustomers)}`}
                  >
                    {product.visibleToCustomers
                      ? "Visible to customers"
                      : "Hidden"}
                  </span>
                  <button
                    onClick={() => navigate(`/agri-product/${product.id}`)}
                    className="px-3 py-1 text-xs border border-green-600 text-green-600 rounded hover:bg-green-50 transition-colors font-medium"
                  >
                    View Detail
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-2 text-sm select-none">
            <button
              onClick={() => page > 1 && setPage(page - 1)}
              disabled={page === 1}
              className={`px-3 py-1 rounded ${page === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-green-600"}`}
            >
              PREV
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-2.5 py-1 rounded border text-sm ${
                  page === p
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => page < totalPages && setPage(page + 1)}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded ${page === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-green-600"}`}
            >
              NEXT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
