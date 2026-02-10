// Static Version

// import { useState } from "react";
// import { ArrowLeft } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function ProductDeatail() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [status, setStatus] = useState("pending");
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [selectedReasons, setSelectedReasons] = useState([]);
//   const [confirmAction, setConfirmAction] = useState(null);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [customReason, setCustomReason] = useState("");

//   const product = {
//     id: parseInt(id) || 1,
//     productId: "90792038432-080",
//     productName: "Fresh Organic Potatoes",
//     code: "90792038432-080",
//     minPrice: 80,
//     maxPrice: 100,

//     unit: "1 kg",
//     discount: "10% OFF",
//     merchantName: "Green Valley Farm",
//     vendorType: "Vegetable & Fruit",
//     vendorImage:
//       "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=100&h=100&fit=crop",
//     seller: {
//       name: "Green Valley Farm",
//       address: "Achimota Forest Rd, Accra, Ghana",
//       image:
//         "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=100&h=100&fit=crop",
//     },
//     description:
//       "Bring home the perfect kitchen essential with our Fresh Premium Potatoes. Carefully selected from trusted farms, these potatoes are known for their smooth texture, firm body, and natural earthy taste. Whether you're preparing everyday meals or special dishes, our potatoes deliver consistent quality, freshness, and flavor in every bite.",
//     addedDate: "22 Nov 2025",
//     createdAt: "2025-11-22",
//     stockStatus: 80,
//     categoryName: "Vegetables",
//     subCategory: "Vegetable",
//     status: "Pending Approvals",
//     imageUrls: [
//       "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&h=600&fit=crop",
//       "https://images.unsplash.com/photo-1604908177522-402c7a7d48b0?w=600&h=600&fit=crop",
//       "https://images.unsplash.com/photo-1582515073490-39981397c445?w=600&h=600&fit=crop",
//     ],
//   };

//   const rejectReasons = [
//     "Incomplete product information (missing title, description, price, or images)",
//     "Incorrect or misleading product description",
//     "Poor quality, unclear, or policy-violating product images",
//     "Duplicate product listing",
//     "Incorrect category or sub-category selected",
//     "Product price is too high or too low compared to market standards",
//     "Brand authorization or proof not provided",
//     "Product is banned, restricted, or illegal",
//     "Violation of platform guidelines or policies",
//     "Incorrect product specifications (size, color, model, etc.)",
//     "Copyright or trademark infringement",
//     "Product does not meet quality standards",
//     "Inappropriate, offensive, or prohibited content",
//     "Missing return, refund, or warranty information",
//     "Vendor-provided details could not be verified",
//     "Other",
//   ];

//   const toggleReason = (reason) => {
//     setSelectedReasons((prev) =>
//       prev.includes(reason)
//         ? prev.filter((r) => r !== reason)
//         : [...prev, reason],
//     );
//   };

//   const handleReject = () => {
//     if (!selectedReasons.length) return;

//     let reasonsToSubmit = [...selectedReasons];
//     if (selectedReasons.includes("Other") && customReason.trim()) {
//       reasonsToSubmit = reasonsToSubmit.filter((r) => r !== "Other");
//       reasonsToSubmit.push(customReason.trim());
//     }

//     console.log("Rejected for reasons:", reasonsToSubmit);
//     setStatus("rejected");
//     setShowRejectModal(false);
//     setSelectedReasons([]);
//     setCustomReason("");

//     toast.error("Product rejected successfully!");
//   };

//   const handleApprove = () => {
//     setStatus("approved");
//     toast.success("Product approved successfully!");
//   };

//   const handleDeleteProduct = () => {
//     console.log("Product deleted:", product.id);

//     const deletedProducts = JSON.parse(
//       localStorage.getItem("deletedProducts") || "[]",
//     );

//     deletedProducts.push(product);
//     localStorage.setItem("deletedProducts", JSON.stringify(deletedProducts));

//     const allProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");
//     const updatedProducts = allProducts.filter((p) => p.id !== product.id);
//     localStorage.setItem("allProducts", JSON.stringify(updatedProducts));

//     toast("Product deleted successfully!");
//     navigate("/products");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       {/* Back Button */}
//       <div className="max-w-7xl mx-auto mb-3">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Back
//         </button>
//       </div>

