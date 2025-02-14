module.exports = [
  {
    name: "strapi::errors",
  },
  {
    name: "strapi::security",
  },
  {
    name: "strapi::cors",
    config: {
      origin: ["http://127.0.0.1:3000", "http://localhost:3000", "*"], // nebo konkrétní domény
    },
  },
  {
    name: "strapi::logger",
  },
  {
    name: "strapi::query",
  },
  {
    name: "strapi::body",
  },
  {
    name: "strapi::session",
  },
  {
    name: "strapi::favicon",
  },
  {
    name: "strapi::public",
  },
];
