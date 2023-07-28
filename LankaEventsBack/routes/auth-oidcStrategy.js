const express = require("express");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oidc");
const UserService = require("../services/userService");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const JWT_SECRET = "YOUR_JWT_SECRET";
// Sample user data, you should implement your own user database
const users = [
  { id: "google_user_id", email: "user@example.com", displayName: "John Doe" },
  // Add more users if needed
];

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/auth/oauth2/redirect/google",
      scope: ["profile", "email"],
      prompt: "select_account",
    },
    async function verify(issuer, profile, cb) {
      try {
        console.log(issuer);
        // Check if the user already exists based on the username or email
        const existingUser = await UserService.findOne(profile.id);
        if (existingUser) {
          // User already exists
          return cb(null, existingUser);
        } else {
          // Create the new user document
          const newUser = await UserService.create({
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          return cb(null, newUser);
        }
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      console.log("in jwt strategy");
      console.log("payload", jwt_payload);

      const user = User.findOne({ id: jwt_payload.user.id });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }

      // In this example, we are using the user ID in the payload to find the user
      // const user = User.find((u) => u.id === payload.user.id);
      // console.log("user", user);

      // if (user) {
      //   // User found, pass the user to the route handler
      //   console.log("User found");
      //   return done(null, user);
      // } else {
      //   // User not found
      //   console.log("User not found");
      //   return done(null, false);
      // }
    } catch (error) {
      console.error(error);
      return done(err, false);
    }
  })
);

passport.serializeUser(function (user, cb) {
  console.log("in serializeUser");
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("in deserializeUser");
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.get(
  "/login/federated/google",
  passport.authenticate("google", { session: false })
);

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // At this point, the user is authenticated with Google.
    // You can generate a JWT token here and send it back to the front-end.
    const user = req.user; // Assuming the user object is available after successful authentication
    console.log("user redirect/google", user);

    // Generate a JWT token with the user information
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "1h" });

    console.log("JWT token created");
    // Redirect to the front-end URL with the token as a query parameter
    res.redirect(`exp://app&access_token=${token}`);
  }

  // passport.authenticate("google", {
  //   successRedirect: "exp://Home",
  //   failureRedirect: "exp://SignIn",
  // })
);

// Protected route (requires authentication)
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      // Access the user information from the decoded token (available in req.user)
      // const { user } = req.user;
      // console.log("Protected", user);
      console.log("Protected");

      res.json({ message: "You have accessed the protected route!" });
    } catch (error) {
      console.error(error);
    }
  }
);

router.get("/unprotected", (req, res) => {
  // Access the user information from the decoded token (available in req.user)
  // const { user } = req.user;
  try {
    console.log("unProtected");
    res.json({ message: "You have accessed the unprotected route!" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/logout", function (req, res, next) {
  try {
    req.logout(function (err) {
      if (err) {
        console.log("in err");
        console.error(err);
        return next(err);
      }
      res.json({ message: "You have accessed the logout route!" });
      // res.redirect("/auth/test");
    });
  } catch (error) {
    console.log("in error");
    console.error(error);
  }
});

module.exports = { path: "/auth", router };
