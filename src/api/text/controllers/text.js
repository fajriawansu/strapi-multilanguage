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

  async fetchAllTextConverted(ctx) {
    const { language } = ctx.params;
    const theData = await this.fetchAllText();
    const result = theData.reduce((_obj, _item) => {
      return {
        ..._obj,
        [_item["title"]]:
          _item[language === "indonesia" ? "indonesia" : "english"],
      };
    }, {});
    return result;
  },
}));
