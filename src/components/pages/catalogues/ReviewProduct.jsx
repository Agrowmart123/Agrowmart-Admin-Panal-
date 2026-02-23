// src/components/ReviewProducts.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Save,
  Edit2,
  AlertCircle,
  CheckCircle2,
  Eye,
  Trash2,
  Download,
  Filter,
  ChevronDown,
  ArrowLeft,
  Image as ImageIcon,
} from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { mockProducts } from "../catalogues/mockData";

const EditableProductShape = {
  id: "",
  image: "",
  name: "",
  category: "",
  mrp: 0,
  dealerPrice: 0,
  gst: 0,
  stock: 0,
  description: "",
  manufacturer: "",
  hsn: "",
  confidence: 0,
  isEdited: false,
  isSelected: false,
};

export default function Review() {
  const { id: catalogueId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState(
    mockProducts.map((p) => ({ ...p, isEdited: false, isSelected: false })),
  );

  const [editingId, setEditingId] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [confidenceFilter, setConfidenceFilter] = useState("all");

  const [bulkEdit, setBulkEdit] = useState(false);
  const [bulkValues, setBulkValues] = useState({
    category: "",
    gst: "",
    manufacturer: "",
  });

  const filteredProducts = products.filter((p) => {
    if (confidenceFilter === "low") return p.confidence < 95;
    if (confidenceFilter === "high") return p.confidence >= 95;
    return true;
  });

  const handleSelectAll = () => {
    const newValue = !selectAll;
    setSelectAll(newValue);

    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        isSelected: newValue,
      })),
    );
  };

  const handleSelectProduct = (productId) => {
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, isSelected: !p.isSelected } : p,
      ),
    );
  };

  const handleEdit = (productId, field, value) => {
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, [field]: value, isEdited: true } : p,
      ),
    );
  };

  const handleSave = () => {
    console.log("Saving products:", products);
    alert("Changes saved successfully!");
    navigate("/catalogues/1");
  };

  const selectedCount = products.filter((p) => p.isSelected).length;
  const lowConfidenceCount = products.filter((p) => p.confidence < 95).length;

  const isMobile = window.innerWidth < 768; // simple check – you can use useMediaQuery hook for better

  const handleDeleteSelected = () => {
    setProducts(products.filter((p) => !p.isSelected));
    setSelectAll(false);
  };

  const handleBulkUpdate = () => {
    setProducts((prev) =>
      prev.map((p) => {
        if (!p.isSelected) return p;

        return {
          ...p,
          category: bulkValues.category || p.category,
          gst: bulkValues.gst !== "" ? Number(bulkValues.gst) : p.gst,
          manufacturer: bulkValues.manufacturer || p.manufacturer,
          isEdited: true,
        };
      }),
    );

    setBulkEdit(false);
    setBulkValues({
      category: "",
      gst: "",
      manufacturer: "",
    });
  };

  const handleExport = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Product Review Report", 14, 15);

    const tableData = filteredProducts.map((p, i) => [
      i + 1,
      p.name,
      p.category,
      p.mrp,
      p.dealerPrice,
      p.gst,
      p.stock,
      p.hsn,
      `${p.confidence}%`,
    ]);

    autoTable(doc, {
      startY: 25,
      head: [
        [
          "#",
          "Name",
          "Category",
          "MRP",
          "Dealer",
          "GST",
          "Stock",
          "HSN",
          "Confidence",
        ],
      ],
      body: tableData,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save("Product_Review_Report.pdf");
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="pt-4 sm:pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {/* Back button - larger touch target on mobile */}
            <button
              onClick={() => navigate(-1)}
              className="p-3 -ml-3 rounded-full hover:bg-slate-100 active:bg-slate-200 touch-manipulation"
              aria-label="Go back"
            >
              <ArrowLeft className="h-6 w-6 text-slate-700" />
            </button>

            <div>
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Review Extracted Data
              </h1>
              <p className="text-slate-600 text-sm mt-0.5 sm:mt-1">
                Verify and edit product information
              </p>
            </div>
          </div>

          {/* Action buttons - stack on very small screens, wrap nicely */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Export
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-5 py-2.5 font-medium text-white shadow-md shadow-green-500/20 hover:from-green-700 hover:to-green-800 active:from-green-800 active:to-green-900 min-w-[160px] justify-center"
            >
              <Save className="h-5 w-5" />
              Save & Approve
            </button>
          </div>
        </div>

        {/* Stats + Filters Bar */}
        <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            {/* Stats */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6 md:gap-8">
              <Stat label="Total Products" value={products.length} />

              <div className="hidden h-8 w-px bg-slate-200 md:block" />

              <Stat
                label="Low Confidence"
                value={lowConfidenceCount}
                color="text-amber-600"
              />

              <div className="hidden h-8 w-px bg-slate-200 md:block" />

              <Stat
                label="Selected"
                value={selectedCount}
                color="text-green-600"
              />
            </div>

            {/* Filters + Bulk actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Confidence filter - wider on mobile for better touch */}
              <div className="relative min-w-[200px] sm:min-w-[220px]">
                <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <select
                  value={confidenceFilter}
                  onChange={(e) => setConfidenceFilter(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white pl-10 pr-10 py-2.5 text-sm focus:border-green-400 focus:ring-2 focus:ring-green-200 focus:outline-none"
                >
                  <option value="all">All Products</option>
                  <option value="low">Low Confidence (&lt;95%)</option>
                  <option value="high">High Confidence (≥95%)</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>

              {/* Bulk actions - only show when needed, stack horizontally when space allows */}
              {selectedCount > 0 && (
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <button
                    onClick={() => setBulkEdit(true)}
                    className="flex items-center gap-1.5 rounded-lg border border-green-200 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50"
                  >
                    <Edit2 className="h-4 w-4" />
                    Bulk Edit
                  </button>
                  <button
                    onClick={handleDeleteSelected}
                    className="flex items-center gap-1.5 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Low Confidence Alert */}
        {lowConfidenceCount > 0 && (
          <div className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-start sm:gap-4">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600 sm:mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-amber-900">
                Manual Review Recommended
              </h4>
              <p className="mt-1 text-sm text-amber-800">
                {lowConfidenceCount} products have confidence &lt; 95%. Please
                verify these entries.
              </p>
            </div>
            <button
              onClick={() => setConfidenceFilter("low")}
              className="rounded-lg bg-amber-600 px-5 py-2 text-sm font-medium text-white hover:bg-amber-700 sm:self-start"
            >
              Review Low Confidence
            </button>
          </div>
        )}

        {/* Products – Table on md+, Cards on mobile */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* Desktop / Tablet Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-max table-auto">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="w-10 px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    Product Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    MRP ₹
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    Dealer ₹
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    GST %
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    Stock
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    HSN Code
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    Confidence
                  </th>
                  <th className="w-24 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      product.confidence < 95 ? "bg-amber-50/40" : ""
                    } ${product.isEdited ? "bg-green-50/30" : ""}`}
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={product.isSelected}
                        onChange={() => handleSelectProduct(product.id)}
                        className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-14 w-14 rounded-lg bg-slate-100 flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-slate-400" />
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm">
                      {editingId === product.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={product.name}
                            onChange={(e) =>
                              handleEdit(product.id, "name", e.target.value)
                            }
                            className="w-full rounded border border-green-400 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                            placeholder="Product name"
                            autoFocus
                          />
                          <textarea
                            value={product.description || ""}
                            onChange={(e) =>
                              handleEdit(
                                product.id,
                                "description",
                                e.target.value,
                              )
                            }
                            className="w-full rounded border border-green-400 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 min-h-[60px]"
                            placeholder="Description"
                            rows={3}
                          />
                        </div>
                      ) : (
                        <div className="max-w-[220px]">
                          <p className="font-medium text-slate-900 line-clamp-2">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-600 line-clamp-3">
                            {product.description || "—"}
                          </p>
                        </div>
                      )}
                    </td>
                    {/* Category */}
                    <td className="px-4 py-4 text-sm">
                      {editingId === product.id ? (
                        <input
                          type="text"
                          value={product.category || ""}
                          onChange={(e) =>
                            handleEdit(product.id, "category", e.target.value)
                          }
                          className="w-full rounded border border-green-400 px-2 py-1 text-sm"
                        />
                      ) : (
                        product.category || "—"
                      )}
                    </td>

                    {/* MRP */}
                    <td className="px-4 py-4 text-sm text-right">
                      {editingId === product.id ? (
                        <input
                          type="number"
                          value={product.mrp || ""}
                          onChange={(e) =>
                            handleEdit(
                              product.id,
                              "mrp",
                              Number(e.target.value),
                            )
                          }
                          className="w-full rounded border border-green-400 px-2 py-1 text-sm text-right"
                        />
                      ) : product.mrp ? (
                        `₹${product.mrp.toLocaleString("en-IN")}`
                      ) : (
                        "—"
                      )}
                    </td>

                    {/* Dealer ₹ */}
                    <td className="px-4 py-4 text-sm text-right">
                      {editingId === product.id ? (
                        <input
                          type="number"
                          value={product.dealerPrice || ""}
                          onChange={(e) =>
                            handleEdit(
                              product.id,
                              "dealerPrice",
                              Number(e.target.value),
                            )
                          }
                          className="w-full rounded border border-green-400 px-2 py-1 text-sm text-right"
                        />
                      ) : product.dealerPrice ? (
                        `₹${product.dealerPrice.toLocaleString("en-IN")}`
                      ) : (
                        "—"
                      )}
                    </td>

                    {/* GST % */}
                    <td className="px-4 py-4 text-sm text-center">
                      {editingId === product.id ? (
                        <input
                          type="number"
                          value={product.gst || ""}
                          onChange={(e) =>
                            handleEdit(
                              product.id,
                              "gst",
                              Number(e.target.value),
                            )
                          }
                          className="w-16 mx-auto rounded border border-green-400 px-2 py-1 text-sm text-center"
                          step="0.1"
                        />
                      ) : product.gst ? (
                        `${product.gst}%`
                      ) : (
                        "—"
                      )}
                    </td>

                    {/* Stock */}
                    <td className="px-4 py-4 text-sm text-center">
                      {editingId === product.id ? (
                        <input
                          type="number"
                          value={product.stock || ""}
                          onChange={(e) =>
                            handleEdit(
                              product.id,
                              "stock",
                              Number(e.target.value),
                            )
                          }
                          className="w-20 mx-auto rounded border border-green-400 px-2 py-1 text-sm text-center"
                        />
                      ) : product.stock ? (
                        product.stock.toLocaleString("en-IN")
                      ) : (
                        "—"
                      )}
                    </td>

                    {/* HSN */}
                    <td className="px-4 py-4 text-sm text-center font-mono">
                      {editingId === product.id ? (
                        <input
                          type="text"
                          value={product.hsn || ""}
                          onChange={(e) =>
                            handleEdit(product.id, "hsn", e.target.value)
                          }
                          className="w-full rounded border border-green-400 px-2 py-1 text-sm text-center"
                        />
                      ) : (
                        product.hsn || "—"
                      )}
                    </td>
                    {/* Confidence bar */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full ${
                              product.confidence >= 95
                                ? "bg-green-500"
                                : product.confidence >= 90
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${product.confidence}%` }}
                          />
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            product.confidence >= 95
                              ? "text-green-700"
                              : product.confidence >= 90
                                ? "text-amber-700"
                                : "text-red-700"
                          }`}
                        >
                          {product.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {editingId === product.id ? (
                        <button
                          onClick={() => setEditingId(null)}
                          className="rounded bg-green-600 p-1.5 text-white hover:bg-green-700"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                      ) : (
                        <div className="flex gap-1.5">
                          <button
                            onClick={() =>
                              setProducts(
                                products.filter((p) => p.id !== product.id),
                              )
                            }
                            className="rounded border border-red-200 p-1.5 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                          <button
                            onClick={() => setEditingId(product.id)}
                            className="rounded border border-slate-200 p-1.5 hover:bg-slate-50"
                          >
                            <Edit2 className="h-4 w-4 text-slate-600" />
                          </button>
                          <button
                            onClick={() => navigate(`/products/${product.id}`)}
                            className="rounded border border-green-200 p-1.5 hover:bg-green-50"
                          >
                            <Eye className="h-4 w-4 text-green-600" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-slate-100">
            {filteredProducts.map((product) => {
              const isEditing = editingId === product.id;

              return (
                <div
                  key={product.id}
                  className={`p-4 hover:bg-slate-50/60 transition-colors ${
                    product.confidence < 95 ? "bg-amber-50/40" : ""
                  } ${product.isEdited ? "bg-green-50/30" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={product.isSelected}
                        onChange={() => handleSelectProduct(product.id)}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-green-600"
                        disabled={isEditing} // optional: prevent selection while editing
                      />
                      <div className="h-14 w-14 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-slate-400" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Name + Confidence */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          {isEditing ? (
                            <input
                              type="text"
                              value={product.name || ""}
                              onChange={(e) =>
                                handleEdit(product.id, "name", e.target.value)
                              }
                              className="w-full rounded border border-green-400 px-2.5 py-1.5 text-base font-medium focus:outline-none focus:ring-2 focus:ring-green-300"
                              placeholder="Product name"
                              autoFocus
                            />
                          ) : (
                            <p className="font-medium text-slate-900 line-clamp-2 text-base">
                              {product.name || "—"}
                            </p>
                          )}
                        </div>

                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium shrink-0 ${
                            product.confidence >= 95
                              ? "bg-green-100 text-green-800"
                              : product.confidence >= 90
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.confidence}%
                        </span>
                      </div>

                      {/* Description */}
                      {isEditing ? (
                        <textarea
                          value={product.description || ""}
                          onChange={(e) =>
                            handleEdit(
                              product.id,
                              "description",
                              e.target.value,
                            )
                          }
                          className="mt-2 w-full rounded border border-green-400 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 min-h-[80px]"
                          placeholder="Description..."
                          rows={3}
                        />
                      ) : (
                        <p className="mt-1 text-sm text-slate-600 line-clamp-3">
                          {product.description || "No description"}
                        </p>
                      )}

                      {/* Grid of fields */}
                      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                        {/* Category */}
                        <div>
                          <div className="text-xs text-slate-500">Category</div>
                          {isEditing ? (
                            <input
                              type="text"
                              value={product.category || ""}
                              onChange={(e) =>
                                handleEdit(
                                  product.id,
                                  "category",
                                  e.target.value,
                                )
                              }
                              className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1.5 text-sm focus:border-green-400 focus:ring-1 focus:ring-green-200"
                            />
                          ) : (
                            <div className="font-medium text-slate-800">
                              {product.category || "—"}
                            </div>
                          )}
                        </div>

                        {/* MRP */}
                        <div>
                          <div className="text-xs text-slate-500">MRP</div>
                          {isEditing ? (
                            <input
                              type="number"
                              value={product.mrp || ""}
                              onChange={(e) =>
                                handleEdit(
                                  product.id,
                                  "mrp",
                                  Number(e.target.value),
                                )
                              }
                              className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1.5 text-sm text-right focus:border-green-400 focus:ring-1 focus:ring-green-200"
                            />
                          ) : (
                            <div className="font-medium text-slate-800">
                              {product.mrp
                                ? `₹${product.mrp.toLocaleString("en-IN")}`
                                : "—"}
                            </div>
                          )}
                        </div>

                        {/* Dealer Price */}
                        <div>
                          <div className="text-xs text-slate-500">
                            Dealer Price
                          </div>
                          {isEditing ? (
                            <input
                              type="number"
                              value={product.dealerPrice || ""}
                              onChange={(e) =>
                                handleEdit(
                                  product.id,
                                  "dealerPrice",
                                  Number(e.target.value),
                                )
                              }
                              className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1.5 text-sm text-right focus:border-green-400 focus:ring-1 focus:ring-green-200"
                            />
                          ) : (
                            <div className="font-medium text-slate-800">
                              {product.dealerPrice
                                ? `₹${product.dealerPrice.toLocaleString("en-IN")}`
                                : "—"}
                            </div>
                          )}
                        </div>

                        {/* GST */}
                        <div>
                          <div className="text-xs text-slate-500">GST</div>
                          {isEditing ? (
                            <input
                              type="number"
                              value={product.gst || ""}
                              onChange={(e) =>
                                handleEdit(
                                  product.id,
                                  "gst",
                                  Number(e.target.value),
                                )
                              }
                              step="0.1"
                              className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1.5 text-sm text-center focus:border-green-400 focus:ring-1 focus:ring-green-200"
                            />
                          ) : (
                            <div className="font-medium text-slate-800">
                              {product.gst ? `${product.gst}%` : "—"}
                            </div>
                          )}
                        </div>

                        {/* Stock */}
                        <div>
                          <div className="text-xs text-slate-500">Stock</div>
                          {isEditing ? (
                            <input
                              type="number"
                              value={product.stock || ""}
                              onChange={(e) =>
                                handleEdit(
                                  product.id,
                                  "stock",
                                  Number(e.target.value),
                                )
                              }
                              className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1.5 text-sm text-center focus:border-green-400 focus:ring-1 focus:ring-green-200"
                            />
                          ) : (
                            <div className="font-medium text-slate-800">
                              {product.stock?.toLocaleString("en-IN") || "—"}
                            </div>
                          )}
                        </div>

                        {/* HSN */}
                        <div>
                          <div className="text-xs text-slate-500">HSN Code</div>
                          {isEditing ? (
                            <input
                              type="text"
                              value={product.hsn || ""}
                              onChange={(e) =>
                                handleEdit(product.id, "hsn", e.target.value)
                              }
                              className="mt-0.5 w-full rounded border border-slate-300 px-2 py-1.5 text-sm text-center font-mono focus:border-green-400 focus:ring-1 focus:ring-green-200"
                            />
                          ) : (
                            <div className="font-medium text-slate-800 font-mono">
                              {product.hsn || "—"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-5 flex justify-end gap-3">
                    {isEditing ? (
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex items-center gap-1.5 rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Done
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => setEditingId(product.id)}
                          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => navigate(`/products/${product.id}`)}
                          className="rounded-lg border border-green-300 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50"
                        >
                          View
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {bulkEdit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-semibold">Bulk Edit Products</h3>

              <input
                placeholder="Category"
                value={bulkValues.category}
                onChange={(e) =>
                  setBulkValues({ ...bulkValues, category: e.target.value })
                }
                className="w-full rounded border px-3 py-2"
              />

              <input
                type="number"
                placeholder="GST %"
                value={bulkValues.gst}
                onChange={(e) =>
                  setBulkValues({ ...bulkValues, gst: e.target.value })
                }
                className="w-full rounded border px-3 py-2"
              />

              <input
                placeholder="Manufacturer"
                value={bulkValues.manufacturer}
                onChange={(e) =>
                  setBulkValues({ ...bulkValues, manufacturer: e.target.value })
                }
                className="w-full rounded border px-3 py-2"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setBulkEdit(false)}
                  className="rounded border px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  onClick={handleBulkUpdate}
                  className="rounded bg-green-600 px-4 py-2 text-white"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="sticky bottom-0 z-10 -mx-4 border-t border-slate-200 bg-white px-4 py-4 shadow-[0_-2px_10px_-3px_rgba(0,0,0,0.1)] sm:static sm:rounded-xl sm:border sm:shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  if (window.confirm("Discard all changes?")) {
                    navigate(-1);
                  }
                }}
                className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-6 py-2.5 font-medium text-white shadow-md shadow-green-500/20 hover:from-green-700 hover:to-green-800"
              >
                <Save className="h-4 w-4" />
                Save & Approve All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color = "text-slate-900" }) {
  return (
    <div>
      <p className="text-xs sm:text-sm text-slate-600">{label}</p>
      <p className={`text-lg font-semibold sm:text-xl ${color}`}>{value}</p>
    </div>
  );
}
