import { FaXmark } from "react-icons/fa6";

import { React, useEffect, useRef, useState } from "react";
import qs from "qs";

function useOutsideClickHandler(popupRef, onClose) {
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
  }, [popupRef, onClose]);
}

export default function OverlayWindow({ isOpen, onClose }) {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const ourQuery = qs.stringify({
      populate: {
        popisPraxe: {
          on: {
            "rozvrzeni.popis-praxe": {
              populate: "*",
            },
          },
        },
      },
    });

    const fetchExperienceInfo = async () => {
      try {
        const { LOCAL_STRAPI_ADDRESS, DEPLOY_STRAPI_ADDRESS } = process.env;
        // console.log("LOCAL_STRAPI_ADDRESS:", LOCAL_STRAPI_ADDRESS);
        // console.log("DEPLOY_STRAPI_ADDRESS:", DEPLOY_STRAPI_ADDRESS);
        // console.log("NODE_ENV:", process.env.NODE_ENV);

        const baseUrl =
          process.env.NODE_ENV === "production"
            ? DEPLOY_STRAPI_ADDRESS || "http://127.0.0.1:1338"
            : LOCAL_STRAPI_ADDRESS || "http://127.0.0.1:1338";

        const experiencesPromise = await fetch(
          `${baseUrl}/api/vzdelani-a-praxes?${ourQuery}`
        );
        // console.log(
        //   "Fetching data from:",
        //   `${baseUrl}/api/vzdelani-a-praxes?${ourQuery}`
        // );
        if (!experiencesPromise.ok) {
          throw new Error(`HTTP Error! Status: ${experiencesPromise.status} `);
        }
        const experienceData = await experiencesPromise.json();

        setExperiences(experienceData.data || []);
      } catch (error) {
        console.error("Error fetching experiences from Strapi:", error);
        setExperiences([]);
      }
    };
    fetchExperienceInfo();
  }, []);

  const popupRef = useRef(null);

  useOutsideClickHandler(popupRef, onClose);

  if (!isOpen) return null;

  return (
    <div
      id="fullScreenPopup"
      className={`fixed top-0 left-0 w-full 2xl:flex block items-center h-full bg-[#000000cc] z-50 overflow-y-auto justify-center transition-opacity duration-300
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
          <p className="md:text-2xl text-xl font-bold">Vzdělání a praxe</p>
          <button
            onClick={onClose}
            aria-label="Zavřít okno"
            className="relative cursor-pointer text-black rounded-full bg-[#ccc] p-2 w-9 h-9 flex justify-center items-center "
          >
            <FaXmark size={25} />
          </button>
        </div>

        <div>
          <hr className="border-2 border-gray-300 my-4 rounded-full" />
          {experiences.map((experience) => {
            return (
              <div key={experience.id}>
                {experience.popis && (
                  <p className="font-semibold underline text-xl pb-4 pt-3">
                    {experience.popis}
                  </p>
                )}

                {experience.alternativniPopisek && (
                  <p className="font-semibold text-lg py-3">
                    {experience.alternativniPopisek}
                  </p>
                )}

                {experience.popisPraxe.map((popisPraxe) => {
                  return (
                    <div
                      key={popisPraxe.id}
                      className="md:flex block mx-0.5 md:mx-1.5"
                    >
                      <div className="min-w-32">
                        <p className="md:mb-0 mb-2 font-normal">
                          {popisPraxe.rok}
                        </p>
                      </div>
                      <div className="text-[15px] md:text-base">
                        <p className="mb-3">{popisPraxe.popis} </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
