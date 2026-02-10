// import React, { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";

// const merchantsData = [
//   {
//     id: 1,
//     name: "ClassMet",
//     location: "Accra, Ghana",
//     phone: "+91-888-000-3058",
//     email: "classmet01@gmail.com",
//     vendorType: "Vegetable Vendor",
//     subscription: "Basic",
//     approval: "Pending",
//     img: "https://t3.ftcdn.net/jpg/02/75/39/23/360_F_275392381_9up8TfWvS3SDeKR0VAbS26DMBVpMRhS7.jpg",
//   },
//   {
//     id: 2,
//     name: "Top Brand",
//     location: "Accra, Ghana",
//     phone: "+91-888-000-3058",
//     email: "yardi.dean@topbrand.com",
//     vendorType: "Meat Vendor",
//     subscription: "Free-Tier",
//     approval: "Pending",
//     img: "https://st4.depositphotos.com/1000647/25016/i/450/depositphotos_250161414-stock-photo-raw-meat-different-types-raw.jpg",
//   },
//   {
//     id: 3,
//     name: "Four Design",
//     location: "Kumasi, Ghana",
//     phone: "+91-888-000-3058",
//     email: "kevin.fdesign@hotmail.com",
//     vendorType: "Fruits Vendor",
//     subscription: "Basic",
//     approval: "Approved",
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz-Mh9eG9v7P-6f9Z6D7L5K7vYnE1n5m6G7A&s",
//   },
//   {
//     id: 4,
//     name: "Shoe Sensation",
//     location: "Accra, Ghana",
//     phone: "+91-888-000-3058",
//     email: "helloshoesensation@gmail.com",
//     vendorType: "Dairy Vendor",
//     subscription: "Standard",
//     approval: "Approved",
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-fP19v6m-h2N8p6R5eGv_I-m6r5uE9eGv_A&s",
//   },
// ];

// const ITEMS_PER_PAGE = 10;

// const Sellers = () => {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("popular");
//   const [page, setPage] = useState(1);

//   const pendingCount = useMemo(() => {
//     return merchantsData.filter((m) => m.approval === "Pending").length;
//   }, []);

//   /* SEARCH + SORT */
//   const filteredData = useMemo(() => {
//     let data = merchantsData.filter((m) =>
//       `${m.name} ${m.email} ${m.phone}`
//         .toLowerCase()
//         .includes(search.toLowerCase()),
//     );

//     if (sortBy === "name") {
//       data.sort((a, b) => a.name.localeCompare(b.name));
//     }

//     if (sortBy === "pending") {
//       data.sort((a, b) => (a.approval === "Pending" ? -1 : 1));
//     }

//     if (sortBy === "approved") {
//       data.sort((a, b) => (a.approval === "Approved" ? -1 : 1));
//     }

//     return data;
//   }, [search, sortBy]);

//   /* PAGINATION */
//   const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
//   const paginatedData = filteredData.slice(
//     (page - 1) * ITEMS_PER_PAGE,
//     page * ITEMS_PER_PAGE,
//   );

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* ===== Header Section ===== */}
//       <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
//         <h2 className="text-lg font-semibold text-gray-700">
//           All Merchant / Seller{" "}
//           <span className="text-gray-500">
//             (Pending Approvals {pendingCount})
//           </span>
//         </h2>

//         {/* Search & Sort Bar */}
//         <div className="flex gap-3 items-center w-full md:w-auto">
//           <div className="flex-1 md:flex-none relative md:w-80 bg-white">
//             <input
//               type="text"
//               placeholder="Search by name, email or phone"
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setPage(1);
//               }}
//               className="w-full px-4 pl-10 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-green-500"
//             />
//             <svg
//               className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </div>

