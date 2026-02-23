// import { useState, useEffect } from "react";
// import {
//   Search,
//   Filter,
//   Download,
//   RefreshCw,
//   Calendar,
//   Eye,
//   Copy,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
// } from "lucide-react";
// import { format } from "date-fns";
// import { toast } from "react-hot-toast";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const generateMockActivityLogs = () => {
//   const entries = [
//     {
//       timestamp: new Date("2026-02-10T05:22:17"),
//       user: "Amanda White",
//       role: "Admin",
//       action: "Create",
//       description: "Created new email notification template",
//       ip: "172.31.0.25",
//       status: "Success",
//     },
//     {
//       timestamp: new Date("2026-02-09T23:33:07"),
//       user: "David Kim",
//       role: "Super Admin",
//       action: "Login",
//       description: "Logged in from mobile device",
//       ip: "172.31.0.25",
//       status: "Success",
//     },
//     // ... add more entries matching your screenshot
//     {
//       timestamp: new Date("2026-02-09T16:50:41"),
//       user: "Michael Chen",
//       role: "Admin",
//       action: "View",
//       description: "Viewed user profile and activity history",
//       ip: "192.168.0.100",
//       status: "Success",
//     },
//     {
//       timestamp: new Date("2026-02-09T06:07:41"),
//       user: "Emily Rodriguez",
//       role: "Sub Admin",
//       action: "Login",
//       description: "Logged in from mobile device",
//       ip: "192.168.0.100",
//       status: "Success",
//     },
//     // Add ~10-15 more to simulate 150 entries
//   ];

//   // Generate more if needed
//   return entries
//     .concat(
//       Array.from({ length: 140 }, (_, i) => ({
//         ...entries[i % entries.length],
//         timestamp: new Date(
//           Date.now() - (i + 1) * 3600000 * (Math.random() * 3 + 1),
//         ),
//       })),
//     )
//     .sort((a, b) => b.timestamp - a.timestamp);
// };

// /* Badge styles matching common admin UI (like screenshot) */
// const getActionStyle = (action) => {
//   const styles = {
//     Create: "bg-green-100 text-green-800 border-green-200",
//     Update: "bg-blue-100 text-blue-800 border-blue-200",
//     View: "bg-yellow-100 text-yellow-800 border-yellow-200",
//     Login: "bg-purple-100 text-purple-800 border-purple-200",
//     Export: "bg-cyan-100 text-cyan-800 border-cyan-200",
//     Delete: "bg-red-100 text-red-800 border-red-200",
//   };
//   return styles[action] || "bg-gray-100 text-gray-800 border-gray-200";
// };

// const getStatusStyle = (status) =>
//   status === "Success"
//     ? "bg-green-100 text-green-800 border-green-200"
//     : "bg-red-100 text-red-800 border-red-200";

// const Detail = ({ label, value }) => (
//   <div className="flex justify-between gap-4">
//     <span className="text-gray-500">{label}</span>
//     <span className="font-medium text-gray-800 text-right">{value}</span>
//   </div>
// );

// export default function ActivityLog() {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [showExportMenu, setShowExportMenu] = useState(false);

//   const [roleFilter, setRoleFilter] = useState("All");
//   const [actionFilter, setActionFilter] = useState("All");
//   const [timeFilter, setTimeFilter] = useState("All");

//   const [roleOpen, setRoleOpen] = useState(false);
//   const [actionOpen, setActionOpen] = useState(false);
//   const [timeOpen, setTimeOpen] = useState(false);

//   const [viewLog, setViewLog] = useState(null);

//   const pageSize = 10;

//   const copyFullLog = (log) => {
//     const text = `
// Activity Log Details
// --------------------
// User       : ${log.user}
// Role       : ${log.role}
// Action     : ${log.action}
// Status     : ${log.status}
// IP Address : ${log.ip}
// Timestamp  : ${format(log.timestamp, "MMM dd, yyyy HH:mm:ss")}

// Description:
// ${log.description}
//   `.trim();

//     navigator.clipboard.writeText(text);
//     toast.success("Full activity log copied");
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       setLogs(generateMockActivityLogs());
//       setLoading(false);
//     }, 800);
//   }, []);

