// import React, { useState } from "react";
// import { CheckCircle, ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";

// const SellerProfile = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("info");
//   const [approvalStatus, setApprovalStatus] = useState("approved");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [documents, setDocuments] = useState([
//     { name: "Shop License", status: "Pending" },
//     { name: "Aadhar Card", status: "Pending" },
//     { name: "Udhyam Aadhar", status: "Approved" },
//     { name: "Pan Card", status: "Rejected" },
//   ]);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [confirmAction, setConfirmAction] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleApprovalStatusChange = (status) => {
//     setConfirmAction(status);
//     setShowConfirmation(true);
//   };

//   const confirmApprovalAction = () => {
//     setApprovalStatus(confirmAction);
//     setSuccessMessage(
//       `Seller has been ${
//         confirmAction === "approved" ? "Approved" : "Rejected"
//       } successfully!`
//     );
//     setShowConfirmation(false);
//     setTimeout(() => setSuccessMessage(""), 3000);
//   };

//   const handleDocumentAction = (docName, action) => {
//     setDocuments(
//       documents.map((doc) =>
//         doc.name === docName
//           ? { ...doc, status: action === "approve" ? "Approved" : "Rejected" }
//           : doc
//       )
//     );
//     setSuccessMessage(
//       `Document "${docName}" has been ${
//         action === "approve" ? "Approved" : "Rejected"
//       }`
//     );
//     setTimeout(() => setSuccessMessage(""), 3000);
//   };

//   const seller = {
//     storeName: "Shop.com",
//     location: "Baner, Pune",
//     vendorId: "12345678901",
//     img: "https://t3.ftcdn.net/jpg/02/75/39/23/360_F_275392381_9up8TfWvS3SDeKR0VAbS26DMBVpMRhS7.jpg",
//     fullName: "Sanjay Kumar",
//     phone: "+91-888-000-3058",
//     email: "classmet01@gmail.com",
//     vendorType: "vegetable",
//     workingHours: "7:00 AM – 9:00 PM",
//     gst: "00947829809",
//     address: "Baner,123, main street, Pune",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//   };

//   // Products data
//   const allProducts = [
//     {
//       id: "YH8626KI98",
//       name: "Fresh Organic brinjals",
//       price: "₹115",
//       rating: 4.5,
//       img: "https://t3.ftcdn.net/jpg/02/75/39/23/360_F_275392381_9up8TfWvS3SDeKR0VAbS26DMBVpMRhS7.jpg",
//     },
//     {
//       id: "YH8626KI98",
//       name: "Fresh Organic Tomatoes",
//       price: "₹150",
//       rating: 5.0,
//       img: "https://images.unsplash.com/photo-1464039866556-6812c9d1c72e?w=300",
//     },
//     {
//       id: "YH8626KI98",
//       name: "Fresh Organic Potatoes",
//       price: "₹100",
//       rating: 4.0,
//       img: "https://images.unsplash.com/photo-1596363860514-ac4fac003527?w=300",
//     },
//     {
//       id: "YH8626KI98",
//       name: "Fresh Organic Cauliflower",
//       price: "₹120",
//       rating: 3.5,
//       img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300",
//     },
//     {
//       id: "YH8626KI98",
//       name: "Fresh Organic Green chilli",
//       price: "₹115",
//       rating: 4.5,
//       img: "https://images.unsplash.com/photo-1599599810694-b5ac4dd83eaf?w=300",
//     },
//     {
//       id: "YH8626KI98",
//       name: "Fresh Organic coriander leaves",
//       price: "₹105",
//       rating: 5.0,
//       img: "https://images.unsplash.com/photo-1599599810694-b5ac4dd83eaf?w=300",
//     },
//     {
//       id: "YH8626KI98",
//       name: "Fresh Organic Cabbage",
//       price: "₹180",
//       rating: 3.5,
//       img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300",
//     },
//     {
//       id: "YH8626KI98",
//       name: "Fresh Organic Lady Fingers",
//       price: "₹125",
//       rating: 4.5,
//       img: "https://images.unsplash.com/photo-1599599810694-b5ac4dd83eaf?w=300",
//     },
//     {
//       id: "YH8626KI98",
//       name: "Fresh Organic Green chilli",
//       price: "₹115",
//       rating: 3.5,
//       img: "https://images.unsplash.com/photo-1599599810694-b5ac4dd83eaf?w=300",
//     },
//     {
//       id: "YH8626KI98",
//       name: "Fresh Organic Potatoes",
//       price: "₹100",
//       rating: 3.0,
//       img: "https://images.unsplash.com/photo-1596363860514-ac4fac003527?w=300",
//     },
//     {
//       id: "YH8626KI98",
//       name: "Fresh Organic brinjals",
//       price: "₹115",
//       rating: 4.0,
//       img: "https://t3.ftcdn.net/jpg/02/75/39/23/360_F_275392381_9up8TfWvS3SDeKR0VAbS26DMBVpMRhS7.jpg",
//     },
//     {
//       id: "YH8626KI98",
//       name: "Fresh Organic coriander leaves",
//       price: "₹105",
//       rating: 4.5,
//       img: "https://images.unsplash.com/photo-1599599810694-b5ac4dd83eaf?w=300",
//     },
//     {
//       id: "YH8626KI98",
//       name: "Fresh Organic brinjals",
//       price: "₹115",
//       rating: 4.5,
//       img: "https://t3.ftcdn.net/jpg/02/75/39/23/360_F_275392381_9up8TfWvS3SDeKR0VAbS26DMBVpMRhS7.jpg",
//     },
//     {
//       id: "YH8626KI98",
//       name: "Fresh Organic Tomatoes",
//       price: "₹150",
//       rating: 5.0,
//       img: "https://images.unsplash.com/photo-1464039866556-6812c9d1c72e?w=300",
//     },
//     {
//       id: "YH8626KI98",
//       name: "Fresh Organic Potatoes",
//       price: "₹100",
//       rating: 4.0,
//       img: "https://images.unsplash.com/photo-1596363860514-ac4fac003527?w=300",
//     },
//     {
//       id: "YH8626KI98",
//       name: "Fresh Organic Cauliflower",
//       price: "₹120",
//       rating: 3.5,
//       img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300",
//     },
//   ];

