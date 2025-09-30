const ProfileService = require("../services/profile.service");

class ProfileController {
  getAllProfiles(req, res, next) {
    try {
      const result = ProfileService.getAll();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProfileController();
