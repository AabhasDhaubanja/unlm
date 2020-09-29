const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const authController = require("../controllers/auth");

const models = require("../models");

const router = express.Router();
router.use(passport.initialize());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      models.User.findOne({
        where: {
          email: email,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        raw: true,
      })
        .then(async (u) => {
          if (u) {
            const match = await bcrypt.compare(password, u.password);
            console.log(match, password, u.password);
            if (match) {
              return done(null, u);
            }

            return done(null, false, {
              message: "Oops! - 401 Wrong Password!",
            });
          }
          return done(null, false, { message: "Oops! - 404 User not found!" });
        })
        .catch((err) => {
          console.log(err.response);
          return done(err);
        });
    }
  )
);

router.use(passport.initialize());

router.post("/login", authController.login(passport));

router.post("/register", authController.register(passport));

router.get("/check", authController.check());

module.exports = router;
