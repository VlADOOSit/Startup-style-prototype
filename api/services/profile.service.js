const db = require("./profiles.json");

class ProfileService {
  getAll() {
    return db;
  }

  getBySearchAndSort(querySkills) {
    return db
      .map((profile) => {
        const matches = profile.skills.filter((skill) =>
          querySkills.includes(skill)
        );

        return {
          ...profile,
          score: Math.min(matches.length, 5),
        };
      })
      .filter((profile) => profile.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return b.rating - a.rating;
      });
  }
}

module.exports = new ProfileService();
