const Router = require("express").Router;
const SearchController = require("../controllers/search.controller");

const router = Router();

router.post("/", SearchController.getProfilesBySearch);

module.exports = router;