//       <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-6 py-4 border-b border-gray-200 gap-3">
//           {/* Heading */}
//           <h1 className="text-lg md:text-xl font-semibold text-gray-900">
//             Product Detail
//           </h1>

//           {/* Buttons */}
//           <div className="flex flex-wrap gap-2 md:gap-1 items-center">
//             <button
//               onClick={() => {
//                 setConfirmAction("approve");
//                 setShowConfirmModal(true);
//               }}
//               disabled={status === "approved"}
//               className={`px-4 py-1.5 rounded-full text-sm md:text-sm font-medium transition-all
//         ${status === "pending" ? "bg-lime-600 text-white" : status === "rejected" ? "bg-lime-600 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
//             >
//               Approve
//             </button>

//             <button
//               onClick={() => {
//                 setConfirmAction("reject");
//                 setShowConfirmModal(true);
//               }}
//               disabled={status === "rejected"}
//               className={`px-4 py-1.5 rounded-full text-sm md:text-sm font-medium transition-all
//         ${status === "pending" ? "bg-red-500 text-white" : status === "approved" ? "bg-red-500 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
//             >
//               Reject
//             </button>

//             <button
//               onClick={() => setShowDeleteConfirm(true)}
//               className="px-4 py-1.5 rounded-full text-sm md:text-sm font-medium bg-gray-800 text-white hover:bg-black transition-all"
//             >
//               Delete
//             </button>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
//           {/* Left */}
//           <div className="bg-white rounded-xs shadow-sm p-6 flex flex-col gap-6">
//             <h2 className="text-lg font-semibold text-gray-900">
//               {product.productName}
//             </h2>

//             <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
//               {/* Price Section */}
//               <div className="flex flex-col">
//                 <span className="text-lg sm:text-xl font-bold text-gray-900">
//                   Min Price: ₹{product.minPrice}
//                 </span>
//                 <span className="text-lg sm:text-xl font-bold text-gray-900">
//                   Max Price: ₹{product.maxPrice}
//                 </span>
//               </div>

//               {/* Right Side Info */}
//               <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
//                 <span className="px-2 py-0.5 text-xs border rounded text-green-700 border-green-300 whitespace-nowrap">
//                   {product.unit}
//                 </span>

//                 {product.discount && (
//                   <span className="text-sm font-semibold text-green-600 whitespace-nowrap">
//                     {product.discount}
//                   </span>
//                 )}
//               </div>
//             </div>

//             <hr className="border-t border-gray-200" />

//             <div className="flex gap-6">
//               <div className="flex flex-col gap-3">
//                 {product.imageUrls.map((img, i) => (
//                   <div
//                     key={i}
//                     className="w-16 h-16 border border-gray-300 rounded-lg overflow-hidden"
//                   >
//                     <img
//                       src={img}
//                       alt=""
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 ))}
//               </div>

//               <div className="flex-1 w-full max-w-[300px] max-h-[300px] bg-gray-100 rounded-xl overflow-hidden">
//                 <img
//                   src={product.imageUrls[0]}
//                   alt=""
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Right */}
//           <div>
//             <div className="text-sm text-gray-400 mb-2">Merchant / Seller</div>

//             <div className="flex items-center gap-3 mb-6">
//               <img
//                 src={product.seller.image}
//                 alt=""
//                 className="w-12 h-12 rounded-full object-cover"
//               />
//               <div>
//                 <div className="font-semibold text-green-700">
//                   {product.seller.name}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {product.seller.address}
//                 </div>
//               </div>
//             </div>

//             <hr className="border-t border-gray-200 mb-6" />

//             <div className="mb-6">
//               <h3 className="text-sm font-semibold text-gray-700 mb-2">
//                 Description
//               </h3>
//               <p className="text-sm text-gray-600 leading-relaxed">
//                 {product.description}
//               </p>
//             </div>

//             <hr className="border-t border-gray-200 mb-6" />