//   // Filter products based on search term
//   const filteredProducts = allProducts.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       {/* Success Message */}
//       {successMessage && (
//         <div className="max-w-7xl mx-auto mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
//           ✓ {successMessage}
//         </div>
//       )}

//       {/* Back Button */}
//       <div className="max-w-7xl mx-auto mb-4">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span className="text-sm font-medium">Back</span>
//         </button>
//       </div>

//       <div className="max-w-7xl mx-auto bg-white rounded-lg shadow">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 gap-4">
//           <h1 className="text-xl sm:text-2xl font-semibold">Profile</h1>
//           <div className="inline-flex items-center bg-gray-200 rounded-full p-1 w-full sm:w-auto">
//             <button
//               onClick={() => handleApprovalStatusChange("approved")}
//               className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
//                 approvalStatus === "approved"
//                   ? "bg-lime-600 text-white"
//                   : "text-gray-700 hover:text-gray-900"
//               }`}
//             >
//               Approve
//             </button>
//             <button
//               onClick={() => handleApprovalStatusChange("rejected")}
//               className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
//                 approvalStatus === "rejected"
//                   ? "bg-red-500 text-white"
//                   : "text-gray-700 hover:text-gray-900"
//               }`}
//             >
//               Reject
//             </button>
//           </div>
//         </div>

//         {/* Store Info */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-5">
//           <img
//             src={seller.img}
//             className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
//             alt=""
//           />
//           <div className="flex-1">
//             <h2 className="font-semibold text-base sm:text-lg">
//               {seller.storeName}
//             </h2>
//             <p className="text-xs sm:text-sm text-gray-500">
//               {seller.location}
//             </p>
//             <p className="text-xs sm:text-sm text-gray-500">
//               Vendor Id: {seller.vendorId}
//             </p>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-4 sm:gap-8 px-4 sm:px-6 border-b border-gray-200 overflow-x-auto">
//           <button
//             onClick={() => setActiveTab("info")}
//             className={`py-3 text-xs sm:text-sm font-medium whitespace-nowrap ${
//               activeTab === "info"
//                 ? "border-b-2 border-lime-600 text-lime-600"
//                 : "text-gray-500"
//             }`}
//           >
//             Store Info
//           </button>
//           <button
//             onClick={() => setActiveTab("products")}
//             className={`py-3 text-xs sm:text-sm font-medium whitespace-nowrap ${
//               activeTab === "products"
//                 ? "border-b-2 border-lime-600 text-lime-600"
//                 : "text-gray-500"
//             }`}
//           >
//             Products
//           </button>
//           <button
//             onClick={() => setActiveTab("bank")}
//             className={`py-3 text-xs sm:text-sm font-medium whitespace-nowrap ${
//               activeTab === "bank"
//                 ? "border-b-2 border-lime-600 text-lime-600"
//                 : "text-gray-500"
//             }`}
//           >
//             Banking Details
//           </button>
//           <button
//             onClick={() => setActiveTab("reviews")}
//             className={`py-3 text-xs sm:text-sm font-medium whitespace-nowrap ${
//               activeTab === "reviews"
//                 ? "border-b-2 border-lime-600 text-lime-600"
//                 : "text-gray-500"
//             }`}
//           >
//             Review And Rating
//           </button>
//         </div>

//         {/* INFORMATION TAB */}
//         {activeTab === "info" && (
//           <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
//             {/* Personal Details */}
//             <Section title="Personal Details">
//               <div className="flex flex-wrap gap-8">
//                 <div className="flex-1 min-w-[150px]">
//                   <Info label="Full Name" value={seller.fullName} />
//                 </div>
//                 <div className="flex-1 min-w-[150px]">
//                   <Info label="Email Address" value={seller.email} />
//                 </div>
//                 <div className="flex-1 min-w-[150px]">
//                   <Info label="Phone Number" value={seller.phone} />
//                 </div>
//                 <div className="flex-1 min-w-[150px]">
//                   <Info label="Address" value={seller.address} />
//                 </div>
//               </div>
//             </Section>

