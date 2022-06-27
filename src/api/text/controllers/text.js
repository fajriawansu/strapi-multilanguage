"use strict";

/**
 *  text controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::text.text", ({ strapi }) => ({
  async fetchAllText(ctx) {
    const result = await strapi.service("api::text.text").findMany()
    return result;
  },

  async findOneTitle(ctx){

    const { title } = ctx.request.body
    const result = await strapi.service("api::text.text").findByTitleAndUpdate(title)
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

  async updateDataText(ctx){
    const { data_text } = ctx.request.body
    const result = await strapi.service("api::text.text").updateLanguageByArray(data_text)
    return result
  }

}));
