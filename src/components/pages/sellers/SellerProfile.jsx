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
  Clock,
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
  const [sellerData, setSellerData] = useState(null);
  const [sellerProducts, setSellerProducts] = useState([]);
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
  ];

  // 🔥 Working Hours Formatter
  const formatWorkingHours = (hours) => {
    if (!hours) return "Not Available";
    try {
      const parsed = typeof hours === "string" ? JSON.parse(hours) : hours;
      if (Array.isArray(parsed)) {
        return (
          <div className="space-y-1">
            {parsed.map((item, idx) => (
              <div key={idx} className="flex gap-2 text-[11px] font-bold">
                <span className="text-lime-600 w-16 uppercase">
                  {item.day}:
                </span>
                <span className="text-gray-600">
                  {item.open} - {item.close}
                </span>
              </div>
            ))}
          </div>
        );
      }
    } catch (e) {
      return hours;
    }
    return hours;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const profileRes = await getSellerProfile(id);
      if (profileRes.success) {
        const data = profileRes.data;
        setSellerData(data);
        setApprovalStatus(data.accountStatus?.toLowerCase() || "pending");

        setDocuments([
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
        ]);
      }

      const productsRes = await getProductsByVendor(id);
      if (productsRes.success) {
        setSellerProducts(productsRes.data || []);
      }
    } catch (err) {
      toast.error("Failed to load data!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Main Approve/Reject logic
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
          customReason: "Admin Rejection",
        });
      }
      toast.success(`Seller ${confirmAction} successfully!`);
      setShowConfirmation(false);
      fetchData(); // Refresh UI with new status
    } catch (err) {
      toast.error("Action failed!");
    }
  };

  const handleDocumentAction = (docName, action) => {
    const newStatus = action === "approve" ? "Approved" : "Rejected";
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.name === docName ? { ...doc, status: newStatus } : doc,
      ),
    );
    toast.success(`${docName} ${newStatus}`);
  };

  const handleDeleteSeller = async () => {
    if (window.confirm("Permanent delete karayche ka?")) {
      try {
        await deleteSeller(id);
        toast.success("Seller Deleted.");
        navigate("/sellers");
      } catch (err) {
        toast.error("Delete failed.");
      }
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-2">
        <Loader2 className="animate-spin text-lime-600 w-10 h-10" />
        <p className="text-gray-500 font-bold italic">
          Loading Agrowmart Profile...
        </p>
      </div>
    );

  if (!sellerData)
    return <div className="p-10 text-center font-bold">Data not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-6 text-left font-sans">
      {/* Navigation */}
      <div className="max-w-full mx-auto mb-4 flex justify-between items-center px-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 font-bold transition-all"
        >
          <ArrowLeft size={20} /> Back
        </button>
        <button
          onClick={handleDeleteSeller}
          className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold border border-red-100 hover:bg-red-600 hover:text-white transition-all"
        >
          <Trash2 size={16} /> Delete Seller
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Approve/Reject Pills */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border-b gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Profile Details
          </h1>
          <div className="inline-flex items-center bg-gray-100 rounded-full p-1 border">
            <button
              onClick={() => handleApprovalStatusChange("approved")}
              className={`px-8 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${approvalStatus === "approved" ? "bg-lime-600 text-white shadow" : "text-gray-500"}`}
            >
              Approve
            </button>
            <button
              onClick={() => handleApprovalStatusChange("rejected")}
              className={`px-8 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${approvalStatus === "rejected" ? "bg-red-500 text-white shadow" : "text-gray-700"}`}
            >
              Reject
            </button>
          </div>
        </div>

        {/* Identity */}
        <div className="flex items-center gap-5 p-6 border-b">
          <img
            src={sellerData.photoUrl || "https://via.placeholder.com/150"}
            className="w-20 h-20 rounded-full object-cover border-2 border-lime-100 cursor-pointer"
            onClick={() => setPreviewImage(sellerData.photoUrl)}
            alt=""
          />
          <div>
            <h2 className="font-bold text-xl text-gray-900">
              {sellerData.shop?.shopName || sellerData.businessName}
            </h2>
            <p className="text-xs text-gray-500">
              {sellerData.address} • ID: {sellerData.id}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 px-6 border-b overflow-x-auto no-scrollbar bg-white sticky top-0 z-10">
          {["info", "products", "bank", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-xs sm:text-sm font-bold capitalize whitespace-nowrap transition-all ${activeTab === tab ? "border-b-2 border-lime-600 text-lime-600" : "text-gray-400"}`}
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

        <div className="p-4 sm:p-8 bg-gray-50/20">
          {/* TAB 1: INFO */}
          {activeTab === "info" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <Section title="PERSONAL DETAILS">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <Info label="FULL NAME" value={sellerData.name} />
                  <Info label="EMAIL ADDRESS" value={sellerData.email} />
                  <Info label="PHONE NUMBER" value={sellerData.phone} />
                  <Info label="ADDRESS" value={sellerData.address} />
                </div>
              </Section>

              <Section title="STORE INFORMATION">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                  <Info
                    label="STORE NAME"
                    value={sellerData.shop?.shopName || sellerData.businessName}
                  />
                  <Info
                    label="VENDOR TYPE"
                    value={sellerData.shop?.vendorType || sellerData.role?.name}
                  />
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1.5 flex items-center gap-1">
                      <Clock size={10} /> WORKING HOURS
                    </p>
                    <div className="bg-white p-2 rounded border border-gray-100 shadow-sm">
                      {formatWorkingHours(sellerData.shop?.workingHours)}
                    </div>
                  </div>
                  <Info
                    label="GST NUMBER"
                    value={sellerData.shop?.gstCertificateNumber || "N/A"}
                  />
                  <Info
                    label="STORE ADDRESS"
                    value={sellerData.shop?.shopAddress || sellerData.address}
                  />
                </div>
                <div className="mt-4 border border-gray-100 p-4 rounded-lg bg-gray-50">
                  <h4 className="text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest">
                    DESCRIPTION
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                    {sellerData.description || "No description provided."}
                  </p>
                </div>
              </Section>

              <Section title="STORE DOCUMENTS">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {documents.map((doc, i) => (
                    <div
                      key={i}
                      className="border border-gray-100 rounded-xl p-4 flex flex-col bg-white shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <p className="text-[11px] font-black text-gray-800 uppercase">
                          {doc.name}
                        </p>
                        <span
                          className={`px-2 py-0.5 text-[9px] font-black rounded-full uppercase ${doc.status === "Approved" ? "bg-green-100 text-green-600" : doc.status === "Rejected" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}
                        >
                          {doc.status}
                        </span>
                      </div>
                      <div
                        className="h-32 bg-gray-50 rounded-lg overflow-hidden cursor-zoom-in mb-4 border border-gray-100"
                        onClick={() => setPreviewImage(doc.img)}
                      >
                        <img
                          src={doc.img || "https://via.placeholder.com/200"}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleDocumentAction(doc.name, "approve")
                          }
                          className="flex-1 py-2 text-[10px] border border-gray-300 rounded-lg font-black uppercase hover:bg-green-50 transition-all"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleDocumentAction(doc.name, "reject")
                          }
                          className="flex-1 py-2 text-[10px] border border-gray-300 rounded-lg font-black uppercase hover:bg-red-50 transition-all"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {/* TAB 2: PRODUCTS */}
          {activeTab === "products" && (
            <div className="animate-in fade-in duration-300">
              <h3 className="font-bold mb-6 text-gray-800 flex items-center gap-2">
                <Package size={20} className="text-lime-600" /> Inventory (
                {sellerProducts.length})
              </h3>
              {sellerProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-5">
                  {sellerProducts.map((p, i) => (
                    <div
                      key={i}
                      className="border border-gray-100 rounded-xl overflow-hidden group bg-white hover:shadow-lg transition-all"
                    >
                      <div
                        className="h-40 overflow-hidden relative cursor-zoom-in"
                        onClick={() => setPreviewImage(p.img)}
                      >
                        <img
                          src={p.img || "https://via.placeholder.com/200"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt={p.name}
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="text-[11px] font-black truncate uppercase tracking-tight text-gray-700">
                          {p.name}
                        </h4>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-sm font-black text-lime-600">
                            ₹{p.price}
                          </p>
                          <span className="text-[10px] flex items-center gap-0.5 font-bold text-amber-500">
                            <Star size={10} className="fill-current" /> 4.5
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-20 text-center text-gray-300 font-bold uppercase tracking-widest border-4 border-dashed rounded-[40px]">
                  No Products Stocked
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BANKING */}
          {activeTab === "bank" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in zoom-in-95 duration-500">
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                <h4 className="font-black text-[11px] text-gray-800 uppercase tracking-widest flex items-center gap-2">
                  <Smartphone size={16} className="text-lime-600" /> Mobile
                  Payment
                </h4>
                <Info
                  label="REGISTERED UPI ID"
                  value={sellerData?.upiId || "Not Available"}
                />
              </div>
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                <h4 className="font-black text-[11px] text-gray-800 uppercase tracking-widest flex items-center gap-2">
                  <QrCode size={16} className="text-lime-600" /> Store QR Code
                </h4>
                <div className="bg-gray-50 p-4 rounded-2xl border border-dashed flex justify-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${sellerData?.upiId || "Agrowmart"}`}
                    className="w-32 h-32 rounded mix-blend-multiply"
                    alt="QR"
                  />
                </div>
              </div>
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
                <h4 className="font-black text-[11px] text-gray-800 uppercase tracking-widest flex items-center gap-2">
                  <CreditCard size={16} className="text-lime-600" /> Settlement
                  Details
                </h4>
                <Info
                  label="ACCOUNT NUMBER"
                  value={
                    sellerData?.bankAccountNumber
                      ? `**** **** ${sellerData.bankAccountNumber.slice(-4)}`
                      : "N/A"
                  }
                />
                <Info label="IFSC CODE" value={sellerData?.ifscCode || "N/A"} />
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === "reviews" && (
            <div className="p-4 sm:p-6 animate-in fade-in duration-300">
              <h3 className="font-bold mb-6 text-gray-800 uppercase tracking-widest text-sm border-l-4 border-lime-600 pl-4">
                Product Review & Rating
              </h3>
              <div className="space-y-4">
                {dummyReviews.map((item, i) => (
                  <div
                    key={i}
                    className="border border-gray-100 rounded-2xl p-5 flex gap-4 bg-white shadow-sm"
                  >
                    <div className="w-10 h-10 bg-lime-50 rounded-full flex items-center justify-center text-lime-600">
                      <User size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-bold text-sm text-gray-800">
                          {item.user}
                        </h5>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">
                          {item.date}
                        </span>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            size={10}
                            className={
                              idx < item.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-medium">
                        "{item.comment}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-6">
          <div className="bg-white rounded-[40px] p-10 max-w-sm w-full shadow-2xl text-center animate-in zoom-in-95 duration-300">
            <h3 className="text-2xl font-black mb-3 text-gray-900 tracking-tight">
              Confirm Status
            </h3>
            <p className="text-gray-400 mb-10 font-bold leading-relaxed">
              Update this account status to{" "}
              <span className="text-gray-900 underline uppercase">
                {confirmAction}
              </span>
              ?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-gray-400 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmApprovalAction}
                className={`flex-1 py-4 text-xs font-black uppercase tracking-widest text-white rounded-2xl shadow-lg transition-all ${confirmAction === "approved" ? "bg-lime-600 hover:bg-lime-700" : "bg-red-500 hover:bg-red-600"}`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Overlay */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[1100] flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <button className="absolute top-10 right-10 text-white hover:text-red-500 transition-colors">
            <X size={40} />
          </button>
          <img
            src={previewImage}
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border-4 border-white/10"
            alt="Preview"
          />
        </div>
      )}
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="border border-gray-100 rounded-3xl p-6 sm:p-8 bg-white shadow-sm mb-6">
    <h3 className="font-black mb-8 text-[11px] text-lime-600 uppercase tracking-[3px] border-l-4 border-lime-600 pl-5">
      {title}
    </h3>
    <div>{children}</div>
  </div>
);

const Info = ({ label, value }) => (
  <div className="min-w-0">
    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1.5">
      {label}
    </p>
    <p className="text-sm font-black text-gray-700 truncate">
      {value || "---"}
    </p>
  </div>
);

export default SellerProfile;