const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../data/data.json");
const Validator = require("../helper/validation");
const path = require("path");
const fs = require("fs");

export const register = (req, res) => {
  // validate title, description and completion
  if (Validator.validUserInfo(req.body)) {
    const { name, email, password } = req.body;
    const writePath = path.join(__dirname, "../data", "data.json");
    const updatedUsers = { ...db };
    if (db.users[email]) {
      return res.status(404).send("<h3>User already exists</h3>");
    }
    updatedUsers.users[email] = {
      name,
      email,
      password: bcrypt.hashSync(password, 8),
      preferences: [],
      createdAt: new Date(),
    };
    fs.writeFileSync(writePath, JSON.stringify({ ...updatedUsers }), {
      encoding: "utf-8",
      flag: "w",
    });
    const accessToken = jwt.sign({ email }, process.env.APP_SECRET_KEY, {
      expiresIn: 86400,
    });
    return res.status(200).send({
      accessToken,
      name,
      email,
      message: "User registered successfully",
    });
  } else {
    res.status(404).send("<h3>All fields are mandatory</h3>");
  }
};

export const login = (req, res) => {
  // validate title, description and completion
  if (Validator.validLoginInfo(req.body)) {
    const { email, password } = req.body;
    const user = db.users[email];
    if (!user) {
      return res.status(404).send("<h3>User not found</h3>");
    }
    if (bcrypt.compareSync(password, user.password)) {
      const accessToken = jwt.sign({ email }, process.env.APP_SECRET_KEY, {
        expiresIn: 86400,
      });
      return res.status(200).send({
        accessToken,
        name: user.name,
        email: user.email,
        message: "Login successful",
      });
    } else {
      res.status(401).send("<h3>Incorrect credentials</h3>");
    }
  } else {
    res.status(404).send("<h3>All fields are mandatory</h3>");
  }
};

export const getPreferences = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.APP_SECRET_KEY, (err, decode) => {
    if (err) {
      res.status(401).send("<h3>Unauthorized</h3>");
    }
    const { email } = decode;
    res
      .status(200)
      .send({ preferences: db.users[email].preferences, message: "success" });
  });
};

export const updatePreferences = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const { preferences } = req.body;
  jwt.verify(token, process.env.APP_SECRET_KEY, (err, decode) => {
    if (err) {
      res.status(401).send("<h3>Unauthorized</h3>");
    }
    const { email } = decode;
    const newData = { ...db };
    newData.users[email].preferences = preferences.split(",");
    const writePath = path.join(__dirname, "../data", "data.json");
    fs.writeFileSync(writePath, JSON.stringify(newData), {
      encoding: "utf-8",
      flag: "w",
    });
    res.status(200).send({
      message: "preferences updated successfully",
      preferences: preferences.split(","),
    });
  });
};
