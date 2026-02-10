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
} from "lucide-react";
import { getDeletedSellersList, restoreSeller } from "../../../api/sellerApi";
import toast from "react-hot-toast";

export default function DeletedSellers() {
  const navigate = useNavigate();
  const [deletedSellers, setDeletedSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const fetchDeleted = async () => {
    setLoading(true);
    try {
      const res = await getDeletedSellersList(page - 1, itemsPerPage);
      if (res.success) {
        // Mapping directly from MySQL backend ResponseDTO
        const rawData = res.data?.data || res.data?.content || res.data || [];
        setDeletedSellers(rawData);
      }
    } catch (err) {
      toast.error("Failed to load deleted archive!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeleted();
  }, [page]);

  const handleRestore = async (sellerId) => {
    if (window.confirm("Restore this seller to active status?")) {
      try {
        const res = await restoreSeller(sellerId);
        if (res.success) {
          toast.success("Seller restored successfully!");
          navigate("/sellers");
        }
      } catch (err) {
        toast.error("Restoration failed!");
      }
    }
  };

  const filtered = deletedSellers.filter((s) => {
    const q = search.toLowerCase();
    return (
      q === "" ||
      (s.storeName || s.businessName || "").toLowerCase().includes(q) ||
      (s.sellerName || s.name || "").toLowerCase().includes(q) ||
      (s.email || "").toLowerCase().includes(q)
    );
  });

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-lime-600 w-10 h-10 mb-2" />
        <p className="text-gray-500 font-medium italic">
          Loading Deleted Archive...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 text-left">
      <div className="max-w-full mx-auto">
        {/* Navigation */}
        <button
          onClick={() => navigate("/sellers")}
          className="flex items-center gap-2 text-gray-500 mb-6 hover:text-gray-800 font-medium transition-colors"
        >
          <ArrowLeft size={20} /> Back to Sellers
        </button>

        {/* Header Section */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Trash2 className="text-red-500" size={24} />
            Deleted Sellers List ({filtered.length})
          </h1>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by store, name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-green-500 shadow-sm bg-white"
            />
          </div>
        </div>

        {/* Desktop View Table */}
        <div className="hidden lg:block bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase text-[10px]">
                  Store Details
                </th>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase text-[10px]">
                  Vendor Type
                </th>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase text-[10px]">
                  Subscription
                </th>
                <th className="px-6 py-4 font-bold text-gray-500 uppercase text-[10px]">
                  Contact Info
                </th>
                <th className="px-6 py-4 text-center font-bold text-gray-500 uppercase text-[10px]">
                  Deleted At
                </th>
                <th className="px-6 py-4 text-center font-bold text-gray-500 uppercase text-[10px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-20 text-center text-gray-400"
                  >
                    <UserX size={48} className="mx-auto mb-2 opacity-20" />
                    <p className="italic font-medium">
                      No deleted sellers found in archive.
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    {/* Store Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={s.photoUrl || "https://via.placeholder.com/40"}
                          className="w-10 h-10 rounded-full object-cover grayscale border"
                          alt=""
                        />
                        <div>
                          <div className="text-sm font-bold text-gray-900 leading-tight">
                            {s.storeName || s.businessName || s.sellerName}
                          </div>
                          <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                            <MapPin size={10} /> {s.address || "No Address"}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* Vendor Type */}
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase">
                        {s.vendorType || "General"}
                      </span>
                    </td>
                    {/* Subscription */}
                    <td className="px-6 py-4 font-bold text-gray-600 text-xs">
                      {s.subscriptionPlan || "Basic"}
                    </td>
                    {/* Contact Info */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700 font-medium">
                        {s.phone || "N/A"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {s.email || "N/A"}
                      </p>
                    </td>
                    {/* Deleted Date */}
                    <td className="px-6 py-4 text-center">
                      <span className="text-xs text-red-400 font-bold bg-red-50 px-2 py-1 rounded-md uppercase">
                        {s.deletedAt
                          ? new Date(s.deletedAt).toLocaleDateString("en-GB")
                          : "Recently"}
                      </span>
                    </td>
                    {/* Restore Action */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleRestore(s.id)}
                        className="px-4 py-2 border border-lime-600 text-lime-600 rounded-lg text-[10px] font-bold hover:bg-lime-600 hover:text-white transition-all flex items-center gap-1 mx-auto"
                      >
                        <RotateCcw size={12} /> RESTORE
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Cards Layout */}
        <div className="lg:hidden space-y-4">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm text-left"
            >
              <div className="flex items-center gap-4 mb-4 pb-3 border-b">
                <img
                  src={s.photoUrl || "https://via.placeholder.com/40"}
                  className="w-14 h-14 rounded-xl object-cover grayscale border"
                  alt=""
                />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-900">
                    {s.storeName || s.businessName}
                  </h3>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase">
                      {s.vendorType || "General"}
                    </span>
                    <span className="text-[9px] bg-gray-50 text-gray-600 px-1.5 py-0.5 rounded font-bold uppercase">
                      {s.subscriptionPlan || "Basic"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-1 mb-4">
                <p className="text-xs text-gray-500 font-medium italic">
                  Deleted At:{" "}
                  {s.deletedAt
                    ? new Date(s.deletedAt).toLocaleDateString("en-GB")
                    : "Recently"}
                </p>
                <p className="text-xs text-gray-700">Contact: {s.phone}</p>
              </div>
              <button
                onClick={() => handleRestore(s.id)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-lime-50 text-lime-700 rounded-xl text-xs font-bold hover:bg-lime-600 hover:text-white transition-all"
              >
                <RotateCcw size={14} /> Restore Account
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}