//   const exportCSV = () => {
//     const headers = [
//       "Timestamp",
//       "User",
//       "Role",
//       "Action",
//       "Description",
//       "IP",
//       "Status",
//     ];

//     const rows = filteredLogs.map((log) => [
//       format(log.timestamp, "yyyy-MM-dd HH:mm:ss"),
//       log.user,
//       log.role,
//       log.action,
//       log.description,
//       log.ip,
//       log.status,
//     ]);

//     const csv =
//       headers.join(",") +
//       "\n" +
//       rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");

//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "activity_logs.csv";
//     a.click();

//     toast.success("CSV Exported");
//   };

//   const exportExcel = () => {
//     const data = filteredLogs.map((log) => ({
//       Timestamp: format(log.timestamp, "yyyy-MM-dd HH:mm:ss"),
//       User: log.user,
//       Role: log.role,
//       Action: log.action,
//       Description: log.description,
//       IP: log.ip,
//       Status: log.status,
//     }));

//     const sheet = XLSX.utils.json_to_sheet(data);
//     const book = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(book, sheet, "Activity Logs");

//     XLSX.writeFile(book, "activity_logs.xlsx");
//     toast.success("Excel Exported");
//   };

//   const exportPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Activity Logs", 14, 15);

//     const head = [["Time", "User", "Role", "Action", "IP", "Status"]];
//     const body = filteredLogs.map((log) => [
//       format(log.timestamp, "yyyy-MM-dd HH:mm:ss"),
//       log.user,
//       log.role,
//       log.action,
//       log.ip,
//       log.status,
//     ]);

//     doc.autoTable({
//       head,
//       body,
//       startY: 20,
//       styles: { fontSize: 8 },
//     });

//     doc.save("activity_logs.pdf");
//     toast.success("PDF Exported");
//   };

//   const isWithinTimeFilter = (date) => {
//     const now = new Date();

//     if (timeFilter === "Today") {
//       return date.toDateString() === now.toDateString();
//     }

//     if (timeFilter === "Last7") {
//       const sevenDaysAgo = new Date();
//       sevenDaysAgo.setDate(now.getDate() - 7);
//       return date >= sevenDaysAgo;
//     }

//     return true; // All Time
//   };

//   const filteredLogs = logs.filter((log) => {
//     const matchesSearch =
//       log.user.toLowerCase().includes(search.toLowerCase()) ||
//       log.ip.includes(search) ||
//       log.description.toLowerCase().includes(search.toLowerCase());

//     const matchesRole = roleFilter === "All" || log.role === roleFilter;

//     const matchesAction = actionFilter === "All" || log.action === actionFilter;

//     const matchesTime = isWithinTimeFilter(log.timestamp);

//     return matchesSearch && matchesRole && matchesAction && matchesTime;
//   });

//   const totalPages = Math.ceil(filteredLogs.length / pageSize);
//   const paginatedLogs = filteredLogs.slice(
//     (page - 1) * pageSize,
//     page * pageSize,
//   );

//   return (
//     <div className="min-h-screen bg-white p-4 md:p-8 font-sans">
//       <div className="flex-1 flex flex-col">
//         <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//           <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
//             Activity Log
//           </h1>
//         </header>

//         <main className="px-4 md:px-6 py-4 space-y-5">
//           {/* Search + Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
//             <div className="relative flex-1">
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 size={18}
//               />
//               <input
//                 className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
//                 placeholder="Search by user, action, or IP address..."
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(1);
//                 }}
//               />
//             </div>

//             <div className="flex gap-3">
//               <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
//                 <RefreshCw size={16} /> Refresh
//               </button>
//               <div className="relative">
//                 <button
//                   onClick={() => setShowExportMenu((p) => !p)}
//                   className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
//                 >
//                   <Download size={16} />
//                   <span>Export</span>
//                   <ChevronDown
//                     size={16}
//                     className={`transition-transform ${
//                       showExportMenu ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {showExportMenu && (
//                   <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//                     <button
//                       onClick={() => {
//                         exportCSV();
//                         setShowExportMenu(false);
//                       }}
//                       className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//                     >
//                       Export CSV
//                     </button>

