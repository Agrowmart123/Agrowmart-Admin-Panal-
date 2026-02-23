// import React, { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { Edit, Trash2, Plus, Newspaper, X, Save } from "lucide-react";

// export default function BlogsManagement() {
//   const [blogs, setBlogs] = useState([
//     {
//       id: 1,
//       title: "Best Practices for Organic Farming",
//       views: 1234,
//       date: "2025-11-20",
//       status: "Published",
//     },
//     {
//       id: 2,
//       title: "Market Trends 2025",
//       views: 1234,
//       date: "2025-11-20",
//       status: "Published",
//     },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);

//   const openModal = (item = null) => {
//     setEditItem(item);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     setItemToDelete(id);
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDelete = () => {
//     setBlogs(blogs.filter((b) => b.id !== itemToDelete));
//     toast.error("Blog deleted successfully!");
//     setIsDeleteModalOpen(false);
//     setItemToDelete(null);
//   };

//   const handleSave = (formData) => {
//     if (editItem) {
//       setBlogs(blogs.map((b) => (b.id === editItem.id ? { ...b, ...formData } : b)));
//       toast.success("Blog updated!");
//     } else {
//       const newItem = {
//         id: Date.now(),
//         views: 0,
//         date: new Date().toISOString().split("T")[0],
//         ...formData,
//       };
//       setBlogs([...blogs, newItem]);
//       toast.success("New blog added!");
//     }
//     setIsModalOpen(false);
//     setEditItem(null);
//   };

//   return (
//     <div className="p-4 md:p-6 w-full bg-gray-50 min-h-screen">
//       <Toaster position="top-right" reverseOrder={false} />

//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-xl font-semibold">Manage Blogs / News</h2>
//           <p className="text-gray-500 text-sm">Create & manage articles and news</p>
//         </div>
//         <button
//           onClick={() => openModal()}
//           className="px-4 py-2 bg-green-600 text-white flex items-center gap-1 rounded-md hover:bg-green-700"
//         >
//           <Plus size={18} /> Add Blog
//         </button>
//       </div>

//       <div className="bg-white shadow rounded-lg p-4">
//         <BlogsTab items={blogs} onEdit={openModal} onDelete={handleDelete} />
//       </div>

//       {isModalOpen && (
//         <ContentModal
//           active="Blogs/News"
//           item={editItem}
//           onClose={() => setIsModalOpen(false)}
//           onSave={handleSave}
//         />
//       )}

//       {isDeleteModalOpen && (
//         <DeleteModal
//           onConfirm={confirmDelete}
//           onCancel={() => setIsDeleteModalOpen(false)}
//         />
//       )}
//     </div>
//   );
// }

// function BlogsTab({ items, onEdit, onDelete }) {
//   return (
//     <div>
//       {/* Mobile Cards */}
//       <div className="md:hidden space-y-4">
//         {items.map((b) => (
//           <div key={b.id} className="bg-white border rounded-lg p-4 shadow-sm">
//             <h3 className="font-semibold mb-1">{b.title}</h3>
//             <div className="text-sm text-gray-600 space-y-1">
//               <p>Admin • {b.date}</p>
//               <p>{b.views.toLocaleString()} views</p>
//               <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
//                 {b.status}
//               </span>
//             </div>
//             <div className="flex justify-end gap-3 mt-3">
//               <Edit
//                 size={18}
//                 className="text-blue-600 cursor-pointer"
//                 onClick={() => onEdit(b)}
//               />
//               <Trash2
//                 size={18}
//                 className="text-red-600 cursor-pointer"
//                 onClick={() => onDelete(b.id)}
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Desktop Table */}
//       <div className="hidden md:block overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 font-medium">Title</th>
//               <th className="p-3 font-medium">Author</th>
//               <th className="p-3 font-medium">Date</th>
//               <th className="p-3 font-medium">Views</th>
//               <th className="p-3 font-medium">Status</th>
//               <th className="p-3 text-right font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((b) => (
//               <tr key={b.id} className="border-t hover:bg-gray-50">
//                 <td className="p-3">{b.title}</td>
//                 <td className="p-3">Admin</td>
//                 <td className="p-3">{b.date}</td>
//                 <td className="p-3">{b.views.toLocaleString()}</td>
//                 <td className="p-3">
//                   <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
//                     {b.status}
//                   </span>
//                 </td>
//                 <td className="p-3 text-right">
//                   <button onClick={() => onEdit(b)} className="text-blue-600 mr-3">
//                     <Edit size={18} />
//                   </button>
//                   <button onClick={() => onDelete(b.id)} className="text-red-600">
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // DeleteModal (same as above)
// function DeleteModal({ onConfirm, onCancel }) {
//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
//         <div className="text-center">
//           <div className="bg-red-100 p-4 rounded-full inline-block mb-4">
//             <Trash2 size={32} className="text-red-600" />
//           </div>
//           <h3 className="text-xl font-bold mb-2">Delete Banner?</h3>
//           <p className="text-gray-600 mb-6">This action cannot be undone.</p>
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={onCancel}
//             className="flex-1 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className="flex-1 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
//           >
//             Yes, Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ContentModal for Blogs (title + status only – no image)
// function ContentModal({ active, item, onClose, onSave }) {
//   const [title, setTitle] = useState(item?.title || "");
//   const [status, setStatus] = useState(item?.status || "Published");

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl w-full max-w-md p-6">
//         <div className="flex justify-between items-center mb-5">
//           <h3 className="text-xl font-bold">
//             {item ? "Edit Blog" : "Add New Blog"}
//           </h3>
//           <button onClick={onClose}>
//             <X size={24} />
//           </button>
//         </div>

