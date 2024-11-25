"use client";
import Logout from "@/app/(authLogic)/Logout";
import { logout } from "@/app/actions/authActions";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle, FaKey, FaHome } from "react-icons/fa";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-all"
      >
        <FaUserCircle className="text-4xl" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-md overflow-hidden">
          <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
            <li>
              <Link
                onClick={toggleDropdown}
                href="/dashboard"
                className="flex items-center text-sm gap-3 px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-600 transition-all"
              >
                <FaHome />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleDropdown}
                href="/chngpsswrd"
                className="flex items-center text-sm gap-3 px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-600 transition-all"
              >
                <FaKey />
                Set/Reset Password
              </Link>
            </li>
            <li className="flex items-center text-sm gap-3 px-4 py-3 text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-red-700 transition-all">
              <Logout />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
