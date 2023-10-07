const { getNews } = require("../controller/getNews");

const newsRoutes = require("express").Router();

//get news based on preferences
newsRoutes.get("/", getNews);

module.exports = newsRoutes;
