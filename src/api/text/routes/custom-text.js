module.exports = {
  routes: [
    {
      method: "GET",
      path: "/all-texts",
      handler: "text.fetchAllText",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/all-texts-converted/:language",
      handler: "text.fetchAllTextConverted",
      config: {
        auth: false,
      },
    },
    ,
    {
      method: "GET",
      path: "/all-texts-converted",
      handler: "text.fetchAllTextConverted",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/find-title",
      handler: "text.findOneTitle",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/updata-all-text",
      handler: "text.updateDataText",
      config: {
        auth: false,
      },
    },
  ],
};
