import React from "react";
import Link from "next/link";

import GDPRButton from "../GDPRButton";

const Footer = () => {
  return (
    <footer className="bg-[#888888] py-0.5 text-white text-sm">
      <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row justify-between items-center">
        <p>
          © 2024 |{" "}
          <Link href="" className="underline hover:text-gray-200">
            www.lukasrihacek.cz
          </Link>
        </p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <Link href="#" className="hover:text-gray-200">
            Předvolby cookies
          </Link>
          <GDPRButton />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
