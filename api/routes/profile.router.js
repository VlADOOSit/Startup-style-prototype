const Router = require("express").Router;
const ProfileController = require("../controllers/profile.controller");

const router = Router();

router.get("/", ProfileController.getAllProfiles);
router.get("/:id", ProfileController.getProfileById);

module.exports = router;
