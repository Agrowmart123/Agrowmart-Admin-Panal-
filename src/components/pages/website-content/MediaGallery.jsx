// MediaGalleryManagement.jsx
// (video upload, grid view, edit/delete)

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Edit, Trash2, Plus, Video as VideoIcon, X, Save } from "lucide-react";

export default function MediaGalleryManagement() {
  const [media, setMedia] = useState([
    { id: 1, title: "Farmer Success Story", views: 5678, date: "2025-11-18" },
    { id: 2, title: "Product Showcase", views: 3456, date: "2025-11-18" },
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
    setMedia(media.filter((m) => m.id !== itemToDelete));
    toast.error("Media deleted!");
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleSave = (formData) => {
    if (editItem) {
      setMedia(media.map((m) => (m.id === editItem.id ? { ...m, ...formData } : m)));
      toast.success("Media updated!");
    } else {
      const newItem = {
        id: Date.now(),
        views: 0,
        date: new Date().toISOString().split("T")[0],
        ...formData,
      };
      setMedia([...media, newItem]);
      toast.success("New media added!");
    }
    setIsModalOpen(false);
    setEditItem(null);
  };

  return (
    <div className="p-4 md:p-6 w-full bg-gray-50 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Media Gallery</h2>
          <p className="text-gray-500 text-sm">Upload videos & showcase content</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-green-600 text-white flex items-center gap-1 rounded-md hover:bg-green-700"
        >
          <Plus size={18} /> Add Video
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {media.map((m) => (
          <div key={m.id} className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="bg-black h-48 flex items-center justify-center relative">
              <VideoIcon size={48} className="text-white opacity-70" />
            </div>
            <div className="p-4">
              <h3 className="font-medium truncate">{m.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{m.date} • {m.views.toLocaleString()} views</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => openModal(m)}
                  className="px-4 py-1.5 border rounded text-sm hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="px-4 py-1.5 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ContentModal
          active="Media Gallery"
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

// ContentModal for Media (title + video upload)
function ContentModal({ active, item, onClose, onSave }) {
  const [title, setTitle] = useState(item?.title || "");
  const [video, setVideo] = useState(item?.video || "");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setVideo(URL.createObjectURL(file));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-bold">
            {item ? "Edit Video" : "Add New Video"}
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
            <label className="block text-sm font-medium mb-1">Video File</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
              id="video-upload"
            />
            <label
              htmlFor="video-upload"
              className="cursor-pointer block border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50"
            >
              {video ? (
                <video src={video} controls className="mx-auto h-48 rounded" />
              ) : (
                <div className="py-10 text-gray-500">
                  <VideoIcon size={40} className="mx-auto mb-2" />
                  Click to upload video
                </div>
              )}
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-6 py-2 border rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={() => onSave({ title, video })}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Save size={18} /> Save
          </button>
        </div>
      </div>
    </div>
  );
}

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