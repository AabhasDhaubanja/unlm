const { AuthenticationError } = require("apollo-server-express");

module.exports = (models, user) => {
  return {
    deleteImage: async ({ id }) => {
      if (user.error) throw new AuthenticationError(user.error);

      const image = await models.Image.findOne({
        where: {
          id,
        },
      });

      await image.destroy();
    },
  };
};
