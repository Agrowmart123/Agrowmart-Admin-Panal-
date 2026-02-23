import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";

import {
  FaSearch,
  FaBell,
  FaTimes,
  FaArrowLeft,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import logo from "../../assets/Logo1.png";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  formatRole,
  getCurrentUser,
  isSuperAdmin,
  logout,
} from "../../api/authService";
import { menuConfig } from "../layout/menuConfig";

const searchTypeIconMap = menuConfig.reduce((acc, item) => {
  acc[item.label] = item.icon;
  if (item.subItems) {
    item.subItems.forEach((sub) => {
      acc[`${item.label} › ${sub.label}`] = item.icon;
    });
  }
  return acc;
}, {});

const searchPlaceholderMap = {
  Dashboard: "Search dashboard...",
  Customers: "Search customers by name or id",
  "Users › Customers": "Search customers by name or id",
  "Users › Sellers": "Search sellers by name or id",
  Products: "Search products by name or id",
  "Products › All Products": "Search products by name or id",
  Orders: "Search orders by order id",
  Catalogues: "Search catalogues by name or factory",
  Categories: "Search categories",
  Reviews: "Search reviews",
  Payments: "Search payments",
  Settings: "Search settings",
  "Websites › Banners": "Search banners by title",
  "Websites › Blogs / News": "Search blogs/news by title",
  "Websites › Media Gallery": "Search media by title",
  "Websites › Pages": "Search pages by title",
};

