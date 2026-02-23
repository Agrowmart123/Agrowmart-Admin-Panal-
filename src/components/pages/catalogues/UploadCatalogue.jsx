// src/components/UploadCatalogue.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  Check,
  ChevronRight,
  FileUp,
  Building2,
  Tag,
  Languages,
  Sparkles,
  Loader2,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

export default function UploadCatalogue() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const steps = [
    { id: 1, name: "Upload File", icon: FileUp },
    { id: 2, name: "Configure", icon: Tag },
    { id: 3, name: "Process OCR", icon: Sparkles },
  ];

  // ────────────────────────────────────────────────
  // Drag & Drop + File Select Handlers
  // ────────────────────────────────────────────────
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer?.files?.[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      simulateUpload();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 180);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      startProcessing();
    }
  };

  const startProcessing = () => {
    setIsProcessing(true);
    setProcessingProgress(0);

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate("/catalogues/1/review");
          }, 1200);
          return 100;
        }
        return prev + 2;
      });
    }, 140);
  };

  // ────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50/70 py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6 md:space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-3 font-medium transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Catalogues</span>
        </button>
        {/* Header */}
        <header className="text-center sm:text-left">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Upload Catalogue
          </h1>
          <p className="mt-1.5 text-slate-600 text-sm sm:text-base">
            Upload factory product catalogue for AI-powered OCR extraction
          </p>
        </header>

        {/* Steps Indicator */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 sm:p-7">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex-1 flex items-center min-w-0">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                      currentStep > step.id
                        ? "bg-green-500 text-white"
                        : currentStep === step.id
                          ? "bg-green-600 text-white ring-2 ring-green-100"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </div>
                  <p
                    className={`mt-2 text-xs sm:text-sm font-medium whitespace-nowrap ${
                      currentStep >= step.id
                        ? "text-slate-900"
                        : "text-slate-400"
                    }`}
                  >
                    {step.name}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div
                    className={`hidden sm:block flex-1 h-0.5 mx-2 sm:mx-4 rounded-full transition-colors ${
                      currentStep > step.id ? "bg-green-500" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5 sm:p-8">
          {/* Step 1 – Upload */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                  Upload Catalogue File
                </h2>
                <p className="mt-1.5 text-slate-600 text-sm sm:text-base">
                  Drag & drop PDF or images, or click to select
                </p>
              </div>

              {/* Dropzone */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all duration-200 ${
                  dragActive
                    ? "border-green-500 bg-green-50/70"
                    : selectedFile
                      ? "border-green-200 bg-green-50/30"
                      : "border-slate-300 hover:border-green-400 hover:bg-slate-50"
                }`}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />

                <div className="flex flex-col items-center gap-5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <Upload className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
                  </div>

                  {selectedFile ? (
                    <div className="w-full max-w-md space-y-4">
                      <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-lg border border-slate-200 shadow-sm">
                        <FileText className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <div className="min-w-0 flex-1 text-left">
                          <p className="font-medium text-slate-900 truncate">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        {uploadProgress === 100 && (
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                        )}
                      </div>

                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div>
                          <div className="flex justify-between text-xs mb-1.5 text-slate-600">
                            <span>Uploading…</span>
                            <span className="font-medium text-green-700">
                              {uploadProgress}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-600 rounded-full transition-all duration-300 ease-out"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="font-medium text-slate-800">
                        Drop files here or click to browse
                      </p>
                      <p className="text-sm text-slate-500">
                        PDF, JPG, PNG • Max 50 MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Hints grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    color: "blue",
                    title: "PDF Files",
                    desc: "Multi-page supported",
                  },
                  {
                    color: "green",
                    title: "Image Files",
                    desc: "JPG, PNG only",
                  },
                  { color: "purple", title: "Max Size", desc: "Up to 50 MB" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className={`border border-slate-200 bg-white rounded-lg p-4 text-center hover:border-slate-300 transition-colors`}
                  >
                    <p className={`text-sm font-medium text-${item.color}-700`}>
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 – Configure */}
          {currentStep === 2 && (
            <div className="space-y-7">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                  Configure Extraction
                </h2>
                <p className="mt-1.5 text-slate-600 text-sm sm:text-base">
                  Factory details & AI extraction preferences
                </p>
              </div>

              <div className="space-y-6">
                {/* Factory */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-800 mb-2">
                    <Building2 className="w-4 h-4" />
                    Factory
                  </label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200/50 transition">
                    <option>Tata Steel Industries</option>
                    <option>Reliance Polymers</option>
                    <option>Mahindra Auto Parts</option>
                    <option>Asian Paints Ltd</option>
                    <option>Jindal Textiles</option>
                    <option>+ Add New Factory</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-800 mb-2">
                    <Tag className="w-4 h-4" />
                    Primary Category
                  </label>
                  <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200/50 transition">
                    <option>Construction Materials</option>
                    <option>Electronics & Components</option>
                    <option>Textiles & Fabrics</option>
                    <option>Automotive Parts</option>
                    <option>Chemicals & Polymers</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-800 mb-2.5">
                    <Languages className="w-4 h-4" />
                    Catalogue Language
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["English", "हिंदी", "मराठी"].map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        className={`py-3 px-4 text-sm font-medium rounded-lg border-2 transition-all ${
                          lang === "English"
                            ? "border-green-600 bg-green-50 text-green-700"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Options */}
                <div className="bg-gradient-to-br from-purple-50 to-green-50 border border-purple-200 rounded-xl p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                      <h4 className="font-medium text-slate-900">
                        AI Enhancement Options
                      </h4>
                      {[
                        "Auto-detect product categories",
                        "Extract pricing information",
                        "Identify GST and HSN codes",
                      ].map((opt, i) => (
                        <label
                          key={i}
                          className="flex items-center gap-2.5 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 text-green-600 rounded border-slate-300 focus:ring-green-500"
                          />
                          <span className="text-sm text-slate-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 – Processing */}
          {currentStep === 3 && (
            <div className="space-y-6 md:space-y-8 text-center">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                  {isProcessing ? "Processing Catalogue" : "Ready to Process"}
                </h2>
                <p className="mt-2 text-slate-600 text-sm sm:text-base">
                  {isProcessing
                    ? "AI is extracting product data…"
                    : "Click below to begin OCR processing"}
                </p>
              </div>

              {!isProcessing ? (
                <div className="bg-gradient-to-br from-green-50 to-green-50 border-2 border-dashed border-green-300 rounded-xl p-8 sm:p-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-green-500 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    AI OCR Processing Ready
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto mb-6">
                    Your catalogue will be processed using advanced AI
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-700">
                    {[
                      "Product Names",
                      "Pricing",
                      "Categories",
                      "Specifications",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Animated loader area */}
                  <div className="relative h-40 sm:h-48 bg-gradient-to-br from-green-50 to-purple-50 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <Loader2 className="w-16 h-16 sm:w-20 sm:h-20 text-green-600 animate-spin" />
                        <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 text-purple-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                    {/* Decorative particles */}
                    <div className="absolute inset-0 opacity-40 pointer-events-none">
                      <div className="absolute top-1/4 left-1/5 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                      <div className="absolute top-2/5 right-1/4 w-3 h-3 bg-green-400 rounded-full animate-pulse delay-150" />
                      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-300" />
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between mb-2 text-sm font-medium">
                      <span className="text-slate-800">
                        Processing Progress
                      </span>
                      <span className="text-green-700">
                        {processingProgress}%
                      </span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-600 to-green-500 rounded-full transition-all duration-200"
                        style={{ width: `${processingProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {[
                      { label: "Document Scanned", thresh: 20 },
                      { label: "Text Extracted", thresh: 40 },
                      { label: "Data Structured", thresh: 60 },
                      { label: "AI Validation", thresh: 80 },
                    ].map((milestone, i) => (
                      <div
                        key={i}
                        className={`flex flex-col sm:flex-row items-center gap-2 p-3 rounded-lg transition-colors ${
                          processingProgress > milestone.thresh
                            ? "bg-green-50 border border-green-100"
                            : "bg-slate-50 border border-slate-100"
                        }`}
                      >
                        <CheckCircle2
                          className={`w-5 h-5 flex-shrink-0 ${
                            processingProgress > milestone.thresh
                              ? "text-green-600"
                              : "text-slate-300"
                          }`}
                        />
                        <span className="text-xs sm:text-sm font-medium text-slate-800 text-center sm:text-left">
                          {milestone.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1 || isProcessing}
              className="w-full sm:w-auto px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={
                (currentStep === 1 && uploadProgress !== 100) ||
                (currentStep === 3 && isProcessing)
              }
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-md shadow-green-500/20 font-medium min-w-[180px]"
            >
              {currentStep === 3 && !isProcessing ? (
                <>
                  <Sparkles className="w-5 h-5" />
                  Start Processing
                </>
              ) : (
                <>
                  {currentStep < 3 ? "Continue" : "Processing…"}
                  {currentStep < 3 && <ChevronRight className="w-5 h-5" />}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
