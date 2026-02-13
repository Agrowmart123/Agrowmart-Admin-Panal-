// // **************************************New UI Design*********************************************

// import toast, { Toaster } from "react-hot-toast";
// import { useState } from "react";
// import logo from "../../../assets/Logo1.png";

// const initialMembers = [
//   {
//     id: 1,
//     firstName: "AgrowMart",
//     lastName: "",
//     email: "admin@agrowmart.com",
//     role: "Admin",
//     photoUrl: null,
//     isLogo: true,
//   },
//   {
//     id: 2,
//     firstName: "Vijay",
//     lastName: "Kumar",
//     email: "vijay@example.com",
//     role: "Sub-Admin",
//     photoUrl: "https://i.pravatar.cc/150?img=68",
//   },
//   {
//     id: 3,
//     firstName: "Sanjay",
//     lastName: "Singh",
//     email: "sanjay@example.com",
//     role: "Admin",
//     photoUrl: "https://i.pravatar.cc/150?img=12",
//   },
//   {
//     id: 4,
//     firstName: "Sonali",
//     lastName: "Sharma",
//     email: "sonali@example.com",
//     role: "Admin",
//     photoUrl: "https://i.pravatar.cc/150?img=45",
//   },
//   {
//     id: 5,
//     firstName: "Krishna",
//     lastName: "Patel",
//     email: "krishna@example.com",
//     role: "Admin",
//     photoUrl: "https://i.pravatar.cc/150?img=33",
//   },
// ];

// // Default Role Rights
// const initialRights = {
//   Admin: { add: true, edit: true, delete: true },
//   "Sub-Admin": { add: true, edit: true, delete: false },
//   Editor: { add: false, edit: true, delete: false },
// };

// export default function App() {
//   const [members, setMembers] = useState(initialMembers);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isRightsModalOpen, setIsRightsModalOpen] = useState(false);
//   const [editingMember, setEditingMember] = useState(null);
//   const [roleRights, setRoleRights] = useState(initialRights);

//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [memberToDelete, setMemberToDelete] = useState(null);

//   // Form State
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const [photoPreview, setPhotoPreview] = useState(null);

//   const handleEditClick = (member) => {
//     setEditingMember(member);
//     setFirstName(member.firstName);
//     setLastName(member.lastName);
//     setEmail(member.email);
//     setRole(member.role);
//     setPhotoPreview(member.photoUrl);
//     setIsModalOpen(true);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!role) {
//       toast.error("Please select a role!");
//       return;
//     }

//     if (editingMember) {
//       const updatedMembers = members.map((m) =>
//         m.id === editingMember.id
//           ? { ...m, firstName, lastName, email, role, photoUrl: photoPreview }
//           : m,
//       );
//       setMembers(updatedMembers);
//       toast.success(`${firstName} updated successfully!`);
//     } else {
//       const newMember = {
//         id: Date.now(),
//         firstName,
//         lastName,
//         email,
//         role,
//         photoUrl: photoPreview || null,
//       };
//       setMembers([...members, newMember]);
//       toast.success(`${firstName} added successfully!`);
//     }
//     closeModal();
//   };

//   const handleDeleteClick = (member) => {
//     setMemberToDelete(member);
//     setIsDeleteModalOpen(true);
//   };

//   const confirmDelete = () => {
//     if (memberToDelete) {
//       setMembers(members.filter((m) => m.id !== memberToDelete.id));
//       toast.error(`${memberToDelete.firstName} has been removed.`);
//       setIsDeleteModalOpen(false);
//       setMemberToDelete(null);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditingMember(null);
//     setFirstName("");
//     setLastName("");
//     setEmail("");
//     setRole("");
//     setPhotoPreview(null);
//   };

//   const toggleRight = (roleName, right) => {
//     setRoleRights((prev) => ({
//       ...prev,
//       [roleName]: { ...prev[roleName], [right]: !prev[roleName][right] },
//     }));
//     toast.success(`Rights updated for ${roleName}`);
//   };

//   return (
//     <div className="min-h-screen bg-white p-4 md:p-8 font-sans">
//       <Toaster position="top-right" />

//       <div className="max-w-7xl mx-auto">
//         {/* Header - Responsive Layout */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 border-b border-gray-100 pb-6">
//           <div>
//             <h1 className="text-xl md:text-2xl font-semibold text-gray-800 tracking-tight">
//               Team Members
//             </h1>
//             <p className="text-xs text-gray-500 mt-1 sm:hidden">
//               Manage your team and roles
//             </p>
//           </div>

