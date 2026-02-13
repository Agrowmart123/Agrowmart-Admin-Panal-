import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Edit, Trash2, Plus, Newspaper, X, Save } from "lucide-react";

export default function BlogsManagement() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Best Practices for Organic Farming",
      views: 1234,
      date: "2025-11-20",
      status: "Published",
    },
    {
      id: 2,
      title: "Market Trends 2025",
      views: 1234,
      date: "2025-11-20",
      status: "Published",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const openModal = (item = null) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setBlogs(blogs.filter((b) => b.id !== itemToDelete));
    toast.error("Blog deleted successfully!");
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleSave = (formData) => {
    if (editItem) {
      setBlogs(blogs.map((b) => (b.id === editItem.id ? { ...b, ...formData } : b)));
      toast.success("Blog updated!");
    } else {
      const newItem = {
        id: Date.now(),
        views: 0,
        date: new Date().toISOString().split("T")[0],
        ...formData,
      };
      setBlogs([...blogs, newItem]);
      toast.success("New blog added!");
    }
    setIsModalOpen(false);
    setEditItem(null);
  };

  return (
    <div className="p-4 md:p-6 w-full bg-gray-50 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Manage Blogs / News</h2>
          <p className="text-gray-500 text-sm">Create & manage articles and news</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-green-600 text-white flex items-center gap-1 rounded-md hover:bg-green-700"
        >
          <Plus size={18} /> Add Blog
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <BlogsTab items={blogs} onEdit={openModal} onDelete={handleDelete} />
      </div>

      {isModalOpen && (
        <ContentModal
          active="Blogs/News"
          item={editItem}
          onClose={() => setIsModalOpen(false)}
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
  );
}

function BlogsTab({ items, onEdit, onDelete }) {
  return (
    <div>
      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {items.map((b) => (
          <div key={b.id} className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-1">{b.title}</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Admin • {b.date}</p>
              <p>{b.views.toLocaleString()} views</p>
              <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                {b.status}
              </span>
            </div>
            <div className="flex justify-end gap-3 mt-3">
              <Edit
                size={18}
                className="text-blue-600 cursor-pointer"
                onClick={() => onEdit(b)}
              />
              <Trash2
                size={18}
                className="text-red-600 cursor-pointer"
                onClick={() => onDelete(b.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 font-medium">Title</th>
              <th className="p-3 font-medium">Author</th>
              <th className="p-3 font-medium">Date</th>
              <th className="p-3 font-medium">Views</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((b) => (
              <tr key={b.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{b.title}</td>
                <td className="p-3">Admin</td>
                <td className="p-3">{b.date}</td>
                <td className="p-3">{b.views.toLocaleString()}</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                    {b.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => onEdit(b)} className="text-blue-600 mr-3">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => onDelete(b.id)} className="text-red-600">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// DeleteModal (same as above)
function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
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

// ContentModal for Blogs (title + status only – no image)
function ContentModal({ active, item, onClose, onSave }) {
  const [title, setTitle] = useState(item?.title || "");
  const [status, setStatus] = useState(item?.status || "Published");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-bold">
            {item ? "Edit Blog" : "Add New Blog"}
          </h3>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-6 py-2 border rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={() => onSave({ title, status })}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Save size={18} /> Save
          </button>
        </div>
      </div>
    </div>
  );
}