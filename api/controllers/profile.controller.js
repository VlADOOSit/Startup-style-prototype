const ProfileService = require("../services/profile.service");
const ApiError = require("../utils/ApiError");

class ProfileController {
  getAllProfiles(req, res, next) {
    try {
      const result = ProfileService.getAll();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  getProfileById(req, res, next) {
    try {
      const { id } = req.params;
      const result = ProfileService.getById(id);

      if (!result) {
        return next(ApiError.NotFound("Not found"));
      }

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProfileController();