export default function Header({ open, setOpen, activePage, setActivePage }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [openParent, setOpenParent] = useState(null);

  const [searchType, setSearchType] = useState("Dashboard");

  const [searchTypeOpen, setSearchTypeOpen] = useState(false);
  const searchTypeRef = useRef(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const filteredMenuConfig = menuConfig.filter((item) => {
    if (item.requiresSuperAdmin) {
      return isSuperAdmin();
    }
    return true;
  });

  const searchableModules = filteredMenuConfig.flatMap((item) => {
    if (item.subItems) {
      return item.subItems.map((sub) => ({
        label: `${item.label} › ${sub.label}`,
        path: sub.path,
        icon: item.icon,
      }));
    }

    return {
      label: item.label,
      path: item.path,
      icon: item.icon,
    };
  });

  const searchTypes = [
    "Dashboard",
    "Users",
    "Products",
    "Catalogues",
    "Orders",
    "Categories",
    "Market Rates",
    "Weather Settings",
    "Websites › Banners",
    "Websites › Blogs / News",
    "Websites › Media Gallery",
    "Websites › Pages",
    "Offers",
    "Admins",
    "Tickets / Support",
    "Reviews",
    "Refer & Earn",
    "Payments",
    "Settings",
  ];

  const searchTypeRoutes = {
    Dashboard: "/dashboard",
    Users: "/customers",
    Products: "/products",
    Orders: "/orders",
    Catalogues: "/catalogues",
    Categories: "/categories",
    "Market Rates": "/market-rates",
    "Weather Settings": "/weather-settings",
    "Websites › Banners": "/websites-banners",
    "Websites › Blogs / News": "/websites-blogs",
    "Websites › Media Gallery": "/websites-media",
    "Websites › Pages": "/websites-pages",
    Offers: "/offers",
    Admins: "/admins",
    "Tickets / Support": "/support",
    Reviews: "/review",
    "Refer & Earn": "/refer-earn",
    Payments: "/payment",
    Settings: "/settings",
  };

  const groupedSearchTypes = menuConfig
    .filter((item) => !item.requiresSuperAdmin || isSuperAdmin())
    .map((item) => ({
      label: item.label,
      hasChildren: !!item.subItems,
      children:
        item.subItems?.map((sub) => ({
          label: `${item.label} › ${sub.label}`,
          path: sub.path,
          icon: sub.icon,
        })) || [],
      icon: item.icon,
      path: item.path || null,
    }));

  const filteredResults = searchableModules
    .filter((item) => {
      const matchText = item.label
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      if (searchType === "All") return matchText;
      return matchText && item.label.startsWith(searchType);
    })
    .sort((a, b) => {
      // Items whose label starts with activePage come first
      const aMatches = a.label.startsWith(activePage) ? -1 : 0;
      const bMatches = b.label.startsWith(activePage) ? -1 : 0;
      return aMatches - bMatches;
    });

  useEffect(() => {
    if (activePage) {
      setSearchType(activePage);
    }
  }, [activePage]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchTypeRef.current && !searchTypeRef.current.contains(e.target)) {
        setSearchTypeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => e.preventDefault();

  const searchPlaceholder = searchPlaceholderMap[activePage] || "Search...";

  return (
    <>
      <nav className="bg-white px-6 py-3 flex justify-between items-center fixed top-0 left-0 w-full shadow-md z-50 h-16 border-b border-gray-200">
        {/* LEFT - LOGO */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto cursor-pointer"
            onClick={() => navigate("/dashboard")}
          />
        </div>

        {/* CENTER - SEARCH BAR */}
        {!isMobile && (
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 flex-1 mx-8"
            style={{ marginLeft: open ? "230px" : "70px" }}
          >
            {/* DROPDOWN */}
            <div
              ref={searchTypeRef}
              onClick={() => setSearchTypeOpen(!searchTypeOpen)}
              className="relative flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg cursor-pointer select-none hover:bg-gray-200 transition min-w-fit"
            >
              {searchTypeIconMap[searchType] && (
                <span className="text-gray-600">
                  {React.createElement(searchTypeIconMap[searchType], {
                    size: 16,
                  })}
                </span>
              )}
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {searchType}
              </span>
              <svg
                className={`w-4 h-4 text-gray-600 transition-transform ${
                  searchTypeOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>

              {/* {searchTypeOpen && (
                <div className="absolute top-[110%] left-0 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] mt-1">
                  {searchTypes.map((type) => {
                    const Icon = searchTypeIconMap[type];

                    return (
                      <div
                        key={type}
                        onClick={() => {
                          setSearchType(type);
                          setSearchTypeOpen(false);

                          const route = searchTypeRoutes[type];
                          if (route) {
                            navigate(route);
                            setActivePage(type);
                            setSearchValue("");
                          }
                        }}
                        className="flex items-center gap-3 px-3 py-2 text-sm cursor-pointer hover:bg-green-100"
                      >
                        {Icon && <Icon size={16} className="text-green-600" />}
                        <span>{type}</span>
                      </div>
                    );
                  })}
                </div>
              )} */}

              {searchTypeOpen && (
                <div className="absolute top-[110%] left-0 w-64 bg-white border border-gray-200 shadow-xl rounded-md z-[9999] mt-1 max-h-[70vh] overflow-y-auto no-scrollbar">
                  {groupedSearchTypes.map((group) => (
                    <div key={group.label}>
                      {/* Parent item */}
                      <div
                        className={`
            flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer
            ${openParent === group.label ? "bg-green-50 text-green-700" : "hover:bg-gray-50"}
          `}
                        onClick={(e) => {
                          e.stopPropagation();

                          if (group.hasChildren) {
                            setOpenParent(
                              openParent === group.label ? null : group.label,
                            );
                          } else if (group.path) {
                            navigate(group.path);
                            setSearchType(group.label);
                            setSearchTypeOpen(false);
                            setSearchValue("");
                            setActivePage(group.label);
                          }
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {group.icon && (
                            <group.icon size={16} className="text-green-600" />
                          )}
                          <span className="font-medium">{group.label}</span>
                        </div>

                        {group.hasChildren && (
                          <MdKeyboardArrowDown
                            className={`transition-transform ${openParent === group.label ? "rotate-180" : ""}`}
                          />
                        )}
                      </div>

                      {/* Children – indented */}
                      {group.hasChildren && openParent === group.label && (
                        <div className="bg-gray-50/70">
                          {group.children.map((child) => (
                            <div
                              key={child.label}
                              className="pl-12 py-2 px-4 text-sm cursor-pointer hover:bg-green-50 flex items-center gap-3"
                              onClick={() => {
                                navigate(child.path);
                                setSearchType(child.label);
                                setSearchTypeOpen(false);
                                setSearchValue("");
                                setActivePage(child.label);
                              }}
                            >
                              {child.icon && (
                                <child.icon
                                  size={14}
                                  className="text-green-700 opacity-80"
                                />
                              )}

                              <span>
                                {child.label.replace(`${group.label} › `, "")}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SEARCH INPUT */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm
  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />

              {/* DROPDOWN RESULTS */}
              {searchValue && filteredResults.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto mt-2 ">
                  {filteredResults.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        navigate(item.path);
                        setSearchValue("");
                        setSearchOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-green-50 flex items-center gap-3"
                    >
                      <item.icon size={18} className="text-green-600" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {searchValue && filteredResults.length === 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-2">
                  <p className="px-4 py-3 text-sm text-gray-500 text-center">
                    No results found
                  </p>
                </div>
              )}
            </div>
          </form>
        )}

        {/* RIGHT - ICONS & PROFILE */}
        <div className="flex items-center gap-4">
          {/* MOBILE SEARCH ICON */}
          {isMobile && (
            <FaSearch
              className="text-green-600 cursor-pointer text-lg"
              onClick={() => setSearchOpen(true)}
            />
          )}

          {/* NOTIFICATION BELL */}
          <div
            onClick={() => {
              setActivePage("Notifications");
              navigate("/notifications");
            }}
            className="relative cursor-pointer group"
          >
            <FaBell className="text-gray-400 text-lg hover:text-gray-600 transition" />
          </div>

          {/* PROFILE SECTION */}
          {!isMobile && (
            <div
              className="relative border-l border-gray-200 pl-4"
              ref={profileRef}
            >
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 cursor-pointer select-none group"
              >
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">
                    Agrow Mart
                  </p>
                  {currentUser && (
                    <p className="text-xs text-gray-500 leading-tight">
                      {formatRole(currentUser.role)}
                    </p>
                  )}
                </div>
                <svg
                  className={`w-4 h-4 text-gray-600 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      setActivePage("Profile");
                      navigate("/profile");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
                  >
                    <FaUser size={16} />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      localStorage.clear();
                      sessionStorage.clear();
                      navigate("/login", { replace: true });
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition border-t border-gray-200 flex items-center gap-2"
                  >
                    <FaSignOutAlt size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MOBILE MENU ICON */}
          {isMobile && (
            <CiMenuFries
              size={26}
              className="text-green-600 cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
      </nav>

      {/* MOBILE SEARCH OVERLAY */}
      {isMobile && searchOpen && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="flex items-center p-4 bg-[#f6ffd9] gap-2">
            <FaArrowLeft
              className="cursor-pointer text-green-700"
              onClick={() => setSearchOpen(false)}
            />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
              className="flex-1 px-3 py-2 border rounded"
            />
            {searchValue && (
              <FaTimes
                className="cursor-pointer"
                onClick={() => setSearchValue("")}
              />
            )}
          </div>

          <div className="p-4">
            {filteredResults.length > 0 ? (
              filteredResults.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    setActivePage(item.label);
                    setSearchValue("");
                    setSearchOpen(false);
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-green-100 text-sm flex items-center gap-2"
                >
                  <item.icon
                    size={18}
                    className="text-green-700 flex-shrink-0"
                  />
                  <span>{item.label}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No results found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