//           <div className="flex-shrink-0">
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white outline-none"
//             >
//               <option value="popular">Sort by : Most Popular</option>
//               <option value="name">Sort by Name</option>
//               <option value="pending">Pending First</option>
//               <option value="approved">Approved First</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* ===== DESKTOP TABLE VIEW ===== */}
//       <div className="hidden md:block bg-white rounded-lg shadow">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b border-gray-200 bg-gray-50">
//               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Store / Business Name
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Phone Number
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Email Address
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Vendor Type
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Subscription
//               </th>
//               <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
//                 Approval
//               </th>
//               <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">
//                 Actions
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {paginatedData.map((m) => (
//               <tr
//                 key={m.id}
//                 className="border-b border-gray-200 hover:bg-gray-50"
//               >
//                 {/* Store Name with Logo */}
//                 <td className="px-4 py-3">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={m.img}
//                       alt={m.name}
//                       className="w-8 h-8 rounded-full object-cover"
//                     />
//                     <div>
//                       <p className="font-semibold text-gray-700">{m.name}</p>
//                       <p className="text-xs text-gray-400">{m.location}</p>
//                     </div>
//                   </div>
//                 </td>

//                 {/* Phone */}
//                 <td className="px-4 py-3 text-gray-600">{m.phone}</td>

//                 {/* Email */}
//                 <td className="px-4 py-3 text-gray-600">{m.email}</td>

//                 {/* Vendor Type */}
//                 <td className="px-4 py-3 text-gray-600">{m.vendorType}</td>

//                 {/* Subscription */}
//                 <td className="px-4 py-3">
//                   <span
//                     className={`inline-block px-2 py-1 rounded text-xs font-medium ${
//                       m.subscription === "Active"
//                         ? "text-green-600 "
//                         : "text-gray-500"
//                     }`}
//                   >
//                     {m.subscription}
//                   </span>
//                 </td>

//                 {/* Approval */}
//                 <td className="px-4 py-3">
//                   <span
//                     className={`inline-block px-2 py-1 rounded text-xs font-medium ${
//                       m.approval === "Approved"
//                         ? "text-green-600"
//                         : m.approval === "Pending"
//                           ? "text-yellow-600"
//                           : "text-red-600"
//                     }`}
//                   >
//                     {m.approval}
//                   </span>
//                 </td>

//                 {/* Actions */}
//                 <td className="px-4 py-3 text-center">
//                   <button
//                     onClick={() => navigate(`/seller/${m.id}`)}
//                     className="px-3 py-1 border border-green-600 text-green-600 rounded-md text-xs font-semibold hover:bg-green-50 transition-colors"
//                   >
//                     View Profile
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ===== MOBILE CARDS VIEW ===== */}
//       <div className="md:hidden space-y-4">
//         {paginatedData.map((m) => (
//           <div key={m.id} className="bg-white rounded-lg shadow p-4">
//             {/* Store Info Header */}
//             <div className="flex items-center gap-3 mb-4">
//               <img
//                 src={m.img}
//                 alt={m.name}
//                 className="w-12 h-12 rounded-full object-cover"
//               />
//               <div className="flex-1">
//                 <p className="font-semibold text-gray-700">{m.name}</p>
//                 <p className="text-xs text-gray-400">{m.location}</p>
//               </div>
//             </div>

//             {/* Contact Info */}
//             <div className="space-y-2 text-sm mb-4">
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Phone Number:</span>
//                 <span className="text-gray-700 font-medium">{m.phone}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Email Address:</span>
//                 <span className="text-gray-700 font-medium truncate ml-2">
//                   {m.email}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Vendor Type:</span>
//                 <span className="text-gray-700 font-medium">
//                   {m.vendorType}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Subscription:</span>
//                 <span
//                   className={`font-semibold ${
//                     m.subscription === "Active"
//                       ? "text-green-600"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   {m.subscription}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Approval:</span>
//                 <span
//                   className={`font-semibold ${
//                     m.approval === "Approved"
//                       ? "text-green-600"
//                       : m.approval === "Pending"
//                         ? "text-yellow-600"
//                         : "text-red-600"
//                   }`}
//                 >
//                   {m.approval}
//                 </span>
//               </div>
//             </div>

//             {/* Action Button */}
//             <button
//               onClick={() => navigate(`/seller/${m.id}`)}
//               className="w-full px-3 py-2 border border-green-600 text-green-600 rounded-md text-sm font-semibold hover:bg-green-50 transition-colors"
//             >
//               View Profile
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* ===== PAGINATION ===== */}
//       <div className="flex justify-end items-center gap-1 mt-6 text-sm">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage(page - 1)}
//           className={`px-3 py-1 ${
//             page === 1 ? "text-gray-300" : "text-gray-600 hover:text-green-600"
//           }`}
//         >
//           PREV
//         </button>

//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setPage(i + 1)}
//             className={`w-6 h-6 rounded text-xs font-semibold ${
//               page === i + 1
//                 ? "bg-green-600 text-white"
//                 : "text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage(page + 1)}
//           className={`px-3 py-1 ${
//             page === totalPages
//               ? "text-gray-300"
//               : "text-gray-600 hover:text-green-600"
//           }`}
//         >
//           NEXT
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sellers;


import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Trash2, Loader2 } from "lucide-react";
import { getSellers } from "../../../api/sellerApi";

const ITEMS_PER_PAGE = 10;

