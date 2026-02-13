// ************Category Specific Fields Added **********************

// import React, { useState } from "react";
// import {
//   ArrowLeft,
//   CheckCircle,
//   XCircle,
//   Trash2,
//   Image as ImageIcon,
//   AlertTriangle,
// } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function AgriProductDetail() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [selectedImage, setSelectedImage] = useState(0);
//   const [status, setStatus] = useState("PENDING");

//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [confirmAction, setConfirmAction] = useState(null);

//   const [selectedReasons, setSelectedReasons] = useState([]);
//   const [customReason, setCustomReason] = useState("");
//   const [rejectionReason, setRejectionReason] = useState(null);

//   // ── Dummy data aligned with your entities ──
//   const product = {
//     id: id || "17",
//     AgriproductName: "Glyphosate 41% SL Herbicide",
//     category: "PIPE", // ← change to FERTILIZER / SEEDS / PIPE to test
//     Agridescription:
//       "Broad-spectrum systemic herbicide for effective control of annual and perennial weeds in agricultural fields.",
//     Agriprice: 980,
//     Agriunit: "1 Litre",
//     Agriquantity: 320,
//     AgribrandName: "Bayer CropScience",
//     AgripackagingType: "HDPE Bottle",
//     AgrilicenseNumber: "CIBRC/PEST/2025/4567",
//     AgrilicenseType: "CIB&RC Registration",
//     AgrilicenseImageUrl:
//       "https://images.unsplash.com/photo-1589829545856-d10d7b0d7e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     AgribatchNumber: "BATCH-GLY-2025-03",
//     AgrimanufacturerName: "Bayer CropScience Ltd",
//     AgrimanufacturingDate: "2025-01-15",
//     AgriexpiryDate: "2028-01-14",
//     approvalStatus: "PENDING",
//     rejectionReason: null,
//     rejectedBy: null,
//     rejectedAt: null,
//     approvedBy: null,
//     approvedAt: null,
//     visibleToCustomers: false,
//     fromAdmin: false,
//     deleted: false,

//     // Images (JSON string in DB → array here)
//     imageUrls: [
//       "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800",
//       "https://images.unsplash.com/photo-1625246333197-4f86db0dc64c?w=800",
//       "https://images.unsplash.com/photo-1589924691995-400dc9ecc0af?w=800",
//     ],

//     // Vendor relation
//     vendor: {
//       name: "Greenfield Agro Traders",
//       businessName: "Greenfield Agro Traders LLP",
//       phone: "+91 97654 32109",
//       city: "Nashik",
//       state: "Maharashtra",
//       photo: "https://images.unsplash.com/photo-1556155099-490a1ba16284?w=100",
//     },

//     // Category specific
//     fertilizerType: "Granular",
//     nutrientComposition: "N:46-0-0",
//     fcoNumber: "FCO/MH/2025/78901",

//     SeedscropType: "Maize",
//     Seedsvariety: "Pioneer P3396",
//     seedClass: "Hybrid",
//     SeedsgerminationPercentage: 92,
//     SeedsphysicalPurityPercentage: 98.5,
//     SeedslotNumber: "LOT-MZ-2025-112",

//     Pesticidetype: "Herbicide",
//     PesticideactiveIngredient: "Glyphosate 41% SL",
//     Pesticidetoxicity: "Category 3 – Slightly hazardous",
//     PesticidecibrcNumber: "CIBRC/2025/HERB/4567",
//     Pesticideformulation: "Soluble Liquid (SL)",

//     Pipetype: "HDPE",
//     Pipesize: "63 mm",
//     Pipelength: 100,
//     PipebisNumber: "IS 4984 : 2016",
//   };

//   const rejectReasons = [
//     "Incomplete product information",
//     "Incorrect or misleading description",
//     "Poor quality or unclear images",
//     "Duplicate product",
//     "Incorrect category",
//     "Price not as per market",
//     "License / authorization missing",
//     "Banned or restricted product",
//     "Policy violation",
//     "Incorrect specifications",
//     "Copyright or trademark issue",
//     "Quality standards not met",
//     "Inappropriate content",
//     "Missing warranty / return info",
//     "Vendor details not verifiable",
//     "Other",
//   ];

//   const toggleReason = (reason) => {
//     setSelectedReasons((prev) =>
//       prev.includes(reason)
//         ? prev.filter((r) => r !== reason)
//         : [...prev, reason],
//     );
//   };

