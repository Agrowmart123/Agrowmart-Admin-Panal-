import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  RotateCcw,
  ArrowLeft,
  Trash2,
  UserX,
  Loader2,
  MapPin,
  Calendar,
} from "lucide-react";
import { getDeletedSellersList, restoreSeller } from "../../../api/sellerApi";
import toast from "react-hot-toast";

/**
 * DeletedSellers Component
 * Displays a list of soft-deleted vendors and provides restoration functionality.
 */
const DeletedSellers = () => {
  const navigate = useNavigate();
  const [deletedSellers, setDeletedSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ Fetching Data from Spring Boot Backend
  const fetchDeleted = async () => {
    setLoading(true);
    try {
      // API call to fetch deleted vendors (page index starts at 0 for backend)
      const res = await getDeletedSellersList(page - 1, itemsPerPage);

      console.log("Archive Response:", res);

      if (res.success) {
        // Extracting data from ApiResponseDTO structure
        // Maps to the List<Map<String, Object>> returned by your Java service
        const rawData = res.data?.data || res.data?.content || res.data || [];
        setDeletedSellers(Array.isArray(rawData) ? rawData : []);
      } else {
        toast.error(res.message || "Failed to load archive data");
      }
    } catch (err) {
      console.error("API Error:", err);
      toast.error("Could not connect to the server!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeleted();
  }, [page]);

  // ✅ Restore Functionality
  const handleRestore = async (sellerId) => {
    if (
      window.confirm(
        "Do you want to restore this vendor account to active status?",
      )
    ) {
      try {
        const res = await restoreSeller(sellerId);
        if (res.success) {
          toast.success("Vendor restored successfully!");
          // Redirecting to active sellers list after restoration
          navigate("/sellers");
        } else {
          toast.error(res.message || "Failed to restore account");
        }
      } catch (err) {
        toast.error("Restoration failed! Check backend logs.");
      }
    }
  };

  // ✅ Search Filtering (Local)
  const filteredSellers = deletedSellers.filter((s) => {
    const query = search.toLowerCase();
    return (
      query === "" ||
      (s.storeName || s.businessName || "").toLowerCase().includes(query) ||
      (s.sellerName || s.name || "").toLowerCase().includes(query) ||
      (s.email || "").toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Loader2 className="animate-spin text-lime-600 w-12 h-12 mb-4" />
        <p className="text-gray-500 font-bold tracking-widest uppercase text-xs">
          Accessing Deleted Archive...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8 text-left font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Bar */}
        <button
          onClick={() => navigate("/sellers")}
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 font-bold transition-all"
        >
          <ArrowLeft size={18} /> BACK TO MERCHANT LIST
        </button>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <Trash2 className="text-red-500" size={28} />
              DELETED SELLERS ARCHIVE
            </h1>
            <p className="text-sm text-gray-400 font-medium mt-1">
              Showing {filteredSellers.length} inactive vendor accounts
            </p>
          </div>

          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by store name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-lime-500 outline-none shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Store / Business
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Category
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Contact Details
                </th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Deletion Date
                </th>
                <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredSellers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-32 text-center">
                    <UserX size={60} className="mx-auto mb-4 text-gray-200" />
                    <p className="text-gray-400 font-bold italic">
                      No deleted vendors found in the archive.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredSellers.map((seller) => (
                  <tr
                    key={seller.id}
                    className="hover:bg-gray-50/50 transition-all group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            seller.photoUrl || "https://via.placeholder.com/150"
                          }
                          className="w-12 h-12 rounded-2xl object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all border border-gray-100"
                          alt="Store"
                        />
                        <div>
                          <p className="font-black text-gray-800 text-sm">
                            {seller.storeName || seller.businessName || "N/A"}
                          </p>
                          <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                            <MapPin size={10} />{" "}
                            {seller.address || "Location Hidden"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
                        {seller.vendorType || "General Seller"}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-bold text-gray-700">
                        {seller.phone || "---"}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {seller.email}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase">
                        <Calendar size={12} />
                        {seller.deletedAt
                          ? new Date(seller.deletedAt).toLocaleDateString(
                              "en-GB",
                            )
                          : "Recently"}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <button
                        onClick={() => handleRestore(seller.id)}
                        className="px-5 py-2.5 border-2 border-lime-500 text-lime-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-lime-500 hover:text-white transition-all shadow-lg shadow-lime-100 flex items-center gap-2 mx-auto"
                      >
                        <RotateCcw size={14} /> Restore
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Grid View */}
        <div className="lg:hidden space-y-6">
          {filteredSellers.map((seller) => (
            <div
              key={seller.id}
              className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-4 py-1 bg-red-50 text-red-500 text-[9px] font-black uppercase tracking-widest">
                Deleted Account
              </div>
              <div className="flex items-center gap-4 mb-6 pt-4">
                <img
                  src={seller.photoUrl || "https://via.placeholder.com/150"}
                  className="w-16 h-16 rounded-2xl object-cover grayscale"
                  alt="vendor"
                />
                <div>
                  <h3 className="font-black text-gray-900 uppercase text-sm tracking-tight">
                    {seller.storeName || seller.businessName}
                  </h3>
                  <p className="text-[10px] text-indigo-500 font-black uppercase">
                    {seller.vendorType}
                  </p>
                </div>
              </div>
              <div className="space-y-2 mb-8 text-left">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-bold uppercase tracking-widest">
                    Contact
                  </span>
                  <span className="text-gray-700 font-black">
                    {seller.phone || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-bold uppercase tracking-widest">
                    Email
                  </span>
                  <span className="text-gray-700 font-black truncate max-w-[150px]">
                    {seller.email}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleRestore(seller.id)}
                className="w-full flex items-center justify-center gap-3 py-4 bg-lime-600 text-white rounded-2xl text-xs font-black uppercase tracking-[2px] shadow-xl shadow-lime-100 active:scale-95 transition-all"
              >
                <RotateCcw size={16} /> RESTORE VENDOR
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeletedSellers;