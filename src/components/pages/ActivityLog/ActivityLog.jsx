import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  Eye,
  Copy,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";


const generateMockActivityLogs = () => {
  const entries = [
    {
      timestamp: new Date("2026-02-10T05:22:17"),
      user: "Amanda White",
      role: "Admin",
      action: "Create",
      description: "Created new email notification template",
      ip: "172.31.0.25",
      status: "Success",
    },
    {
      timestamp: new Date("2026-02-09T23:33:07"),
      user: "David Kim",
      role: "Admin",
      action: "Login",
      description: "Logged in from mobile device",
      ip: "172.31.0.25",
      status: "Success",
    },
    // ... add more entries matching your screenshot
    {
      timestamp: new Date("2026-02-09T16:50:41"),
      user: "Michael Chen",
      role: "Admin",
      action: "View",
      description: "Viewed user profile and activity history",
      ip: "192.168.0.100",
      status: "Success",
    },
    {
      timestamp: new Date("2026-02-09T06:07:41"),
      user: "Emily Rodriguez",
      role: "Sub Admin",
      action: "Login",
      description: "Logged in from mobile device",
      ip: "192.168.0.100",
      status: "Success",
    },
    // Add ~10-15 more to simulate 150 entries
  ];

  // Generate more if needed
  return entries
    .concat(
      Array.from({ length: 140 }, (_, i) => ({
        ...entries[i % entries.length],
        timestamp: new Date(
          Date.now() - (i + 1) * 3600000 * (Math.random() * 3 + 1),
        ),
      })),
    )
    .sort((a, b) => b.timestamp - a.timestamp);
};

/* Badge styles matching common admin UI (like screenshot) */
const getActionStyle = (action) => {
  const styles = {
    Create: "bg-green-100 text-green-800 border-green-200",
    Update: "bg-blue-100 text-blue-800 border-blue-200",
    View: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Login: "bg-purple-100 text-purple-800 border-purple-200",
    Export: "bg-cyan-100 text-cyan-800 border-cyan-200",
    Delete: "bg-red-100 text-red-800 border-red-200",
  };
  return styles[action] || "bg-gray-100 text-gray-800 border-gray-200";
};