//             {/* Store Info */}
//             <Section title="Store Information">
//               <div className="grid grid-cols-3 gap-8 mb-6">
//                 <Info label="Store Name" value={seller.storeName} />
//                 <Info label="Vendor Type" value={seller.vendorType} />
//                 <Info label="Working Hours" value={seller.workingHours} />

//                 <Info label="GST Number" value={seller.gst} />
//                 <Info label="Address" value={seller.address} />
//               </div>

//               <div className="mt-6">
//                 <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
//                   Description
//                 </h4>
//                 <div className="text-xs sm:text-sm rounded text-gray-700 leading-relaxed">
//                   {seller.description}
//                 </div>
//               </div>
//             </Section>

//             {/* Documents */}
//             <Section
//               title={
//                 <div className="flex items-center gap-2 flex-wrap">
//                   <span>Store Documents</span>
//                   <span className="text-xs text-gray-400 font-normal">
//                     (When all documents are verified then only profile will be
//                     approved)
//                   </span>
//                 </div>
//               }
//             >
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//                 {documents.map((doc, i) => (
//                   <div
//                     key={i}
//                     className="border border-gray-200 rounded p-3 flex flex-col"
//                   >
//                     {/* Top Row: Name left, Status right */}
//                     <div className="flex justify-between items-start mb-3">
//                       <p className="text-xs sm:text-sm font-semibold text-gray-800">
//                         {doc.name}
//                       </p>
//                       <div>
//                         {doc.status === "Pending" && (
//                           <span className="inline-block bg-blue-100 text-blue-600 px-2 py-1 text-xs font-semibold rounded-full">
//                             Pending
//                           </span>
//                         )}
//                         {doc.status === "Approved" && (
//                           <span className="inline-block bg-green-100 text-green-600 px-2 py-1 text-xs font-semibold rounded-full">
//                             Approved
//                           </span>
//                         )}
//                         {doc.status === "Rejected" && (
//                           <span className="inline-block bg-red-100 text-red-600 px-2 py-1 text-xs font-semibold rounded-full">
//                             Rejected
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     {/* Document Image */}
//                     <div className="h-28 sm:h-32 bg-gray-100 flex items-center justify-center text-xs flex-1 mb-3 overflow-hidden rounded">
//                       <img
//                         src="https://www.wabe.org/app/uploads/2022/08/AP22238609672608-scaled.jpg"
//                         alt={doc.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>

//                     {/* Action Buttons */}
//                     {doc.status === "Pending" && (
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() =>
//                             handleDocumentAction(doc.name, "approve")
//                           }
//                           className="border border-gray-400 text-gray-700 px-3 py-1.5 text-xs rounded font-semibold hover:bg-gray-50 transition-colors flex-1"
//                         >
//                           Approve
//                         </button>
//                         <button
//                           onClick={() =>
//                             handleDocumentAction(doc.name, "reject")
//                           }
//                           className="border border-gray-400 text-gray-700 px-3 py-1.5 text-xs rounded font-semibold hover:bg-gray-50 transition-colors flex-1"
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     )}

//                     {doc.status === "Approved" && (
//                       <button className="bg-green-500 text-white w-full py-1.5 text-xs rounded font-semibold cursor-default">
//                         Approved
//                       </button>
//                     )}

//                     {doc.status === "Rejected" && (
//                       <button className="bg-red-500 text-white w-full py-1.5 text-xs rounded font-semibold cursor-default">
//                         Rejected
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </Section>
//           </div>
//         )}

//         {/* BANKING TAB */}
//         {activeTab === "bank" && (
//           <div className="p-4 sm:p-6">
//             <h3 className="font-semibold mb-4 text-sm sm:text-base">
//               Configured Payment Options
//             </h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               <PaymentCard title="Mobile Payment">
//                 <Info label="UPI ID" value="8887770080@bdi" />
//               </PaymentCard>

//               <PaymentCard title="QR Code">
//                 <Info label="Merchant Id" value="4075800480" />
//                 <div className="mt-3 flex flex-col">
//                   <p className="mb-2 text-sm font-medium text-gray-700">
//                     QR Code
//                   </p>
//                   <img
//                     src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=4075800480"
//                     alt="QR Code"
//                     className="w-32 h-32"
//                   />
//                 </div>
//               </PaymentCard>

//               <PaymentCard title="Debit / Credit Card">
//                 <Info label="First Name" value="Sanjay" />
//                 <Info label="Last Name" value="Kumar" />
//                 <Info label="Card Number" value="1098 7400 1768 1986" />
//                 <Info label="Valid Until" value="December 2030" />
//               </PaymentCard>

//               <PaymentCard title="Bank Transfer">
//                 <Info label="Account Holder Name" value="Sanjay Kumar" />
//                 <Info label="Account Number" value="0938797239807823" />
//                 <Info label="Bank Name" value="State Bank of India" />
//                 <Info label="Bank IFSC Code" value="SBIN0984775" />
//               </PaymentCard>

//               <PaymentCard title="Cash On Delivery" center>
//                 <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-lime-600 mx-auto mb-2" />
//                 <p className="text-xs sm:text-sm text-lime-600 font-medium">
//                   Cash On Delivery
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   payment service is providing
//                 </p>
//               </PaymentCard>
//             </div>
//           </div>
//         )}

