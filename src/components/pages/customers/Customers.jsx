import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCustomers } from "../../../api/customers.api";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [customersData, setCustomersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  /* ================= FETCH CUSTOMERS ================= */
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await getAllCustomers(0, 100, search);

        if (res?.success && Array.isArray(res.data)) {
          setCustomersData(res.data);
        } else {
          setCustomersData([]);
        }
      } catch (err) {
        console.error("❌ Error fetching customers", err);
        setCustomersData([]);
      } finally {
        setLoading(false);
      }
    }, 400); // 👈 debounce delay

    return () => clearTimeout(timer);
  }, [search]);

  /* ================= FILTER + PAGINATION ================= */
  const filteredData = customersData;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  /* ================= UI (UNCHANGED) ================= */
  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
          All Customers ({filteredData.length})
        </h2>

        {loading && (
          <div className="text-center py-3 text-sm text-gray-500">
            Loading customers...
          </div>
        )}

        <div className="relative w-full sm:w-64 lg:w-80">
          <input
            type="text"
            placeholder="Search by name, email or phone"
            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg text-sm outline-none shadow-sm bg-white"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      {paginatedData.length > 0 ? (
        <div className="hidden md:block overflow-x-auto rounded-lg bg-white shadow-sm">
          <table className="w-full text-sm text-center">
            <thead className="bg-gray-100 font-semibold text-gray-600 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-center">Name</th>
                <th className="px-4 py-3 text-center">Phone Number</th>
                <th className="px-4 py-3 text-center">Email Address</th>
                <th className="px-4 py-3 text-center">Member Since</th>
                <th className="px-4 py-3 text-center">Purchased Items</th>
                <th className="px-4 py-3 text-center">User ID</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-gray-200 hover:bg-gray-50 text-gray-600"
                >
                  <td className="px-4 py-3 flex items-center gap-2 justify-start text-left">
                    <img
                      src={
                        c.photoUrl ||
                        `https://ui-avatars.com/api/?name=${c.name}`
                      }
                      className="w-8 h-8 rounded-full border"
                      alt={c.name}
                    />
                    {c.name}
                  </td>

                  <td className="px-4 py-3">+91 {c.phone}</td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c.memberSince || "N/A"}</td>
                  <td className="px-4 py-3 text-green-600">
                    {c.purchasedItems ?? 0} Items
                  </td>

                  <td className="px-4 py-3">{c.id}</td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => navigate(`/customer/${c.id}`)}
                      className="px-3 py-1 text-xs border rounded-md text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="hidden md:block p-6 text-center text-gray-500">
          No customers found.
        </div>
      )}

      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden space-y-4">
        {paginatedData.map((c) => (
          <div
            key={c.id}
            className="bg-white shadow-sm rounded-lg p-4 border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <img
                src={c.photoUrl || `https://ui-avatars.com/api/?name=${c.name}`}
                className="w-12 h-12 rounded-full border"
                alt={c.name}
              />
              <h3 className="font-semibold text-gray-700">{c.name}</h3>
            </div>

            <div className="mt-3 space-y-1 text-sm text-gray-600">
              <p>
                <strong>Phone:</strong> +91 {c.phone}
              </p>
              <p>
                <strong>Email:</strong> {c.email}
              </p>
              <p>
                <strong>Member Since:</strong> {c.memberSince || "N/A"}
              </p>
              <p>
                <strong>Purchased:</strong> {c.purchasedItems ?? 0}
              </p>
              <p>
                <strong>User ID:</strong> {c.id}
              </p>
            </div>

            <button
              onClick={() => navigate(`/customer/${c.id}`)}
              className="mt-4 w-full px-3 py-2 text-sm border rounded-md text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-end items-center mt-6 gap-2 text-sm">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 rounded-md disabled:opacity-50"
        >
          PREV
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded-md ${
              page === i + 1
                ? "bg-green-600 text-white"
                : "hover:bg-green-600 hover:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded-md disabled:opacity-50"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
