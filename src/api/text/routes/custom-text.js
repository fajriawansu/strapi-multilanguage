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
  ],
};
