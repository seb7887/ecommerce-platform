"use strict";

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

module.exports = async () => {
  const service = await strapi.plugins["users-permissions"].services
    .userspermissions;
  const plugins = await service.getPlugins("en");

  const roles = await service.getRoles();

  const getRole = async (type) => {
    const index = roles.findIndex((x) => x.type === type);
    const { id } = roles[index];
    return service.getRole(id, plugins);
  };

  const setPermission = (role, type, controller, action, enabled) => {
    try {
      role.permissions[type].controllers[controller][action].enabled = enabled;
    } catch (e) {
      console.error(
        `Couldn't set permission ${role.name} ${type}:${controller}:${action}:${enabled}`
      );
    }
  };

  const authRole = await getRole("authenticated");
  setPermission(authRole, "application", "product", "count", true);
  setPermission(authRole, "application", "product", "find", true);
  setPermission(authRole, "application", "product", "findone", true);
  setPermission(authRole, "application", "product", "create", true);
  setPermission(authRole, "application", "product", "update", true);
  setPermission(authRole, "application", "product", "delete", true);
  setPermission(authRole, "application", "product", "bulk", true);
  await service.updateRole(authRole.id, authRole);

  const publicRole = await getRole("public");
  setPermission(publicRole, "application", "product", "count", true);
  setPermission(publicRole, "application", "product", "find", true);
  setPermission(publicRole, "application", "product", "findone", true);
  await service.updateRole(publicRole.id, publicRole);

  return;
};