//   const handleApprove = () => {
//     toast.success("Product approved");
//     setStatus("APPROVED");
//     setShowConfirmModal(false);
//   };

//   const handleReject = () => {
//     if (!selectedReasons.length) return;

//     let reasons = [...selectedReasons];

//     if (reasons.includes("Other") && customReason.trim()) {
//       reasons = reasons.filter((r) => r !== "Other");
//       reasons.push(customReason.trim());
//     }

//     const reasonString = reasons.join(", ");

//     setRejectionReason(reasonString);
//     setStatus("REJECTED");

//     toast.error("Product rejected successfully");

//     setShowRejectModal(false);
//     setSelectedReasons([]);
//     setCustomReason("");
//   };

//   const handleDelete = () => {
//     toast.success("Product deleted");
//     setShowDeleteConfirm(false);
//     setTimeout(() => navigate("/agri-products"), 1200);
//   };

//   const getStatusStyle = () => {
//     if (status === "APPROVED") return "text-green-600 border-green-700";
//     if (status === "REJECTED") return "text-red-600 border-red-600";
//     return " text-amber-300 border-[amber-300]";
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-100 py-6 px-4 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         {/* Back */}
//         <button
//           onClick={() => navigate("/agri-products")}
//           className="mb-6 inline-flex items-center gap-2 text-gray-400 hover:text-gray-200"
//         >
//           <ArrowLeft className="h-5 w-5" />
//           Back
//         </button>

//         <div className="rounded-xl border border-gray-200 bg-[white]  overflow-hidden">
//           {/* Header */}
//           <div className="border-b border-gray-300 px-6 py-5">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//               <div>
//                 <h1 className="text-2xl font-bold text-black">
//                   {product.AgriproductName}
//                 </h1>
//                 <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
//                   <span className="font-bold uppercase tracking-wide">
//                     {product.category}
//                   </span>
//                   <span>•</span>
//                   <span>Brand: {product.AgribrandName || "—"}</span>
//                   <span
//                     className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${getStatusStyle()}`}
//                   >
//                     {status}
//                   </span>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex flex-wrap gap-3">
//                 <button
//                   disabled={status === "APPROVED"}
//                   onClick={() => {
//                     setConfirmAction("approve");
//                     setShowConfirmModal(true);
//                   }}
//                   className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition ${
//                     status === "APPROVED"
//                       ? "bg-green-950 text-green-600 cursor-not-allowed"
//                       : "bg-green-700 hover:bg-green-600 text-white"
//                   }`}
//                 >
//                   <CheckCircle className="h-4 w-4" />
//                   Approve
//                 </button>

//                 <button
//                   disabled={status === "REJECTED" || status === "APPROVED"}
//                   onClick={() => {
//                     setConfirmAction("reject");
//                     setShowConfirmModal(true);
//                   }}
//                   className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition ${
//                     status === "REJECTED" || status === "APPROVED"
//                       ? "bg-red-950 text-red-600 cursor-not-allowed"
//                       : "bg-red-700 hover:bg-red-600 text-white"
//                   }`}
//                 >
//                   <XCircle className="h-4 w-4" />
//                   Reject
//                 </button>

//                 <button
//                   onClick={() => setShowDeleteConfirm(true)}
//                   className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-800 text-white hover:bg-gray-700 text-sm font-medium"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Main grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8">
//             {/* Left – Images*/}
//             <div className="lg:col-span-6 space-y-8">
//               {/* Product Images */}
//               <div className="flex flex-col lg:flex-row gap-5">
//                 {product.imageUrls?.length > 0 && (
//                   <div className="flex lg:flex-col gap-3 order-2 lg:order-1">
//                     {product.imageUrls.map((url, i) => (
//                       <button
//                         key={i}
//                         onClick={() => setSelectedImage(i)}
//                         className={`rounded-lg overflow-hidden border transition-all ${
//                           selectedImage === i
//                             ? "border-green-600 ring-2 ring-green-500/30"
//                             : "border-gray-400 hover:border-gray-500"
//                         }`}
//                       >
//                         <img
//                           src={url}
//                           alt=""
//                           className="h-20 w-20 object-cover"
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 )}