//             <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
//               <div>
//                 <div className="text-gray-400">Product Id</div>
//                 <div className="font-medium">{product.productId}</div>
//               </div>
//               <div>
//                 <div className="text-gray-400">Added Date</div>
//                 <div className="font-medium">{product.addedDate}</div>
//               </div>
//               <div>
//                 <div className="text-gray-400">Stock</div>
//                 <div className="font-medium">{product.stockStatus}</div>
//               </div>
//               <div>
//                 <div className="text-gray-400">Category</div>
//                 <div className="font-medium">{product.categoryName}</div>
//               </div>
//               <div>
//                 <div className="text-gray-400">Sub Category</div>
//                 <div className="font-medium">{product.subCategory}</div>
//               </div>
//               <div></div>
//             </div>

//             {status === "approved" && (
//               <div className="border border-green-300 bg-green-50 rounded-xl py-8 text-center text-green-600 font-semibold">
//                 Approved
//               </div>
//             )}

//             {status === "rejected" && (
//               <div className="border border-red-300 bg-red-50 rounded-xl p-4">
//                 <div className="text-red-600 font-semibold mb-2">Rejected</div>
//                 <div className="text-sm text-red-600">
//                   Inappropriate, offensive, or prohibited content
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Reject Modal */}
//       {showRejectModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-lg font-semibold text-gray-900">
//                 Reason For Rejecting
//               </h2>
//             </div>

//             <div className="px-6 py-4 overflow-y-auto space-y-3 max-h-[60vh]">
//               {rejectReasons.map((reason, i) => (
//                 <label
//                   key={i}
//                   className="flex items-start gap-3 text-sm cursor-pointer"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedReasons.includes(reason)}
//                     onChange={() => toggleReason(reason)}
//                     className="mt-1 accent-green-600 w-4 h-4"
//                   />
//                   <span className="text-gray-700">{reason}</span>
//                 </label>
//               ))}

//               {selectedReasons.includes("Other") && (
//                 <input
//                   type="text"
//                   placeholder="Enter reason"
//                   value={customReason}
//                   onChange={(e) => setCustomReason(e.target.value)}
//                   className="mt-2 w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               )}
//             </div>

