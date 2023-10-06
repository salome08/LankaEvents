require("dotenv").config();
var passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserService = require("../services/userService");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const JWT_SECRET = "YOUR_JWT_SECRET";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

module.exports = (app) => {
  app.use(passport.initialize());

  // Google OAuth2.0 strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env["GOOGLE_CLIENT_ID"],
        clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
        callbackURL: "/auth/oauth2/redirect/google", // Replace with your callback URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          // Check if the user already exists in the database based on their Google ID
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            console.log("user not found in db");
            // If the user does not exist, create a new user in the database
            user = await UserService.create({
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
              profilePictureUrl: profile.photos[0].value,
            });

            console.log("init user", user);
          }

          console.log("user before token sign", user);
          // Create a JWT token with the user data
          const token = jwt.sign(
            {
              id: user._id,
              email: user.email,
              name: user.name,
              pictureUrl: user.profilePictureUrl,
            },
            JWT_SECRET,
            { expiresIn: "1h" }
          );

          // Return the token to be used by the client
          return done(null, token);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.use(
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      try {
        console.log("in jwt strategy", jwt_payload);

        const user = await User.findOne({ _id: jwt_payload.id });
        console.log("user", user);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      } catch (error) {
        console.error("JWT Strategy error", error);
        return done(err, false);
      }
    })
  );
};
