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
  ],
};