const getStatusStyle = (status) =>
  status === "Success"
    ? "bg-green-100 text-green-800 border-green-200"
    : "bg-red-100 text-red-800 border-red-200";

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const [roleFilter, setRoleFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All");

  const pageSize = 10;

  useEffect(() => {
    setTimeout(() => {
      setLogs(generateMockActivityLogs());
      setLoading(false);
    }, 800);
  }, []);

  const exportCSV = () => {
    const headers = [
      "Timestamp",
      "User",
      "Role",
      "Action",
      "Description",
      "IP",
      "Status",
    ];

    const rows = filteredLogs.map((log) => [
      format(log.timestamp, "yyyy-MM-dd HH:mm:ss"),
      log.user,
      log.role,
      log.action,
      log.description,
      log.ip,
      log.status,
    ]);

    const csv =
      headers.join(",") +
      "\n" +
      rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "activity_logs.csv";
    a.click();

    toast.success("CSV Exported");
  };

  const exportExcel = () => {
    const data = filteredLogs.map((log) => ({
      Timestamp: format(log.timestamp, "yyyy-MM-dd HH:mm:ss"),
      User: log.user,
      Role: log.role,
      Action: log.action,
      Description: log.description,
      IP: log.ip,
      Status: log.status,
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

    const head = [["Time", "User", "Role", "Action", "IP", "Status"]];
    const body = filteredLogs.map((log) => [
      format(log.timestamp, "yyyy-MM-dd HH:mm:ss"),
      log.user,
      log.role,
      log.action,
      log.ip,
      log.status,
    ]);

    doc.autoTable({
      head,
      body,
      startY: 20,
      styles: { fontSize: 8 },
    });

    doc.save("activity_logs.pdf");
    toast.success("PDF Exported");
  };

  const isWithinTimeFilter = (date) => {
    const now = new Date();

    if (timeFilter === "Today") {
      return date.toDateString() === now.toDateString();
    }

    if (timeFilter === "Last7") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);
      return date >= sevenDaysAgo;
    }

    return true; // All Time
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.ip.includes(search) ||
      log.description.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "All" || log.role === roleFilter;

    const matchesAction = actionFilter === "All" || log.action === actionFilter;

    const matchesTime = isWithinTimeFilter(log.timestamp);

    return matchesSearch && matchesRole && matchesAction && matchesTime;
  });

  const totalPages = Math.ceil(filteredLogs.length / pageSize);
  const paginatedLogs = filteredLogs.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 font-sans">
      <div className="flex-1 flex flex-col">
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
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by user, action, or IP address..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
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
                    className={`transition-transform ${
                      showExportMenu ? "rotate-180" : ""
                    }`}
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

          {/* Filter dropdowns */}
          <div className="flex flex-wrap gap-3 text-sm">
            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1);
              }}
              className="px-3.5 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
            >
              <option value="All">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Sub Admin">Sub Admin</option>
            </select>

            {/* Action Filter */}
            <select
              value={actionFilter}
              onChange={(e) => {
                setActionFilter(e.target.value);
                setPage(1);
              }}
              className="px-3.5 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
            >
              <option value="All">All Actions</option>
              <option value="Create">Create</option>
              <option value="Update">Update</option>
              <option value="Delete">Delete</option>
              <option value="Login">Login</option>
              <option value="Logout">Logout</option>
              <option value="View">View</option>
              <option value="Export">Export</option>
            </select>

            {/* Time Filter */}
            <select
              value={timeFilter}
              onChange={(e) => {
                setTimeFilter(e.target.value);
                setPage(1);
              }}
              className="px-3.5 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
            >
              <option value="All">All Time</option>
              <option value="Today">Today</option>
              <option value="Last7">Last 7 Days</option>
            </select>
          </div>

          {/* Table */}
          <div className="hidden md:block bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Timestamp",
                      "User",
                      "Role",
                      "Action",
                      "Description",
                      "IP Address",
                      "Status",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-5 py-3.5 text-left font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                      >
                        {header}
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
                  ) : paginatedLogs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={10}
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        No matching records found
                      </td>
                    </tr>
                  ) : (
                    paginatedLogs.map((log, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {format(log.timestamp, "MMM dd, yyyy")}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {format(log.timestamp, "HH:mm:ss")}
                          </div>
                        </td>
                        <td className="px-5 py-4 font-medium text-gray-900">
                          {log.user}
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border bg-gray-100 text-gray-800">
                            {log.role}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${getActionStyle(
                              log.action,
                            )}`}
                          >
                            {log.action}
                          </span>
                        </td>

                        <td className="px-5 py-4 max-w-md truncate text-gray-600">
                          {log.description}
                        </td>
                        <td className="px-5 py-4 font-mono text-xs text-gray-600">
                          {log.ip}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(
                              log.status,
                            )}`}
                          >
                            {log.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3 text-gray-500">
                            <button className="hover:text-blue-600 transition-colors">
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(log.description);
                                toast.success("Description copied");
                              }}
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

          {/* CARD VIEW (below md) */}
          <div className="md:hidden space-y-4">
            {loading ? (
              <div className="text-center text-gray-500 py-10">
                Loading activity logs...
              </div>
            ) : paginatedLogs.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                No matching records found
              </div>
            ) : (
              paginatedLogs.map((log, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white space-y-3"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {log.user}
                      </div>
                      <div className="text-xs text-gray-500">
                        {format(log.timestamp, "MMM dd, yyyy • HH:mm:ss")}
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(
                        log.status,
                      )}`}
                    >
                      {log.status}
                    </span>
                  </div>

                  {/* Role + Action */}
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-xs border bg-gray-100 text-gray-800">
                      {log.role}
                    </span>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs border ${getActionStyle(
                        log.action,
                      )}`}
                    >
                      {log.action}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600">{log.description}</p>

                  {/* Footer */}
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="font-mono">{log.ip}</span>

                    <div className="flex items-center gap-3">
                      <button className="hover:text-blue-600">
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(log.description);
                          toast.success("Description copied");
                        }}
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

          {/* Pagination + Info */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <div>
              Showing {(page - 1) * pageSize + 1} to{" "}
              {Math.min(page * pageSize, filteredLogs.length)} of{" "}
              {filteredLogs.length} entries
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-2 border border-gray-300 rounded-md disabled:opacity-40 hover:bg-gray-50"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 border border-gray-300 rounded-md disabled:opacity-40 hover:bg-gray-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
