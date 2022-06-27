"use strict";

/**
 * text service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::text.text", ({ strapi }) => ({
  async findMany() {
    return await strapi.entityService.findMany("api::text.text", {
      fields: ["id", "title", "english", "indonesia"],
    });
  },

  /**
   *
   * @param {string} title
   * @returns
   */
  async getIdbyTitle(title) {
    const result = await strapi.entityService.findMany("api::text.text", {
      fields: ["id", "title", "english", "indonesia"],
      filters: { title },
    });
    return result?.length > 0 ? result[0].id : 0;
  },

  /**
   *
   * @param {string} title
   * @param {string} english
   * @param {string} indonesia
   * @returns
   */
  async createNewText(title, english, indonesia) {
    const result = await strapi.entityService.create("api::text.text", {
      data: {
        title,
        english,
        indonesia,
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: new Date(), //kalau mau langsung publish, ini gaboleh null
      },
    });
    return result;
  },

  /**
   *
   * @param {string} title
   * @param {string} english
   * @param {string} indonesia
   * @returns
   */

  async findByTitleAndUpdate(title, english, indonesia) {
    const dataId = await this.getIdbyTitle(title);
    if (dataId) {
      const result = await strapi.entityService.update(
        "api::text.text",
        dataId,
        {
          data: {
            title,
            english,
            indonesia,
            // updatedAt: new Date(),
          },
        }
      );
      return result;
    } else {
      return await this.createNewText(title, english, indonesia);
    }
  },

  /**
   *
   * @param {Array} dataText
   * @returns
   */

  async updateLanguageByArray(dataText) {
    if (dataText?.length > 0) {
        let counter = 0;
        for(let i = 0; i < dataText.length; i++){
            await this.findByTitleAndUpdate(dataText[i].title, dataText[i].english, dataText[i].indonesia);
            if(i === dataText.length - 1){
                return this.findMany()
            }
        }
    }
  },
}));
