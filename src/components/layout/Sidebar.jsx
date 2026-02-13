import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  formatRole,
  isSuperAdmin,
  getCurrentUser,
  logout,
} from "../../api/authService";

// icons
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

import { FaUser, FaSignOutAlt } from "react-icons/fa";

import { menuConfig } from "../layout/menuConfig";

export default function Sidebar({ open, setOpen, activePage, setActivePage }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [websitesOpen, setWebsitesOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    if (!open) {
      setProfileOpen(false);
    }
  }, [open]);

  // Get menu items
  const user = getCurrentUser();

  const menuItems = menuConfig.filter((item) => {
    // Admins menu only for SUPER_ADMIN
    if (item.label === "Admins" && user?.role !== "SUPER_ADMIN") {
      return false;
    }
    return true;
  });

  // Close sidebar when clicking outside (Only for Mobile)
  useEffect(() => {
    if (!isMobile || !open) return;

    const handleOutsideClick = (e) => {
      if (!e.target.closest("nav")) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isMobile, open, setOpen]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768 && open) {
        setOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setOpen]);

  useEffect(() => {
    const currentPath = window.location.pathname;

    menuItems.forEach((item) => {
      if (item.subItems) {
        item.subItems.forEach((sub) => {
          if (sub.path === currentPath) {
            setActivePage(`${item.label} › ${sub.label}`);
          }
        });
      } else if (item.path === currentPath) {
        setActivePage(item.label);
      }
    });

    if (currentPath === "/notifications") {
      setActivePage("Notifications");
    }
    if (currentPath === "/profile") {
      setActivePage("Profile");
    }
    if (currentPath === "/activity-log") {
      setActivePage("Activity Log");
    }
    if (currentPath === "/logout") {
      setActivePage("Logout");
    }
  }, []);

  return (
    <nav
      className={`fixed left-0 top-16 shadow-md h-[calc(100vh-64px)]
    p-2 flex flex-col duration-500 bg-[green] text-white
    ${open ? "w-60" : "w-16"}
    ${isMobile && !open ? "-translate-x-full" : ""}
    ${isMobile && open ? "z-50" : "z-40"}
  `}
    >
      {/* MOBILE PROFILE – SAME AS DESKTOP */}
      {isMobile && open && (
        <div className="relative mx-3 my-3 rounded-xl bg-white/10 backdrop-blur-md px-4 py-3">
          <div
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center justify-between gap-3 cursor-pointer select-none"
          >
            {/* TEXT */}
            <div className="leading-tight">
              <p className="text-sm font-semibold text-white">Agrow Mart</p>
              {currentUser && (
                <p className="text-xs text-green-200">
                  {currentUser && formatRole(currentUser.role)}
                </p>
              )}
            </div>

            {/* ARROW */}
            <svg
              className={`w-4 h-4 text-white transition-transform ${
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

          {/* DROPDOWN */}
          {profileOpen && (
            <div className="mt-3 mx-1 rounded-xl bg-white shadow-lg overflow-hidden">
              <button
                onClick={() => {
                  setProfileOpen(false);
                  setActivePage("Profile");
                  navigate("/profile");
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
              >
                <FaUser size={16} />
                Profile
              </button>

              <div className="h-px bg-gray-200" />

              <button
                onClick={() => {
                  logout();
                  localStorage.clear();
                  sessionStorage.clear();
                  navigate("/login", { replace: true });
                }}
                className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-100 transition flex items-center gap-2"
              >
                <FaSignOutAlt size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Menu */}
      <ul className="flex-1 overflow-y-auto scrollbar-hidden">
        {menuItems.map((item, index) => (
          <div key={index}>
            <li
              onClick={() => {
                if (item.subItems) {
                  if (item.label === "Users") {
                    setUsersOpen(!usersOpen);
                    setProductsOpen(false);
                    setOrdersOpen(false);
                    if (!open) setOpen(true);
                    return;
                  }

                  if (item.label === "Products") {
                    setProductsOpen(!productsOpen);
                    setUsersOpen(false);
                    setOrdersOpen(false);
                    if (!open) setOpen(true);
                    return;
                  }

                  if (item.label === "Orders") {
                    setOrdersOpen(!ordersOpen);
                    setUsersOpen(false);
                    setProductsOpen(false);
                    if (!open) setOpen(true);
                    return;
                  }

                  if (item.label === "Websites") {
                    setWebsitesOpen(!websitesOpen);
                    setUsersOpen(false);
                    setProductsOpen(false);
                    setOrdersOpen(false);
                    if (!open) setOpen(true);
                    return;
                  }
                }

                // Normal items (NO dropdown)
                setUsersOpen(false);
                setProductsOpen(false);
                setOrdersOpen(false);
                setActivePage(item.label);
                navigate(item.path);
                if (isMobile) setOpen(false);
              }}
              className={`
              px-3 py-2 my-1 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group
              hover:bg-gray-100 hover:text-[#000] 
              ${
                item.subItems
                  ? item.subItems.some(
                      (sub) => activePage === `${item.label} › ${sub.label}`,
                    )
                    ? "bg-[#fff] text-[green]"
                    : ""
                  : activePage === item.label
                    ? "bg-[#f6ffd9] text-[green]"
                    : ""
              }
             `}
            >
              <div className="text-xl flex-shrink-0">
                <item.icon />
              </div>

              <div
                className={`flex justify-between items-center w-full ${
                  !open && "hidden"
                }`}
              >
                <p className="duration-500 overflow-hidden">{item.label}</p>
                {/* Arrow Icon for dropdowns */}
                {item.subItems && (
                  <>
                    {item.label === "Users" ? (
                      usersOpen ? (
                        <MdKeyboardArrowDown />
                      ) : (
                        <MdKeyboardArrowRight />
                      )
                    ) : item.label === "Products" ? (
                      productsOpen ? (
                        <MdKeyboardArrowDown />
                      ) : (
                        <MdKeyboardArrowRight />
                      )
                    ) : item.label === "Orders" ? (
                      ordersOpen ? (
                        <MdKeyboardArrowDown />
                      ) : (
                        <MdKeyboardArrowRight />
                      )
                    ) : item.label === "Websites" ? (
                      websitesOpen ? (
                        <MdKeyboardArrowDown />
                      ) : (
                        <MdKeyboardArrowRight />
                      )
                    ) : null}
                  </>
                )}
              </div>

              {/* Hover label when closed */}
              <p
                className={`${
                  open && "hidden"
                } absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white
                   duration-300 overflow-hidden
                   group-hover:w-fit group-hover:p-2 group-hover:left-16 z-50`}
              >
                {item.label}
              </p>
            </li>

            {/* Render Subitems */}
            {item.subItems && item.label === "Users" && usersOpen && open && (
              <div className="flex flex-col">
                {item.subItems.map((sub, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setActivePage(`Users › ${sub.label}`);
                      navigate(sub.path);
                      if (isMobile) setOpen(false);
                    }}
                    className={`
                    pl-14 py-2 my-1 rounded-md duration-300 cursor-pointer flex gap-2 items-center
                    hover:text-[#000] hover:font-bold text-sm
                    ${
                      activePage === `Users › ${sub.label}`
                        ? "text-[yellow] font-bold"
                        : "text-[#fff]"
                    }
                  `}
                  >
                    {sub.icon && <sub.icon className="text-sm" />}
                    {sub.label}
                  </li>
                ))}
              </div>
            )}

            {item.subItems &&
              item.label === "Products" &&
              productsOpen &&
              open && (
                <div className="flex flex-col">
                  {item.subItems.map((sub, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setActivePage(`Products › ${sub.label}`);
                        navigate(sub.path);
                        if (isMobile) setOpen(false);
                      }}
                      className={`
                      pl-14 py-2 my-1 rounded-md duration-300 cursor-pointer flex gap-2 items-center
                      hover:text-[#000] hover:font-bold text-sm
                      ${
                        activePage === `Products › ${sub.label}`
                          ? "text-[yellow] font-bold"
                          : "text-[#fff]"
                      }
                    `}
                    >
                      {sub.icon && <sub.icon className="text-sm" />}
                      {sub.label}
                    </li>
                  ))}
                </div>
              )}

            {item.subItems && item.label === "Orders" && ordersOpen && open && (
              <div className="flex flex-col">
                {item.subItems.map((sub, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setActivePage(`Orders › ${sub.label}`);
                      navigate(sub.path);
                      if (isMobile) setOpen(false);
                    }}
                    className={`
                      pl-14 py-2 my-1 rounded-md duration-300 cursor-pointer flex gap-2 items-center
                      hover:text-[#000] hover:font-bold text-sm
                      ${
                        activePage === `Orders › ${sub.label}`
                          ? "text-[yellow] font-bold"
                          : "text-[#fff]"
                      }
                    `}
                  >
                    {sub.icon && <sub.icon className="text-sm" />}
                    {sub.label}
                  </li>
                ))}
              </div>
            )}

            {item.subItems &&
              item.label === "Websites" &&
              websitesOpen &&
              open && (
                <div className="flex flex-col">
                  {item.subItems.map((sub, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        setActivePage(`Websites › ${sub.label}`);
                        navigate(sub.path);
                        if (isMobile) setOpen(false);
                      }}
                      className={`
          pl-14 py-2 my-1 rounded-md cursor-pointer flex gap-2 items-center text-sm
          ${
            activePage === `Websites › ${sub.label}`
              ? "text-yellow-400 font-bold"
              : "text-white"
          }
          hover:text-black hover:font-bold
        `}
                    >
                      {sub.icon && <sub.icon className="text-sm" />}
                      {sub.label}
                    </li>
                  ))}
                </div>
              )}
          </div>
        ))}
      </ul>
    </nav>
  );
}
