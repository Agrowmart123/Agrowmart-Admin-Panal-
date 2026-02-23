// src/components/CatalogueDetail.jsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Edit2,
  Eye,
  Package,
  RefreshCw,
  TrendingUp,
  Trash2,
} from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


import { mockCatalogues, mockProducts } from "../catalogues/mockData"; // adjust path if needed

export default function CatalogueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [catalogues, setCatalogues] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const catalogue = catalogues.find((c) => c.id === id);
  const products = productsData.filter((p) => p.catalogueId === id);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setCatalogues(mockCatalogues);
      setProductsData(mockProducts);
      setLoading(false);
    }, 600);
  }, []);

  useEffect(() => {
    if (catalogue?.status === "Failed") {
      navigate(`/catalogues/${id}/error`, { replace: true });
    }
  }, [catalogue, id, navigate]);

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-600">
        Loading catalogue...
      </div>
    );
  }

  if (!catalogue) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-2xl font-semibold text-slate-900">
          Catalogue not found
        </h2>
        <button
          onClick={() => navigate("/catalogues")}
          className="text-green-600 hover:underline"
        >
          Back to Catalogues
        </button>
      </div>
    );
  }

  if (catalogue.status === "Failed") {
    return null; // will be redirected via useEffect
  }

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

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this catalogue?"))
      return;

    const updated = catalogues.filter((c) => c.id !== id);
    setCatalogues(updated);

    navigate("/catalogues");
  };

  const handleReprocess = () => {
    setCatalogues((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Pending" } : c)),
    );

    setTimeout(() => {
      setCatalogues((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                status: "Processed",
                accuracy: 96,
                processingTime: "2m 10s",
              }
            : c,
        ),
      );
    }, 2000);
  };

 const handleExport = () => {
  if (!catalogue || products.length === 0) {
    alert("No data to export");
    return;
  }

  const headers = [
    "Catalogue Name",
    "Factory",
    "Upload Date",
    "Status",
    "Product Name",
    "Description",
    "Category",
    "MRP",
    "Dealer Price",
    "Stock",
    "Confidence",
  ];

  const rows = products.map((p) => [
    catalogue.catalogueName,
    catalogue.factoryName,
    new Date(catalogue.uploadDate).toLocaleDateString("en-IN"),
    catalogue.status,
    p.name,
    p.description,
    p.category,
    p.mrp,
    p.dealerPrice,
    p.stock,
    p.confidence,
  ]);

  const csv = [headers, ...rows]
    .map((row) =>
      row
        .map((value) =>
          `"${String(value).replace(/"/g, '""')}"`
        )
        .join(","),
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${catalogue.catalogueName}.csv`;
  link.click();
};


const handleDownloadReport = () => {
  if (!catalogue) return;

  const doc = new jsPDF();

  // ✅ Title
  doc.setFontSize(18);
  doc.text("Catalogue Report", 14, 15);

  // ✅ Basic Info
  doc.setFontSize(11);
  doc.text(`Catalogue: ${catalogue.catalogueName}`, 14, 28);
  doc.text(`Factory: ${catalogue.factoryName}`, 14, 36);
  doc.text(
    `Upload Date: ${new Date(catalogue.uploadDate).toLocaleDateString("en-IN")}`,
    14,
    44,
  );
  doc.text(`Status: ${catalogue.status}`, 14, 52);

  if (catalogue.status === "Processed") {
    doc.text(`Accuracy: ${catalogue.accuracy}%`, 120, 28);
    doc.text(`Processing Time: ${catalogue.processingTime}`, 120, 36);
  }

  // ✅ Table data
  const tableData = products.map((p, i) => [
    i + 1,
    p.name,
    p.category,
    p.mrp,
    p.dealerPrice,
    p.stock,
    `${p.confidence}%`,
  ]);

  // ✅ Table
  autoTable(doc, {
    startY: 65,
    head: [
      [
        "#",
        "Product",
        "Category",
        "MRP",
        "Dealer Price",
        "Stock",
        "Confidence",
      ],
    ],
    body: tableData,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [22, 160, 133] },
  });

  // ✅ Save
  doc.save(`${catalogue.catalogueName}_report.pdf`);
};



  return (
    <div className="min-h-screen bg-slate-50/40 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back button – now above header */}
        <div className="pt-5 pb-4">
          <button
            onClick={() => navigate("/catalogues")}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 transition-all"
            aria-label="Go back to catalogues"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </button>
        </div>

        {/* Main Header */}
        <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              {catalogue.catalogueName}
            </h1>
            <p className="mt-1.5 text-slate-600">{catalogue.factoryName}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors sm:text-base"
            >
              <Download className="h-4 w-4" />
              Export
            </button>

            {catalogue.status === "Processed" && (
              <Link
                to={`/catalogues/${id}/review`}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white shadow-md shadow-green-600/20 hover:bg-green-700 transition-colors"
              >
                <Eye className="h-4 w-4" />
                Review Products
              </Link>
            )}
          </div>
        </div>

        {/* Status & Info Card */}
        <div className="mb-8 overflow-hidden rounded-xl border border-slate-200/70 bg-white shadow-sm">
          <div className="p-5 sm:p-6 lg:p-7">
            <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-green-500 text-xl font-bold text-white shadow-md sm:h-16 sm:w-16 sm:text-2xl">
                  {catalogue.factoryLogo || "?"}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                    {catalogue.catalogueName}
                  </h2>
                  <p className="text-sm text-slate-600 sm:text-base">
                    {catalogue.factoryName}
                  </p>
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium sm:text-base ${getStatusClass(
                  catalogue.status,
                )}`}
              >
                {catalogue.status === "Processed" && (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                {catalogue.status === "Pending" && (
                  <Clock className="h-4 w-4" />
                )}
                {catalogue.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:gap-6">
              <div>
                <div className="mb-1 flex items-center gap-2 text-xs text-slate-600 sm:text-sm">
                  <Calendar className="h-4 w-4" />
                  Upload Date
                </div>
                <p className="font-semibold text-slate-900">
                  {new Date(catalogue.uploadDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div>
                <div className="mb-1 flex items-center gap-2 text-xs text-slate-600 sm:text-sm">
                  <Package className="h-4 w-4" />
                  Total Products
                </div>
                <p className="font-semibold text-slate-900">
                  {catalogue.totalProducts}
                </p>
              </div>

              {catalogue.status === "Processed" && (
                <>
                  <div>
                    <div className="mb-1 flex items-center gap-2 text-xs text-slate-600 sm:text-sm">
                      <TrendingUp className="h-4 w-4" />
                      Accuracy
                    </div>
                    <p className="font-semibold text-green-600">
                      {catalogue.accuracy}%
                    </p>
                  </div>

                  <div>
                    <div className="mb-1 flex items-center gap-2 text-xs text-slate-600 sm:text-sm">
                      <Clock className="h-4 w-4" />
                      Processing Time
                    </div>
                    <p className="font-semibold text-slate-900">
                      {catalogue.processingTime}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Products List */}
        {catalogue.status === "Processed" && products.length > 0 && (
          <div className="mb-8 overflow-hidden rounded-xl border border-slate-200/70 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    Extracted Products
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {products.length} products extracted from this catalogue
                  </p>
                </div>

                <Link
                  to={`/catalogues/${id}/review`}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors sm:px-5 sm:py-2.5"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit All Products
                </Link>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="p-4 transition-colors hover:bg-slate-50/70 sm:p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex flex-1 items-start gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-100 sm:h-20 sm:w-20">
                        <Package className="h-7 w-7 text-slate-400 sm:h-8 sm:w-8" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="mb-1.5 font-medium text-slate-900 line-clamp-2 sm:text-lg">
                          {product.name}
                        </h4>
                        <p className="mb-3 line-clamp-2 text-sm text-slate-600">
                          {product.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                          <span className="rounded-full bg-green-100 px-2.5 py-1 font-medium text-green-700">
                            {product.category}
                          </span>
                          <span className="text-slate-600">
                            MRP:{" "}
                            <span className="font-medium text-slate-900">
                              ₹{product.mrp.toLocaleString("en-IN")}
                            </span>
                          </span>
                          <span className="text-slate-600">
                            Dealer:{" "}
                            <span className="font-medium text-green-700">
                              ₹{product.dealerPrice.toLocaleString("en-IN")}
                            </span>
                          </span>
                          <span className="text-slate-600">
                            Stock:{" "}
                            <span className="font-medium text-slate-900">
                              {product.stock}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end sm:pl-6">
                      <div className="text-right">
                        <p className="mb-1 text-xs text-slate-600">
                          Confidence
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100 sm:w-24">
                            <div
                              className={`h-full ${
                                product.confidence >= 95
                                  ? "bg-green-500"
                                  : "bg-amber-500"
                              }`}
                              style={{ width: `${product.confidence}%` }}
                            />
                          </div>
                          <span
                            className={`text-xs font-medium ${
                              product.confidence >= 95
                                ? "text-green-700"
                                : "text-amber-700"
                            }`}
                          >
                            {product.confidence}%
                          </span>
                        </div>
                      </div>

                      <Link
                        to={`/products/${product.id}`}
                        className="rounded-lg border border-green-200 p-2.5 text-green-700 hover:bg-green-50 transition-colors"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Catalogue Actions */}
        <div className="rounded-xl border border-slate-200/70 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="mb-4 font-semibold text-slate-900">
            Catalogue Actions
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            {catalogue.status === "Processed" && (
              <button
                onClick={handleReprocess}
                className="flex items-center gap-2 rounded-lg border-2 border-green-200 px-4 py-2 font-medium text-green-700 hover:bg-green-50 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Reprocess OCR
              </button>
            )}

            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Report
            </button>

            <button
              onClick={handleDelete}
              className="ml-auto flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 font-medium text-red-700 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Delete Catalogue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
