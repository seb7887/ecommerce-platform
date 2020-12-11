"use strict";

const yup = require("yup");
const validate = require("../../../utils/validate");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const shape = {
  name: yup.string().required(),
  description: yup.string().required(),
  author: yup.string().required(),
  price: yup.number().positive().required(),
  cost: yup.number().positive().required(),
  stock: yup.number().positive().required(),
  active: yup.boolean(),
  image: yup.string(),
};

module.exports = {
  async bulk(ctx) {
    try {
      await Promise.all(
        ctx.request.body.map(async (product) => {
          await validate(shape, product);
        })
      );

      await Promise.all(
        ctx.request.body.map(async (product) => {
          await strapi.services.product.create(product);
        })
      );
      ctx.send("ok");
    } catch (err) {
      throw new Error("Invalid input file");
    }
  },
};