//                 <div className="flex-1 order-1 lg:order-2">
//                   <div className="rounded-xl overflow-hidden border border-gray-400 bg-gray-950">
//                     <img
//                       src={
//                         product.imageUrls?.[selectedImage] ||
//                         "https://images.unsplash.com/photo-1589924691995-400dc9ecc0af?w=1200"
//                       }
//                       alt={product.AgriproductName}
//                       className="w-full aspect-[4/3] object-cover"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Approval / Rejection Status Box */}
//               {status === "APPROVED" && (
//                 <div className="border border-green-300 bg-green-50 rounded-xl py-6 text-center text-green-700 font-semibold">
//                   APPROVED
//                 </div>
//               )}

//               {status === "REJECTED" && (
//                 <div className="border border-red-300 bg-red-50 rounded-xl p-4">
//                   <div className="text-red-600 font-semibold mb-2">
//                     REJECTED
//                   </div>
//                   <div className="text-sm text-red-600">
//                     {rejectionReason || "No reason specified"}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Right – Details */}
//             <div className="lg:col-span-6 space-y-8">
//               {/* Warnings */}
//               {product.deleted && (
//                 <div className="bg-red-950/40 border-l-4 border-red-600 p-4 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <AlertTriangle className="h-6 w-6 text-red-400" />
//                     <p className="text-red-300">
//                       This product is <strong>soft-deleted</strong>
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {status === "REJECTED" && product.rejectionReason && (
//                 <div className="bg-red-950/50 border-l-4 border-red-600 p-4 rounded-lg">
//                   <h4 className="font-semibold text-red-300 mb-2">
//                     Rejection Reason
//                   </h4>
//                   <p className="text-red-200">{product.rejectionReason}</p>
//                 </div>
//               )}

//               {/* Basic Info */}
//               <div>
//                 <h3 className="text-lg font-semibold text-black mb-4">
//                   Basic Information
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-300">
//                     <dt className="text-sm font-bold text-black">Price</dt>
//                     <dd className="text-md font-semibold text-black mt-1">
//                       ₹{product.Agriprice?.toLocaleString() || "—"} /{" "}
//                       {product.Agriunit || "—"}
//                     </dd>
//                   </div>

//                   <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-300">
//                     <dt className="text-sm font-bold text-black">Stock</dt>
//                     <dd className="text-md font-semibold text-black mt-1">
//                       {product.Agriquantity || 0} units
//                     </dd>
//                   </div>

//                   <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-300">
//                     <dt className="text-sm font-bold text-black">
//                       Visible to customers
//                     </dt>
//                     <dd className="mt-1">
//                       {product.visibleToCustomers ? (
//                         <span className="inline-flex px-3 py-1 text-xs rounded-full border border-green-600 text-green-600">
//                           Yes
//                         </span>
//                       ) : (
//                         <span className="inline-flex px-3 py-1 text-xs rounded-full border border-red-600 text-red-600">
//                           No
//                         </span>
//                       )}
//                     </dd>
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               <div>
//                 <h3 className="text-lg font-semibold text-black mb-3">
//                   Description
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   {product.Agridescription || "No description provided."}
//                 </p>
//               </div>

//               {/* Category Specific */}
//               {product.category === "FERTILIZER" && (
//                 <div className="border-t border-gray-300 pt-6">
//                   <h3 className="text-lg font-semibold text-black mb-4">
//                     Fertilizer Details
//                   </h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
//                       <dt className="text-sm text-gray-400">Type</dt>
//                       <dd className="font-medium text-black">
//                         {product.fertilizerType || "—"}
//                       </dd>
//                     </div>
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
//                       <dt className="text-sm text-gray-400">Nutrients</dt>
//                       <dd className="font-medium text-black">
//                         {product.nutrientComposition || "—"}
//                       </dd>
//                     </div>
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
//                       <dt className="text-sm text-gray-400">FCO Number</dt>
//                       <dd className="font-medium text-black">
//                         {product.fcoNumber || "—"}
//                       </dd>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {product.category === "PESTICIDE" && (
//                 <div className="border-t border-gray-300 pt-6">
//                   <h3 className="text-lg font-semibold text-black mb-4">
//                     Pesticide Details
//                   </h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
//                       <dt className="text-sm text-black">Type</dt>
//                       <dd className="font-medium text-black">
//                         {product.Pesticidetype || "—"}
//                       </dd>
//                     </div>
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
//                       <dt className="text-sm text-black">Active Ingredient</dt>
//                       <dd className="font-medium text-black">
//                         {product.PesticideactiveIngredient || "—"}
//                       </dd>
//                     </div>
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
//                       <dt className="text-sm text-black">Toxicity</dt>
//                       <dd className="font-medium text-black">
//                         {product.Pesticidetoxicity || "—"}
//                       </dd>
//                     </div>
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
//                       <dt className="text-sm text-black">CIB&RC No.</dt>
//                       <dd className="font-medium text-black">
//                         {product.PesticidecibrcNumber || "—"}
//                       </dd>
//                     </div>
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400 sm:col-span-2">
//                       <dt className="text-sm text-black">Formulation</dt>
//                       <dd className="font-medium text-black">
//                         {product.Pesticideformulation || "—"}
//                       </dd>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {product.category === "SEEDS" && (
//                 <div className="border-t border-gray-300 pt-6">
//                   <h3 className="text-lg font-semibold text-black mb-4">
//                     Seeds Details
//                   </h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
//                       <dt className="text-sm text-black">Crop</dt>
//                       <dd className="font-medium text-black">
//                         {product.SeedscropType || "—"}
//                       </dd>
//                     </div>
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
//                       <dt className="text-sm text-black">Variety</dt>
//                       <dd className="font-medium text-black">
//                         {product.Seedsvariety || "—"}
//                       </dd>
//                     </div>
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
//                       <dt className="text-sm text-black">Class</dt>
//                       <dd className="font-medium text-black">
//                         {product.seedClass || "—"}
//                       </dd>
//                     </div>
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
//                       <dt className="text-sm text-black">Germination</dt>
//                       <dd className="font-medium text-black">
//                         {product.SeedsgerminationPercentage
//                           ? `${product.SeedsgerminationPercentage}%`
//                           : "—"}
//                       </dd>
//                     </div>
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
//                       <dt className="text-sm text-black">Purity</dt>
//                       <dd className="font-medium text-black">
//                         {product.SeedsphysicalPurityPercentage
//                           ? `${product.SeedsphysicalPurityPercentage}%`
//                           : "—"}
//                       </dd>
//                     </div>
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
//                       <dt className="text-sm text-black">Lot No.</dt>
//                       <dd className="font-medium text-black">
//                         {product.SeedslotNumber || "—"}
//                       </dd>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {product.category === "PIPE" && (
//                 <div className="border-t border-gray-300 pt-6">
//                   <h3 className="text-lg font-semibold text-black mb-4">
//                     Pipe Details
//                   </h3>
//                   <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
//                       <dt className="text-sm text-black">Type</dt>
//                       <dd className="font-medium text-black">
//                         {product.Pipetype || "—"}
//                       </dd>
//                     </div>
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
//                       <dt className="text-sm text-black">Size</dt>
//                       <dd className="font-medium text-black">
//                         {product.Pipesize || "—"}
//                       </dd>
//                     </div>
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
//                       <dt className="text-sm text-black">Length</dt>
//                       <dd className="font-medium text-black">
//                         {product.Pipelength ? `${product.Pipelength} m` : "—"}
//                       </dd>
//                     </div>
//                     <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
//                       <dt className="text-sm text-black">BIS No.</dt>
//                       <dd className="font-medium text-black">
//                         {product.PipebisNumber || "—"}
//                       </dd>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Vendor */}
//               <div className="border-t border-gray-400 pt-6">
//                 <h3 className="text-lg font-semibold text-black mb-4">
//                   Vendor Information
//                 </h3>
//                 <div className="flex items-start gap-4">
//                   {product.vendor.photo ? (
//                     <img
//                       src={product.vendor.photo}
//                       alt=""
//                       className="h-16 w-16 rounded-full object-cover border border-gray-700"
//                     />
//                   ) : (
//                     <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center">
//                       <ImageIcon className="h-8 w-8 text-gray-600" />
//                     </div>
//                   )}
//                   <div>
//                     <div className="font-bold text-black">
//                       {product.vendor.name}
//                     </div>
//                     <div className="text-sm  font-semibold text-gray-800">
//                       {product.vendor.businessName}
//                     </div>
//                     <div className="text-sm font-medium text-gray-600 mt-2">
//                       📞 {product.vendor.phone}
//                     </div>
//                     <div className="text-sm font-medium text-gray-600">
//                       📍 {product.vendor.city}, {product.vendor.state}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ── Modals (kept minimal – improve as needed) ── */}
//         {showConfirmModal && (
//           <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
//             <div className="bg-white border border-gray-800 rounded-xl p-6 max-w-md w-full">
//               <h3 className="text-xl font-bold text-black mb-4">
//                 Confirm {confirmAction === "approve" ? "Approval" : "Rejection"}
//               </h3>
//               <p className="text-gray-800 mb-6">Are you sure?</p>
//               <div className="flex justify-end gap-4">
//                 <button
//                   onClick={() => setShowConfirmModal(false)}
//                   className="px-5 py-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => {
//                     if (confirmAction === "approve") handleApprove();
//                     else setShowRejectModal(true);
//                     setShowConfirmModal(false);
//                   }}
//                   className={`px-5 py-2.5 rounded-lg font-medium text-white ${
//                     confirmAction === "approve"
//                       ? "bg-green-700 hover:bg-green-600"
//                       : "bg-red-700 hover:bg-red-600"
//                   }`}
//                 >
//                   {confirmAction === "approve" ? "Approve" : "Continue"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {showDeleteConfirm && (
//           <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
//             <div className="bg-white border border-gray-800 rounded-xl p-6 max-w-md w-full">
//               <h3 className="text-xl font-bold text-red-400 mb-4">
//                 Delete Product?
//               </h3>
//               <p className="text-gray-800 mb-6">
//                 This will soft-delete the product (can be restored later).
//               </p>
//               <div className="flex justify-end gap-4">
//                 <button
//                   onClick={() => setShowDeleteConfirm(false)}
//                   className="px-5 py-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className="px-5 py-2.5 bg-red-700 hover:bg-red-600 text-white rounded-lg font-medium"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {showRejectModal && (
//           <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
//               <div className="px-6 py-4 border-b flex justify-between">
//                 <h2 className="text-lg text-[black] font-semibold">
//                   Reason For Rejection
//                 </h2>
//                 <button
//                   onClick={() => setShowRejectModal(false)}
//                   className="text-[black]"
//                 >
//                   ×
//                 </button>
//               </div>

//               <div className="px-6 py-4 space-y-3 max-h-[60vh] overflow-y-auto">
//                 {rejectReasons.map((reason) => (
//                   <label
//                     key={reason}
//                     className="flex gap-3 text-gray-800 text-sm"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedReasons.includes(reason)}
//                       onChange={() => toggleReason(reason)}
//                     />
//                     {reason}
//                   </label>
//                 ))}

//                 {selectedReasons.includes("Other") && (
//                   <textarea
//                     className="w-full border border-gray-300 text-gray-800 rounded p-2"
//                     placeholder="Enter custom reason"
//                     value={customReason}
//                     onChange={(e) => setCustomReason(e.target.value)}
//                   />
//                 )}
//               </div>

//               <div className="px-6 py-4 border-t">
//                 <button
//                   disabled={
//                     !selectedReasons.length ||
//                     (selectedReasons.includes("Other") && !customReason.trim())
//                   }
//                   onClick={handleReject}
//                   className="w-full py-3 bg-green-600 text-white rounded-lg disabled:bg-gray-300"
//                 >
//                   Submit Rejection
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// *******************Axios + API Integration Version*******************

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Trash2,
  Image as ImageIcon,
  AlertTriangle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getAgriProductById,
  approveAgriProduct,
  rejectAgriProduct,
  deleteAgriProduct,
} from "../../../api/agriProduct";

export default function AgriProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [selectedImage, setSelectedImage] = useState(0);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const [selectedReasons, setSelectedReasons] = useState([]);
  const [customReason, setCustomReason] = useState("");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getAgriProductById(id);

      setProduct({
        ...data,
        imageUrls: data.AgriimageUrl || [],
        visibleToCustomers: data.visibleToCustomers ?? false,
        vendor: {
          ...data.vendor,
          photo: data.vendor?.photoUrl || null,
        },
      });

      setStatus(data.approvalStatus);
    } catch {
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="p-6 text-center">Product not found</div>;
  }

  const rejectReasons = [
    "Incomplete product information",
    "Incorrect or misleading description",
    "Poor quality or unclear images",
    "Duplicate product",
    "Incorrect category",
    "Price not as per market",
    "License / authorization missing",
    "Banned or restricted product",
    "Policy violation",
    "Incorrect specifications",
    "Copyright or trademark issue",
    "Quality standards not met",
    "Inappropriate content",
    "Missing warranty / return info",
    "Vendor details not verifiable",
    "Other",
  ];

  const toggleReason = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason],
    );
  };

  const handleApprove = async () => {
    try {
      await approveAgriProduct(product.id);
      toast.success("Product approved");
      setStatus("APPROVED");
    } catch {
      toast.error("Approve failed");
    }
  };

  const handleReject = async () => {
    if (!selectedReasons.length) return;

    let reasons = [...selectedReasons];
    if (reasons.includes("Other") && customReason.trim()) {
      reasons = reasons.filter((r) => r !== "Other");
      reasons.push(customReason.trim());
    }

    const finalReason = reasons.join(", ");

    try {
      await rejectAgriProduct(product.id, finalReason);
      setProduct((prev) => ({
        ...prev,
        rejectionReason: finalReason,
      }));

      setStatus("REJECTED");
      setShowRejectModal(false);
      toast.error("Product rejected");
    } catch {
      toast.error("Reject failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAgriProduct(product.id);
      toast.success("Product deleted");
      navigate("/agri-products");
    } catch {
      toast.error("Delete failed");
    }
  };

  const getStatusStyle = () => {
    if (status === "APPROVED") return "text-green-600 border-green-700";
    if (status === "REJECTED") return "text-red-600 border-red-600";
    return " text-amber-300 border-[amber-300]";
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back */}
        <button
          onClick={() => navigate("/agri-products")}
          className="mb-6 inline-flex items-center gap-2 text-gray-400 hover:text-gray-200"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        <div className="rounded-xl border border-gray-200 bg-[white]  overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-300 px-6 py-5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-black">
                  {product.AgriproductName}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span className="font-bold uppercase tracking-wide">
                    {product.category}
                  </span>
                  <span>•</span>
                  <span>Brand: {product.AgribrandName || "—"}</span>
                  <span
                    className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${getStatusStyle()}`}
                  >
                    {status}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  disabled={status === "APPROVED"}
                  onClick={() => {
                    setConfirmAction("approve");
                    setShowConfirmModal(true);
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition ${
                    status === "APPROVED"
                      ? "bg-green-950 text-green-600 cursor-not-allowed"
                      : "bg-green-700 hover:bg-green-600 text-white"
                  }`}
                >
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </button>

                <button
                  disabled={status === "REJECTED" || status === "APPROVED"}
                  onClick={() => {
                    setConfirmAction("reject");
                    setShowConfirmModal(true);
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition ${
                    status === "REJECTED" || status === "APPROVED"
                      ? "bg-red-950 text-red-600 cursor-not-allowed"
                      : "bg-red-700 hover:bg-red-600 text-white"
                  }`}
                >
                  <XCircle className="h-4 w-4" />
                  Reject
                </button>

                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-800 text-white hover:bg-gray-700 text-sm font-medium"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8">
            {/* Left – Images*/}
            <div className="lg:col-span-6 space-y-8">
              {/* Product Images */}
              <div className="flex flex-col lg:flex-row gap-5">
                {product.imageUrls?.length > 0 && (
                  <div className="flex lg:flex-col gap-3 order-2 lg:order-1">
                    {product.imageUrls.map((url, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`rounded-lg overflow-hidden border transition-all ${
                          selectedImage === i
                            ? "border-green-600 ring-2 ring-green-500/30"
                            : "border-gray-400 hover:border-gray-500"
                        }`}
                      >
                        <img
                          src={url}
                          alt=""
                          className="h-20 w-20 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex-1 order-1 lg:order-2">
                  <div className="rounded-xl overflow-hidden border border-gray-400 bg-gray-950">
                    <img
                      src={
                        product.imageUrls?.[selectedImage] ||
                        "https://images.unsplash.com/photo-1589924691995-400dc9ecc0af?w=1200"
                      }
                      alt={product.AgriproductName}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Approval / Rejection Status Box */}
              {status === "APPROVED" && (
                <div className="border border-green-300 bg-green-50 rounded-xl py-6 text-center text-green-700 font-semibold">
                  APPROVED
                </div>
              )}

              {status === "REJECTED" && (
                <div className="border border-red-300 bg-red-50 rounded-xl p-4">
                  <div className="text-red-600 font-semibold mb-2">
                    REJECTED
                  </div>
                  <div className="text-sm text-red-600">
                    {product.rejectionReason || "No reason specified"}
                  </div>
                </div>
              )}
            </div>

            {/* Right – Details */}
            <div className="lg:col-span-6 space-y-8">
              {/* Warnings */}
              {product.deleted && (
                <div className="bg-red-950/40 border-l-4 border-red-600 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-red-400" />
                    <p className="text-red-300">
                      This product is <strong>soft-deleted</strong>
                    </p>
                  </div>
                </div>
              )}

              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-300">
                    <dt className="text-sm font-bold text-black">Price</dt>
                    <dd className="text-md font-semibold text-black mt-1">
                      ₹{product.Agriprice?.toLocaleString() || "—"} /{" "}
                      {product.Agriunit || "—"}
                    </dd>
                  </div>

                  <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-300">
                    <dt className="text-sm font-bold text-black">Stock</dt>
                    <dd className="text-md font-semibold text-black mt-1">
                      {product.Agriquantity || 0} units
                    </dd>
                  </div>

                  <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-300">
                    <dt className="text-sm font-bold text-black">Created At</dt>
                    <dd className="text-md font-semibold text-black mt-1">
                      {product.createdAt?.split("T")[0] || "—"}
                    </dd>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.Agridescription || "No description provided."}
                </p>
              </div>

              {/* Category Specific */}
              {product.category === "FERTILIZER" && (
                <div className="border-t border-gray-300 pt-6">
                  <h3 className="text-lg font-semibold text-black mb-4">
                    Fertilizer Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-gray-400">Type</dt>
                      <dd className="font-medium text-black">
                        {product.fertilizerType || "—"}
                      </dd>
                    </div>
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-gray-400">Nutrients</dt>
                      <dd className="font-medium text-black">
                        {product.nutrientComposition || "—"}
                      </dd>
                    </div>
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-gray-400">FCO Number</dt>
                      <dd className="font-medium text-black">
                        {product.fcoNumber || "—"}
                      </dd>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-gray-400">License Type</dt>
                      <dd className="font-medium text-black">
                        {product.AgrilicenseType || "—"}
                      </dd>
                    </div>

                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-gray-400">License Number</dt>
                      <dd className="font-medium text-black">
                        {product.AgrilicenseNumber || "—"}
                      </dd>
                    </div>

                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-gray-400">Batch Number</dt>
                      <dd className="font-medium text-black">
                        {product.AgribatchNumber || "—"}
                      </dd>
                    </div>

                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-gray-400">Manufacturer</dt>
                      <dd className="font-medium text-black">
                        {product.AgrimanufacturerName || "—"}
                      </dd>
                    </div>

                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-gray-400">
                        Manufacturing Date
                      </dt>
                      <dd className="font-medium text-black">
                        {product.AgrimanufacturingDate || "—"}
                      </dd>
                    </div>

                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-gray-400">Expiry Date</dt>
                      <dd className="font-medium text-black">
                        {product.AgriexpiryDate || "—"}
                      </dd>
                    </div>
                  </div>
                </div>
              )}

              {product.category === "PESTICIDE" && (
                <div className="border-t border-gray-300 pt-6">
                  <h3 className="text-lg font-semibold text-black mb-4">
                    Pesticide Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-black">Type</dt>
                      <dd className="font-medium text-black">
                        {product.Pesticidetype || "—"}
                      </dd>
                    </div>
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-black">Active Ingredient</dt>
                      <dd className="font-medium text-black">
                        {product.PesticideactiveIngredient || "—"}
                      </dd>
                    </div>
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-black">Toxicity</dt>
                      <dd className="font-medium text-black">
                        {product.Pesticidetoxicity || "—"}
                      </dd>
                    </div>
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-black">CIB&RC No.</dt>
                      <dd className="font-medium text-black">
                        {product.PesticidecibrcNumber || "—"}
                      </dd>
                    </div>
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400 sm:col-span-2">
                      <dt className="text-sm text-black">Formulation</dt>
                      <dd className="font-medium text-black">
                        {product.Pesticideformulation || "—"}
                      </dd>
                    </div>
                  </div>
                </div>
              )}

              {product.category === "SEEDS" && (
                <div className="border-t border-gray-300 pt-6">
                  <h3 className="text-lg font-semibold text-black mb-4">
                    Seeds Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-black">Crop</dt>
                      <dd className="font-medium text-black">
                        {product.SeedscropType || "—"}
                      </dd>
                    </div>
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-black">Variety</dt>
                      <dd className="font-medium text-black">
                        {product.Seedsvariety || "—"}
                      </dd>
                    </div>
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-black">Class</dt>
                      <dd className="font-medium text-black">
                        {product.seedClass || "—"}
                      </dd>
                    </div>
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-black">Germination</dt>
                      <dd className="font-medium text-black">
                        {product.SeedsgerminationPercentage
                          ? `${product.SeedsgerminationPercentage}%`
                          : "—"}
                      </dd>
                    </div>
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-black">Purity</dt>
                      <dd className="font-medium text-black">
                        {product.SeedsphysicalPurityPercentage
                          ? `${product.SeedsphysicalPurityPercentage}%`
                          : "—"}
                      </dd>
                    </div>
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-black">Lot No.</dt>
                      <dd className="font-medium text-black">
                        {product.SeedslotNumber || "—"}
                      </dd>
                    </div>
                  </div>
                </div>
              )}

              {product.category === "PIPE" && (
                <div className="border-t border-gray-300 pt-6">
                  <h3 className="text-lg font-semibold text-black mb-4">
                    Pipe Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-black">Type</dt>
                      <dd className="font-medium text-black">
                        {product.Pipetype || "—"}
                      </dd>
                    </div>
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-black">Size</dt>
                      <dd className="font-medium text-black">
                        {product.Pipesize || "—"}
                      </dd>
                    </div>
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-black">Length</dt>
                      <dd className="font-medium text-black">
                        {product.Pipelength ? `${product.Pipelength} m` : "—"}
                      </dd>
                    </div>
                    <div className="bg-gray-300/60 p-4 rounded-lg border border-gray-400">
                      <dt className="text-sm text-black">BIS No.</dt>
                      <dd className="font-medium text-black">
                        {product.PipebisNumber || "—"}
                      </dd>
                    </div>
                  </div>
                </div>
              )}

              {/* Vendor */}
              <div className="border-t border-gray-400 pt-6">
                <h3 className="text-lg font-semibold text-black mb-4">
                  Vendor Information
                </h3>
                <div className="flex items-start gap-4">
                  {product.vendor.photo ? (
                    <img
                      src={product.vendor.photo}
                      alt=""
                      className="h-16 w-16 rounded-full object-cover border border-gray-700"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gray-800 flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-600" />
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-black">
                      {product.vendor.name}
                    </div>
                    <div className="text-sm  font-semibold text-gray-800">
                      {product.vendor.businessName}
                    </div>
                    <div className="text-sm font-medium text-gray-600 mt-2">
                      📞 {product.vendor.phone}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      📍 {product.vendor.city}, {product.vendor.state}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Modals (kept minimal – improve as needed) ── */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
            <div className="bg-white border border-gray-800 rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-black mb-4">
                Confirm {confirmAction === "approve" ? "Approval" : "Rejection"}
              </h3>
              <p className="text-gray-800 mb-6">Are you sure?</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-5 py-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (confirmAction === "approve") handleApprove();
                    else setShowRejectModal(true);
                    setShowConfirmModal(false);
                  }}
                  className={`px-5 py-2.5 rounded-lg font-medium text-white ${
                    confirmAction === "approve"
                      ? "bg-green-700 hover:bg-green-600"
                      : "bg-red-700 hover:bg-red-600"
                  }`}
                >
                  {confirmAction === "approve" ? "Approve" : "Continue"}
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
            <div className="bg-white border border-gray-800 rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-red-400 mb-4">
                Delete Product?
              </h3>
              <p className="text-gray-800 mb-6">
                This will soft-delete the product (can be restored later).
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-5 py-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-5 py-2.5 bg-red-700 hover:bg-red-600 text-white rounded-lg font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showRejectModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
              <div className="px-6 py-4 border-b flex justify-between">
                <h2 className="text-lg text-[black] font-semibold">
                  Reason For Rejection
                </h2>
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="text-[black]"
                >
                  ×
                </button>
              </div>

              <div className="px-6 py-4 space-y-3 max-h-[60vh] overflow-y-auto">
                {rejectReasons.map((reason) => (
                  <label
                    key={reason}
                    className="flex gap-3 text-gray-800 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedReasons.includes(reason)}
                      onChange={() => toggleReason(reason)}
                    />
                    {reason}
                  </label>
                ))}

                {selectedReasons.includes("Other") && (
                  <textarea
                    className="w-full border border-gray-300 text-gray-800 rounded p-2"
                    placeholder="Enter custom reason"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                  />
                )}
              </div>

              <div className="px-6 py-4 border-t">
                <button
                  disabled={
                    !selectedReasons.length ||
                    (selectedReasons.includes("Other") && !customReason.trim())
                  }
                  onClick={handleReject}
                  className="w-full py-3 bg-green-600 text-white rounded-lg disabled:bg-gray-300"
                >
                  Submit Rejection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
