import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerById } from "../../../api/customerProfileApi";
import { blockCustomer, unblockCustomer } from "../../../api/customers.api";

/* ---------------- SMALL UI COMPONENTS (UNCHANGED) ---------------- */

const TopStatCard = ({ title, value }) => (
  <div className="flex-1 min-w-[100px] sm:min-w-[140px] py-4 px-4 bg-gray-200 border border-gray-200 rounded-lg text-center transition hover:shadow-sm">
    <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2">{title}</p>
    <p className="text-lg sm:text-xl font-bold text-gray-800">{value}</p>
  </div>
);

const DetailField = ({ label, value, readOnly = false, isAddress = false }) => (
  <div className={isAddress ? "md:col-span-3 lg:col-span-1" : "md:col-span-1"}>
    <label className="block text-sm font-medium text-gray-500 mb-1">
      {label}
    </label>
    <p
      className={`w-full py-1 text-gray-800 font-medium ${
        readOnly ? "text-gray-600" : ""
      }`}
    >
      {value || "N/A"}
    </p>
  </div>
);

const FavoriteItemCard = ({ title, price, img }) => (
  <div className="group border border-gray-100 rounded-lg bg-white overflow-hidden hover:shadow-lg transition cursor-pointer">
    <div className="relative overflow-hidden h-40">
      <img
        src={img}
        className="h-full w-full object-cover transform group-hover:scale-105 duration-500"
        alt={title}
      />
    </div>
    <div className="p-3">
      <p className="text-sm font-semibold text-gray-700 truncate mb-1">
        {title}
      </p>
      <p className="text-lg font-extrabold text-green-600">₹{price}</p>
    </div>
  </div>
);

/* ---------------- MAIN COMPONENT ---------------- */