//           <div className="flex items-center justify-between w-full sm:w-auto gap-4 md:gap-8">
//             <button
//               onClick={() => setIsRightsModalOpen(true)}
//               className="text-[green] font-semibold text-sm hover:underline underline-offset-4 transition-all"
//             >
//               Member Rights
//             </button>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-[green] text-white px-5 py-2 rounded-md text-sm font-bold shadow-sm hover:shadow-md hover:bg-opacity-90 active:scale-95 transition-all flex items-center gap-2"
//             >
//               <span className="text-lg leading-none">+</span> Add New
//             </button>
//           </div>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {members.map((member) => (
//             <div
//               key={member.id}
//               className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col items-center relative transition-transform hover:scale-[1.02]"
//             >
//               <div className="w-28 h-28 mb-4 relative">
//                 {member.isLogo ? (
//                   <div className="w-full h-full flex items-center justify-center overflow-hidden p-1">
//                     {" "}
//                     <img
//                       src={logo}
//                       alt="Agrowmart Logo"
//                       className="w-full h-full object-contain"
//                     />
//                   </div>
//                 ) : (
//                   <img
//                     src={member.photoUrl || "https://via.placeholder.com/150"}
//                     alt={`${member.firstName} profile`}
//                     className="w-full h-full rounded-full object-cover border-4 border-[#e9f0f7]"
//                   />
//                 )}
//               </div>
//               <h3 className="text-gray-800 font-semibold text-base">
//                 {member.firstName} {member.lastName}
//               </h3>
//               <p className="text-gray-400 text-xs mt-1 mb-6">{member.role}</p>

//               {!member.isLogo && (
//                 <div className="flex gap-2 w-full">
//                   <button
//                     onClick={() => handleEditClick(member)}
//                     className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50"
//                   >
//                     ✎ Edit
//                   </button>
//                   <button
//                     onClick={() => handleDeleteClick(member)}
//                     className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50"
//                   >
//                     🗑 Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* --- MODAL 1: ADD/EDIT MEMBER --- */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[2px] p-4">
//           <div className="bg-white rounded-lg w-full max-w-lg p-6 md:p-8 relative shadow-2xl border border-gray-100">
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
//             >
//               &times;
//             </button>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-8">
//               {editingMember ? "Edit Team Member" : "Add Team Member"}
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <label className="text-sm font-bold text-gray-700">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="First Name"
//                     required
//                     value={firstName}
//                     className="w-full p-3 bg-white border border-gray-200 rounded-md outline-none focus:border-[green]"
//                     onChange={(e) => setFirstName(e.target.value)}
//                   />
//                 </div>
//                 <div className="sm:pt-6">
//                   <input
//                     type="text"
//                     placeholder="Last Name"
//                     value={lastName}
//                     className="w-full p-3 bg-white border border-gray-200 rounded-md outline-none focus:border-[green]"
//                     onChange={(e) => setLastName(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-bold text-gray-700">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="Enter email"
//                   required
//                   value={email}
//                   className="w-full p-3 bg-white border border-gray-200 rounded-md outline-none focus:border-[green]"
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-bold text-gray-700">Role</label>
//                 <select
//                   required
//                   value={role}
//                   className="w-full p-3 bg-white border border-gray-200 rounded-md outline-none focus:border-[green]"
//                   onChange={(e) => setRole(e.target.value)}
//                 >
//                   <option value="">Select role</option>
//                   <option value="Admin">Admin</option>
//                   <option value="Sub-Admin">Sub-Admin</option>
//                   <option value="Editor">Editor</option>
//                 </select>
//               </div>
//               <div className="space-y-1">
//                 <label className="text-sm font-bold text-gray-700">Photo</label>
//                 <div className="flex items-center gap-6">
//                   <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border">
//                     {photoPreview ? (
//                       <img
//                         src={photoPreview}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <span className="text-gray-300 text-[10px]">
//                         No Image
//                       </span>
//                     )}
//                   </div>
//                   <label className="cursor-pointer border border-[green] text-[green] px-4 py-2 rounded font-medium text-sm hover:bg-[green] hover:text-white transition-colors">
//                     Upload
//                     <input
//                       type="file"
//                       className="hidden"
//                       accept="image/*"
//                       onChange={(e) => {
//                         const file = e.target.files[0];
//                         if (file) setPhotoPreview(URL.createObjectURL(file));
//                       }}
//                     />
//                   </label>
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-[green] text-white py-4 rounded-md font-bold text-lg hover:bg-opacity-90 shadow-md transition-all"
//               >
//                 {editingMember ? "Save Changes" : "Add Member"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL 2: MEMBER RIGHTS --- */}
//       {isRightsModalOpen && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/10 backdrop-blur-[2px] p-4">
//           <div className="bg-white rounded-lg w-full max-w-2xl p-6 md:p-8 relative shadow-2xl border border-gray-100">
//             <button
//               onClick={() => setIsRightsModalOpen(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
//             >
//               &times;
//             </button>
//             <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//               Manage Permissions
//             </h2>

