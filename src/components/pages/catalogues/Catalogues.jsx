import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Search,
  Filter,
  Upload,
  Eye,
  RefreshCw,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Building2,
  X,
} from "lucide-react";
import { mockCatalogues } from "../catalogues/mockData";

export default function Catalogues() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [factoryFilter, setFactoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [catalogueToDelete, setCatalogueToDelete] = useState(null);

  const [processingIds, setProcessingIds] = useState(new Set());

  const openDeleteModal = (catalogue) => {
    setCatalogueToDelete(catalogue);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCatalogueToDelete(null);
  };

  const confirmDelete = () => {
    if (catalogueToDelete) {
      console.log(
        `Deleting catalogue: ${catalogueToDelete.id} - ${catalogueToDelete.catalogueName}`,
      );

      toast.success(`"${catalogueToDelete.catalogueName}" deleted`, {
        icon: <Trash2 size={20} color="#fff" />,
        duration: 3000,
      });
      // Real implementation would be:
      // setMockCatalogues(prev => prev.filter(c => c.id !== catalogueToDelete.id));
      // or call your API: await deleteCatalogue(catalogueToDelete.id);
    }
    closeDeleteModal();
  };

  const handleReprocess = (catalogue) => {
    const id = catalogue.id;

    // Prevent double-click
    if (processingIds.has(id)) return;

    setProcessingIds((prev) => new Set([...prev, id]));

    const toastId = toast.loading("Reprocessing catalogue...");

    // Fake processing (1.5–4.5 seconds)
    const delay = 1500 + Math.random() * 3000;

    setTimeout(() => {
      const success = Math.random() > 0.25; // 75% success rate for demo

      // In real app → call API and then update local state or refetch
      // Here we mutate mock data directly (only for prototype!)
      const updated = mockCatalogues.map((cat) =>
        cat.id === id
          ? {
              ...cat,
              status: success ? "Processed" : "Failed",
              accuracy: success ? Math.floor(82 + Math.random() * 16) : 0,
              processingTime: success
                ? `${Math.floor(Math.random() * 20 + 5)}s`
                : "-",
              uploadDate: new Date().toISOString(), // pretend it was re-uploaded
            }
          : cat,
      );

      // ⚠️ This only works because you're using a mutable mock array
      // In real app you would NEVER mutate data like this
      mockCatalogues.splice(0, mockCatalogues.length, ...updated);

      if (success) {
        toast.success("Reprocessing finished successfully", { id: toastId });
      } else {
        toast.error("Reprocessing failed", { id: toastId });
      }
    }, delay);

    setTimeout(() => {
      setProcessingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, delay + 50); // tiny buffer after processing
  };

  const uniqueFactories = useMemo(() => {
    const factories = new Set(mockCatalogues.map((c) => c.factoryName));
    return ["all", ...Array.from(factories).sort()];
  }, []);

  // ── Filtering logic ────────────────────────────────────────────────
  const filteredCatalogues = useMemo(() => {
    return mockCatalogues.filter((cat) => {
      // Search
      const matchesSearch =
        cat.factoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.catalogueName.toLowerCase().includes(searchQuery.toLowerCase());

      // Status
      const matchesStatus =
        statusFilter === "all" || cat.status === statusFilter;

      // Factory
      const matchesFactory =
        factoryFilter === "all" || cat.factoryName === factoryFilter;

      // Date
      let matchesDate = true;
      if (dateFilter !== "all") {
        const uploadDate = new Date(cat.uploadDate);
        const now = new Date();

        if (dateFilter === "today") {
          matchesDate = uploadDate.toDateString() === now.toDateString();
        } else if (dateFilter === "week") {
          const oneWeekAgo = new Date(now);
          oneWeekAgo.setDate(now.getDate() - 7);
          matchesDate = uploadDate >= oneWeekAgo;
        } else if (dateFilter === "month") {
          const oneMonthAgo = new Date(now);
          oneMonthAgo.setMonth(now.getMonth() - 1);
          matchesDate = uploadDate >= oneMonthAgo;
        }
      }

      return matchesSearch && matchesStatus && matchesFactory && matchesDate;
    });
  }, [searchQuery, statusFilter, factoryFilter, dateFilter]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processed":
        return <CheckCircle2 className="w-3 h-3" />;
      case "Pending":
        return <Clock className="w-3 h-3" />;
      case "Failed":
        return <AlertCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Processed":
        return "bg-green-50 text-green-700 border-green-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Failed":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="max-w-[98%] mx-auto px-2 sm:px-4 lg:px-2 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-2xl font-bold text-slate-900">
            Catalogues
          </h1>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">
            Manage and review all uploaded product catalogues
          </p>
        </div>

        <Link
          to="/upload"
          className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition shadow-lg"
        >
          <Upload className="w-5 h-5" />
          Upload Catalogue
        </Link>
      </div>
      {/* Search + Filters */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-300">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by factory or catalogue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            {/* Factory Filter */}
            <div className="relative flex-1 min-w-[150px] sm:min-w-[180px]">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={factoryFilter}
                onChange={(e) => setFactoryFilter(e.target.value)}
                className="w-full pl-9 pr-6 py-3 border border-gray-300 rounded-lg appearance-none text-sm sm:text-base"
              >
                {uniqueFactories.map((factory) => (
                  <option key={factory} value={factory}>
                    {factory === "all" ? "All Factories" : factory}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative flex-1 min-w-[150px] sm:min-w-[180px]">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-9 pr-6 py-3 border border-gray-300 rounded-lg text-sm sm:text-base"
              >
                <option value="all">All Status</option>
                <option value="Processed">Processed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="relative flex-1 min-w-[150px] sm:min-w-[180px]">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full pl-9 pr-6 py-3 border border-gray-300 rounded-lg text-sm sm:text-base"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 md:gap-6">
        {filteredCatalogues.map((catalogue) => (
          <div
            key={catalogue.id}
            className="flex flex-col bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            {/* Card Header - Uses flex-wrap for very small screens */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-green-50 rounded-t-xl flex flex-wrap justify-between items-start gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {/* Factory Initials Avatar */}
                <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white bg-gradient-to-r from-green-400 to-blue-500 shadow-sm">
                  {catalogue.factoryName
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word[0].toUpperCase())
                    .join("")}
                </div>

                {/* Catalogue info - truncate long names to prevent layout breaking */}
                <div className="truncate">
                  <h3 className="font-semibold text-slate-900 text-base md:text-lg truncate">
                    {catalogue.catalogueName}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 truncate">
                    {catalogue.factoryName}
                  </p>
                </div>
              </div>

              {/* Status badge - self-end keeps it aligned if text wraps */}
              <span
                className={`shrink-0 flex items-center gap-1 px-2 py-1 text-[10px] md:text-xs font-medium rounded-full border ${getStatusClass(
                  catalogue.status,
                )}`}
              >
                {getStatusIcon(catalogue.status)}
                {catalogue.status}
              </span>
            </div>

            {/* Card Content - grow ensures actions stay at bottom */}
            <div className="p-5 space-y-4 flex-grow">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Products</span>
                <span className="font-semibold text-slate-900">
                  {catalogue.totalProducts}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Accuracy</span>
                <span className="font-semibold text-slate-900">
                  {catalogue.status === "Processed"
                    ? `${catalogue.accuracy}%`
                    : "-"}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>
                    {new Date(catalogue.uploadDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>

                {catalogue.status === "Processed" && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Processed in {catalogue.processingTime}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions - Flex-wrap for small containers */}
            <div className="p-4 pt-0 flex flex-wrap sm:flex-nowrap gap-2">
              <Link
                to={`/catalogues/${catalogue.id}`}
                className="flex-1 min-w-[80px] bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>View</span>
              </Link>

              <div className="flex gap-2 w-full sm:w-auto">
                {/* Conditional Button: Hide if Pending, show Reprocess/Retry otherwise */}
                {catalogue.status !== "Pending" && (
                  <button
                    onClick={() => handleReprocess(catalogue)}
                    disabled={processingIds.has(catalogue.id)}
                    className={`
                    flex-1 sm:flex-none border px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm
                    ${
                      processingIds.has(catalogue.id)
                        ? "bg-gray-100 text-gray-400 cursor-wait border-gray-300"
                        : "border-gray-300 hover:bg-gray-50 text-gray-700"
                    }
                  `}
                  >
                    <RefreshCw
                      className={`w-4 h-4 ${processingIds.has(catalogue.id) ? "animate-spin" : ""}`}
                    />
                    <span>
                      {processingIds.has(catalogue.id)
                        ? "Processing..."
                        : catalogue.status === "Processed"
                          ? "Reprocess"
                          : "Retry"}
                    </span>
                  </button>
                )}

                <button
                  onClick={() => openDeleteModal(catalogue)}
                  className="flex-1 sm:flex-none border border-red-200 hover:bg-red-50 text-red-600 px-3 py-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* ── Delete Confirmation Modal ──────────────────────────────────────── */}
      {showDeleteModal && catalogueToDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-5 border-b border-gray-300 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-red-600" />
                Delete Catalogue
              </h3>
              <button
                onClick={closeDeleteModal}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <p className="text-slate-700">
                Are you sure you want to delete
                <span className="font-medium text-slate-900">
                  {" "}
                  "{catalogueToDelete.catalogueName}"
                </span>
                ?
              </p>
              <p className="text-sm text-slate-500">
                This action cannot be undone. All associated product data will
                be permanently removed.
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 flex justify-end gap-3 border-t border-gray-300">
              <button
                onClick={closeDeleteModal}
                className="px-5 py-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 font-medium transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
