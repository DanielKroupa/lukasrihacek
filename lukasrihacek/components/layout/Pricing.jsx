import React from "react";

import Image from "next/image";

const { LOCAL_STRAPI_ADDRESS, DEPLOY_STRAPI_ADDRESS } = process.env;

async function getPricingServices() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? DEPLOY_STRAPI_ADDRESS
      : LOCAL_STRAPI_ADDRESS || "http://localhost:1338";

  const response = await fetch(`${baseUrl}/api/ceniks?populate=*`);
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  const descriptions = await response.json();
  return descriptions.data;
}

export default async function Pricing() {
  const pricingServices = await getPricingServices();

  return (
    <section
      className="md:flex block md:py-4 py-2 md:px-4 lg:px-6 xl:px-16 px-0 md:scroll-mt-16"
      id="cenik"
    >
      {pricingServices.map((pricingService) => {
        return (
          <div
            key={pricingService.id}
            className="xl:w-2/3 lg:w-3/4 w-full md:px-10 px-4"
          >
            <h3 className="md:text-left text-center">Ceník služeb</h3>

            <div>
              <p className="font-semibold text-lg pb-8">
                {pricingService.nazevSluzby}
              </p>

              <p className="pb-8">Forma: {pricingService.formaSluzby}</p>

              <p className="pb-8">
                Cena:{" "}
                <span className="font-semibold">
                  {pricingService.cenaSluzby}
                </span>
              </p>
              {pricingService.popisSluzby && (
                <p className="pb-8"> {pricingService.popisSluzby}</p>
              )}
              {pricingService.PodminkySluzeb &&
                pricingService.PodminkySluzeb.popis && (
                  <div>
                    <p className="font-semibold pb-1">
                      Podmínky zrušení rezervace
                    </p>

                    <p className="text-sm">
                      {pricingService.PodminkySluzeb.popis}
                    </p>
                  </div>
                )}
            </div>
          </div>
        );
      })}

      <div className="flex md:justify-end justify-center xl:items-center md:items-end md:p-0 md:pr-7 p-4 md:w-1/3 w-auto">
        <Image
          src="/img/ceniksluzeb.webp"
          className="xl:w-72 lg:w-52 md:w-52 w-48 h-auto"
          alt=""
          width={150}
          height={300}
        />
      </div>
    </section>
  );
}
