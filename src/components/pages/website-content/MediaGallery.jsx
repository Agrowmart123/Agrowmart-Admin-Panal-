// // MediaGalleryManagement.jsx
// // (video upload, grid view, edit/delete)

// import React, { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { Edit, Trash2, Plus, Video as VideoIcon, X, Save } from "lucide-react";

// export default function MediaGalleryManagement() {
//   const [media, setMedia] = useState([
//     { id: 1, title: "Farmer Success Story", views: 5678, date: "2025-11-18" },
//     { id: 2, title: "Product Showcase", views: 3456, date: "2025-11-18" },
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
//     setMedia(media.filter((m) => m.id !== itemToDelete));
//     toast.error("Media deleted!");
//     setIsDeleteModalOpen(false);
//     setItemToDelete(null);
//   };

//   const handleSave = (formData) => {
//     if (editItem) {
//       setMedia(media.map((m) => (m.id === editItem.id ? { ...m, ...formData } : m)));
//       toast.success("Media updated!");
//     } else {
//       const newItem = {
//         id: Date.now(),
//         views: 0,
//         date: new Date().toISOString().split("T")[0],
//         ...formData,
//       };
//       setMedia([...media, newItem]);
//       toast.success("New media added!");
//     }
//     setIsModalOpen(false);
//     setEditItem(null);
//   };

//   return (
//     <div className="p-4 md:p-6 w-full bg-gray-50 min-h-screen">
//       <Toaster position="top-right" reverseOrder={false} />

//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-xl font-semibold">Media Gallery</h2>
//           <p className="text-gray-500 text-sm">Upload videos & showcase content</p>
//         </div>
//         <button
//           onClick={() => openModal()}
//           className="px-4 py-2 bg-green-600 text-white flex items-center gap-1 rounded-md hover:bg-green-700"
//         >
//           <Plus size={18} /> Add Video
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//         {media.map((m) => (
//           <div key={m.id} className="bg-white border rounded-xl shadow-sm overflow-hidden">
//             <div className="bg-black h-48 flex items-center justify-center relative">
//               <VideoIcon size={48} className="text-white opacity-70" />
//             </div>
//             <div className="p-4">
//               <h3 className="font-medium truncate">{m.title}</h3>
//               <p className="text-sm text-gray-500 mt-1">{m.date} • {m.views.toLocaleString()} views</p>
//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={() => openModal(m)}
//                   className="px-4 py-1.5 border rounded text-sm hover:bg-gray-50"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(m.id)}
//                   className="px-4 py-1.5 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {isModalOpen && (
//         <ContentModal
//           active="Media Gallery"
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

// // ContentModal for Media (title + video upload)
// function ContentModal({ active, item, onClose, onSave }) {
//   const [title, setTitle] = useState(item?.title || "");
//   const [video, setVideo] = useState(item?.video || "");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) setVideo(URL.createObjectURL(file));
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-5">
//           <h3 className="text-xl font-bold">
//             {item ? "Edit Video" : "Add New Video"}
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
//             <label className="block text-sm font-medium mb-1">Video File</label>
//             <input
//               type="file"
//               accept="video/*"
//               onChange={handleFileChange}
//               className="hidden"
//               id="video-upload"
//             />
//             <label
//               htmlFor="video-upload"
//               className="cursor-pointer block border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50"
//             >
//               {video ? (
//                 <video src={video} controls className="mx-auto h-48 rounded" />
//               ) : (
//                 <div className="py-10 text-gray-500">
//                   <VideoIcon size={40} className="mx-auto mb-2" />
//                   Click to upload video
//                 </div>
//               )}
//             </label>
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 mt-8">
//           <button onClick={onClose} className="px-6 py-2 border rounded-lg hover:bg-gray-50">
//             Cancel
//           </button>
//           <button
//             onClick={() => onSave({ title, video })}
//             className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
//           >
//             <Save size={18} /> Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

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


// Axios Added---

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Edit, Trash2, Plus, Video, X, Save, Play, Film } from "lucide-react";
import websiteContentService from "../../../api/websiteContentService";

export default function MediaGalleryManagement() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const data = await websiteContentService.getAllByType("MEDIA");
      setMedia(data || []);
    } catch (error) {
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData) => {
    try {
      const payload = {
        title: formData.title,
        type: "MEDIA",
        status: "Live",
        videoUrl: formData.videoUrl,
        startDate: new Date().toISOString().split("T")[0],
      };
      const saved = await websiteContentService.saveContent(
        payload,
        editItem?.id,
      );
      setMedia((prev) =>
        editItem
          ? prev.map((m) => (m.id === saved.id ? saved : m))
          : [...prev, saved],
      );
      setIsModalOpen(false);
      toast.success("Media saved!");
    } catch (error) {
      toast.error("Save failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Media Gallery</h1>
            <p className="text-gray-500 text-sm">Videos and Video Showcase</p>
          </div>
          <button
            onClick={() => {
              setEditItem(null);
              setIsModalOpen(true);
            }}
            className="bg-green-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-green-100 font-medium"
          >
            <Plus size={20} /> Add Video
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-green-600 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {media.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video bg-gray-900 relative flex items-center justify-center overflow-hidden">
                  <Film
                    size={40}
                    className="text-white/20 group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-600">
                      <Play fill="currentColor" size={20} />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 truncate mb-1">
                    {item.title}
                  </h3>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                      {item.createdAt?.split("T")[0]}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setEditItem(item);
                          setIsModalOpen(true);
                        }}
                        className="p-2 hover:bg-green-50 text-green-600 rounded-lg"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm("Delete this video?")) {
                            await websiteContentService.removeContent(item.id);
                            setMedia((prev) =>
                              prev.filter((m) => m.id !== item.id),
                            );
                            toast.error("Video removed");
                          }
                        }}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {editItem ? "Edit Video" : "Add Video"}
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X />
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400">
                  VIDEO TITLE
                </label>
                <input
                  className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                  value={editItem?.title || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400">
                  YOUTUBE/VIDEO URL
                </label>
                <input
                  className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                  value={editItem?.videoUrl || ""}
                  onChange={(e) =>
                    setEditItem({ ...editItem, videoUrl: e.target.value })
                  }
                />
              </div>
              <button
                onClick={() => handleSave(editItem)}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold mt-4 hover:bg-green-700 transition-all"
              >
                Save Media
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}