import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import {
  Edit,
  Trash2,
  Plus,
  Eye,
  MousePointerClick,
  Percent,
  Image as ImageIcon,
  X,
  Save,
} from "lucide-react";

export default function BannersManagement() {
  const [banners, setBanners] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const openModal = (item = null) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setBanners(banners.filter((b) => b.id !== itemToDelete));
    toast.error("Banner deleted successfully!");
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleSave = (formData) => {
    const now = new Date();
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    let computedStatus = "Draft";

    if (formData.status === "Published") {
      if (now < start) computedStatus = "Scheduled";
      else if (now >= start && now <= end) computedStatus = "Live";
      else computedStatus = "Expired";
    }

    const bannerData = {
      id: editItem ? editItem.id : Date.now(),
      ...formData,
      status: computedStatus,
      views: editItem?.views || Math.floor(Math.random() * 5000),
      clicks: editItem?.clicks || Math.floor(Math.random() * 500),
    };

    if (editItem) {
      setBanners((prev) =>
        prev.map((b) => (b.id === editItem.id ? bannerData : b)),
      );
    } else {
      setBanners((prev) => [...prev, bannerData]);
    }

    setIsModalOpen(false);
    setEditItem(null);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setBanners((prev) =>
        prev.map((b) => {
          if (b.status === "Draft") return b;

          const now = new Date();
          const start = new Date(b.startDate);
          const end = new Date(b.endDate);

          let updatedStatus = b.status;

          if (now < start) updatedStatus = "Scheduled";
          else if (now >= start && now <= end) updatedStatus = "Live";
          else updatedStatus = "Expired";

          return { ...b, status: updatedStatus };
        }),
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const filteredBanners = banners.filter((b) => {
    return (
      (platformFilter === "All" || b.target === platformFilter) &&
      (statusFilter === "All" || b.status === statusFilter) &&
      b.title?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 ">
      <div className="bg-white border border-gray-200 rounded shadow-sm p-4 md:p-6">
        <Toaster position="top-right" reverseOrder={false} />

        <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
          <div>
            <h2 className="text-xl font-semibold">Banner Management</h2>
            <p className="text-gray-500 text-sm">
              Homepage banner images & text
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-green-600 text-white flex items-center gap-1 rounded-md hover:bg-green-700"
          >
            <Plus size={18} /> Create New Banner
          </button>
        </div>

        {/* Search & Filters Section */}
      <div className="mb-6">
  <div className="bg-gray-50 p-4 rounded-xl 
                  flex flex-col 
                  sm:flex-row 
                  sm:flex-wrap 
                  gap-4">

    {/* Search Input */}
    <div className="w-full sm:flex-1">
      <input
        type="text"
        placeholder="Search banner campaigns..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-white text-black 
                   placeholder-gray-400 
                   border border-gray-300 
                   focus:outline-none 
                   focus:ring-2 focus:ring-green-400"
      />
    </div>

    {/* Platform Filter */}
    <div className="w-full sm:w-auto">
      <select
        value={platformFilter}
        onChange={(e) => setPlatformFilter(e.target.value)}
        className="w-full sm:w-48 px-4 py-2 rounded-lg 
                   bg-white text-black 
                   border border-gray-300 
                   focus:outline-none"
      >
        <option value="All">All Platforms</option>
        <option value="Vendor App">Vendor App</option>
        <option value="User App">User App</option>
      </select>
    </div>

    {/* Status Filter */}
    <div className="w-full sm:w-auto">
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="w-full sm:w-48 px-4 py-2 rounded-lg 
                   bg-white text-black 
                   border border-gray-300 
                   focus:outline-none"
      >
        <option value="All">All Statuses</option>
        <option value="Live">Live</option>
        <option value="Scheduled">Scheduled</option>
        <option value="Expired">Expired</option>
        <option value="Draft">Draft</option>
      </select>
    </div>
  </div>
</div>


        <div className="bg-white shadow rounded-lg p-4">
          <BannersTab
            items={filteredBanners}
            onEdit={openModal}
            onDelete={handleDelete}
          />
        </div>

        {isModalOpen && (
          <ContentModal
            active="Banners"
            item={editItem}
            onClose={() => {
              setIsModalOpen(false);
              setEditItem(null);
            }}
            onSave={handleSave}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteModal
            onConfirm={confirmDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

const getRemainingTime = (endDate) => {
  const total = new Date(endDate) - new Date();

  if (total <= 0) return "Expired";

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const pad = (num) => String(num).padStart(2, "0");

  return `${pad(days)}d : ${pad(hours)}h : ${pad(minutes)}m`;
};

function BannersTab({ items, onEdit, onDelete }) {
  if (!items.length) {
    return (
      <div className="text-center py-16 text-gray-500">
        <ImageIcon size={40} className="mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-semibold">No banners found</h3>
        <p className="text-sm mt-1">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {items.map((b) => {
        const remaining = getRemainingTime(b.endDate);
        const ctr = b.views ? ((b.clicks / b.views) * 100).toFixed(1) : 0;

        return (
          <div
            key={b.id}
            className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-green-200 to-green-600 text-white"
          >
            <div className="relative h-48">
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-full object-cover opacity-80"
              />

              <div className="absolute top-3 left-3 flex gap-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    b.status === "Live"
                      ? "bg-green-500"
                      : b.status === "Scheduled"
                        ? "bg-blue-500"
                        : b.status === "Expired"
                          ? "bg-red-500"
                          : "bg-gray-500"
                  }`}
                >
                  {b.status.toUpperCase()}
                </span>

                <span className="bg-black/50 text-xs px-3 py-1 rounded-full">
                  {b.target}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-bold uppercase">{b.title}</h3>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <p className="text-xs font-semibold text-red-600">Ending in:</p>
                <p className="text-white font-mono text-sm">{remaining}</p>
                <div className="flex items-center gap-6 text-sm text-white/80 pt-2 border-t border-white/20">
                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    <span>{(b.views / 1000).toFixed(1)}k</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MousePointerClick size={16} />
                    <span>{(b.clicks / 1000).toFixed(1)}k</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Percent size={16} />
                    <span>{ctr}% CTR</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => onEdit(b)}
                  className="hover:text-green-700"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDelete(b.id)}
                  className="hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Delete Modal (reusable)
function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-out">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
        <div className="text-center">
          <div className="bg-red-100 p-4 rounded-full inline-block mb-4">
            <Trash2 size={32} className="text-red-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Delete Banner?</h3>
          <p className="text-gray-600 mb-6">This action cannot be undone.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function ContentModal({ item, onClose, onSave }) {
  const [form, setForm] = useState({
    target: "Vendor App",
    type: "Policy Update",
    title: "",
    description: "",
    targeting: "All Vendors",
    priority: "High",
    startDate: "",
    endDate: "",
    link: "",
    image: "",
  });
  useEffect(() => {
    return () => {
      if (form.image && form.image.startsWith("blob:")) {
        URL.revokeObjectURL(form.image);
      }
    };
  }, []);

  useEffect(() => {
    if (item) {
      setForm({
        target: item.target || "Vendor App",
        type: item.type || "Policy Update",
        title: item.title || "",
        description: item.description || "",
        targeting: item.targeting || "All Vendors",
        priority: item.priority || "High",
        startDate: item.startDate || "",
        endDate: item.endDate || "",
        link: item.link || "",
        image: item.image || "",
      });
    }
  }, [item]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("image", URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center md:justify-end">
      <div className="bg-white text-black w-full h-full md:max-w-2xl md:h-full flex flex-col shadow-2xl animate-slideIn">
        {/* HEADER */}
        <div className="flex justify-between items-start md:items-center p-4 md:p-6 border-b border-gray-400">
          <div>
            <h2 className="text-lg md:text-xl text-green-600 font-semibold">
              {item ? "Edit Admin Banner" : "Create New Admin Banner"}
            </h2>

            <p className="text-xs md:text-sm font-semibold text-black mt-1">
              Publish announcements to User, Agrowmart or Vendor applications
            </p>
          </div>
          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 no-scrollbar">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Banner Target */}
            <div>
              <label className="text-xs font-semibold text-gray-600">
                BANNER TARGET
              </label>
              <select
                className="w-full border border-gray-400 rounded-lg px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                value={form.target}
                onChange={(e) => handleChange("target", e.target.value)}
              >
                <option>Vendor App</option>
                <option>User App</option>
              </select>
            </div>

            {/* Banner Type */}
            <div>
              <label className="text-xs font-semibold text-gray-600">
                BANNER TYPE
              </label>
              <select
                className="w-full border border-gray-400 rounded-lg px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                value={form.type}
                onChange={(e) => handleChange("type", e.target.value)}
              >
                <option>Policy Update</option>
                <option>Promotion</option>
                <option>Alert</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-gray-600">
              BANNER TITLE
            </label>
            <input
              className="w-full border border-gray-400 rounded-lg px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g., New Government Subsidy for Organic Farming"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-gray-600">
              DETAILED DESCRIPTION
            </label>
            <textarea
              rows={4}
              className="w-full border border-gray-400 rounded-lg px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="Provide more context for the banner..."
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-xs font-semibold text-gray-600">
              IMAGE / ICON UPLOAD
            </label>
            <label className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 md:p-8 text-center cursor-pointer block">
              {form.image ? (
                <img
                  src={form.image}
                  alt="preview"
                  className="mx-auto h-32 md:h-40 object-contain"
                />
              ) : (
                <div className="text-green-600 text-sm md:text-base">
                  Click to upload or drag and drop
                  <div className="text-xs mt-1">
                    SVG, PNG, JPG or GIF (max. 1200x400px)
                  </div>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Targeting + Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600">
                TARGETING
              </label>
              <select
                className="w-full border border-gray-400 rounded-lg px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                value={form.targeting}
                onChange={(e) => handleChange("targeting", e.target.value)}
              >
                <option>All Vendors</option>
                <option>All Users</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">
                PRIORITY LEVEL
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["High", "Med", "Low"].map((level) => (
                  <button
                    key={level}
                    onClick={() => handleChange("priority", level)}
                    className={`px-4 py-1 rounded-lg text-sm ${
                      form.priority === level
                        ? "bg-green-600 text-white"
                        : "bg-white text-green-600 border border-gray-400"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600">
                DURATION (START)
              </label>
              <input
                type="date"
                className="w-full border border-gray-700 rounded-lg px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                value={form.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">
                DURATION (END)
              </label>
              <input
                type="date"
                className="w-full border border-gray-700 rounded-lg px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                value={form.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
              />
            </div>
          </div>

          {/* Link */}
          <div>
            <label className="text-xs font-semibold text-gray-600">
              CALL TO ACTION LINK
            </label>
            <input
              className="w-full border border-gray-700 rounded-lg px-3 py-2 mt-1 focus:ring-1 focus:ring-green-500 focus:border-green-500"
              placeholder="https://agromart.com/schemes/..."
              value={form.link}
              onChange={(e) => handleChange("link", e.target.value)}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 md:p-6 border-t border-green-800 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setForm({
                  target: "Vendor App",
                  type: "Policy Update",
                  title: "",
                  description: "",
                  targeting: "All Vendors",
                  priority: "High",
                  startDate: "",
                  endDate: "",
                  link: "",
                  image: "",
                });

                toast("Draft discarded");
                onClose();
              }}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-500 font-semibold hover:bg-gray-100"
            >
              Discard Draft
            </button>

            <button
              onClick={() => {
                if (!form.title) {
                  toast.error("Title is required");
                  return;
                }

                onSave({ ...form, status: "Draft" });
                toast.success("Banner saved as draft!");
              }}
              className="px-5 py-2 rounded-lg border border-green-500 text-green-600 font-semibold hover:bg-green-50"
            >
              Save as Draft
            </button>
          </div>

          <button
            onClick={() => {
              if (!form.title || !form.startDate || !form.endDate) {
                toast.error("Please fill all required fields");
                return;
              }

              if (new Date(form.endDate) < new Date(form.startDate)) {
                toast.error("End date must be after start date");
                return;
              }

              onSave({ ...form, status: "Published" });
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700"
          >
            Publish Banner
          </button>
        </div>
      </div>
    </div>
  );
}
