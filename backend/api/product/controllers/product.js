"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async bulk(ctx) {
    try {
      await Promise.all(
        ctx.request.body.map(async (product) => {
          await strapi.services.product.create(product);
        })
      );
      ctx.send("ok");
    } catch (err) {
      throw err;
    }
  },
};