export default function UserProfileOverview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  /* ---------------- FETCH PROFILE FROM DB ---------------- */

  useEffect(() => {
    if (id) fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await getCustomerById(id);
      console.log("PROFILE API:", res);

      // res is ALREADY { success, data }
      if (!res?.success || !res?.data) {
        setUser(null);
        return;
      }

      const customer = res.data;

      setUser({
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        id: customer.id,
        gender: customer.gender || "N/A",
        address: customer.address || {},
        img:
          customer.photoUrl ||
          `https://ui-avatars.com/api/?name=${customer.name}`,
      });

      setStats({
        purchasedItems: customer.purchasedItems ?? 0,
        rewardPoints: customer.rewardPoints ?? 0,
        memberSince: customer.memberSince ?? "N/A",
      });

      // Add dummy favorites data
      setFavorites([
        {
          id: 1,
          name: "Fresh Organic Red Apples",
          price: 200,
          imageUrl:
            "https://images.unsplash.com/photo-1560806887-1295c3f60163?w=300&h=300&fit=crop",
        },
        {
          id: 2,
          name: "Fresh Oranges",
          price: 155,
          imageUrl:
            "https://images.unsplash.com/photo-1557804506-669714d2e745?w=300&h=300&fit=crop",
        },
        {
          id: 3,
          name: "Fresh Organic Vegetables",
          price: 55,
          imageUrl:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop",
        },
        {
          id: 4,
          name: "Fresh Seafood",
          price: 640,
          imageUrl:
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=300&fit=crop",
        },
        {
          id: 5,
          name: "Fresh Chicken",
          price: 150,
          imageUrl:
            "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=300&fit=crop",
        },
        {
          id: 6,
          name: "Fresh chicken drum stick",
          price: 320,
          imageUrl:
            "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=300&fit=crop",
        },
      ]);

      setIsBlocked(customer.status === "BLOCKED");
    } catch (err) {
      console.error("PROFILE LOAD ERROR", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- BLOCK / UNBLOCK ---------------- */

  const confirmAction = async () => {
    try {
      if (pendingAction === "block") {
        await blockCustomer(id);
        setIsBlocked(true);
      } else {
        await unblockCustomer(id);
        setIsBlocked(false);
      }
    } catch (err) {
      console.error("STATUS UPDATE ERROR", err);
    } finally {
      setPendingAction(null);
    }
  };

  /* ---------------- STATES ---------------- */

  if (loading) return <div className="p-6 text-center">Loading profile...</div>;

  if (!user)
    return <div className="p-6 text-center text-red-600">User not found</div>;

  /* ---------------- UI (UNCHANGED) ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 mb-4"
      >
        <ArrowLeft /> Back
      </button>

      <div className="bg-white rounded-2xl shadow p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Profile</h1>

          <div className="flex gap-2 bg-gray-200 rounded-full p-1">
            <button
              disabled={!isBlocked}
              onClick={() => setPendingAction("unblock")}
              className={`px-4 py-2 rounded-full text-sm ${
                isBlocked
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Unblock
            </button>

            <button
              disabled={isBlocked}
              onClick={() => setPendingAction("block")}
              className={`px-4 py-2 rounded-full text-sm ${
                !isBlocked
                  ? "bg-red-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Block
            </button>
          </div>
        </div>

        {/* USER INFO */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center mb-8 justify-between">
          {/* Avatar & Info */}
          <div className="flex gap-6 items-center">
            <img
              src={user.img}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-green-600 flex-shrink-0"
              alt="avatar"
            />

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {user.name}
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mt-1">
                +91 {user.phone}
              </p>
              <p className="text-sm text-gray-500 mt-1">User Id: {user.id}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <TopStatCard title="Purchased Items" value={stats.purchasedItems} />
            <TopStatCard title="Reward Point" value={stats.rewardPoints} />
            <TopStatCard title="Member Since" value={stats.memberSince} />
          </div>
        </div>

        {/* IMAGE-LIKE SOFT TOP FADE */}
        <div
          className="w-full h-10 mb-6"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.06) 35%, rgba(0,0,0,0.02) 65%, rgba(0,0,0,0) 100%)",
          }}
        ></div>

        {/* ACCOUNT INFO */}
        <h3 className="font-bold mb-3">Account Information</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <DetailField label="Full Name" value={user.name} />
          <DetailField label="Email Address" value={user.email} readOnly />
          <DetailField label="Mobile Number" value={`+91 ${user.phone}`} />
          <DetailField label="Gender" value={user.gender} />
        </div>

        {/* SINGLE LINE AFTER ACCOUNT INFO */}
        <div className="w-full h-[1px] bg-gray-200 mt-6"></div>

        {/* ADDRESS */}
        <h3 className="font-bold mt-6 mb-3">Address</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <DetailField
            label="House / Flat / Building No."
            value={user.address?.house || "N/A"}
          />
          <DetailField
            label="Street / Locality"
            value={user.address?.street || "N/A"}
          />
          <DetailField
            label="Landmark (Optional)"
            value={user.address?.landmark || "N/A"}
          />
          <DetailField label="Area" value={user.address?.area || "N/A"} />
          <DetailField label="State" value={user.address?.state || "N/A"} />
          <DetailField label="Pincode" value={user.address?.pincode || "N/A"} />
        </div>

        {/* SINGLE LINE AFTER ADDRESS */}
        <div className="w-full h-[1px] bg-gray-200 mt-6"></div>

        {/* FAVORITES */}
        <h3 className="font-bold mt-8 mb-4">Favorites ({favorites.length})</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map((item, i) => (
            <FavoriteItemCard
              key={i}
              title={item.name}
              price={item.price}
              img={item.imageUrl}
            />
          ))}
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {pendingAction && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="font-bold mb-3">
              Confirm {pendingAction === "block" ? "Block" : "Unblock"}
            </h3>
            <p className="mb-6">
              Are you sure you want to {pendingAction} this user?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPendingAction(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`px-4 py-2 rounded text-white ${
                  pendingAction === "block" ? "bg-red-600" : "bg-green-600"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