//                     <button
//                       onClick={() => {
//                         exportExcel();
//                         setShowExportMenu(false);
//                       }}
//                       className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//                     >
//                       Export Excel
//                     </button>

//                     <button
//                       onClick={() => {
//                         exportPDF();
//                         setShowExportMenu(false);
//                       }}
//                       className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
//                     >
//                       Export PDF
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Filter dropdowns */}
//           <div className="flex flex-wrap gap-3 text-sm">
//             {/* Role Filter */}
//             <div className="relative">
//               <select
//                 value={roleFilter}
//                 onChange={(e) => {
//                   setRoleFilter(e.target.value);
//                   setPage(1);
//                 }}
//                 onFocus={() => setRoleOpen(true)}
//                 onBlur={() => setRoleOpen(false)}
//                 className="appearance-none pr-9 px-3.5 py-2 border border-gray-300 rounded-md bg-white text-gray-700 w-full"
//               >
//                 <option value="All">All Roles</option>
//                 <option value="Super Admin">Super Admin</option>
//                 <option value="Admin">Admin</option>
//                 <option value="Sub Admin">Sub Admin</option>
//               </select>

//               <ChevronDown
//                 size={16}
//                 className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-transform ${
//                   roleOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </div>

//             {/* Action Filter */}
//             <div className="relative">
//               <select
//                 value={actionFilter}
//                 onChange={(e) => {
//                   setActionFilter(e.target.value);
//                   setPage(1);
//                 }}
//                 onFocus={() => setActionOpen(true)}
//                 onBlur={() => setActionOpen(false)}
//                 className="appearance-none pr-9 px-3.5 py-2 border border-gray-300 rounded-md bg-white text-gray-700 w-full"
//               >
//                 <option value="All">All Actions</option>
//                 <option value="Create">Create</option>
//                 <option value="Update">Update</option>
//                 <option value="Delete">Delete</option>
//                 <option value="Login">Login</option>
//                 <option value="Logout">Logout</option>
//                 <option value="View">View</option>
//                 <option value="Export">Export</option>
//               </select>

//               <ChevronDown
//                 size={16}
//                 className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-transform ${
//                   actionOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </div>

//             {/* Time Filter */}
//             <div className="relative">
//               <select
//                 value={timeFilter}
//                 onChange={(e) => {
//                   setTimeFilter(e.target.value);
//                   setPage(1);
//                 }}
//                 onFocus={() => setTimeOpen(true)}
//                 onBlur={() => setTimeOpen(false)}
//                 className="appearance-none pr-9 px-3.5 py-2 border border-gray-300 rounded-md bg-white text-gray-700 w-full"
//               >
//                 <option value="All">All Time</option>
//                 <option value="Today">Today</option>
//                 <option value="Last7">Last 7 Days</option>
//               </select>

//               <ChevronDown
//                 size={16}
//                 className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-transform ${
//                   timeOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </div>
//           </div>

//           {/* Table */}
//           <div className="hidden md:block bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200 text-sm">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     {[
//                       "Timestamp",
//                       "User",
//                       "Role",
//                       "Action",
//                       "Description",
//                       "IP Address",
//                       "Status",
//                       "Actions",
//                     ].map((header) => (
//                       <th
//                         key={header}
//                         className="px-5 py-3.5 text-left font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
//                       >
//                         {header}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 bg-white">
//                   {loading ? (
//                     <tr>
//                       <td
//                         colSpan={10}
//                         className="px-6 py-10 text-center text-gray-500"
//                       >
//                         Loading activity logs...
//                       </td>
//                     </tr>
//                   ) : paginatedLogs.length === 0 ? (
//                     <tr>
//                       <td
//                         colSpan={10}
//                         className="px-6 py-10 text-center text-gray-500"
//                       >
//                         No matching records found
//                       </td>
//                     </tr>
//                   ) : (
//                     paginatedLogs.map((log, idx) => (
//                       <tr
//                         key={idx}
//                         className="hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="px-5 py-4 whitespace-nowrap">
//                           <div className="font-medium text-gray-900">
//                             {format(log.timestamp, "MMM dd, yyyy")}
//                           </div>
//                           <div className="text-xs text-gray-500 mt-0.5">
//                             {format(log.timestamp, "HH:mm:ss")}
//                           </div>
//                         </td>
//                         <td className="px-5 py-4 font-medium text-gray-900">
//                           {log.user}
//                         </td>
//                         <td className="px-5 py-4">
//                           <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border border-gray-400 bg-gray-100 text-gray-800">
//                             {log.role}
//                           </span>
//                         </td>
//                         <td className="px-5 py-4">
//                           <span
//                             className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${getActionStyle(
//                               log.action,
//                             )}`}
//                           >
//                             {log.action}
//                           </span>
//                         </td>

