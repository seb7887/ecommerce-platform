module.exports = ({ env, config }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "1660ba13551ff7aacec1a4d171b763f8"),
    },
  },
  url: env("BACKEND_URL", "http://localhost:1337"),
});