const Sellers = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [page, setPage] = useState(1);
  const [merchantsData, setMerchantsData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ डेटा फेच करण्याचे फंक्शन
  const fetchMerchants = async () => {
    setLoading(true);
    try {
      const statusParam =
        sortBy === "pending"
          ? "PENDING"
          : sortBy === "approved"
            ? "APPROVED"
            : "";

      const response = await getSellers(
        page - 1,
        ITEMS_PER_PAGE,
        search,
        statusParam,
      );

      console.log("API Response on Sellers Page:", response);

      if (response.success) {
        // ApiResponseDTO प्रमाणे data.data मधून अचूक डेटा मॅप करणे
        const rawData = response.data?.data || response.data || [];
        setMerchantsData(rawData);
        setTotalElements(
          response.data?.pagination?.totalElements || rawData.length,
        );
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ जेव्हा पेज, सर्च किंवा सॉर्टिंग बदलते तेव्हा डेटा पुन्हा लोड होतो
  useEffect(() => {
    fetchMerchants();
  }, [page, search, sortBy]);

  const pendingCount = useMemo(() => {
    return merchantsData.filter(
      (m) => (m.status || m.accountStatus || "").toUpperCase() === "PENDING",
    ).length;
  }, [merchantsData]);

  const totalPages = Math.ceil(totalElements / ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="p-10 text-center flex flex-col items-center gap-2 min-h-screen justify-center">
        <Loader2 className="animate-spin text-lime-600" size={40} />
        <p className="text-gray-500 font-medium">Updating sellers list...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-left w-full overflow-x-hidden">
      {/* Header Section */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 font-sans">
            All Merchant / Seller{" "}
            <span className="text-gray-500">
              (Pending Approvals {pendingCount})
            </span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Total {totalElements} active sellers found
          </p>
        </div>

        <div className="flex gap-3 items-center w-full md:w-auto">
          {/* Search Bar */}
          <div className="flex-1 md:flex-none relative md:w-80 bg-white">
            <input
              type="text"
              placeholder="Search by name, email or phone"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 pl-10 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-green-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Sort Dropdown */}
          <div className="flex-shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white outline-none"
            >
              <option value="popular">Sort by : Most Popular</option>
              <option value="pending">Pending First</option>
              <option value="approved">Approved First</option>
            </select>
          </div>

          {/* Deleted Button */}
          <button
            onClick={() => navigate("/deletedsellers")}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm font-semibold hover:bg-red-600 hover:text-white transition-all shadow-sm"
          >
            <Trash2 size={16} /> Deleted
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden w-full border border-gray-100">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">
                STORE / BUSINESS NAME
              </th>
              <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">
                PHONE NUMBER
              </th>
              <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">
                EMAIL ADDRESS
              </th>
              <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">
                VENDOR TYPE
              </th>
              <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">
                SUBSCRIPTION
              </th>
              <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">
                APPROVAL STATUS
              </th>
              <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {merchantsData.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-20 text-center text-gray-400 italic"
                >
                  No sellers found in the list.
                </td>
              </tr>
            ) : (
              merchantsData.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={m.photoUrl || "https://via.placeholder.com/40"}
                        className="w-8 h-8 rounded-full object-cover border"
                        alt=""
                      />
                      <div className="overflow-hidden">
                        <p className="font-semibold text-gray-700 truncate">
                          {m.storeName ||
                            m.businessName ||
                            m.sellerName ||
                            m.name}
                        </p>
                        <p className="text-[10px] text-gray-400 truncate">
                          {m.address || "No Location Provided"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 font-medium">
                    {m.phone}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{m.email}</td>
                  <td className="px-4 py-3 text-gray-600 uppercase text-[10px] font-bold">
                    {m.vendorType || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded text-[10px] font-black bg-blue-50 text-blue-600 uppercase border border-blue-100">
                      {m.subscriptionPlan || "Basic"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded text-[10px] font-black uppercase border ${
                        (m.status || m.accountStatus || "PENDING") ===
                        "APPROVED"
                          ? "text-green-600 bg-green-50 border-green-100"
                          : (m.status || m.accountStatus || "PENDING") ===
                              "REJECTED"
                            ? "text-red-600 bg-red-50 border-red-100"
                            : "text-yellow-600 bg-yellow-50 border-yellow-100"
                      }`}
                    >
                      {m.status || m.accountStatus || "PENDING"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => navigate(`/seller/${m.id}`)}
                      className="px-3 py-1 border border-green-600 text-green-600 rounded-md text-xs font-bold hover:bg-green-600 hover:text-white transition-all shadow-sm"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View */}
      <div className="md:hidden space-y-4">
        {merchantsData.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-lg shadow p-4 text-left border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src={m.photoUrl || "https://via.placeholder.com/40"}
                className="w-12 h-12 rounded-full object-cover border"
                alt=""
              />
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-gray-700 truncate">
                  {m.storeName || m.businessName || m.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {m.address || "No Location"}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm mb-4 border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs uppercase font-bold">
                  Status:
                </span>
                <span
                  className={`font-black text-[10px] uppercase ${(m.status || m.accountStatus || "PENDING") === "APPROVED" ? "text-green-600" : "text-yellow-600"}`}
                >
                  {m.status || m.accountStatus || "PENDING"}
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate(`/seller/${m.id}`)}
              className="w-full px-3 py-2 border border-green-600 text-green-600 rounded-md text-xs font-bold hover:bg-green-600 hover:text-white transition-colors"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-1 mt-6 text-sm">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-3 py-1 font-bold ${page === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-green-600"}`}
        >
          PREV
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-7 h-7 rounded text-xs font-bold transition-all ${
              page === i + 1
                ? "bg-green-600 text-white shadow-md border-green-600"
                : "text-gray-600 hover:bg-gray-200 border border-transparent"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
          className={`px-3 py-1 font-bold ${page === totalPages || totalPages === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-green-600"}`}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Sellers;