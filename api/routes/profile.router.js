const Router = require("express").Router;
const ProfileController = require("../controllers/profile.controller");

const router = Router();

router.get("/", ProfileController.getAllProfiles);

module.exports = router;
