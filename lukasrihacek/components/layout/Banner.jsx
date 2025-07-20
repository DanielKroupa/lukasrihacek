import React from "react";
import Image from "next/image";

const { LOCAL_STRAPI_ADDRESS, DEPLOY_STRAPI_ADDRESS } = process.env;

async function getBanner() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? DEPLOY_STRAPI_ADDRESS
      : LOCAL_STRAPI_ADDRESS || "http://localhost:1338";

  const response = await fetch(`${baseUrl}/api/banners?populate=*`);
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  const bannerData = await response.json();
  return bannerData.data;
}

export default async function Banner() {
  const showBanner = await getBanner();

  return (
    <div className="relative text-center">
      {showBanner.map((banner) => {
        const image = banner.obrazekBanneru[0];
        const imageUrl = image
          ? `${
              process.env.NODE_ENV === "production"
                ? DEPLOY_STRAPI_ADDRESS
                : LOCAL_STRAPI_ADDRESS || "http://localhost:1338"
            }${image.formats.large.url}`
          : "/img/banner.webp";
        return (
          <div className="" key={banner.id}>
            <Image
              src={imageUrl}
              width={1512}
              height={523}
              alt={banner.MalyText || "Banner"}
              priority={true}
              className="object-cover md:h-auto h-[50vh] landscape:h-[100%] "
            />
            <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 space-y-2 ">
              <h1 className="text-[8vw] md:text-4xl lg:text-6xl leading-8 drop-shadow [text-shadow:_0px_4px_4px_#333333]">
                {banner.VelkyText}
              </h1>
              <h2 className="md:text-xl lg:text-3xl text-xl font-medium drop-shadow [text-shadow:_0px_4px_4px_#333333]">
                {banner.MalyText}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}
