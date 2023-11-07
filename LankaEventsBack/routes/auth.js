const express = require("express");
var passport = require("passport");
// const UserService = require("../services/userService");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

const router = express.Router();

// const JWT_SECRET = "YOUR_JWT_SECRET";

// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: JWT_SECRET,
// };

// Google OAuth2.0 strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env["GOOGLE_CLIENT_ID"],
//       clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
//       callbackURL: "/auth/oauth2/redirect/google", // Replace with your callback URL
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         console.log(profile);
//         // Check if the user already exists in the database based on their Google ID
//         let user = await User.findOne({ googleId: profile.id });

//         if (!user) {
//           // If the user does not exist, create a new user in the database
//           user = UserService.create({
//             googleId: profile.id,
//             email: profile.emails[0].value,
//             displayName: profile.displayName,
//             profilePictureUrl: profile.photos[0].value,
//           });
//         }

//         // Create a JWT token with the user data
//         const token = jwt.sign(
//           {
//             id: user._id,
//             email: user.email,
//             name: user.name,
//             pictureUrl: user.profilePictureUrl,
//           },
//           JWT_SECRET,
//           { expiresIn: "1h" }
//         );

//         // Return the token to be used by the client
//         return done(null, token);
//       } catch (error) {
//         return done(error, false);
//       }
//     }
//   )
// );

// passport.use(
//   new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
//     try {
//       console.log("in jwt strategy");
//       console.log("payload", jwt_payload);

//       const user = await User.findOne({ _id: jwt_payload.id });
//       console.log(user);
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//         // or you could create a new account
//       }
//     } catch (error) {
//       console.error(error);
//       return done(err, false);
//     }
//   })
// );

// Routes
router.get("/", (req, res) => {
  res.send("Hello, please log in using Google.");
});

// Initiate the Google OAuth2.0 authentication
router.get(
  "/login/federated/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// Google OAuth2.0 callback
router.get("/oauth2/redirect/google", (req, res, next) => {
  // Perform authentication with the Google strategy
  console.log("Google callback");

  passport.authenticate("google", (err, token) => {
    if (err) {
      return next(err);
    }

    // Successful authentication, send the token to the client
    res.redirect(`exp://app&access_token=${token}`);
  })(req, res, next);
});

// Google OAuth2.0 authentication Organizer
router.get(
  "/login/federated/google-organizer",
  passport.authenticate("google-organizer", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// Google Organizer OAuth2.0 callback
router.get("/oauth2/redirect/google-organizer", (req, res, next) => {
  console.log("Google organizer callback");
  // Perform authentication with the Google strategy
  passport.authenticate("google-organizer", (err, result) => {
    if (err) {
      return next(err);
    }
    console.log("result", result);
    // Successful authentication, send the token to the client
    res.redirect(`exp://app&organizerToken=${result}`);
  })(req, res, next);
});

// Protected route (requires authentication)
router.get(
  "/protected",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      // Access the user information from the decoded token (available in req.user)
      // const { user } = req.user;
      // console.log("Protected", user);
      console.log(req.isAuthenticated());

      console.log("Protected");
      console.log(req);

      res.json({ message: "You have accessed the protected route!" });
    } catch (error) {
      console.error(error);
    }
  }
);

router.post("/logout", function (req, res, next) {
  try {
    console.log("isAuthenticated", req.isAuthenticated());
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
