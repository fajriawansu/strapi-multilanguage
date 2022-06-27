'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('language-document')
      .service('myService')
      .getWelcomeMessage();
  },
};
