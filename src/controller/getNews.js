const db = require("../data/data.json");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");

export const getNews = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.APP_SECRET_KEY, (err, decode) => {
    if (err) {
      res.status(401).send("<h3>Unauthorized</h3>");
    }
    const { email } = decode;
    const { preferences } = db.users[email];
    fetch(
      `https://jsonplaceholder.typicode.com/posts?title=${preferences.join(
        ","
      )}`
    )
      .then((response) => response.json())
      .then((json) => {
        res.status(200).send({
          message: "success",
          data: json,
        });
      });
  });
};
