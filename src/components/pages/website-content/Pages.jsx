// // PagesManagement.jsx
// import React, { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { Edit, Globe, X, Save } from "lucide-react";

// export default function PagesManagement() {
//   const [pages, setPages] = useState([
//     { id: 1, title: "About Us", sub: "Company information and mission" },
//     { id: 2, title: "Services", sub: "Our services and offerings" },
//     { id: 3, title: "Contact", sub: "Contact information and form" },
//     {
//       id: 4,
//       title: "Footer & Header",
//       sub: "Edit navigation links and social media",
//     },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editItem, setEditItem] = useState(null);

//   const openModal = (item = null) => {
//     setEditItem(item);
//     setIsModalOpen(true);
//   };

//   const handleSave = (formData) => {
//     setPages(pages.map((p) => (p.id === editItem.id ? { ...p, ...formData } : p)));
//     toast.success("Page updated!");
//     setIsModalOpen(false);
//     setEditItem(null);
//   };

//   return (
//     <div className="p-4 md:p-6 w-full bg-gray-50 min-h-screen">
//       <Toaster position="top-right" reverseOrder={false} />

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Manage Website Pages</h2>
//         <p className="text-gray-500 text-sm">Edit static pages content</p>
//       </div>

//       <div className="space-y-4">
//         {pages.map((p) => (
//           <div
//             key={p.id}
//             className="bg-white border rounded-xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
//           >
//             <div>
//               <h3 className="font-medium text-lg">{p.title}</h3>
//               <p className="text-gray-600 mt-1">{p.sub}</p>
//             </div>
//             <div className="flex gap-3 w-full md:w-auto">
//               <button
//                 onClick={() => openModal(p)}
//                 className="px-5 py-2 border rounded-lg hover:bg-gray-50 flex-1 md:flex-none"
//               >
//                 {p.title === "Footer & Header" ? "Edit Links" : "Edit Content"}
//               </button>
//               {p.title !== "Footer & Header" && (
//                 <button className="px-5 py-2 border rounded-lg hover:bg-gray-50 flex-1 md:flex-none">
//                   Preview
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {isModalOpen && (
//         <ContentModal
//           active="Pages"
//           item={editItem}
//           onClose={() => setIsModalOpen(false)}
//           onSave={handleSave}
//         />
//       )}
//     </div>
//   );
// }

// // ContentModal for Pages (title + description/sub)
// function ContentModal({ active, item, onClose, onSave }) {
//   const [title, setTitle] = useState(item?.title || "");
//   const [sub, setSub] = useState(item?.sub || "");

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl w-full max-w-lg p-6">
//         <div className="flex justify-between items-center mb-5">
//           <h3 className="text-xl font-bold">
//             {item ? `Edit ${item.title}` : "Edit Page"}
//           </h3>
//           <button onClick={onClose}>
//             <X size={24} />
//           </button>
//         </div>

//         <div className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium mb-1">Page Title</label>
//             <input
//               className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               disabled={item?.title === "Footer & Header"} // Footer/Header चे title बदलू नये
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Description / Content Summary</label>
//             <textarea
//               className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none min-h-[120px]"
//               value={sub}
//               onChange={(e) => setSub(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 mt-8">
//           <button onClick={onClose} className="px-6 py-2 border rounded-lg hover:bg-gray-50">
//             Cancel
//           </button>
//           <button
//             onClick={() => onSave({ title, sub })}
//             className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
//           >
//             <Save size={18} /> Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// Axios Added

// PagesManagement.jsx
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Edit, Globe, X, Save } from "lucide-react";

export default function PagesManagement() {
  const [pages, setPages] = useState([
    { id: 1, title: "About Us", sub: "Company information and mission" },
    { id: 2, title: "Services", sub: "Our services and offerings" },
    { id: 3, title: "Contact", sub: "Contact information and form" },
    {
      id: 4,
      title: "Footer & Header",
      sub: "Edit navigation links and social media",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const openModal = (item = null) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (formData) => {
    setPages(pages.map((p) => (p.id === editItem.id ? { ...p, ...formData } : p)));
    toast.success("Page updated!");
    setIsModalOpen(false);
    setEditItem(null);
  };

  return (
    <div className="p-4 md:p-6 w-full bg-gray-50 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Manage Website Pages</h2>
        <p className="text-gray-500 text-sm">Edit static pages content</p>
      </div>

      <div className="space-y-4">
        {pages.map((p) => (
          <div
            key={p.id}
            className="bg-white border rounded-xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <h3 className="font-medium text-lg">{p.title}</h3>
              <p className="text-gray-600 mt-1">{p.sub}</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={() => openModal(p)}
                className="px-5 py-2 border rounded-lg hover:bg-gray-50 flex-1 md:flex-none"
              >
                {p.title === "Footer & Header" ? "Edit Links" : "Edit Content"}
              </button>
              {p.title !== "Footer & Header" && (
                <button className="px-5 py-2 border rounded-lg hover:bg-gray-50 flex-1 md:flex-none">
                  Preview
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ContentModal
          active="Pages"
          item={editItem}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

// ContentModal for Pages (title + description/sub)
function ContentModal({ active, item, onClose, onSave }) {
  const [title, setTitle] = useState(item?.title || "");
  const [sub, setSub] = useState(item?.sub || "");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-bold">
            {item ? `Edit ${item.title}` : "Edit Page"}
          </h3>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Page Title</label>
            <input
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={item?.title === "Footer & Header"} // Footer/Header चे title बदलू नये
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description / Content Summary</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none min-h-[120px]"
              value={sub}
              onChange={(e) => setSub(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-6 py-2 border rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={() => onSave({ title, sub })}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Save size={18} /> Save
          </button>
        </div>
      </div>
    </div>
  );
}