const express = require("express");
const router = express.Router();
const News = require("../models/news");

/* GET home page. */
router.get("/", (req, res, next) => {
  const search = req.query.search || "";

  // sortowanie malejąco, rosnąco 1
  const findNews = News.find({ title: new RegExp(search.trim(), "i") }).sort({
    created: -1,
  });

  findNews.exec((err, data) => {
    console.log(data);

    res.render("news", { title: "News", data, search });
  });
});

module.exports = router;
