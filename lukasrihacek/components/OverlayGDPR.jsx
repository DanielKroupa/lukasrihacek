"use client";

import { React, useEffect, useRef } from "react";

import { FaXmark } from "react-icons/fa6";

const OverlayWindow = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="fullScreenPopup"
      className={`fixed text-black top-0 left-0 w-full 2xl:flex block items-center h-full bg-[#000000cc] z-50 overflow-y-auto justify-center transition-opacity duration-300
        ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none delay-300"
        }`}
    >
      <div
        className={`mx-auto bg-white max-w-[850px] md:p-8 p-5 rounded-lg md:w-[80%] w-[90%] max-w-800px my-4 transition-transform duration-300 transform scale-100
          ${isOpen ? "scale-100" : "scale-95"}
          `}
        ref={popupRef}
      >
        <div className="flex justify-between flex-row items-center">
          <p className="md:text-2xl text-xl font-bold">
            Zásady ochrany / zpracování osobních údajů
          </p>
          <button
            onClick={onClose}
            aria-label="Zavřít okno"
            className="relative cursor-pointer text-black rounded-full bg-[#ccc] p-2 w-9 h-9 flex justify-center items-center "
          >
            <FaXmark size={25} />
          </button>
        </div>
        <hr className="border-2 border-gray-300 my-4 rounded-full" />
        <div className="">
          <p className="font-semibold text-xl pb-4">
            Zásady práce s osobními údaji
          </p>
          <div className="md:flex block mx-0.5 md:mx-1.5 ">
            <div className="text-[15px] md:text-base">
              <p className="mb-3">
                Tímto dokumentem informujeme o zpracování osobních údajů, které
                probíhá při používání webové stránky.
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold text-xl pb-4 pt-3">
            Správce osobních údajů
          </p>

          <div className="md:flex block mx-0.5 md:mx-1.5">
            <div className="text-[15px] md:text-base">
              <p className="mb-3">
                Správcem osobních údajů je Lukáš Řiháček (dále jen
                &quot;správce&quot;). V případě jakýchkoli dotazů nebo žádostí
                ohledně ochrany / zpracování osobních údajů můžete správce
                kontaktovat na
                <span className="font-medium"> lukasrihacek@seznam.cz.</span>
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold text-lg py-4">Shromažďované údaje</p>
          <div className="md:flex block mx-0.5 md:mx-1.5">
            <div className="text-[15px] md:text-base">
              <p className="mb-3">
                Kontaktní formulář: Jméno, telefon a e-mailová adresa.
              </p>
              <p className="mb-3">
                Analytická data: Veškeré údaje shromažďované službou Google
                Analytics (např. IP adresa, poloha, chování na webu).
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold text-lg py-4">Účely zpracování údajů</p>

          <div className="md:flex block mx-0.5 md:mx-1.5">
            <div className="text-[15px] md:text-base">
              <p className="mb-3">
                Analýza: Shromažďovaná data z Google Analytics jsou využívána za
                účelem zlepšení webových služeb a analýzy návštěvnosti.
              </p>
              <p className="mb-3">
                Kontaktní účely: Poskytnuté kontaktní údaje slouží k odpovědí na
                dotazy nebo žádosti zaslané prostřednictvím kontaktního
                formuláře webu.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold text-lg py-4">
            Osoby s přístupem k údajům
          </p>
          <div className="md:flex block mx-0.5 md:mx-1.5">
            <div className="text-[15px] md:text-base">
              <p className="mb-3">
                K osobním údajům má přístup pouze správce webu Lukáš Řiháček.
                Údaje nejsou poskytovány třetím stranám, s výjimkou
                zpracovatelů, jako je Google v rámci Google Analytics.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold text-lg py-4">Doba uchování údajů</p>
          <div className="md:flex block mx-0.5 md:mx-1.5">
            <div className="text-[15px] md:text-base">
              <p className="mb-3">
                Osobní údaje jsou uchovávány po dobu 1 roku od jejich
                shromáždění. Po uplynutí této doby budou údaje smazány.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold text-lg py-4">Práva uživatele</p>
          <div className="md:flex block mx-0.5 md:mx-1.5">
            <div className="text-[15px] md:text-base">
              <p className="mb-3">
                Uživatel má následující práva ohledně svých osobních údajů:
              </p>
              <p className="mb-3">
                1. Právo na opravu údajů: Uživatel může požadovat opravu
                nepřesných nebo neúplných údajů.
              </p>
              <p className="mb-3">
                2. Právo na výmaz údajů: Uživatel může požadovat vymazání svých
                údajů, pokud to není v rozporu s platnými právními předpisy.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold text-lg py-4">Cookies</p>
          <div className="md:flex block mx-0.5 md:mx-1.5">
            <div className="text-[15px] md:text-base">
              <p className="mb-3">
                Webová stránka používá cookies, zejéména cookies služby Google
                Analytics, za účelem sledování návštěvnosti a chování uživatelů
                na stránce. Cookies jsou používány pouze s výslovným souhlasem
                uživatele.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold text-lg py-4">Souhlas uživatele</p>
          <div className="md:flex block mx-0.5 md:mx-1.5">
            <div className="text-[15px] md:text-base">
              <p className="mb-3">
                Cookies: Uživatel musí před používáním stránky poskytnout
                souhlas s používáním cookies.
              </p>
              <p className="mb-3">
                Kontaktní formulář: Vyplněním a odesláním kontaktního formuláře
                dává uživatel souhlas se zpracováním osobních údajů uvedených ve
                formuláři.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="md:flex block mx-0.5 md:mx-1.5">
            <div className="text-[15px] md:text-base">
              <p className="mt-10">
                Pro podrobnosti nebo úpravy těchto zásad kontaktujte správce na
                výše uvedené adrese.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlayWindow;