//                         <td className="px-5 py-4 max-w-md truncate text-gray-600">
//                           {log.description}
//                         </td>
//                         <td className="px-5 py-4 font-mono text-xs text-gray-600">
//                           {log.ip}
//                         </td>
//                         <td className="px-5 py-4">
//                           <span
//                             className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(
//                               log.status,
//                             )}`}
//                           >
//                             {log.status}
//                           </span>
//                         </td>
//                         <td className="px-5 py-4">
//                           <div className="flex items-center gap-3 text-gray-500">
//                             <button
//                               onClick={() => setViewLog(log)}
//                               className="hover:text-green-600 transition-colors"
//                             >
//                               <Eye size={16} />
//                             </button>

//                             <button
//                               onClick={() => copyFullLog(log)}
//                               className="hover:text-green-600 transition-colors"
//                             >
//                               <Copy size={16} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* CARD VIEW (below md) */}
//           <div className="md:hidden space-y-4">
//             {loading ? (
//               <div className="text-center text-gray-500 py-10">
//                 Loading activity logs...
//               </div>
//             ) : paginatedLogs.length === 0 ? (
//               <div className="text-center text-gray-500 py-10">
//                 No matching records found
//               </div>
//             ) : (
//               paginatedLogs.map((log, idx) => (
//                 <div
//                   key={idx}
//                   className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white space-y-3"
//                 >
//                   {/* Header */}
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <div className="font-semibold text-gray-900">
//                         {log.user}
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {format(log.timestamp, "MMM dd, yyyy • HH:mm:ss")}
//                       </div>
//                     </div>

//                     <span
//                       className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(
//                         log.status,
//                       )}`}
//                     >
//                       {log.status}
//                     </span>
//                   </div>

//                   {/* Role + Action */}
//                   <div className="flex gap-2 flex-wrap">
//                     <span className="px-2.5 py-0.5 rounded-full text-xs border border-gray-400 bg-gray-100 text-gray-800">
//                       {log.role}
//                     </span>

//                     <span
//                       className={`px-2.5 py-0.5 rounded-full text-xs border ${getActionStyle(
//                         log.action,
//                       )}`}
//                     >
//                       {log.action}
//                     </span>
//                   </div>

//                   {/* Description */}
//                   <p className="text-sm text-gray-600">{log.description}</p>

//                   {/* Footer */}
//                   <div className="flex justify-between items-center text-xs text-gray-500">
//                     <span className="font-mono">{log.ip}</span>

//                     <div className="flex items-center gap-3">
//                       <button
//                         onClick={() => setViewLog(log)}
//                         className="hover:text-green-600"
//                       >
//                         <Eye size={16} />
//                       </button>

//                       <button
//                         onClick={() => copyFullLog(log)}
//                         className="hover:text-green-600"
//                       >
//                         <Copy size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* ================= PAGINATION ================= */}
//           <div className="flex justify-center items-center mt-6 gap-2 text-sm select-none">
//             {/* PREV */}
//             <button
//               onClick={() => page > 1 && setPage(page - 1)}
//               disabled={page === 1}
//               className={`px-3 py-1 rounded ${
//                 page === 1
//                   ? "text-gray-300 cursor-not-allowed"
//                   : "text-gray-700 hover:text-green-600"
//               }`}
//             >
//               PREV
//             </button>