//         {/* PRODUCTS TAB */}
//         {activeTab === "products" && (
//           <div className="p-4 sm:p-6">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
//               <h3 className="font-semibold text-sm sm:text-base">
//                 All Products ({filteredProducts.length})
//               </h3>
//               <div className="w-full sm:w-auto relative">
//                 {/* Search Icon */}
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

//                 <input
//                   type="text"
//                   placeholder="Search product by name"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-lime-600"
//                 />
//               </div>
//             </div>

//             {filteredProducts.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4">
//                 {filteredProducts.map((product, i) => (
//                   <div
//                     key={i}
//                     className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
//                   >
//                     <div className="aspect-square overflow-hidden bg-gray-100">
//                       <img
//                         src={product.img}
//                         alt={product.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="p-2">
//                       <p className="text-xs text-gray-500">{product.id}</p>
//                       <p className="text-xs sm:text-sm font-medium truncate">
//                         {product.name}
//                       </p>
//                       <div className="flex items-center justify-between mt-2">
//                         <p className="font-semibold text-xs sm:text-sm">
//                           {product.price}
//                         </p>
//                         <div className="flex items-center gap-1">
//                           <span className="text-xs text-yellow-500">★</span>
//                           <span className="text-xs font-medium">
//                             {product.rating}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 text-sm">
//                   No products found matching "{searchTerm}"
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* REVIEWS TAB */}
//         {activeTab === "reviews" && (
//           <div className="p-4 sm:p-6">
//             <h3 className="font-semibold mb-6 text-sm sm:text-base">
//               Product Review And Rating
//             </h3>

//             <div className="space-y-4">
//               {[
//                 {
//                   product: "Fresh Organic Potatoes",
//                   rating: 4,
//                   review:
//                     "Farm-fresh medium-sized potatoes, perfect for daily cooking, ideal for curries, fries, and boiling..",
//                   date: "24 Nov 2025",
//                   author: "Green Valley Farm",
//                   img: "https://images.unsplash.com/photo-1596363860514-ac4fac003527?w=100",
//                 },
//                 {
//                   product: "Fresh Organic Cabbage",
//                   rating: 5,
//                   review:
//                     "Farm-fresh medium-sized potatoes, perfect for daily cooking, ideal for curries, fries, and boiling..",
//                   date: "24 Nov 2025",
//                   author: "Green Valley Farm",
//                   img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=100",
//                 },
//                 {
//                   product: "Fresh Organic Coriander Leaves",
//                   rating: 3,
//                   review:
//                     "Farm-fresh medium-sized potatoes, perfect for daily cooking, ideal for curries, fries, and boiling..",
//                   date: "24 Nov 2025",
//                   author: "Green Valley Farm",
//                   img: "https://images.unsplash.com/photo-1599599810694-b5ac4dd83eaf?w=100",
//                 },
//                 {
//                   product: "Fresh Organic Green Chilli",
//                   rating: 4,
//                   review:
//                     "Farm-fresh medium-sized potatoes, perfect for daily cooking, ideal for curries, fries, and boiling..",
//                   date: "24 Nov 2025",
//                   author: "Green Valley Farm",
//                   img: "https://images.unsplash.com/photo-1599599810694-b5ac4dd83eaf?w=100",
//                 },
//                 {
//                   product: "Fresh Organic Lady Finger",
//                   rating: 5,
//                   review:
//                     "Farm-fresh medium-sized potatoes, perfect for daily cooking, ideal for curries, fries, and boiling..",
//                   date: "24 Nov 2025",
//                   author: "Green Valley Farm",
//                   img: "https://images.unsplash.com/photo-1599599810694-b5ac4dd83eaf?w=100",
//                 },
//                 {
//                   product: "Fresh Organic Cauliflower",
//                   rating: 4,
//                   review:
//                     "Farm-fresh medium-sized potatoes, perfect for daily cooking, ideal for curries, fries, and boiling..",
//                   date: "24 Nov 2025",
//                   author: "Green Valley Farm",
//                   img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=100",
//                 },
//                 {
//                   product: "Fresh Organic Brinjals",
//                   rating: 4,
//                   review:
//                     "Farm-fresh medium-sized potatoes, perfect for daily cooking, ideal for curries, fries, and boiling..",
//                   date: "24 Nov 2025",
//                   author: "Green Valley Farm",
//                   img: "https://t3.ftcdn.net/jpg/02/75/39/23/360_F_275392381_9up8TfWvS3SDeKR0VAbS26DMBVpMRhS7.jpg",
//                 },
//               ].map((item, i) => (
//                 <div
//                   key={i}
//                   className="border border-gray-200 rounded-lg p-4 flex gap-4"
//                 >
//                   <img
//                     src={item.img}
//                     alt={item.product}
//                     className="w-20 h-20 rounded object-cover"
//                   />
//                   <div className="flex-1">
//                     <p className="font-semibold text-sm">{item.product}</p>
//                     <div className="flex gap-1 my-1">
//                       {[...Array(5)].map((_, idx) => (
//                         <span
//                           key={idx}
//                           className={`text-xs ${
//                             idx < item.rating
//                               ? "text-yellow-500"
//                               : "text-gray-300"
//                           }`}
//                         >
//                           ★
//                         </span>
//                       ))}
//                     </div>
//                     <p className="text-xs sm:text-sm text-gray-600">
//                       {item.review}
//                     </p>
//                     <p className="text-xs text-gray-400 mt-2">
//                       By {item.author} | {item.date}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirmation && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-sm w-full">
//             <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
//               Confirm Action
//             </h3>
//             <p className="text-sm text-gray-600 mb-6">
//               Are you sure you want to{" "}
//               <span className="font-semibold">
//                 {confirmAction === "approved" ? "Approve" : "Reject"}
//               </span>{" "}
//               this seller?
//             </p>
//             <div className="flex gap-3 justify-end">
//               <button
//                 onClick={() => setShowConfirmation(false)}
//                 className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmApprovalAction}
//                 className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white rounded-lg transition-colors ${
//                   confirmAction === "approved"
//                     ? "bg-lime-600 hover:bg-lime-700"
//                     : "bg-red-500 hover:bg-red-600"
//                 }`}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// /* ---------- Reusable UI ---------- */

