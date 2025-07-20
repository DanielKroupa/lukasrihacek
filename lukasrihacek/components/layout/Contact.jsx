import React from "react";

import { FaPhone } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";
import ContactForm from "./ContactForm";

const { LOCAL_STRAPI_ADDRESS, DEPLOY_STRAPI_ADDRESS } = process.env;

async function getContactInfo() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? DEPLOY_STRAPI_ADDRESS
      : LOCAL_STRAPI_ADDRESS || "http://localhost:1338";

  const response = await fetch(`${baseUrl}/api/kontakts?populate=*`);
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

export default async function Contact() {
  const contactInfos = await getContactInfo();

  return (
    <section
      className="md:flex block xl:mx-36 lg:mx-6 mx-2 xl:space-x-20 lg:space-x-4 md:space-x-4 space-x-0 md:scroll-mt-10"
      id="kontakt"
    >
      <div className="bg-[#ffffff] md:p-10 lg:py-10 px-6 py-3 rounded-lg md:my-8 my-4 shadow-lg border-2 border-[#cccccc] md:w-1/2 w-auto">
        <h3 className="text-center">Kontakt</h3>
        <div className="">
          {contactInfos.map((contactInfo) => {
            return (
              <p className="pb-8" key={contactInfo.id}>
                {contactInfo.popis}{" "}
              </p>
            );
          })}
          <p className="pb-8">V případě zájmu nabízím i konzultace online.</p>
        </div>

        <div>
          <div className="flex py-4 ">
            <div className="bg-black rounded-full flex w-12 h-12 text-white items-center justify-center shadow-md">
              <FaPhone size={25} />
            </div>
            <div className="space-y-2 flex-row justify-center items-center ml-4">
              {contactInfos.map((contactInfo) => {
                return (
                  <div key={contactInfo.id}>
                    <a
                      href={`tel:${contactInfo.telefon}`}
                      className="font-semibold"
                    >
                      +420 {formatPhoneNumber(contactInfo.telefon)}
                    </a>
                    <p>{contactInfo.popisTelefon}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex py-4 ">
            <div className="bg-black rounded-full flex w-12 h-12 text-white items-center justify-center shadow-md">
              <FaEnvelope size={25} />
            </div>
            {contactInfos.map((contactInfo) => {
              return (
                <div
                  key={contactInfo.id}
                  className="space-y-2 flex-row justify-center items-center ml-4"
                >
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="font-semibold"
                  >
                    {contactInfo.email}
                  </a>
                  <p>{contactInfo.popisEmail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-[#ffffff] xl:p-10 lg:py-10 lg:px-5 px-6 py-3 rounded-lg my-8 mx-4 shadow-lg border-2 border-[#cccccc] md:w-1/2 w-auto">
        <ContactForm />
      </div>
    </section>
  );
}
