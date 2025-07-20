"use server";

import React from "react";
import Image from "next/image";
import Button from "../Button";

const { LOCAL_STRAPI_ADDRESS, DEPLOY_STRAPI_ADDRESS } = process.env;

async function getDescription() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? DEPLOY_STRAPI_ADDRESS
      : LOCAL_STRAPI_ADDRESS || "http://localhost:1338";

  const resultsPromise = await fetch(`${baseUrl}/api/o-mnes?populate=*`);
  const description = await resultsPromise.json();
  return description.data[0]; //Získání prvního a zároveň jediného příspěvku poli
}

export default async function About() {
  const descriptionData = await getDescription();

  const photo = descriptionData.ProfiloveFoto[0];
  const photoUrl = photo
    ? `${
        process.env.NODE_ENV === "production"
          ? DEPLOY_STRAPI_ADDRESS
          : LOCAL_STRAPI_ADDRESS || "http://localhost:1338"
      }${photo.url}`
    : "/img/lukasrihacek.webp";

  return (
    <section
      className="md:flex block md:py-8 py-2 md:px-4 lg:px-6 xl:px-16 px-0 md:scroll-mt-10"
      id="omne"
    >
      <div className="lg:p-8 p-0 2xl:flex 2xl:items-end  lg:flex lg:flex-col lg:justify-center ">
        <Image
          src={photoUrl}
          alt={photo.alternativeText || "Foto Lukáš Řiháček"}
          width={1200}
          height={800}
          className="lg:block hidden xl:w-[32em] lg:w-[45em] rounded-md  "
        />
      </div>
      <div className="md:p-8 p-4 ">
        <h3 className="text-center md:text-left">O mně</h3>

        <Image
          src={photoUrl}
          alt={photo.alternativeText || "Foto Lukáš Řiháček"}
          width={1200}
          height={800}
          className="block lg:hidden w-3/4 mx-auto pb-6 rounded-md "
        />

        {descriptionData.Popis.map((description) => {
          return (
            <p key={description.id} className="pb-6 text-justify">
              {description.popis}
            </p>
          );
        })}
        <div className="md:block flex justify-center">
          <Button />
        </div>
      </div>
    </section>
  );
}
