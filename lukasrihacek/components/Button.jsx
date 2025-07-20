"use client";

import { React, useState } from "react";

import OverlayWindow from "./OverlayWindow";

const Button = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div>
      <button
        className="border-2 border-[#999999] rounded-lg px-4 py-2 "
        onClick={() => setIsPopupOpen(true)}
      >
        Vzdělání a praxe
      </button>

      <OverlayWindow
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
};

export default Button;