//             {/* PAGE NUMBERS */}
//             {(() => {
//               const pages = [];
//               const maxShown = 5;

//               let start = Math.max(1, page - Math.floor(maxShown / 2));
//               let end = start + maxShown - 1;

//               if (end > totalPages) {
//                 end = totalPages;
//                 start = Math.max(1, end - maxShown + 1);
//               }

//               for (let i = start; i <= end; i++) {
//                 pages.push(i);
//               }

//               return pages.map((num) => (
//                 <button
//                   key={num}
//                   onClick={() => setPage(num)}
//                   className={`px-2.5 py-1 rounded border text-sm ${
//                     page === num
//                       ? "bg-green-600 text-white border-green-600"
//                       : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
//                   }`}
//                 >
//                   {num}
//                 </button>
//               ));
//             })()}

//             {/* NEXT */}
//             <button
//               onClick={() => page < totalPages && setPage(page + 1)}
//               disabled={page === totalPages}
//               className={`px-3 py-1 rounded ${
//                 page === totalPages
//                   ? "text-gray-300 cursor-not-allowed"
//                   : "text-gray-700 hover:text-green-600"
//               }`}
//             >
//               NEXT
//             </button>
//           </div>
//         </main>
//       </div>

//       {viewLog && (
//         <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
//           <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 space-y-5 relative">
//             {/* Header */}
//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 Activity Details
//               </h2>
//               <button
//                 onClick={() => setViewLog(null)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Details */}
//             <div className="space-y-3 text-sm">
//               <Detail label="User" value={viewLog.user} />
//               <Detail label="Role" value={viewLog.role} />
//               <Detail label="Action" value={viewLog.action} />
//               <Detail
//                 label="Timestamp"
//                 value={format(viewLog.timestamp, "MMM dd, yyyy • HH:mm:ss")}
//               />
//               <Detail label="IP Address" value={viewLog.ip} />
//               <Detail label="Status" value={viewLog.status} />
//               <Detail label="Description" value={viewLog.description} />
//             </div>

//             {/* Footer */}
//             <div className="flex justify-end gap-3 pt-4">
//               <button
//                 onClick={() => setViewLog(null)}
//                 className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  Download,
  RefreshCw,
  Eye,
  Copy,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { fetchAllAuditLogs } from "../../../api/auditLogService"; // ← adjust path if needed

/* ─── Badge helpers ─────────────────────────────────────────────────────────── */
const getActionStyle = (action) => {
  const styles = {
    APPROVE: "bg-green-100 text-green-800 border-green-200",
    REJECT: "bg-red-100 text-red-800 border-red-200",
    BLOCK: "bg-orange-100 text-orange-800 border-orange-200",
    UNBLOCK: "bg-blue-100 text-blue-800 border-blue-200",
    SOFT_DELETE: "bg-red-100 text-red-800 border-red-200",
    RESTORE: "bg-purple-100 text-purple-800 border-purple-200",
    CREATE: "bg-green-100 text-green-800 border-green-200",
    UPDATE: "bg-blue-100 text-blue-800 border-blue-200",
    VIEW: "bg-yellow-100 text-yellow-800 border-yellow-200",
    LOGIN: "bg-purple-100 text-purple-800 border-purple-200",
    EXPORT: "bg-cyan-100 text-cyan-800 border-cyan-200",
    DELETE: "bg-red-100 text-red-800 border-red-200",
  };
  return (
    styles[action?.toUpperCase()] || "bg-gray-100 text-gray-800 border-gray-200"
  );
};

const getStatusStyle = (status) =>
  ["Success", "APPROVED", "success", "RESTORED"].includes(status)
    ? "bg-green-100 text-green-800 border-green-200"
    : "bg-red-100 text-red-800 border-red-200";

/* ─── Detail row inside modal ───────────────────────────────────────────────── */
const Detail = ({ label, value }) => (
  <div className="flex justify-between gap-4">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-800 text-right">{value || "—"}</span>
  </div>
);

