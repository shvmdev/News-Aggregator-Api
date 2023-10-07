const authRoutes = require("express").Router();
const bodyParser = require("body-parser");

const {
  register,
  login,
  getPreferences,
  updatePreferences,
} = require("../controller/user");

authRoutes.use(bodyParser.urlencoded({ extended: false }));
authRoutes.use(bodyParser.json());

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.get("/preferences", getPreferences);

authRoutes.put("/preferences", updatePreferences);

module.exports = authRoutes;
