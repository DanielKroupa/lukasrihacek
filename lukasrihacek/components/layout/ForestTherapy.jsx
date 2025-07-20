import { React } from "react";
import { Crimson_Text } from "next/font/google";

const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const { LOCAL_STRAPI_ADDRESS, DEPLOY_STRAPI_ADDRESS } = process.env;

async function getForestTherapyInfo() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? DEPLOY_STRAPI_ADDRESS
      : LOCAL_STRAPI_ADDRESS || "http://localhost:1338";

  const resultsPromise = await fetch(
    `${baseUrl}/api/terapie-lesems?populate=*`
  );
  const description = await resultsPromise.json();
  return description.data;
}

export default async function ForestTherapy() {
  const descriptions = await getForestTherapyInfo();

  return (
    <section
      id="terapielesem"
      className={`${crimson.className}
      bg-[url('/img/forest.webp')] bg-no-repeat relative bg-cover bg-center md:w-auto text-white md:py-12 xl:px-20 md:px-14 py-8 px-4 lg:mx-12 xl:mx-16 md:mx-10 mx-0 my-4 md:bg-cover shadow-lg md:rounded rounded-none md:scroll-mt-16`}
    >
      {descriptions.map((description) => (
        <div key={description.id}>
          {description.Nadpis && (
            <h2 className="text-white pb-8 font-semibold text-4xl drop-shadow md:text-left text-center">
              {description.Nadpis}
            </h2>
          )}

          <div>
            {description.richText?.richText?.map((item, index) => {
              if (item.type === "paragraph") {
                return (
                  <p
                    key={index}
                    className="md:text-2xl text-xl pb-8 text-white [text-shadow:_0px_4px_4px_#333333]"
                  >
                    {item.children.map((child, childIndex) => (
                      <span key={childIndex}>
                        {child.bold ? <b>{child.text}</b> : child.text}
                      </span>
                    ))}
                  </p>
                );
              }

              if (item.type === "list") {
                return (
                  <ul
                    key={index}
                    className="list-disc space-y-3 md:text-2xl text-xl ml-8 font-normal"
                  >
                    {item.children.map((listItem, itemIndex) => (
                      <li key={itemIndex}>
                        {listItem.children.map((child, childIndex) => (
                          <span key={childIndex}>{child.text}</span>
                        ))}
                      </li>
                    ))}
                  </ul>
                );
              }

              return null; // Ignorovat ostatní typy
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
