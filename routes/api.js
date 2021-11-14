const express = require("express");
const router = express.Router();
const News = require("../models/news");
const defaultSort = -1;

/* GET home page. */
router.get("/", (req, res, next) => {
  const search = req.query.search || "";
  let sort = req.query.sort || defaultSort;

  if (sort !== -1 || sort !== 1) {
    sort = -1;
  }

  // sortowanie malejąco, rosnąco 1
  const findNews = News.find({ title: new RegExp(search.trim(), "i") })
    .sort({
      created: sort,
    })
    .select("_id title description");

  findNews.exec((err, data) => {
    console.log(data);

    res.json({ data });
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  // ograniczenie wyświetlenia kluczy w obiekcie JSON w select
  const findNews = News.findById({ _id: id }).select("_id title description");

  findNews.exec((err, data) => {
    res.json({ data });
  });
});

module.exports = router;