//             <div className="overflow-x-auto">
//               <table className="w-full text-left">
//                 <thead>
//                   <tr className="border-b border-gray-100">
//                     <th className="py-4 font-bold text-sm text-gray-600 uppercase">
//                       Role
//                     </th>
//                     <th className="py-4 text-center font-bold text-sm text-gray-600 uppercase">
//                       Add
//                     </th>
//                     <th className="py-4 text-center font-bold text-sm text-gray-600 uppercase">
//                       Edit
//                     </th>
//                     <th className="py-4 text-center font-bold text-sm text-gray-600 uppercase">
//                       Delete
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {Object.keys(roleRights).map((roleName) => (
//                     <tr
//                       key={roleName}
//                       className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
//                     >
//                       <td className="py-5 font-semibold text-gray-700">
//                         {roleName}
//                       </td>
//                       {["add", "edit", "delete"].map((right) => (
//                         <td key={right} className="py-5 text-center">
//                           <input
//                             type="checkbox"
//                             checked={roleRights[roleName][right]}
//                             onChange={() => toggleRight(roleName, right)}
//                             className="w-5 h-5 accent-[green] cursor-pointer"
//                           />
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             <button
//               onClick={() => setIsRightsModalOpen(false)}
//               className="mt-8 w-full bg-[green] text-white py-3 rounded-md font-bold hover:bg-opacity-90 transition-all shadow-md"
//             >
//               Save & Close
//             </button>
//           </div>
//         </div>
//       )}

//       {/* --- MODAL 3: DELETE CONFIRMATION --- */}
//       {isDeleteModalOpen && (
//         <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-xl w-full max-w-sm p-8 shadow-2xl border border-gray-100 text-center animate-in fade-in zoom-in duration-200">
//             <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
//               <span className="text-red-500 text-3xl font-bold">!</span>
//             </div>

//             <h2 className="text-xl font-bold text-gray-800 mb-2">
//               Are you sure?
//             </h2>
//             <p className="text-gray-500 text-sm mb-8">
//               You are about to remove{" "}
//               <span className="font-semibold text-gray-700">
//                 {memberToDelete?.firstName}
//               </span>{" "}
//               from the team. This action cannot be undone.
//             </p>

//             <div className="flex gap-3">
//               <button
//                 onClick={() => setIsDeleteModalOpen(false)}
//                 className="flex-1 py-3 px-4 rounded-lg font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="flex-1 py-3 px-4 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 shadow-md shadow-red-100 transition-all active:scale-95"
//               >
//                 Yes, Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// **************************************Axios Added*********************************************

import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import logo from "../../../assets/Logo1.png";
import { Eye, EyeOff } from "lucide-react";

import {
  getTeamMembers,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../../../api/adminsApi";

// Default Role Rights
const initialRights = {
  Admin: { add: true, edit: true, delete: true },
  "Sub-Admin": { add: true, edit: true, delete: false },
  Editor: { add: false, edit: true, delete: false },
};

export default function App() {
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRightsModalOpen, setIsRightsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [roleRights, setRoleRights] = useState(initialRights);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [phone, setPhone] = useState("+91 ");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Fetch team members on component mount
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  useEffect(() => {
    const handleProfileUpdate = () => {
      console.log("Profile updated event received → refetching team members");
      fetchTeamMembers();
    };

    window.addEventListener("profile-updated", handleProfileUpdate);

    // Cleanup
    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdate);
    };
  }, []);

  const getInitials = (fullName) => {
    if (!fullName) return "?";
    const names = fullName.trim().split(/\s+/);
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  const fetchTeamMembers = async () => {
    setIsLoading(true);
    try {
      const response = await getTeamMembers();
      console.log("Team members response:", response.data);

      // Map backend data to frontend format
      const mappedMembers = response.data.map((member) => ({
        id: member.id,
        fullName: member.fullName || "",
        firstName: member.fullName?.split(" ")[0] || "",
        lastName: member.fullName?.split(" ").slice(1).join(" ") || "",
        email: member.email,
        Phone: member.phone || "",
        password: "********",
        role: formatRoleName(member.role),
        photoUrl: member.photoUrl || null,
        displayLogo: member.role === "SUPER_ADMIN" && !member.photoUrl,
        isSuperAdmin: member.role === "SUPER_ADMIN",
        active: member.active,
        initials: getInitials(member.fullName),
      }));

      setMembers(mappedMembers);
    } catch (error) {
      console.error("Error fetching team members:", error);
      toast.error("Failed to load team members");
    } finally {
      setIsLoading(false);
    }
  };

  // Format role name for display (ADMIN -> Admin, SUB_ADMIN -> Sub-Admin)
  const formatRoleName = (role) => {
    if (!role) return "Admin";
    return role
      .replace(/_/g, "-")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // Convert display role to backend format (Admin -> ADMIN, Sub-Admin -> SUB_ADMIN)
  const formatRoleForBackend = (role) => {
    if (!role) return "ADMIN";
    return role.replace(/-/g, "_").toUpperCase();
  };

  const handleEditClick = (member) => {
    setEditingMember(member);
    setFirstName(member.firstName);
    setLastName(member.lastName);
    setEmail(member.email);
    setPhone(member.Phone);
    setPassword("");
    setRole(member.role);
    setPhotoPreview(member.photoUrl);
    setPhotoFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      toast.error("Please select a role!");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();

      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
      formData.append("fullName", fullName);
      formData.append("phone", phone);
      formData.append("role", formatRoleForBackend(role));

      if (!editingMember) {
        if (!email.trim()) {
          toast.error("Email is required!");
          setIsLoading(false);
          return;
        }

        if (!password || password.length < 6) {
          toast.error("Password must be at least 6 characters!");
          setIsLoading(false);
          return;
        }

        formData.append("email", email.trim());
        formData.append("password", password);
      }

      if (photoFile) {
        formData.append("photo", photoFile);
      }

      if (editingMember) {
        // UPDATE
        await updateTeamMember(editingMember.id, formData);
        toast.success(`${firstName} updated successfully!`);
      } else {
        // ADD
        await addTeamMember(formData);
        toast.success(`${firstName} added successfully!`);
      }

      // Refresh the list
      await fetchTeamMembers();
      closeModal();
    } catch (error) {
      console.error("Error saving team member:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to save team member";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!memberToDelete) return;

    setIsLoading(true);
    try {
      await deleteTeamMember(memberToDelete.id);
      toast.success(`${memberToDelete.firstName} has been removed.`);

      // Refresh the list
      await fetchTeamMembers();
      setIsDeleteModalOpen(false);
      setMemberToDelete(null);
    } catch (error) {
      console.error("Error deleting team member:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to delete team member";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole("");
    setPhone("+91 ");
    setPassword("");
    setPhotoPreview(null);
    setPhotoFile(null);
  };

  const toggleRight = (roleName, right) => {
    setRoleRights((prev) => ({
      ...prev,
      [roleName]: { ...prev[roleName], [right]: !prev[roleName][right] },
    }));
    toast.success(`Rights updated for ${roleName}`);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 font-sans">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">
        {/* Header - Responsive Layout */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 border-b border-gray-100 pb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 tracking-tight">
              Team Members
            </h1>
            <p className="text-xs text-gray-500 mt-1 sm:hidden">
              Manage your team and roles
            </p>
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto gap-4 md:gap-8">
            <button
              onClick={() => setIsRightsModalOpen(true)}
              className="text-[green] font-semibold text-sm hover:underline underline-offset-4 transition-all"
            >
              Member Rights
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isLoading}
              className="bg-[green] text-white px-5 py-2 rounded-md text-sm font-bold shadow-sm hover:shadow-md hover:bg-opacity-90 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <span className="text-lg leading-none">+</span> Add New
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && members.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[green]"></div>
            <p className="mt-4 text-gray-500">Loading team members...</p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col items-center relative transition-transform hover:scale-[1.02]"
            >
              <div className="w-28 h-28 mb-4 relative">
                <div className="w-28 h-28 mb-4 relative">
                  {member.photoUrl ? (
                    <img
                      src={`${member.photoUrl}?t=${new Date().getTime()}`}
                      alt={`${member.fullName} profile`}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : member.displayLogo ? (
                    <img
                      src={logo}
                      alt="Super Admin Logo"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center border-4 border-[#e9f0f7]">
                      <span className="text-green-700 text-3xl font-bold">
                        {member.initials || "?"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-gray-800 font-semibold text-base">
                {member.firstName} {member.lastName}
              </h3>
              <p className="text-gray-400 text-xs mt-1 mb-6">{member.role}</p>

              {!member.isSuperAdmin && (
                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => handleEditClick(member)}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                  >
                    ✎ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(member)}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                  >
                    🗑 Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL 1: ADD/EDIT MEMBER --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center sm:items-center justify-center bg-black/10 backdrop-blur-[2px] p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar p-4 sm:p-6 md:p-8 relative shadow-2xl border border-gray-100">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              disabled={isLoading}
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              {editingMember ? "Edit Team Member" : "Add Team Member"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={firstName}
                    className="w-full p-3 bg-white border border-gray-200 rounded-md outline-none focus:border-[green]"
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="sm:pt-6">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    className="w-full p-3 bg-white border border-gray-200 rounded-md outline-none focus:border-[green]"
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  required
                  value={email}
                  className="w-full p-3 bg-white border border-gray-200 rounded-md outline-none focus:border-[green]"
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading || editingMember}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  required
                  className="w-full p-3 bg-white border border-gray-200 rounded-md outline-none focus:border-[green]"
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^\d+]/g, "");

                    if (!value.startsWith("+91")) {
                      value = "+91" + value.replace(/^\+?/, "");
                    }

                    if (!value.startsWith("+91 ")) {
                      value = "+91 " + value.slice(3).trim();
                    }

                    value = value.slice(0, 14); // +91 + 10 digits

                    setPhone(value);
                  }}
                  disabled={isLoading}
                />
              </div>

              {!editingMember && (
                <div className="space-y-1 relative">
                  <label className="text-sm font-bold text-gray-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password (min 6 chars)"
                      value={password}
                      required
                      minLength={6}
                      className="w-full p-3 bg-white border border-gray-200 rounded-md outline-none focus:border-[green]"
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 6 characters required
                  </p>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">
                  {" "}
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={role}
                  className="w-full p-3 bg-white border border-gray-200 rounded-md outline-none focus:border-[green]"
                  onChange={(e) => setRole(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="">Select role</option>
                  <option value="Admin">Admin</option>
                  <option value="Sub-Admin">Sub-Admin</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-700">Photo</label>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                    ) : (
                      <span className="text-gray-300 text-[10px]">
                        No Image
                      </span>
                    )}
                  </div>
                  <label className="cursor-pointer border border-[green] text-[green] px-4 py-2 rounded font-medium text-sm hover:bg-[green] hover:text-white transition-colors">
                    Upload
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      disabled={isLoading}
                    />
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[green] text-white py-4 rounded-md font-bold text-lg hover:bg-opacity-90 shadow-md transition-all disabled:opacity-50"
              >
                {isLoading
                  ? "Processing..."
                  : editingMember
                    ? "Save Changes"
                    : "Add Member"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: MEMBER RIGHTS --- */}
      {isRightsModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/10 backdrop-blur-[2px] p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 md:p-8 relative shadow-2xl border border-gray-100">
            <button
              onClick={() => setIsRightsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Manage Permissions
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-4 font-bold text-sm text-gray-600 uppercase">
                      Role
                    </th>
                    <th className="py-4 text-center font-bold text-sm text-gray-600 uppercase">
                      Add
                    </th>
                    <th className="py-4 text-center font-bold text-sm text-gray-600 uppercase">
                      Edit
                    </th>
                    <th className="py-4 text-center font-bold text-sm text-gray-600 uppercase">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(roleRights).map((roleName) => (
                    <tr
                      key={roleName}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-5 font-semibold text-gray-700">
                        {roleName}
                      </td>
                      {["add", "edit", "delete"].map((right) => (
                        <td key={right} className="py-5 text-center">
                          <input
                            type="checkbox"
                            checked={roleRights[roleName][right]}
                            onChange={() => toggleRight(roleName, right)}
                            className="w-5 h-5 accent-[green] cursor-pointer"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setIsRightsModalOpen(false)}
              className="mt-8 w-full bg-[green] text-white py-3 rounded-md font-bold hover:bg-opacity-90 transition-all shadow-md"
            >
              Save & Close
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL 3: DELETE CONFIRMATION --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl w-full max-w-sm p-8 shadow-2xl border border-gray-100 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-3xl font-bold">!</span>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Are you sure?
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              You are about to remove{" "}
              <span className="font-semibold text-gray-700">
                {memberToDelete?.firstName}
              </span>{" "}
              from the team. This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isLoading}
                className="flex-1 py-3 px-4 rounded-lg font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isLoading}
                className="flex-1 py-3 px-4 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 shadow-md shadow-red-100 transition-all active:scale-95 disabled:opacity-50"
              >
                {isLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