/* ─── Main Component ────────────────────────────────────────────────────────── */
export default function ActivityLog() {
  // data
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // UI
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1); // UI is 1-based; API is 0-based
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [viewLog, setViewLog] = useState(null);

  // filters
  const [roleFilter, setRoleFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");

  // dropdown open indicators
  const [roleOpen, setRoleOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);

  const pageSize = 10;

  /* debounce search input */
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  /* fetch from API */
  const loadLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchAllAuditLogs({
        page: page - 1,
        size: pageSize,
        searchUser: debouncedSearch,
        action: actionFilter !== "All" ? actionFilter : "",
        role: roleFilter !== "All" ? roleFilter.toUpperCase() : "",
      });

      if (res.success) {
        setLogs(res.data || []);
        setTotalElements(res.errors?.totalElements || 0);
        setTotalPages(res.errors?.totalPages || 1);
      } else {
        toast.error(res.message || "Failed to fetch audit logs");
      }
    } catch (err) {
      console.error("Audit log fetch error:", err);
      toast.error("Error fetching audit logs");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, actionFilter, roleFilter]);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  /* copy to clipboard */
  const copyFullLog = (log) => {
    const text = `
Activity Log Details
────────────────────────────
Timestamp   : ${format(new Date(log.createdAt), "MMM dd, yyyy HH:mm:ss")}

Admin       : ${log.adminName || "—"}
Admin Role  : ${log.adminRole || "—"}

Vendor ID   : ${log.vendorId || "—"}
Vendor      : ${log.vendorName || "—"}
Vendor Role : ${log.vendorRole || "—"}

Action      : ${log.action || "—"}
Reason      : ${log.reason || "—"}

Previous Status : ${log.previousStatus || "—"}
New Status      : ${log.newStatus || "—"}

IP Address  : ${log.ipAddress || "—"}
  `.trim();

    navigator.clipboard.writeText(text);
    toast.success("Full activity log copied");
  };

  /* exports */
  const exportCSV = () => {
    const headers = [
      "Timestamp",
      "Admin",
      "Admin Role",
      "Vendor ID",
      "Vendor",
      "Vendor Role",
      "Action",
      "Reason",
      "Prev Status",
      "New Status",
      "IP",
    ];
    const rows = logs.map((l) => [
      format(new Date(l.createdAt), "yyyy-MM-dd HH:mm:ss"),
      l.adminName,
      l.adminRole,
      l.vendorId,
      l.vendorName,
      l.vendorRole,
      l.action,
      l.reason || "",
      l.previousStatus || "",
      l.newStatus || "",
      l.ipAddress || "",
    ]);
    const csv =
      headers.join(",") +
      "\n" +
      rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "activity_logs.csv";
    a.click();
    toast.success("CSV Exported");
  };

  const exportExcel = () => {
    const data = logs.map((l) => ({
      Timestamp: format(new Date(l.createdAt), "yyyy-MM-dd HH:mm:ss"),
      Admin: l.adminName,
      "Admin Role": l.adminRole,
      "Vendor ID": l.vendorId,
      Vendor: l.vendorName,
      "Vendor Role": l.vendorRole,
      Action: l.action,
      Reason: l.reason || "",
      "Prev Status": l.previousStatus || "",
      "New Status": l.newStatus || "",
      IP: l.ipAddress || "",
    }));
    const sheet = XLSX.utils.json_to_sheet(data);
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, "Activity Logs");
    XLSX.writeFile(book, "activity_logs.xlsx");
    toast.success("Excel Exported");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Activity Logs", 14, 15);
    doc.autoTable({
      head: [
        ["Time", "Admin", "Vendor ID", "Vendor", "Action", "Reason", "IP"],
      ],
      body: logs.map((l) => [
        format(new Date(l.createdAt), "yyyy-MM-dd HH:mm:ss"),
        `${l.adminName} (${l.adminRole})`,
        l.vendorId,
        `${l.vendorName} (${l.vendorRole})`,
        l.action,
        l.reason || "—",
        l.ipAddress || "—",
      ]),
      startY: 20,
      styles: { fontSize: 8 },
    });
    doc.save("activity_logs.pdf");
    toast.success("PDF Exported");
  };

  /* ── Render ─────────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-white p-4 md:p-8 font-sans">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            Activity Log
          </h1>
        </header>

        <main className="px-4 md:px-6 py-4 space-y-5">
          {/* Search + Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                placeholder="Search by admin name, vendor name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={loadLogs}
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <RefreshCw size={16} /> Refresh
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowExportMenu((p) => !p)}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  <Download size={16} />
                  <span>Export</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${showExportMenu ? "rotate-180" : ""}`}
                  />
                </button>

                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => {
                        exportCSV();
                        setShowExportMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Export CSV
                    </button>
                    <button
                      onClick={() => {
                        exportExcel();
                        setShowExportMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Export Excel
                    </button>
                    <button
                      onClick={() => {
                        exportPDF();
                        setShowExportMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Export PDF
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 text-sm">
            {/* Role */}
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(1);
                }}
                onFocus={() => setRoleOpen(true)}
                onBlur={() => setRoleOpen(false)}
                className="appearance-none pr-9 px-3.5 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
              >
                <option value="All">All Roles</option>
                <option value="SUPER_ADMIN">Super Admin</option>{" "}
                {/* Changed value */}
                <option value="ADMIN">Admin</option> {/* Changed value */}
                <option value="SUB_ADMIN">Sub Admin</option>{" "}
                {/* Changed value */}
              </select>
              <ChevronDown
                size={16}
                className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-transform ${roleOpen ? "rotate-180" : ""}`}
              />
            </div>

            {/* Action */}
            <div className="relative">
              <select
                value={actionFilter}
                onChange={(e) => {
                  setActionFilter(e.target.value);
                  setPage(1);
                }}
                onFocus={() => setActionOpen(true)}
                onBlur={() => setActionOpen(false)}
                className="appearance-none pr-9 px-3.5 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
              >
                <option value="All">All Actions</option>
                <option value="APPROVE">Approve</option>
                <option value="REJECT">Reject</option>
                <option value="BLOCK">Block</option>
                <option value="UNBLOCK">Unblock</option>
                <option value="SOFT_DELETE">Delete</option>{" "}
                {/* Label "Delete" for user-friendliness */}
                <option value="RESTORE">Restore</option>
              </select>
              <ChevronDown
                size={16}
                className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-transform ${actionOpen ? "rotate-180" : ""}`}
              />
            </div>

            {!loading && (
              <div className="flex items-center px-3 py-2 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-md">
                {totalElements} total record{totalElements !== 1 ? "s" : ""}
              </div>
            )}
          </div>

          {/* Table — Desktop */}
          <div className="hidden md:block bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden max-w-6xl mx-auto">
            <div>
              <table className="w-full table-fixed divide-y divide-gray-200 text-sm">
                {" "}
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Timestamp",
                      "Admin",
                      "Vendor ID",
                      "Vendor",
                      "Action",
                      "Reason",
                      "Prev Status",
                      "New Status",
                      "IP Address",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3.5 text-left font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={10}
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        Loading activity logs...
                      </td>
                    </tr>
                  ) : logs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={10}
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        No matching records found
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr
                        key={log.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {/* Timestamp */}
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-800">
                            {format(new Date(log.createdAt), "MMM dd, yyyy")}
                          </div>
                          <div className="text-[11px] text-gray-500">
                            {format(new Date(log.createdAt), "HH:mm:ss")}
                          </div>
                        </td>

                        {/* Admin */}
                        <td className="px-3 py-3">
                          <div className="font-medium text-gray-900">
                            {log.adminName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {log.adminRole}
                          </div>
                        </td>

                        {/* Vendor ID */}
                        <td className="px-5 py-4 text-gray-700 font-medium text-center font-mono whitespace-nowrap">
                          {log.vendorId || "—"}
                        </td>

                        {/* Vendor */}
                        <td className="px-3 py-3">
                          <div className="font-medium text-gray-900">
                            {log.vendorName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {log.vendorRole}
                          </div>
                        </td>

                        {/* Action */}
                        <td className="px-3 py-3">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${getActionStyle(log.action)}`}
                          >
                            {log.action}
                          </span>
                        </td>

                        {/* Reason */}
                        <td className="px-5 py-4 max-w-[160px] truncate text-gray-600 text-xs">
                          {log.reason || "—"}
                        </td>

                        {/* Prev Status */}
                        <td className="px-3 py-3">
                          {log.previousStatus ? (
                            <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border bg-gray-100 text-gray-700 border-gray-300">
                              {log.previousStatus}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>

                        {/* New Status */}
                        <td className="px-3 py-3">
                          {log.newStatus ? (
                            <span
                              className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(log.newStatus)}`}
                            >
                              {log.newStatus}
                            </span>
                          ) : (
                            "—"
                          )}
                        </td>

                        {/* IP */}
                        <td className="px-5 py-4 font-mono text-xs text-gray-600">
                          {log.ipAddress || "—"}
                        </td>

                        {/* Actions */}
                        <td className="px-3 py-3 text-center">
                          <div className="flex items-center justify-center gap-3 text-gray-500">
                            <button
                              onClick={() => setViewLog(log)}
                              className="hover:text-green-600 transition-colors"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => copyFullLog(log)}
                              className="hover:text-green-600 transition-colors"
                            >
                              <Copy size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card View — Mobile */}
          <div className="md:hidden space-y-4">
            {loading ? (
              <div className="text-center text-gray-500 py-10">
                Loading activity logs...
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                No matching records found
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {log.adminName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {format(
                          new Date(log.createdAt),
                          "MMM dd, yyyy • HH:mm:ss",
                        )}
                      </div>
                    </div>
                    {log.newStatus && (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(log.newStatus)}`}
                      >
                        {log.newStatus}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-xs border border-gray-400 bg-gray-100 text-gray-800">
                      {log.adminRole}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs border ${getActionStyle(log.action)}`}
                    >
                      {log.action}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    Vendor ID:{" "}
                    <span className="font-medium text-gray-800">
                      {log.vendorId || "—"}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600">
                    Vendor:{" "}
                    <span className="font-medium">{log.vendorName}</span>
                  </p>

                  {log.reason && (
                    <p className="text-xs text-gray-500">
                      Reason: {log.reason}
                    </p>
                  )}

                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="font-mono">{log.ipAddress || "—"}</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setViewLog(log)}
                        className="hover:text-green-600"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => copyFullLog(log)}
                        className="hover:text-green-600"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 gap-2 text-sm select-none">
            <button
              onClick={() => page > 1 && setPage(page - 1)}
              disabled={page === 1}
              className={`px-3 py-1 rounded ${page === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-green-600"}`}
            >
              PREV
            </button>

            {(() => {
              const maxShown = 5;
              let start = Math.max(1, page - Math.floor(maxShown / 2));
              let end = start + maxShown - 1;
              if (end > totalPages) {
                end = totalPages;
                start = Math.max(1, end - maxShown + 1);
              }
              const pages = [];
              for (let i = start; i <= end; i++) pages.push(i);
              return pages.map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`px-2.5 py-1 rounded border text-sm ${page === num ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                >
                  {num}
                </button>
              ));
            })()}

            <button
              onClick={() => page < totalPages && setPage(page + 1)}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded ${page === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-green-600"}`}
            >
              NEXT
            </button>
          </div>
        </main>
      </div>

      {/* View Modal */}
      {viewLog && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 space-y-5 relative">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Activity Details
              </h2>
              <button
                onClick={() => setViewLog(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <Detail
                label="Admin"
                value={`${viewLog.adminName} (${viewLog.adminRole})`}
              />
              <Detail label="Vendor ID" value={viewLog.vendorId} />

              <Detail
                label="Vendor"
                value={`${viewLog.vendorName} (${viewLog.vendorRole})`}
              />
              <Detail label="Action" value={viewLog.action} />
              <Detail label="Reason" value={viewLog.reason} />
              <Detail label="Prev Status" value={viewLog.previousStatus} />
              <Detail label="New Status" value={viewLog.newStatus} />
              <Detail label="IP Address" value={viewLog.ipAddress} />
              <Detail
                label="Timestamp"
                value={format(
                  new Date(viewLog.createdAt),
                  "MMM dd, yyyy • HH:mm:ss",
                )}
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setViewLog(null)}
                className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
