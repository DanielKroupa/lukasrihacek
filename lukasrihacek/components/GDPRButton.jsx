"use client";

import { React, useState } from "react";

import OverlayGDPR from "./OverlayGDPR";

const Button = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div>
      <button className="" onClick={() => setIsPopupOpen(true)}>
        Zásady práce s vašimi údaji
      </button>

      <OverlayGDPR isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default Button;
