// // Suvarna

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/Logo1.png";
// import { sendPasswordReset } from "../../api/authService";

// export default function ForgotPasswordPage() {
//   const navigate = useNavigate();
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [serverError, setServerError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Email validation - checks format
//   const isValidEmailFormat = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setEmailError("");
//     setServerError("");
//     setSuccess("");

//     // Client-side validation
//     if (!email.trim()) {
//       setEmailError("Email address is required");
//       setLoading(false);
//       return;
//     }

//     if (!isValidEmailFormat(email)) {
//       setEmailError("Invalid email address");
//       setLoading(false);
//       return;
//     }

//     try {
//       await sendPasswordReset(email);
//       setSuccess("Password reset email sent successfully! Check your inbox");
//       // setEmail(""); // Clear the field on success

//       // // Optionally redirect to login after 3 seconds
//       // setTimeout(() => {
//       //   navigate("/login");
//       // }, 3000);
//     } catch (err) {
//       console.error("❌ Password reset error:", err);

//       // Extract EXACT error message from backend - no modifications
//       const message = err.response?.data || "An error occurred. Please try again";

//       setServerError(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
//         {/* Logo Section */}
//         <div className="flex justify-center mb-4">
//           <img
//             src={logo}
//             alt="Agrowmart Logo"
//             className="h-16 w-auto object-contain"
//           />
//         </div>
//         <h1 className="text-center text-2xl font-semibold mb-1">
//           Forgot Password
//         </h1>
//         <p className="text-center text-gray-500 text-sm mb-6">
//           Enter your phone number
//         </p>

//         {/* Server Error Message */}
//         {serverError && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
//             {serverError}
//           </div>
//         )}

//         {/* Success Message */}
//         {success && (
//           <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
//             {success}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1 text-left">
//               Phone Number
//             </label>
//             <input
//               type="text"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 setEmailError("");
//                 setServerError("");
//               }}
//               placeholder="Enter your phone number"
//               className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
//                 emailError
//                   ? "border-red-500 focus:ring-red-500"
//                   : "border-gray-300 focus:ring-green-500"
//               }`}
//               disabled={loading || success}
//             />
//             {emailError && (
//               <p className="text-red-500 text-sm mt-1 text-left">{emailError}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={loading || success}
//             className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
//           >
//             {loading ? "Sending..." : "Send Reset Link"}
//           </button>

//           <div className="text-center">
//             <button
//               type="button"
//               onClick={() => navigate("/login")}
//               className="text-sm text-green-600 hover:underline focus:outline-none"
//               disabled={loading}
//             >
//               Back to Login
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// Suvarna

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo1.png";
import { sendPasswordReset } from "../../api/authService";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  // Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEmailError("");
    setServerError("");
    setSuccess("");

    // Client-side validation
    if (!email.trim()) {
      setEmailError("Email is required");
      setLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Invalid email address");
      setLoading(false);
      return;
    }

    try {
      await sendPasswordReset(email);
      setSuccess("Password reset email sent successfully! Check your inbox");
    } catch (err) {
      console.error("❌ Password reset error:", err);

      // Extract EXACT error message from backend - no modifications
     const message =
  err.response?.data?.error ||
  err.response?.data?.message ||
  "An error occurred. Please try again";

      setServerError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        {/* Logo Section */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="Agrowmart Logo"
            className="h-16 w-auto object-contain"
          />
        </div>
        <h1 className="text-center text-2xl font-semibold mb-1">
          Forgot Password
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Enter your email address
        </p>

        {/* Server Error Message */}
        {serverError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {serverError}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-left">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
                setServerError("");
              }}
              placeholder="Enter your email address"
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                emailError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-500"
              }`}
              disabled={loading || success}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {emailError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm text-green-600 hover:underline focus:outline-none"
              disabled={loading}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
