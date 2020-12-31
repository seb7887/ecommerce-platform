"use strict";
const { sanitizeEntity } = require("strapi-utils");
const { bulk } = require("../../product/controllers/product");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const getProductsInfo = async (items) => {
  const ids = items.map((item) => item.id);
  const products = await strapi
    .query("product")
    .model.query((qb) => {
      qb.whereIn("id", ids);
    })
    .fetchAll();
  return products.toJSON();
};

const validateStock = (items, products) => {
  return !items.some((item, index) => {
    return item.quantity >= products[index].stock;
  });
};

const createOrder = async (order) => {
  const products = order.detail.map((d) => d.id);

  return await strapi.services.order.create({
    products,
    customerName: order.customer.name,
    customerEmail: order.customer.email,
    date: order.date || new Date().toISOString(),
    shippingMethod: order.shippingMethod,
    delivered: false,
    paid: false,
    detail: order.detail,
  });
};

const createSale = async (sale, orderId) => {
  return await strapi.services.sale.create({
    paymentMethod: sale.paymentMethod,
    charged: sale.total,
    date: sale.date || new Date().toISOString(),
    order: orderId,
  });
};

const updateProducts = async (products, detail) => {
  return detail.map(async (d, index) => {
    return await strapi.services.product.update(
      { id: d.id },
      {
        stock: products[index].stock - d.quantity,
        sold: products[index].sold + d.quantity,
      }
    );
  });
};

const createNewSale = async (sale, order) => {
  // 1. Validate stock
  const { detail } = order;
  const productsToCheck = await getProductsInfo(detail);

  if (!validateStock(detail, productsToCheck)) {
    throw new Error("Insufficient stock");
  }

  // 2. Create order
  const { id: orderId } = await createOrder(order);

  // 3. Create sale
  const requestedSale = await createSale(sale, orderId);

  // 4. Update stock and sold values
  await updateProducts(productsToCheck, detail);

  return requestedSale;
};

module.exports = {
  async create(ctx) {
    const { sale, order } = ctx.request.body;

    try {
      const requestedSale = await createNewSale(sale, order);

      return sanitizeEntity(requestedSale, { model: strapi.models.sale });
    } catch (err) {
      throw err;
    }
  },

  async bulk(ctx) {
    try {
      await Promise.all(
        ctx.request.body.map(async (body) => {
          const { sale, order } = body;
          await createNewSale(sale, order);
        })
      );
      ctx.send("ok");
    } catch (err) {
      throw new Error("Invalid input file");
    }
  },
};
