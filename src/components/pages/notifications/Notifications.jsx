import React, { useState } from "react";
import { Eye, ArrowLeft, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [schedule, setSchedule] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sendTo, setSendTo] = useState("All Users");
  const [scheduleDate, setScheduleDate] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [templates, setTemplates] = useState([
    {
      title: "Market Rate Update",
      desc: "New mandi rates for {commodity} available",
    },
    {
      title: "Product Approval",
      desc: "Your product {product_name} has been approved",
    },
    { title: "Order Update", desc: "Your order #{order_id} status: {status}" },
    {
      title: "Welcome Message",
      desc: "Welcome to AgroFresh! Start exploring now.",
    },
  ]);

  const [history, setHistory] = useState([
    {
      title: "New Product Launch",
      message: "Check out our latest organic products",
      sentTo: "All Users",
      recipients: "15,234",
      date: "2025-12-02",
      status: "Sent",
    },
  ]);

  const resetForm = () => {
    setTitle("");
    setMessage("");
    setSendTo("All Users");
    setSchedule(false);
    setScheduleDate("");
    setSelectedImage(null);
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
  };

  const handleSend = () => {
    if (!title || !message) {
      toast.error("Title and Message are required");
      return;
    }

    const imageUrl = selectedImage
      ? typeof selectedImage === "string"
        ? selectedImage
        : URL.createObjectURL(selectedImage)
      : null;

    const newNotification = {
      title,
      message,
      sentTo: sendTo,
      recipients: Math.floor(Math.random() * 10000).toLocaleString(),
      date: schedule ? scheduleDate : new Date().toISOString().split("T")[0],
      status: schedule ? "Scheduled" : "Sent",
      image: imageUrl,
    };

    setHistory((prevHistory) => [newNotification, ...prevHistory]);

    toast.success(
      schedule ? "Notification scheduled!" : "Notification sent successfully!",
    );

    resetForm();
  };

  const handleSaveTemplate = () => {
    if (!title || !message) {
      toast.error("Please provide a title and message", {
        id: "validation-error",
      });
      return;
    }

    setTemplates((prevTemplates) => {
      const existingIndex = prevTemplates.findIndex((t) => t.title === title);

      if (existingIndex !== -1) {
        const updatedTemplates = [...prevTemplates];
        updatedTemplates[existingIndex] = {
          ...updatedTemplates[existingIndex],
          desc: message,
          image: selectedImage
            ? typeof selectedImage === "string"
              ? selectedImage
              : URL.createObjectURL(selectedImage)
            : null,
        };

        toast.success("Template updated successfully!", {
          id: "template-toast",
        });
        return updatedTemplates;
      } else {
        toast.success("New template saved!", { id: "template-toast" });
        return [
          ...prevTemplates,
          {
            title,
            desc: message,
            image: selectedImage
              ? typeof selectedImage === "string"
                ? selectedImage
                : URL.createObjectURL(selectedImage)
              : null,
          },
        ];
      }
    });

    resetForm();
  };

  const handleUseTemplate = (template) => {
    setTitle(template.title);
    setMessage(template.desc);

    if (template.image) {
      setSelectedImage(template.image);
    } else {
      setSelectedImage(null);
      const fileInput = document.getElementById("fileInput");
      if (fileInput) fileInput.value = "";
    }
    toast.success("Template applied");
  };

  const handleView = (row) => {
    setSelectedNotification(row);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 space-y-4">
      <Toaster position="top-right" reverseOrder={false} />

      {location.state?.fromDashboard && (
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      )}

      <h2 className="text-xl font-semibold">Notifications Management</h2>
      <p className="text-md text-gray-600">
        Send push notifications via Firebase (FCM)
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Sent", value: "4,678" },
          { label: "This Month", value: "2,345" },
          { label: "Scheduled", value: "8" },
          { label: "Templates", value: "4" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white border border-gray-300 shadow rounded-lg px-4 py-3"
          >
            <p className="text-gray-500 text-xs">{stat.label}</p>
            <p className="font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
      {/* Send Notification */}
      <div className="bg-white shadow rounded-lg p-4 md:p-6 space-y-4">
        <h3 className="font-semibold text-xl">Send New Notification</h3>

        <div>
          <p className="text-sm mb-1 text-black">Title *</p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm"
          />
        </div>

        <div>
          <p className="text-sm mb-1 text-black">Message *</p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm h-24"
          />
        </div>

        <div>
          <p className="text-sm mb-1 text-black">Send To *</p>
          <select
            value={sendTo}
            onChange={(e) => setSendTo(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm"
          >
            <option>All Users</option>
            <option>Farmers</option>
            <option>Buyers</option>
          </select>
        </div>

        <div>
          <p className="text-sm mb-1 text-black">Image (Optional)</p>

          {selectedImage ? (
            <div className="space-y-2">
              <div className="relative w-32 h-32 border border-gray-300 rounded-md overflow-hidden bg-gray-100">
                <img
                  src={
                    typeof selectedImage === "string"
                      ? selectedImage
                      : URL.createObjectURL(selectedImage)
                  }
                  className="w-full h-full object-cover"
                  alt="Preview"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    const fileInput = document.getElementById("fileInput");
                    if (fileInput) fileInput.value = "";
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-md hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>

              <button
                onClick={() => document.getElementById("fileInput").click()}
                className="text-sm text-blue-600 font-medium hover:underline block"
              >
                Change Image
              </button>
            </div>
          ) : null}

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                setSelectedImage(e.target.files[0]);
              }
            }}
            className={`${selectedImage ? "hidden" : "block"} w-full border border-gray-300 rounded-md px-2 py-2 text-sm`}
          />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="scheduleToggle"
            checked={schedule}
            onChange={(e) => setSchedule(e.target.checked)}
            className="w-4 h-4 accent-green-600"
          />
          <label
            htmlFor="scheduleToggle"
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            Schedule for later
          </label>
        </div>
        {schedule && (
          <div className="mt-2">
            <p className="text-xs text-gray-500 mb-1">Select Date & Time</p>
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-1 focus:ring-green-500 outline-none"
            />
          </div>
        )}
        <div className="flex justify-between gap-3">
          <button
            onClick={handleSaveTemplate}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            {templates.some((t) => t.title === title)
              ? "Update Template"
              : "Save as Template"}
          </button>

          <button
            onClick={handleSend}
            className="bg-green-500 text-white px-5 py-2 rounded-md text-sm font-medium"
          >
            {schedule ? "Schedule Notification" : "Send Now"}
          </button>
        </div>
      </div>

      {/* Templates */}
      <div className="bg-white shadow rounded-md p-4 md:p-6 space-y-4">
        <h3 className="text-xl font-semibold border-b border-gray-300 pb-4">
          Saved Templates
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-3">
          {templates.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-gray-300 rounded-lg p-3 hover:shadow flex justify-between items-start"
            >
              <div className="flex-1 flex gap-3">
                {t.image && (
                  <img
                    src={t.image}
                    alt="template"
                    className="w-12 h-12 rounded object-cover border"
                  />
                )}
                <div>
                  <p className="text-md font-semibold">{t.title}</p>
                  <p className="text-sm text-gray-500">{t.desc}</p>
                </div>
              </div>
              <button
                onClick={() => handleUseTemplate(t)}
                className="text-sm text-green-600 font-medium hover:underline ml-4 pt-1"
              >
                Use
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Notification History</h3>

        {/* History Table */}
        <div className="hidden md:block overflow-hidden rounded-lg">
          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-gray-100 text-md text-gray-600">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Sent To</th>
                <th className="p-3 text-left">Recipients</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center w-20">Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row, i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="p-2">
                    {row.image ? (
                      <img
                        src={row.image}
                        alt="thumb"
                        className="w-10 h-10 object-cover rounded border border-gray-300"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">No Image</span>
                    )}
                  </td>
                  <td className="p-2">{row.title}</td>
                  <td className="p-2">{row.message}</td>
                  <td className="p-2">{row.sentTo}</td>
                  <td className="p-2">{row.recipients}</td>
                  <td className="p-2">{row.date}</td>
                  <td className="p-2 text-green-600 font-medium">
                    {row.status}
                  </td>
                  <td className="p-2 text-center">
                    <div className="flex justify-center items-center w-full">
                      <Eye
                        size={18}
                        className="cursor-pointer text-gray-600 hover:text-green-600 transition-colors"
                        onClick={() => handleView(row)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile stacked cards */}
        <div className="md:hidden space-y-3">
          {history.map((row, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-3 text-xs"
            >
              <p className="font-semibold">{row.title}</p>
              <p>{row.message}</p>
              <p>
                <span className="font-medium">Sent to:</span> {row.sentTo}
              </p>
              <p>
                <span className="font-medium">Recipients:</span>
                {row.recipients}
              </p>
              <p>
                <span className="font-medium">Date:</span> {row.date}
              </p>
              <p className="text-green-600 font-semibold">{row.status}</p>
              <div className="flex justify-end mt-2">
                <Eye
                  size={18}
                  className="cursor-pointer text-gray-600"
                  onClick={() => handleView(row)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Modal */}
      {isModalOpen && selectedNotification && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[white] text-black rounded-lg shadow-xl w-full max-w-md overflow-hidden relative">
            {/* Header with Cross Icon */}
            <div className="p-4 border-b border-gray-400 flex justify-between items-center">
              <h3 className="font-semibold text-lg">Notification Details</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="hover:text-green-600 transition-colors p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-3 text-sm md:text-base">
              {selectedNotification.image && (
                <div className="mt-4">
                  <p className="font-bold text-gray-800 mb-2">
                    Attached Image:
                  </p>
                  <img
                    src={selectedNotification.image}
                    alt="Notification"
                    className="w-full h-40 object-cover rounded-md border border-gray-300"
                  />
                </div>
              )}
              <p>
                <span className="font-bold text-gray-800">Title:</span>{" "}
                <span className="font-medium">
                  {selectedNotification.title}
                </span>
              </p>
              <p>
                <span className="font-bold text-gray-800">Message:</span>{" "}
                <span className="font-medium">
                  {selectedNotification.message}
                </span>
              </p>
              <p>
                <span className="font-bold text-gray-800">Sent To:</span>{" "}
                <span className="font-medium">
                  {selectedNotification.sentTo}
                </span>
              </p>
              <p>
                <span className="font-bold text-gray-800">Recipients:</span>{" "}
                <span className="font-medium">
                  {selectedNotification.recipients}
                </span>
              </p>
              <p>
                <span className="font-bold text-gray-800">Date:</span>{" "}
                <span className="font-medium">{selectedNotification.date}</span>
              </p>
              <p>
                <span className="font-bold text-gray-800">Status:</span>{" "}
                <span
                  className={`font-semibold ${selectedNotification.status === "Sent" ? "text-green-600" : "text-orange-500"}`}
                >
                  &nbsp;{selectedNotification.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