//         <div className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium mb-1">Title</label>
//             <input
//               className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Status</label>
//             <select
//               className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//             >
//               <option value="Published">Published</option>
//               <option value="Draft">Draft</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 mt-8">
//           <button onClick={onClose} className="px-6 py-2 border rounded-lg hover:bg-gray-50">
//             Cancel
//           </button>
//           <button
//             onClick={() => onSave({ title, status })}
//             className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
//           >
//             <Save size={18} /> Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// Axios Added ------

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Edit,
  Trash2,
  Plus,
  Newspaper,
  X,
  Save,
  Calendar,
  User,
} from "lucide-react";
import websiteContentService from "../../../api/websiteContentService";

export default function BlogsManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await websiteContentService.getAllByType("BLOG");
      setBlogs(data || []);
    } catch (error) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      const payload = {
        title: formData.title,
        subtitle: formData.subtitle,
        type: "BLOG",
        status: formData.status,
        author: formData.author,
        imageUrl: formData.imageUrl,
        startDate: new Date().toISOString().split("T")[0],
      };

      if (editItem?.id) {
        const updated = await websiteContentService.saveContent(
          payload,
          editItem.id,
        );
        setBlogs((prev) =>
          prev.map((b) => (b.id === updated.id ? updated : b)),
        );
        toast.success("Blog updated!");
      } else {
        const saved = await websiteContentService.saveContent(payload);
        setBlogs((prev) => [...prev, saved]);
        toast.success("Blog published!");
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Save failed");
    }
  };

  const confirmDelete = async () => {
    try {
      await websiteContentService.removeContent(itemToDelete);
      setBlogs((prev) => prev.filter((b) => b.id !== itemToDelete));
      toast.success("Deleted!");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blogs & News</h1>
            <p className="text-gray-500">
              Manage your website articles and announcements
            </p>
          </div>
          <button
            onClick={() => {
              setEditItem(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-green-200"
          >
            <Plus size={20} /> New Article
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-gray-200 relative">
                  {blog.imageUrl ? (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <Newspaper size={40} />
                    </div>
                  )}
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-700 shadow-sm border border-green-100">
                    {blog.status}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 line-clamp-1 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {blog.subtitle}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <User size={14} /> {blog.author}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditItem(blog);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setItemToDelete(blog.id);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal - Responsive Side Drawer or Center Popup */}
      {isModalOpen && (
        <BlogModal
          item={editItem}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* Delete Confirmation */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Delete Article?
            </h3>
            <p className="text-gray-500 text-center mb-6">
              Are you sure you want to remove this blog? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700"
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

function BlogModal({ item, onClose, onSave }) {
  const [form, setForm] = useState({
    title: item?.title || "",
    subtitle: item?.subtitle || "",
    author: item?.author || "Admin",
    status: item?.status || "Published",
    imageUrl: item?.imageUrl || "",
  });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800">
            {item ? "Edit Article" : "Create New Article"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Article Title
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all"
              placeholder="e.g. Modern Farming Techniques"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Author
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Status
              </label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none appearance-none"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Image URL
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="https://images.unsplash.com/..."
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Detailed Description
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none min-h-[150px] resize-none"
              placeholder="Write your content here..."
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 border border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-all"
          >
            Discard
          </button>
          <button
            onClick={() => onSave(form)}
            className="flex-1 py-3 px-6 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2"
          >
            <Save size={18} /> {item ? "Update Post" : "Publish Now"}
          </button>
        </div>
      </div>
    </div>
  );
}