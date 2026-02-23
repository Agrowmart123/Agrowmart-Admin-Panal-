// src/components/ProductPreview.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit2,
  Save,
  Package,
  IndianRupee,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Image as ImageIcon,
  Building2,
  FileText,
} from 'lucide-react';

import { mockProducts } from '../catalogues/mockData';

export default function ProductPreview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const foundProduct = mockProducts.find((p) => p.id === id);

  // ────────────────────────────────────────────────
  // Local editable copy of the product
  // ────────────────────────────────────────────────
  const [product, setProduct] = useState(foundProduct ? { ...foundProduct } : null);
  const [isEditing, setIsEditing] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            Product not found
          </h2>
          <button
            onClick={() => navigate('/catalogues')}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Catalogues
          </button>
        </div>
      </div>
    );
  }

  const profitMargin = ((product.mrp - product.dealerPrice) / product.mrp) * 100;

  // ────────────────────────────────────────────────
  // Handlers
  // ────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'mrp' || name === 'dealerPrice' || name === 'gst' || name === 'stock'
        ? Number(value) || 0
        : value,
    }));
  };

  const handleSave = () => {
    // Here you would normally:
    // 1. Send data to backend / update global state
    // 2. Show toast / success message
    // For demo we just exit edit mode
    alert('Changes saved! (In real app → send to server)');
    setIsEditing(false);
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Optional: reset to original if user cancels
      setProduct({ ...foundProduct });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-slate-50/40 py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-slate-200/70 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-6 w-6 text-slate-700" />
            </button>
            <div>
              <h1 className="text-2xl md:text-2xl font-bold text-slate-900">
                {isEditing ? 'Edit Product' : 'Product Details'}
              </h1>
              <p className="text-slate-600 mt-1 text-sm md:text-base">
                {isEditing ? 'Make changes and save' : 'Review and edit product information'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={toggleEdit}
              className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors text-sm md:text-base ${
                isEditing
                  ? 'border-red-300 text-red-700 hover:bg-red-50'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Edit2 size={18} />
              {isEditing ? 'Cancel' : 'Edit Product'}
            </button>

            <button
              onClick={handleSave}
              disabled={!isEditing}
              className={`inline-flex items-center gap-2 px-5 py-2.5 font-medium rounded-lg shadow-md transition-all text-sm md:text-base ${
                isEditing
                  ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-200/50'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>

        {/* AI Confidence Banner */}
        <div
          className={`rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border ${
            product.confidence >= 95
              ? 'bg-green-50 border-green-200'
              : 'bg-amber-50 border-amber-200'
          }`}
        >
          <div className="flex items-center gap-3">
            {product.confidence >= 95 ? (
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" />
            )}
            <div>
              <h4 className="font-semibold text-slate-900">
                AI Confidence: {product.confidence}%
              </h4>
              <p className="text-sm text-slate-600 mt-0.5">
                {product.confidence >= 95
                  ? 'High confidence — data appears reliable'
                  : 'Low confidence — please verify all fields carefully'}
              </p>
            </div>
          </div>

          <div className="w-full sm:w-40">
            <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  product.confidence >= 95 ? 'bg-green-500' : 'bg-amber-500'
                } transition-all duration-500`}
                style={{ width: `${product.confidence}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column – Images + Quick Stats */}
          <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
            {/* Product Images – placeholder (you can make editable later) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100/80 p-5 md:p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Product Images</h3>
              <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center mb-4 border border-slate-200">
                <ImageIcon className="h-20 w-20 text-slate-300" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-slate-50 rounded-lg flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-green-400 transition-all border border-slate-200"
                  >
                    <ImageIcon className="h-8 w-8 text-slate-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="font-semibold mb-5 text-lg">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-green-100/90">Stock Status</span>
                  <span className="font-semibold">In Stock</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100/90">Available Units</span>
                  <span className="font-semibold">{product.stock}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100/90">Profit Margin</span>
                  <span className="font-semibold">{profitMargin.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column – Details */}
          <div className="lg:col-span-2 space-y-6 order-1 lg:order-2">

            {/* Basic Information */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-100/80 p-5 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-xl font-semibold text-slate-800">Basic Information</h3>
                <span className="inline-flex px-3.5 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg transition-all ${
                      isEditing
                        ? 'bg-white border-slate-300 focus:ring-2 focus:ring-green-400'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={product.category}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg transition-all ${
                        isEditing
                          ? 'bg-white border-slate-300 focus:ring-2 focus:ring-green-400'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      HSN Code
                    </label>
                    <input
                      type="text"
                      name="hsn"
                      value={product.hsn}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg font-mono transition-all ${
                        isEditing
                          ? 'bg-white border-slate-300 focus:ring-2 focus:ring-green-400'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg resize-none transition-all ${
                      isEditing
                        ? 'bg-white border-slate-300 focus:ring-2 focus:ring-green-400'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>
            </section>

            {/* Pricing & Tax */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-100/80 p-5 md:p-6">
              <div className="flex items-center gap-2.5 mb-6">
                <IndianRupee className="h-5 w-5 text-emerald-600" />
                <h3 className="text-xl font-semibold text-slate-800">Pricing & Tax</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-center">
                  <p className="text-sm text-slate-600 mb-1">MRP</p>
                  <p className="text-3xl font-bold text-slate-900">
                    ₹{product.mrp.toLocaleString()}
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200 text-center">
                  <p className="text-sm text-emerald-700 mb-1">Dealer Price</p>
                  <p className="text-3xl font-bold text-emerald-900">
                    ₹{product.dealerPrice.toLocaleString()}
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-5 border border-green-200 text-center">
                  <p className="text-sm text-green-700 mb-1">GST Rate</p>
                  <p className="text-3xl font-bold text-green-900">{product.gst}%</p>
                </div>
              </div>

              <div className="mt-6 p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                    <span className="font-medium text-slate-800">Profit Margin</span>
                  </div>
                  <span className="text-xl font-bold text-emerald-700">
                    {profitMargin.toFixed(1)}%
                  </span>
                </div>
                <p className="text-sm text-emerald-700 mt-2">
                  Savings: ₹{(product.mrp - product.dealerPrice).toLocaleString()} per unit
                </p>
              </div>
            </section>

            {/* Inventory – editable */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-100/80 p-5 md:p-6">
              <div className="flex items-center gap-2.5 mb-6">
                <Package className="h-5 w-5 text-green-600" />
                <h3 className="text-xl font-semibold text-slate-800">Inventory & Stock</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Current Stock
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="stock"
                      value={product.stock}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg transition-all pr-16 ${
                        isEditing
                          ? 'bg-white border-slate-300 focus:ring-2 focus:ring-green-400'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">
                      units
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Stock Status
                  </label>
                  <div className="flex items-center gap-2.5 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Available
                  </div>
                </div>
              </div>
            </section>

            {/* Manufacturing Details – editable */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-100/80 p-5 md:p-6">
              <div className="flex items-center gap-2.5 mb-6">
                <Building2 className="h-5 w-5 text-purple-600" />
                <h3 className="text-xl font-semibold text-slate-800">Manufacturing Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Manufacturer
                  </label>
                  <input
                    type="text"
                    name="manufacturer"
                    value={product.manufacturer}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg transition-all ${
                      isEditing
                        ? 'bg-white border-slate-300 focus:ring-2 focus:ring-green-400'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    HSN Code
                  </label>
                  <input
                    type="text"
                    name="hsn"
                    value={product.hsn}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg font-mono transition-all ${
                      isEditing
                        ? 'bg-white border-slate-300 focus:ring-2 focus:ring-green-400'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>
            </section>

            {/* AI Summary – not editable */}
            <section className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-5 md:p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <FileText className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-slate-800 text-lg">AI Extraction Summary</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Confidence Score</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-green-600 transition-all duration-700"
                        style={{ width: `${product.confidence}%` }}
                      />
                    </div>
                    <span className="font-bold text-slate-800 min-w-[3ch]">
                      {product.confidence}%
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-2">Manual Corrections</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 text-sm font-medium shadow-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    0 edits
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}