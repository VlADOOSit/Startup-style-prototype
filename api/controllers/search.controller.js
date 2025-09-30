const ProfileService = require("../services/profile.service");
const ApiError = require("../utils/ApiError");

class SearchController {
  getProfilesBySearch(req, res, next) {
    try {
      const query = req.body.skills;

      const result = ProfileService.getBySearchAndSort(query);
      if (result.length === 0) {
        return next(ApiError.NotFound("Not found"));
      }

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SearchController();
