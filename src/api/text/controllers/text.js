"use strict";

/**
 *  text controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::text.text", ({ strapi }) => ({
  async fetchAllText(ctx) {
    const result = await strapi.entityService.findMany("api::text.text", {
      fields: ["id", "title", "english", "indonesia"],
    });

    return result;
  },
}));
