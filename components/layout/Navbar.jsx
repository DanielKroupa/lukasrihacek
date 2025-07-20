"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa6";
import { IoClose, IoMenu } from "react-icons/io5";
import Link from "next/link";

const { LOCAL_STRAPI_ADDRESS, DEPLOY_STRAPI_ADDRESS } = process.env;

async function getContactInfo() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? DEPLOY_STRAPI_ADDRESS
      : LOCAL_STRAPI_ADDRESS || "http://localhost:1338";

  const response = await fetch(`${baseUrl}/api/kontakts`);
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  const descriptions = await response.json();
  return descriptions.data;
}

const formatPhoneNumber = (phone) => {
  const phoneStr = String(phone);
  return phoneStr.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
};

export default function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const [contactInfos, setContactInfos] = useState([]);
  const [error, setError] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    async function fetchContactInfo() {
      try {
        const response = await fetch("http://127.0.0.1:1338/api/kontakts");
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        setContactInfos(data.data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch contact info:", err);
      }
    }
    fetchContactInfo();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setNavbar(false);
      }
    };

    if (navbar) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [navbar]);

  if (error) {
    return <div>Error loading contact information</div>;
  }

  return (
    <nav className="left-0 md:rounded-bl md:rounded-br top-0 w-full shadow-[0_4px_30px_0px_rgba(0,0,0,0.15)] md:bg-[#eeeeee80] bg-[#eeeeee] z-50 flex justify-between items-center px-4 md:px-8 sticky md:backdrop-blur-xl">
      {contactInfos.map((contactInfo) => {
        return (
          <div key={contactInfo.id} className="flex items-center">
            <div className="text-lg hidden xl:flex lg:block">
              <div className="xl:p-4 lg:p-2">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center"
                >
                  <div className="text-black xl:p-2 px-2">
                    <FaEnvelope size={25} />
                  </div>
                  <span className="font-medium">{contactInfo.email}</span>
                </a>
              </div>
              <div className="p-4 xl:block hidden">
                <a
                  href={`tel: ${contactInfo.telefon}`}
                  className="flex items-center"
                >
                  <div className="p-2 text-black xl:p-2 px-2">
                    <FaPhone size={25} />
                  </div>
                  <span className="font-medium">
                    +420 {formatPhoneNumber(contactInfo.telefon)}
                  </span>
                </a>
              </div>
            </div>
          </div>
        );
      })}
      {/* Background overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          navbar
            ? "opacity-50 md:opacity-0 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setNavbar(false)}
      ></div>
      <div
        ref={menuRef}
        className={`md:flex z-50 md:static md:bg-transparent bg-white fixed top-0 w-2/3 md:w-auto
           text-black font-semibold md:flex-row flex-col shadow-lg md:shadow-none text-lg md:py-2 py-0 md:px-8 px-0 right-0 h-full md:items-center 
           md:space-x-4 transition-all duration-150
           ${
             navbar ? " translate-x-0 " : " translate-x-full md:translate-x-0"
           }`}
      >
        <ul className="flex flex-col md:flex-row text-center md:text-start md:space-x-4">
          <li className="md:py-2 py-4 mb-1">
            <Link
              href="#omne"
              className="md:text-black font-medium md:font-semibold"
              onClick={() => setNavbar(!navbar)}
            >
              O mně
            </Link>
          </li>
          <li className="md:py-2 py-4 mb-1">
            <Link
              href="#cenik"
              className="md:text-black font-medium md:font-semibold"
              onClick={() => setNavbar(!navbar)}
            >
              Ceník služeb
            </Link>
          </li>
          <li className="md:py-2 py-4 mb-1">
            <Link
              href="#terapielesem"
              className="md:text-black font-medium md:font-semibold"
              onClick={() => setNavbar(!navbar)}
            >
              Terapie lesem
            </Link>
          </li>
          <li className="md:py-2 py-4 mb-1">
            <Link
              href="#kontakt"
              className="md:text-black font-medium md:font-semibold"
              onClick={() => setNavbar(!navbar)}
            >
              Kontakt
            </Link>
          </li>
        </ul>
      </div>
      {/* Mobile hamburger menu */}
      <div className="md:hidden block shadow fixed z-50 top-0 right-0 mt-4 mr-4 bg-[#f5f5f5] rounded-full">
        <button
          className="z-50 border-2 border-gray-400 rounded-full p-1.5"
          onClick={() => setNavbar(!navbar)}
        >
          {navbar ? <IoClose size={25} /> : <IoMenu size={25} />}
        </button>
      </div>
    </nav>
  );
}