// const Section = ({ title, children }) => (
//   <div className="border border-gray-200 rounded-lg p-4 sm:p-5">
//     <h3 className="font-semibold mb-4 text-sm sm:text-base">{title}</h3>
//     {children}
//   </div>
// );

// const Info = ({ label, value, center }) => (
//   <div className={center ? "text-center" : ""}>
//     <p className="text-xs text-gray-500">{label}</p>
//     <p className="text-xs sm:text-sm font-medium">{value}</p>
//   </div>
// );

// const Grid3 = ({ children }) => (
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>
// );

// const Grid2 = ({ children }) => (
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">{children}</div>
// );

// const PaymentCard = ({ title, children, center }) => (
//   <div
//     className={`border border-gray-200 rounded-lg p-4 sm:p-5 ${
//       center ? "text-center flex flex-col justify-center" : ""
//     }`}
//   >
//     <h4 className="font-semibold mb-3 text-xs sm:text-sm">{title}</h4>
//     <div className="space-y-2">{children}</div>
//   </div>
// );

// export default SellerProfile;


import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  ArrowLeft,
  Loader2,
  Trash2,
  Check,
  X,
  Package,
  Star,
  Smartphone,
  QrCode,
  CreditCard,
  Maximize2,
  Download,
  User,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

// API Files
import {
  getSellerProfile,
  approveSeller,
  rejectSeller,
  deleteSeller,
  getProductsByVendor,
} from "../../../api/sellerApi";

const SellerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");
  const [loading, setLoading] = useState(true);
  const [approvalStatus, setApprovalStatus] = useState("pending");
  const [documents, setDocuments] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [sellerData, setSellerData] = useState(null);
  const [sellerProducts, setSellerProducts] = useState([]);

  // Professional Image Preview State
  const [previewImage, setPreviewImage] = useState(null);

  // Reject States for Documents
  const [rejectReasons, setRejectReasons] = useState({
    "Shop License": { type: "SHOP_LICENSE_MISMATCH", custom: "" },
    "Aadhar Card": { type: "AADHAAR_MISMATCH", custom: "" },
    "Udhyam Aadhar": { type: "UDYAM_MISMATCH", custom: "" },
    "Pan Card": { type: "PAN_MISMATCH", custom: "" },
  });

  // Dummy Reviews Data
  const dummyReviews = [
    {
      id: 1,
      user: "Amit Patil",
      rating: 5,
      comment: "Fresh vegetables and fast delivery! Highly recommended.",
      date: "01 Feb 2026",
    },
    {
      id: 2,
      user: "Sneha K.",
      rating: 4,
      comment: "Quality is good, but packaging could be better.",
      date: "28 Jan 2026",
    },
    {
      id: 3,
      user: "Rahul Deshmukh",
      rating: 5,
      comment: "The best organic products in Pune area.",
      date: "15 Jan 2026",
    },
  ];

  // Fetch Profile and Products Data
  const fetchData = async () => {
    try {
      setLoading(true);
      const profileRes = await getSellerProfile(id);
      if (profileRes.success) {
        const data = profileRes.data;
        setSellerData(data);
        // Backend वरून येणारा अचूक स्टेटस सेट करणे
        setApprovalStatus(data.accountStatus?.toLowerCase() || "pending");

        const docs = [
          {
            name: "Shop License",
            status: data.documents?.shopLicensePhotoStatus || "Pending",
            img: data.documents?.shopLicensePhoto,
          },
          {
            name: "Aadhar Card",
            status: data.documents?.aadhaarStatus || "Pending",
            img: data.documents?.aadhaar,
          },
          {
            name: "Udhyam Aadhar",
            status: data.documents?.udyamStatus || "Pending",
            img: data.documents?.udyam,
          },
          {
            name: "Pan Card",
            status: data.documents?.panStatus || "Pending",
            img: data.documents?.pan,
          },
        ];
        setDocuments(docs);
      }

      const productsRes = await getProductsByVendor(id);
      if (productsRes.success) {
        setSellerProducts(productsRes.data || []);
      }
    } catch (err) {
      toast.error("Failed to load data from database!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDeleteSeller = async () => {
    if (window.confirm("Are you sure you want to delete this seller?")) {
      try {
        const res = await deleteSeller(id);
        if (res.success) {
          toast.error("Seller moved to Deleted List!");
          navigate("/sellers");
        }
      } catch (err) {
        toast.error("Delete action failed!");
      }
    }
  };

  const handleApprovalStatusChange = (status) => {
    setConfirmAction(status);
    setShowConfirmation(true);
  };

  const confirmApprovalAction = async () => {
    try {
      if (confirmAction === "approved") {
        await approveSeller(id);
      } else {
        await rejectSeller(id, {
          rejectReason: "OTHER",
          customReason: "Admin rejected profile",
        });
      }

      // यश मिळाल्यावर मेसेज दाखवणे आणि डेटा रिफ्रेश करणे
      setSuccessMessage(`Seller has been ${confirmAction} successfully!`);
      setShowConfirmation(false);

      // ✅ बॅकएंडवरून अपडेटेड डेटा (Status सह) पुन्हा फेच करणे
      fetchData();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      toast.error("Status update failed!");
    }
  };

  const handleDocumentAction = async (docName, action) => {
    if (action === "approve") {
      // डॉक्युमेंट लेव्हलला अप्रूव्हल (येथे तुम्ही डॉक्युमेंट अप्रूव्हल API देखील कॉल करू शकता)
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.name === docName ? { ...doc, status: "Approved" } : doc,
        ),
      );
      toast.success(`${docName} Approved Locally`);
    } else {
      const reasonData = rejectReasons[docName];
      try {
        const payload = {
          rejectReason: reasonData.type,
          customReason:
            reasonData.type === "OTHER"
              ? reasonData.custom
              : `Rejected: ${docName}`,
        };
        const res = await rejectSeller(id, payload);
        if (res.success) {
          setDocuments((prev) =>
            prev.map((doc) =>
              doc.name === docName ? { ...doc, status: "Rejected" } : doc,
            ),
          );
          fetchData(); // रिफ्रेश डेटा
          toast.error(`${docName} Rejected successfully.`);
        }
      } catch (err) {
        toast.error("Failed to update rejection status!");
      }
    }
  };

  const updateRejectReason = (docName, field, value) => {
    setRejectReasons((prev) => ({
      ...prev,
      [docName]: { ...prev[docName], [field]: value },
    }));
  };

  if (loading)
    return (
      <div className="p-10 text-center flex flex-col items-center gap-2 min-h-screen justify-center">
        <Loader2 className="animate-spin text-lime-600 w-10 h-10" />
        <p className="text-gray-500 font-medium italic">
          Loading Agrowmart Profile...
        </p>
      </div>
    );

  if (!sellerData)
    return (
      <div className="p-10 text-center text-red-600 font-bold">
        Vendor data not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-6 w-full overflow-x-hidden text-left font-sans">
      {successMessage && (
        <div className="max-w-full mx-auto mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-sm">
          ✓ {successMessage}
        </div>
      )}

      {/* Navigation */}
      <div className="max-w-full mx-auto mb-4 flex justify-between items-center px-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-all"
        >
          <ArrowLeft size={20} /> Back
        </button>
        <button
          onClick={handleDeleteSeller}
          className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold border border-red-100 shadow-sm hover:bg-red-600 hover:text-white transition-all"
        >
          <Trash2 size={16} /> Delete Seller
        </button>
      </div>

      <div className="max-w-full mx-auto bg-white rounded-lg shadow overflow-hidden">
        {/* Header - Pill Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 gap-4 border-b">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Profile Details
          </h1>
          <div className="inline-flex items-center bg-gray-100 rounded-full p-1 border">
            <button
              onClick={() => handleApprovalStatusChange("approved")}
              className={`px-6 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${approvalStatus === "approved" ? "bg-lime-600 text-white shadow-sm" : "text-gray-700"}`}
            >
              Approve
            </button>
            <button
              onClick={() => handleApprovalStatusChange("rejected")}
              className={`px-6 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${approvalStatus === "rejected" ? "bg-red-500 text-white shadow-sm" : "text-gray-700"}`}
            >
              Reject
            </button>
          </div>
        </div>

        {/* Identity Section */}
        <div className="flex items-center gap-4 p-5 border-b bg-white w-full">
          <img
            src={sellerData.photoUrl || "https://via.placeholder.com/150"}
            className="w-16 h-16 rounded-full object-cover border-2 border-lime-100 cursor-zoom-in"
            alt="Seller"
            onClick={() =>
              setPreviewImage(
                sellerData.photoUrl || "https://via.placeholder.com/150",
              )
            }
          />
          <div className="overflow-hidden">
            <h2 className="font-bold text-lg text-gray-900 truncate">
              {sellerData.shop?.shopName || sellerData.businessName}
            </h2>
            <p className="text-xs text-gray-500 truncate">
              {sellerData.address} • ID: {sellerData.id}
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-4 sm:gap-8 px-4 sm:px-6 border-b overflow-x-auto bg-white sticky top-0 z-10 w-full no-scrollbar">
          {["info", "products", "bank", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-xs sm:text-sm font-bold capitalize whitespace-nowrap transition-all ${activeTab === tab ? "border-b-2 border-lime-600 text-lime-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              {tab === "info"
                ? "Store Info"
                : tab === "bank"
                  ? "Banking Details"
                  : tab === "reviews"
                    ? "Review & Rating"
                    : "Products"}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 bg-gray-50/30 w-full overflow-hidden">
          {activeTab === "info" && (
            <div className="space-y-6 w-full">
              <Section title="Personal Details">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <Info label="Full Name" value={sellerData.name} />
                  <Info label="Email Address" value={sellerData.email} />
                  <Info label="Phone Number" value={sellerData.phone} />
                  <Info label="Address" value={sellerData.address} />
                </div>
              </Section>

              <Section title="Store Information">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                  <Info
                    label="Store Name"
                    value={sellerData.shop?.shopName || sellerData.businessName}
                  />
                  <Info
                    label="Vendor Type"
                    value={sellerData.shop?.vendorType || sellerData.role?.name}
                  />
                  <Info
                    label="Working Hours"
                    value={sellerData.shop?.workingHours || "7:00 AM – 9:00 PM"}
                  />
                  <Info
                    label="GST Number"
                    value={sellerData.shop?.gstCertificateNumber || "N/A"}
                  />
                  <Info
                    label="Store Address"
                    value={sellerData.shop?.shopAddress || sellerData.address}
                  />
                </div>
                <div className="mt-6 pt-4 border-t">
                  <h4 className="text-[10px] text-gray-400 font-bold uppercase mb-2">
                    Description
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border line-clamp-3">
                    {sellerData.shop?.description || "No description provided."}
                  </p>
                </div>
              </Section>

              <Section title="Store Documents">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {documents.map((doc, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-xl p-3 flex flex-col sm:flex-row gap-4 bg-white shadow-sm overflow-hidden group"
                    >
                      <div
                        className="w-full sm:w-40 h-40 bg-gray-100 overflow-hidden rounded border relative cursor-zoom-in flex-shrink-0"
                        onClick={() =>
                          setPreviewImage(
                            doc.img || "https://via.placeholder.com/300x200",
                          )
                        }
                      >
                        <img
                          src={doc.img || "https://via.placeholder.com/300x200"}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                          alt=""
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2
                            className="text-white drop-shadow-md"
                            size={24}
                          />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-xs font-bold text-gray-700 truncate">
                            {doc.name}
                          </p>
                          <span
                            className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase ${doc.status === "Approved" ? "bg-green-100 text-green-600" : doc.status === "Rejected" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}
                          >
                            {doc.status}
                          </span>
                        </div>
                        {doc.status !== "Approved" && (
                          <div className="mb-3 space-y-2 mt-auto">
                            <select
                              value={rejectReasons[doc.name].type}
                              onChange={(e) =>
                                updateRejectReason(
                                  doc.name,
                                  "type",
                                  e.target.value,
                                )
                              }
                              className="w-full text-[10px] p-1.5 border border-gray-200 rounded bg-gray-50 outline-none"
                            >
                              <option value="AADHAAR_MISMATCH">
                                Aadhar Mismatch
                              </option>
                              <option value="PAN_MISMATCH">Pan Mismatch</option>
                              <option value="UDYAM_MISMATCH">
                                Udyam Mismatch
                              </option>
                              <option value="SHOP_LICENSE_MISMATCH">
                                Invalid License
                              </option>
                              <option value="OTHER">Other Reason</option>
                            </select>
                            {rejectReasons[doc.name].type === "OTHER" && (
                              <textarea
                                placeholder="Reason..."
                                value={rejectReasons[doc.name].custom}
                                onChange={(e) =>
                                  updateRejectReason(
                                    doc.name,
                                    "custom",
                                    e.target.value,
                                  )
                                }
                                className="w-full text-[10px] p-1 border rounded h-10 resize-none"
                              />
                            )}
                          </div>
                        )}
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() =>
                              handleDocumentAction(doc.name, "approve")
                            }
                            className="flex-1 bg-lime-600 text-white py-1.5 rounded-lg text-[10px] font-bold hover:bg-lime-700 transition-all"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleDocumentAction(doc.name, "reject")
                            }
                            className="flex-1 border border-red-200 text-red-600 py-1.5 rounded-lg text-[10px] font-bold hover:bg-red-50 transition-all"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {activeTab === "products" && (
            <div className="w-full overflow-hidden">
              <h3 className="text-lg font-bold text-gray-800 mb-6 font-sans">
                All Products ({sellerProducts.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {sellerProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group"
                  >
                    <div
                      className="h-40 bg-gray-100 relative cursor-zoom-in"
                      onClick={() =>
                        setPreviewImage(
                          p.img || "https://via.placeholder.com/300",
                        )
                      }
                    >
                      <img
                        src={p.img || "https://via.placeholder.com/300"}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        alt=""
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2
                          className="text-white drop-shadow-md"
                          size={20}
                        />
                      </div>
                    </div>
                    <div className="p-3 text-left">
                      <p className="text-[9px] text-gray-400 font-bold uppercase mb-1">
                        YH8626KI98
                      </p>
                      <h4 className="font-bold text-gray-800 text-xs mb-2 line-clamp-1">
                        {p.name}
                      </h4>
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-black text-gray-900">
                          {p.price || "₹0"}
                        </p>
                        <div className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded">
                          <Star
                            size={10}
                            className="fill-yellow-400 text-yellow-400"
                          />
                          <span className="text-[10px] font-bold text-gray-600">
                            4.5
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "bank" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-6 text-sm flex items-center gap-2">
                  <Smartphone size={18} className="text-gray-400" /> Mobile
                  Payment
                </h4>
                <Info
                  label="UPI ID"
                  value={sellerData?.upiId || "8887770080@bdi"}
                />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-6 text-sm flex items-center gap-2">
                  <QrCode size={18} className="text-gray-400" /> QR Code
                </h4>
                <Info label="Merchant Id" value="4075800480" />
                <div
                  className="w-32 h-32 bg-gray-50 border rounded-lg p-2 mt-4 cursor-zoom-in"
                  onClick={() =>
                    setPreviewImage(
                      "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=Agrowmart",
                    )
                  }
                >
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Agrowmart"
                    alt="QR"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm font-sans text-left">
                <h4 className="font-bold text-gray-800 mb-6 text-sm flex items-center gap-2">
                  <CreditCard size={18} className="text-gray-400" /> Card
                  Details
                </h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Info
                    label="First Name"
                    value={
                      sellerData?.accountHolderName?.split(" ")[0] || "Sanjay"
                    }
                  />
                  <Info
                    label="Last Name"
                    value={
                      sellerData?.accountHolderName?.split(" ")[1] || "Kumar"
                    }
                  />
                </div>
                <Info
                  label="Card Number"
                  value={
                    sellerData?.bankAccountNumber
                      ? `**** **** **** ${sellerData.bankAccountNumber.slice(-4)}`
                      : "1098 7400 1768 1986"
                  }
                />
                <div className="mt-4">
                  <Info label="Valid Until" value="December 2030" />
                </div>
              </div>
            </div>
          )}

          {/* REVIEWS AND RATINGS TAB */}
          {activeTab === "reviews" && (
            <div className="space-y-8 w-full text-left">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                  <h4 className="text-4xl font-black text-gray-900 mb-1">
                    4.8
                  </h4>
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                    Average Rating
                  </p>
                </div>
                <div className="md:col-span-2 space-y-3">
                  {[5, 4, 3, 2, 1].map((num) => (
                    <div key={num} className="flex items-center gap-4">
                      <span className="text-xs font-bold text-gray-500 w-4">
                        {num}
                      </span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-lime-500 rounded-full"
                          style={{
                            width: num === 5 ? "85%" : num === 4 ? "10%" : "2%",
                          }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-gray-400 w-10">
                        {num === 5 ? "85%" : num === 4 ? "10%" : "2%"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Latest Customer Reviews
                </h3>
                {dummyReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex gap-4"
                  >
                    <div className="w-10 h-10 bg-lime-50 rounded-full flex items-center justify-center text-lime-600 flex-shrink-0">
                      <User size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-bold text-gray-800 text-sm">
                          {rev.user}
                        </h5>
                        <span className="text-[10px] text-gray-400 font-bold">
                          {rev.date}
                        </span>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PROFESSIONAL IMAGE MODAL */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[500] flex flex-col items-center justify-center p-4 transition-all duration-300"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="w-full max-w-4xl flex justify-between items-center mb-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold opacity-80 uppercase tracking-widest flex items-center gap-2">
              {" "}
              <Package size={16} /> Image Preview{" "}
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = previewImage;
                  link.download = "img.png";
                  link.click();
                }}
                className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors"
              >
                <Download size={20} />
              </button>
              <button
                onClick={() => setPreviewImage(null)}
                className="bg-white/10 hover:bg-red-500 p-2.5 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div
            className="relative max-w-4xl w-full max-h-[80vh] flex items-center justify-center bg-white/5 rounded-3xl p-2 border border-white/10 overflow-hidden shadow-2xl animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl"
              alt="Preview"
            />
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2 font-sans">
              Confirm Action
            </h3>
            <p className="text-sm text-gray-600 mb-6 font-medium">
              Mark this account as{" "}
              <span className="font-bold uppercase text-gray-900">
                {confirmAction}
              </span>
              ?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-5 py-2 text-xs font-bold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmApprovalAction}
                className={`px-5 py-2 text-xs font-bold text-white rounded-xl shadow-lg transition-all ${confirmAction === "approved" ? "bg-lime-600 shadow-lime-100" : "bg-red-500 shadow-red-100"}`}
              >
                Confirm Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// UI Components
const Section = ({ title, children }) => (
  <div className="border border-gray-100 rounded-2xl p-5 mb-6 bg-white w-full shadow-sm text-left">
    <h3 className="font-bold mb-5 text-sm text-gray-800 border-l-4 border-lime-500 pl-3 uppercase tracking-wider font-sans">
      {title}
    </h3>
    <div className="w-full">{children}</div>
  </div>
);

const Info = ({ label, value }) => (
  <div className="flex-1 min-w-0 overflow-hidden text-left">
    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 truncate font-sans">
      {label}
    </p>
    <p className="text-xs sm:text-sm font-bold text-gray-700 break-words line-clamp-2 font-sans">
      {value || "—"}
    </p>
  </div>
);

export default SellerProfile;