//             <div className="px-6 py-4 border-t border-gray-200">
//               <button
//                 disabled={
//                   !selectedReasons.length ||
//                   (selectedReasons.includes("Other") && !customReason.trim())
//                 }
//                 onClick={handleReject}
//                 className="w-full py-3 rounded-xl text-white font-medium bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-sm">
//             <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
//             <p className="text-sm text-gray-600 mb-6">
//               Are you sure you want to{" "}
//               <span className="font-semibold">
//                 {confirmAction === "approve" ? "Approve" : "Reject"}
//               </span>{" "}
//               this product?
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowConfirmModal(false)}
//                 className="px-4 py-2 text-sm bg-gray-100 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => {
//                   if (confirmAction === "approve") {
//                     setStatus("approved");
//                     toast.success("Product approved successfully!");
//                   } else {
//                     setShowRejectModal(true);
//                   }
//                   setShowConfirmModal(false);
//                 }}
//                 className={`px-4 py-2 text-sm text-white rounded-lg ${confirmAction === "approve" ? "bg-lime-600" : "bg-red-500"}`}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-sm">
//             <h3 className="text-lg font-semibold mb-4">Delete Product</h3>
//             <p className="text-sm text-gray-600 mb-6">
//               Do you want to delete this product? You can restore it from
//               Deleted Products.{" "}
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="px-4 py-2 text-sm bg-gray-100 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDeleteProduct}
//                 className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// **************************************************************

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getProductDetailsForAdmin,
  approveProduct,
  rejectProduct,
  deleteProduct,
  approveWomenProduct,
  rejectWomenProduct,
  deleteWomenProduct,
} from "../../../api/adminProduct";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { type, id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [status, setStatus] = useState("pending");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [customReason, setCustomReason] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  // ── Fetch product data ──
  useEffect(() => {
    if (!type || !id) {
      setError("Invalid product type or ID");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductDetailsForAdmin(type, id);

        const normalized = normalizeProductData(type.toUpperCase(), data);

        setProduct(normalized);
        setStatus(normalized?.status?.toLowerCase() || "pending");
      } catch (err) {
        if (err?.response?.status === 404) {
          toast.error("Product no longer exists (deleted)");
          navigate("/products", {
            replace: true,
            state: {
              deletedProductId: id,

              deletedProductType: type.toUpperCase(), // VENDOR or WOMEN
            },
          });

          return;
        }
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [type, id]);

  // Helper: make vendor & women products have similar shape

  function normalizeProductData(productType, raw) {
    if (productType === "VENDOR") {
      return {
        id: raw.id,
        productId: raw.id?.toString(),
        productName: raw?.productName ?? null,
        code: raw?.id?.toString() ?? null,

        minPrice: raw?.details?.minPrice ?? null,
        maxPrice: raw?.details?.maxPrice ?? null,

        unit: raw?.details?.weight ?? null,
        discount: raw?.discount ?? null,

        merchantName: raw?.shop?.shopName ?? null,
        vendorType: raw?.shop?.shopType ?? null,

        seller: {
          name: raw?.shop?.shopName ?? null,
          address: raw?.shop?.shopAddress ?? null,
          image: raw?.shop?.shopPhoto ?? null,
        },

        description:
          raw?.shortDescription ??
          raw?.details?.product?.shortDescription ??
          null,

        addedDate: raw?.details?.product?.createdAt
          ? new Date(raw.details.product.createdAt).toLocaleDateString("en-GB")
          : null,

        stockStatus: raw?.stockStatus ?? null,
        categoryName: raw?.categoryName ?? null,
        subCategory: raw?.details?.product?.category?.slug ?? null,

        rejectionReason: raw?.details?.product?.rejectionReason ?? null,

        status: raw?.details?.product?.approvalStatus ?? null,

        imageUrls: Array.isArray(raw?.imageUrls)
          ? raw.imageUrls
          : raw?.imageUrls
            ? [raw.imageUrls]
            : [],
      };
    }

    if (productType === "WOMEN") {
      return {
        id: raw.id,
        productId: raw.id?.toString() || "—",
        productName: raw?.name ?? null,
        code: raw?.uuid ?? raw?.id?.toString() ?? null,

        minPrice: raw?.minPrice ?? null,
        maxPrice: raw?.maxPrice ?? null,

        unit: raw?.unit ?? null,
        discount: raw?.discount ?? null,

        seller: {
          name:
            raw?.shop?.shopName ?? raw?.vendorName ?? raw?.sellerName ?? "—",
          address: raw?.shop?.shopAddress ?? raw?.vendorAddress ?? "—",
          image: raw?.shop?.shopPhoto ?? raw?.vendorImage ?? "",
        },
        merchantName:
          raw?.shop?.shopName ?? raw?.vendorName ?? raw?.sellerName ?? "—",
        vendorType: "Women Empowerment",

        description: raw?.description ?? raw?.shortDescription ?? null,

        addedDate: raw?.createdAt
          ? new Date(raw.createdAt).toLocaleDateString("en-GB")
          : null,

        createdAt: raw?.createdAt ?? null,

        stockStatus: raw?.stock ?? null,
        categoryName: raw?.category ?? null,
        subCategory: raw?.subCategory ?? null,

        rejectionReason: raw?.rejectionReason ?? null,
        status: raw?.status ?? raw?.approvalStatus ?? null,

        imageUrls: Array.isArray(raw?.imageUrls)
          ? raw.imageUrls
          : raw?.imageUrls
            ? [raw.imageUrls]
            : [],
      };
    }
    return null;
  }

  // ── Action Handlers ────────────────────────────────────────

  const handleApprove = async () => {
  if (!product) return;

  try {
    if (type.toLowerCase() === "vendor") {
      await approveProduct(product.id);
    } else {
      await approveWomenProduct(product.id);
    }

    setStatus("approved");
    toast.success("Product approved successfully!", {
      duration: 5000,             
      position: "top-right",       
    });

   

  } catch (err) {
    toast.error("Failed to approve product", {
      duration: 6000,
    });
    console.error(err);
  }
};

const handleReject = async () => {
  if (!selectedReasons.length || !product) return;

  let reasons = [...selectedReasons];
  if (selectedReasons.includes("Other") && customReason.trim()) {
    reasons = reasons.filter((r) => r !== "Other");
    reasons.push(customReason.trim());
  }

  const reasonString = reasons.join(", ");

  try {
    if (type.toLowerCase() === "vendor") {
      await rejectProduct(product.id, reasonString);
    } else {
      await rejectWomenProduct(product.id, reasonString);
    }

    setProduct((prev) => ({ ...prev, rejectionReason: reasonString }));
    setStatus("rejected");
    setShowRejectModal(false);
    setSelectedReasons([]);
    setCustomReason("");

    toast.error("Product rejected successfully!", {
      duration: 5000,
    });

  
  } catch (err) {
    toast.error("Failed to reject product", {
      duration: 6000,
    });
    console.error(err);
  }
};


 const handleDeleteProduct = async () => {
  if (!product) return;

  try {
    if (type.toLowerCase() === "vendor") {
      await deleteProduct(product.id);
    } else {
      await deleteWomenProduct(product.id);
    }

    toast.success("Product permanently deleted", {
      duration: 5000,
      position: "top-right",
    });

    setTimeout(() => {
      navigate("/products", {
        replace: true,
        state: {
          deletedProductId: id,
          deletedProductType: type.toUpperCase(),
        },
      });
    }, 1200); 

  } catch (err) {
    toast.error("Delete failed, refresh product list", {
      duration: 6000,
    });
  }
};


  // ── UI states ───────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">{error || "Product not found"}</div>
      </div>
    );
  }

  const rejectReasons = [
    "Incomplete product information (missing title, description, price, or images)",
    "Incorrect or misleading product description",
    "Poor quality, unclear, or policy-violating product images",
    "Duplicate product listing",
    "Incorrect category or sub-category selected",
    "Product price is too high or too low compared to market standards",
    "Brand authorization or proof not provided",
    "Product is banned, restricted, or illegal",
    "Violation of platform guidelines or policies",
    "Incorrect product specifications (size, color, model, etc.)",
    "Copyright or trademark infringement",
    "Product does not meet quality standards",
    "Inappropriate, offensive, or prohibited content",
    "Missing return, refund, or warranty information",
    "Vendor-provided details could not be verified",
    "Other",
  ];

  const toggleReason = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason],
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-6 py-4 border-b border-gray-200 gap-3">
          {/* Heading */}
          <h1 className="text-lg md:text-xl font-semibold text-gray-900">
            Product Detail
          </h1>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 md:gap-1 items-center">
            <button
              onClick={() => {
                setConfirmAction("approve");
                setShowConfirmModal(true);
              }}
              disabled={status === "approved"} // disable if approved
              className={`px-5 py-1.5 rounded-full text-sm font-medium ${
                status === "approved"
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-lime-600 text-white hover:bg-lime-700"
              }`}
            >
              Approve
            </button>
            <button
              onClick={() => {
                setConfirmAction("reject");
                setShowConfirmModal(true);
              }}
              disabled={status === "rejected" || status === "approved"} // disable if rejected or approved
              className={`px-5 py-1.5 rounded-full text-sm font-medium ${
                status === "rejected" || status === "approved"
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              Reject
            </button>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-5 py-1.5 rounded-full text-sm font-medium bg-gray-800 text-white hover:bg-black"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Left */}
          <div className="bg-white rounded-xs shadow-sm p-6 flex flex-col gap-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {product.productName}
            </h2>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
              {/* Price Section */}
              <div className="flex flex-col">
                {product.minPrice != null && (
                  <span className="text-lg sm:text-xl font-bold text-gray-900">
                    Min Price: ₹{product.minPrice}
                  </span>
                )}
                {product.maxPrice != null && (
                  <span className="text-lg sm:text-xl font-bold text-gray-900">
                    Max Price: ₹{product.maxPrice}
                  </span>
                )}
              </div>

              {/* Right Side Info */}
              <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
                <span className="px-2 py-0.5 text-xs border rounded text-green-700 border-green-300 whitespace-nowrap">
                  {product.unit}
                </span>

                {product.discount && (
                  <span className="text-sm font-semibold text-green-600 whitespace-nowrap">
                    {product.discount}
                  </span>
                )}
              </div>
            </div>

            <hr className="border-t border-gray-200" />
<div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
  {/* Thumbnails */}
  {product.imageUrls?.length > 0 && (
    <div className="flex lg:flex-col gap-3 lg:w-20 flex-shrink-0">
      {product.imageUrls.map((url, idx) => (
        <button
          key={idx}
          onClick={() => setSelectedImage(idx)}
          className={`aspect-square w-16 lg:w-20 overflow-hidden rounded-lg border-2 transition-all
            ${
              selectedImage === idx
                ? "border-green-600 shadow-md"
                : "border-gray-200 hover:border-green-400"
            }`}
        >
          <img
            src={url}
            alt={`Thumbnail ${idx + 1}`}
            className="h-full w-full object-cover transition hover:scale-105"
          />
        </button>
      ))}
    </div>
  )}

  {/* Main Image */}
  <div className="flex-1">
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-gray-100">
      <img
        src={product.imageUrls[selectedImage]}
        alt={product.productName || ""}
        className="h-[320px] w-full object-cover"
      />
    </div>
  </div>
</div>

          </div>

          {/* Right */}
          <div>
            <div className="text-sm text-gray-400 mb-2">Merchant / Seller</div>

            <div className="flex items-center gap-3 mb-6">
              <img
                src={product.seller.image}
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-green-700">
                  {product.seller.name}
                </div>
                <div className="text-sm text-gray-500">
                  {product.seller.address}
                </div>
              </div>
            </div>

            <hr className="border-t border-gray-200 mb-6" />

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Description
              </h3>
              {product.description && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            <hr className="border-t border-gray-200 mb-6" />

            <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
              <div>
                <div className="text-gray-400">Product Id</div>
                <div className="font-medium">{product.productId}</div>
              </div>
              <div>
                <div className="text-gray-400">Added Date</div>
                {product.addedDate && (
                  <div className="font-medium">{product.addedDate}</div>
                )}
              </div>
              <div>
                <div className="text-gray-400">Stock</div>
                {product.stockStatus != null && (
                  <div className="font-medium">{product.stockStatus}</div>
                )}
              </div>
              <div>
                <div className="text-gray-400">Category</div>
                {product.categoryName && (
                  <div className="font-medium">{product.categoryName}</div>
                )}
              </div>
              <div>
                <div className="text-gray-400">Sub Category</div>
                {product.subCategory && (
                  <div className="font-medium">{product.subCategory}</div>
                )}
              </div>
              <div></div>
            </div>

            {status === "approved" && (
              <div className="border border-green-300 bg-green-50 rounded-xl py-8 text-center text-green-600 font-semibold">
                APPROVED
              </div>
            )}

            {status === "rejected" && (
              <div className="border border-red-300 bg-red-50 rounded-xl p-4">
                <div className="text-red-600 font-semibold mb-2">REJECTED</div>
                <div className="text-sm text-red-600">
                  {product.rejectionReason || "No reason specified"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setShowRejectModal(false)} // click on overlay closes modal
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Header with close button */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Reason For Rejection
              </h2>
              <button
                onClick={() => setShowRejectModal(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            {/* Modal content */}
            <div className="px-6 py-4 overflow-y-auto space-y-3 max-h-[60vh]">
              {rejectReasons.map((reason) => (
                <label
                  key={reason}
                  className="flex items-start gap-3 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedReasons.includes(reason)}
                    onChange={() => toggleReason(reason)}
                    className="mt-1 accent-green-600 w-4 h-4"
                  />
                  <span className="text-gray-700">{reason}</span>
                </label>
              ))}

              {selectedReasons.includes("Other") && (
                <textarea
                  placeholder="Please specify the reason..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  className="w-full p-3 border rounded mt-2 min-h-[90px] focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              )}
            </div>

            {/* Submit button */}
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                disabled={
                  !selectedReasons.length ||
                  (selectedReasons.includes("Other") && !customReason.trim())
                }
                onClick={handleReject}
                className="w-full py-3 rounded-xl text-white font-medium bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
              >
                Submit Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to
              <span className="font-bold">
                {confirmAction === "approve" ? "APPROVE" : "REJECT"}
              </span>{" "}
              this product?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-sm bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (confirmAction === "approve") {
                    handleApprove();
                  } else {
                    setShowRejectModal(true);
                  }
                  setShowConfirmModal(false);
                }}
                className={`px-4 py-2 text-sm text-white rounded-lg ${confirmAction === "approve" ? "bg-lime-600" : "bg-red-500"}`}
              >
                {confirmAction === "approve" ? "Approve" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Delete Product</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to permanently delete this product? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  handleDeleteProduct();
                }}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
