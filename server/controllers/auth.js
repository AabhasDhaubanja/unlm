const jwt = require("jsonwebtoken");

module.exports = {
  login: (passport) => {
    return (req, res, next) => {
      passport.authenticate("local", { session: false }, function (
        err,
        user,
        info
      ) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(400).send(info.message);
        }

        const userObj = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        };

        const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "2h",
        });
        const refreshToken = jwt.sign(
          userObj,
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "7d",
          }
        );
        const responseObj = {
          accessToken: accessToken,
          user: userObj,
        };

        res.cookie("refresh", refreshToken, { httpOnly: true });

        return res.send(JSON.stringify(responseObj));
      })(req, res, next);
    };
  },

  register: (passport) => {
    return (req, res) => {
      res.send("Register Endpoint");
    };
  },

  check: () => {
    return (req, res) => {
      const refreshToken = req.cookies.refresh;

      if (refreshToken) {
        jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          (err, user) => {
            if (!err && user) {
              delete user.iat;
              delete user.exp;
              const accessToken = jwt.sign(
                user,
                process.env.ACCESS_TOKEN_SECRET,
                {
                  expiresIn: "2h",
                }
              );
              return res.send({ user, accessToken });
            }
            return res.status(400).send(err);
          }
        );
      } else {
        return res.status(401).send("Not authenticated");
      }
    };
  },
};
