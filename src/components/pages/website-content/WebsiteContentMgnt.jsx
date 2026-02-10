import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Edit,
  Trash2,
  Plus,
  Image as ImageIcon,
  Newspaper,
  Video,
  Globe,
  Menu,
  X,
  Save,
} from "lucide-react";

export default function WebsiteContentManagement() {
  const tabs = ["Banners", "Blogs/News", "Media Gallery", "Pages"];
  const [active, setActive] = useState("Banners");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // --- DATA STATE ---
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: "Welcome to AgroConnect",
      sub: "Connecting Farmers with Markets",
      status: "Published",
      img: "https://www.bing.com/th/id/OIP.HkHIfXfYJR9D7_jo8z5vzQHaEV?pid=ImgDet&rs=1",
    },
    {
      id: 2,
      title: "Fresh Products Daily",
      sub: "Get the best quality products",
      status: "Published",
      img: "https://www.bing.com/th/id/OIP.HkHIfXfYJR9D7_jo8z5vzQHaEV?pid=ImgDet&rs=1",
    },
  ]);

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

  const [media, setMedia] = useState([
    { id: 1, title: "Farmer Success Story", views: 5678, date: "2025-11-18" },
    { id: 2, title: "Product Showcase", views: 3456, date: "2025-11-18" },
  ]);

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

  // --- MODAL & EDIT STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleTabClick = (tab) => {
    setActive(tab);
    setShowMobileMenu(false);
  };

  const openModal = (item = null) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    const id = itemToDelete;

    if (active === "Banners") setBanners(banners.filter((b) => b.id !== id));
    if (active === "Blogs/News") setBlogs(blogs.filter((b) => b.id !== id));
    if (active === "Media Gallery") setMedia(media.filter((m) => m.id !== id));
    toast.error("Successfully deleted!");
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleSave = (formData) => {
    if (editItem) {
      // Update logic
      if (active === "Banners")
        setBanners(
          banners.map((b) =>
            b.id === editItem.id ? { ...b, ...formData } : b,
          ),
        );
      if (active === "Blogs/News")
        setBlogs(
          blogs.map((b) => (b.id === editItem.id ? { ...b, ...formData } : b)),
        );
      if (active === "Media Gallery")
        setMedia(
          media.map((m) => (m.id === editItem.id ? { ...m, ...formData } : m)),
        );
      if (active === "Pages")
        setPages(
          pages.map((p) => (p.id === editItem.id ? { ...p, ...formData } : p)),
        );
      toast.success("Changes have been saved!");
    } else {
      // Create logic
      const newItem = {
        id: Date.now(),
        views: 0,
        date: new Date().toISOString().split("T")[0],
        ...formData,
      };
      if (active === "Banners") setBanners([...banners, newItem]);
      if (active === "Blogs/News") setBlogs([...blogs, newItem]);
      if (active === "Media Gallery") setMedia([...media, newItem]);
      toast.success("New data has been added!");
    }
    setIsModalOpen(false);
    setEditItem(null);
  };

  return (
    <div className="p-4 md:p-6 w-full bg-gray-50 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <div>
          <h2 className="text-xl font-semibold">Website Content Management</h2>
          <p className="text-gray-500 text-sm">
            Manage your website content, banners, and pages
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="px-4 py-2 bg-green-600 text-white flex items-center gap-1 rounded-md hover:bg-green-700"
        >
          <Plus size={18} /> Add New
        </button>
      </div>

      {/* Card */}
      <div className="bg-white shadow rounded-lg p-3 md:p-4">
        {/* Desktop Tabs */}
        <div className="hidden md:flex gap-6 border-b border-gray-200 overflow-x-auto mb-4">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`pb-2 flex items-center gap-2 whitespace-nowrap transition-all ${
                active === t
                  ? "border-b-2 border-green-500 text-green-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              {t === "Banners" && <ImageIcon size={18} />}
              {t === "Blogs/News" && <Newspaper size={18} />}
              {t === "Media Gallery" && <Video size={18} />}
              {t === "Pages" && <Globe size={18} />}
              {t}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden border-b border-gray-200 mb-4 pb-2 flex justify-between items-center">
          <p className="text-green-600 font-medium flex gap-2 items-center">
            {active === "Banners" && <ImageIcon size={18} />}
            {active === "Blogs/News" && <Newspaper size={18} />}
            {active === "Media Gallery" && <Video size={18} />}
            {active === "Pages" && <Globe size={18} />}
            {active}
          </p>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="px-2 py-1 rounded text-gray-600 border border-gray-300"
          >
            {showMobileMenu ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {showMobileMenu && (
          <div className="md:hidden flex flex-col gap-2 mb-4 bg-gray-50 p-2 rounded border border-gray-300 shadow-sm">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => handleTabClick(t)}
                className={`flex items-center gap-2 px-3 py-2 rounded text-left ${
                  active === t
                    ? "bg-green-100 text-green-600 font-medium"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t === "Banners" && <ImageIcon size={18} />}
                {t === "Blogs/News" && <Newspaper size={18} />}
                {t === "Media Gallery" && <Video size={18} />}
                {t === "Pages" && <Globe size={18} />}
                {t}
              </button>
            ))}
          </div>
        )}

        {/* Tab Contents */}
        <div className="mt-2">
          {active === "Banners" && (
            <BannersTab
              items={banners}
              onEdit={openModal}
              onDelete={handleDelete}
            />
          )}
          {active === "Blogs/News" && (
            <BlogsTab
              items={blogs}
              onEdit={openModal}
              onDelete={handleDelete}
            />
          )}
          {active === "Media Gallery" && (
            <MediaTab
              items={media}
              onEdit={openModal}
              onDelete={handleDelete}
            />
          )}
          {active === "Pages" && <PagesTab items={pages} onEdit={openModal} />}
        </div>
      </div>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <ContentModal
          active={active}
          item={editItem}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* --- CUSTOM DELETE MODAL --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <Trash2 size={32} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Delete?</h3>
              <p className="text-gray-500 mt-2">
                Are you sure you want to delete this item?
              </p>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ************************ BANNERS ************************ */

