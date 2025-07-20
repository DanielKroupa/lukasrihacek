"use client";

import Link from "next/link";
import { getLocalStorage, setLocalStorage } from "@/libs/storageHelper";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);

    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);

  useEffect(() => {
    const newValue = cookieConsent ? "granted" : "denied";
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: newValue,
      });
    }

    setLocalStorage("cookie_consent", cookieConsent);
  }, [cookieConsent]);

  return (
    <div
      className={`md:my-10 my-0 mx-auto max-w-full md:max-w-screen-md
                        fixed bottom-0 left-0 right-0 
                         px-3  md:w-3/4 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4 z-50
                         bg-black md:rounded-lg shadow-lg ${
                           cookieConsent !== null ? "hidden" : "md:block flex"
                         }`}
    >
      <div className="text-center text-white md:pb-2">
        <p className="text-sm md:text-base my-2">
          Používám soubory <Link href="/info/cookies">cookies</Link> k ukládání
          nebo přístupu k informacím o zařízení.
        </p>

        <p className="text-sm my-2 text-left font-thin">
          Souhlasením webová stránka umožní zpracovávat údaje, jako je chování
          při procházení nebo jedinečná ID na tomto webu. Nesouhlas nebo
          odvolání souhlasu může nepříznivě ovlivnit určité vlastnosti a funkce.
        </p>
      </div>

      <div className="md:flex md:justify-center flex w-full md:w-auto flex-col md:flex-row gap-2">
        <button
          className="px-5 py-2 text-gray-300 hover:text-gray-400 transition-all rounded-md border-gray-900"
          onClick={() => setCookieConsent(false)}
        >
          Odmítnout vše
        </button>
        <button
          className="px-6 py-1.5 font-lg cursor-pointer hover:bg-neutral-800 text-white transition-all rounded border-2 border-gray-500"
          onClick={() => setCookieConsent(true)}
        >
          Povolit
        </button>
      </div>
    </div>
  );
}