function BannersTab({ items, onEdit, onDelete }) {
  return (
    <div className="space-y-4">
      {items.map((b) => (
        <div
          key={b.id}
          className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 shadow flex flex-col md:flex-row md:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-4 flex-1">
            <img
              src={b.img}
              alt={b.title}
              className="w-28 h-16 object-cover rounded-md border-2 border-dashed border-gray-200"
            />
            <div>
              <h3 className="font-semibold text-sm md:text-base">{b.title}</h3>
              <p className="text-sm text-gray-500">{b.sub}</p>
              <span
                className={`text-xs px-2 py-1 rounded mt-2 inline-block ${b.status === "Published" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600"}`}
              >
                {b.status}
              </span>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => onEdit(b)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(b.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ************************ BLOGS ************************ */

function BlogsTab({ items, onEdit, onDelete }) {
  return (
    <div>
      <div className="md:hidden space-y-3">
        {items.map((b) => (
          <div
            key={b.id}
            className="bg-white p-4 shadow rounded-lg border border-gray-100"
          >
            <p className="font-semibold">{b.title}</p>
            <p className="text-sm text-gray-500">Admin • {b.date}</p>
            <p className="text-sm text-gray-500">{b.views} views</p>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded inline-block mt-1">
              {b.status}
            </span>
            <div className="flex justify-end gap-3 mt-2">
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

      <div className="hidden md:block bg-white border border-gray-300 shadow rounded-lg overflow-x-auto">
        <table className="w-full text-left min-w-max">
          <thead className="bg-gray-100 border-b border-gray-200 text-gray-600 text-sm">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Date</th>
              <th className="p-3">Views</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((b) => (
              <tr key={b.id} className="border-b border-gray-300">
                <td className="p-3">{b.title}</td>
                <td className="p-3">Admin</td>
                <td className="p-3">{b.date}</td>
                <td className="p-3">{b.views}</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
                    {b.status}
                  </span>
                </td>
                <td className="p-3 flex justify-end gap-3">
                  <Edit
                    className="text-blue-600 cursor-pointer"
                    size={18}
                    onClick={() => onEdit(b)}
                  />
                  <Trash2
                    className="text-red-600 cursor-pointer"
                    size={18}
                    onClick={() => onDelete(b.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ************************ MEDIA ************************ */

function MediaTab({ items, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((m) => (
        <div
          key={m.id}
          className="bg-white border border-gray-300 shadow rounded-lg p-3 flex flex-col"
        >
          <div className="bg-black h-40 sm:h-32 md:h-36 rounded mb-3 overflow-hidden flex items-center justify-center text-white">
            {m.video ? (
              <video src={m.video} className="w-full h-full object-cover" />
            ) : (
              <Video size={32} />
            )}
          </div>
          <p className="font-medium truncate">{m.title}</p>
          <p className="text-sm text-gray-500">{m.date}</p>
          <div className="flex justify-between mt-auto pt-3">
            <button
              onClick={() => onEdit(m)}
              className="px-4 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(m.id)}
              className="px-4 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
/* ************************ PAGES ************************ */

function PagesTab({ items, onEdit }) {
  return (
    <div className="space-y-3">
      {items.map((p) => (
        <div
          key={p.id}
          className="bg-white border border-gray-300 shadow rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
        >
          <div>
            <p className="font-medium">{p.title}</p>
            <p className="text-sm text-gray-500">{p.sub}</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto md:justify-end">
            <button
              onClick={() => onEdit(p)}
              className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              {p.title === "Footer & Header" ? "Edit Links" : "Edit Content"}
            </button>
            {p.title !== "Footer & Header" && (
              <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                Preview
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ************************ FORM MODAL ************************ */

function ContentModal({ active, item, onClose, onSave }) {
  const [title, setTitle] = useState(item?.title || "");
  const [sub, setSub] = useState(item?.sub || "");
  const [status, setStatus] = useState(item?.status || "Published");
  const [img, setImg] = useState(item?.img || "");
  const [video, setVideo] = useState(item?.video || "");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      if (active === "Media Gallery") {
        setVideo(fileUrl);
      } else {
        setImg(fileUrl);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      {" "}
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">
            {item ? "Edit" : "Add New"} {active}
          </h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Title Section */}
          <div>
            <label className="text-sm font-bold block mb-1">Title</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-green-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          {/* Media Gallery - UPLOAD VIDEO SECTION */}

          {active === "Media Gallery" && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold block">Select Video</label>
                <label
                  htmlFor="video-upload"
                  className="text-green-600 font-bold text-sm cursor-pointer hover:underline"
                >
                  {video ? "Change" : "Upload"}
                </label>
              </div>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="video-upload"
                className="relative cursor-pointer block w-full border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 overflow-hidden"
              >
                {video ? (
                  <video src={video} className="w-full h-40 object-cover" />
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-gray-400">
                    <Video size={32} />
                    <p className="text-sm mt-1">Select video file</p>
                  </div>
                )}
              </label>
            </div>
          )}

          {/* UPLOAD BANNER SECTION */}
          {active === "Banners" && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold block">Banner Photo</label>
                <label
                  htmlFor="banner-upload"
                  className="text-green-600 font-bold text-sm cursor-pointer"
                >
                  {" "}
                  {item ? "Change" : "Upload"}{" "}
                </label>
              </div>
              <input
                id="banner-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="banner-upload"
                className="relative cursor-pointer block w-full border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 overflow-hidden"
              >
                {img ? (
                  <img src={img} className="w-full h-40 object-cover" />
                ) : (
                  <div className="py-12 flex justify-center text-gray-400 text-sm">
                    Supported files jpg, png
                  </div>
                )}
              </label>
            </div>
          )}

          {/* Subtitle Section */}

          {(active === "Banners" || active === "Pages") && (
            <div>
              <label className="text-sm font-bold block mb-1">
                Subtitle / Description
              </label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-green-500"
                value={sub}
                onChange={(e) => setSub(e.target.value)}
                placeholder="Enter description"
                rows={3}
              />
            </div>
          )}

          {(active === "Banners" || active === "Blogs/News") && (
            <div>
              <label className="text-sm font-bold block mb-1">Status</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-green-500"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-gray-500 font-bold hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ title, sub, status, img, video })}
            className="px-8 py-2.5 bg-green-600 text-white font-bold rounded-lg flex items-center gap-2 hover:bg-green-700 shadow-md"
          >
            <Save size={18} /> Save
          </button>
        </div>
      </div>
    </div>
  );
}
