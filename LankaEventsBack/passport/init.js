require("dotenv").config();
var passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserService = require("../services/userService");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Organizer = require("../models/Organizer");
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
    "google",
    new GoogleStrategy(
      {
        clientID: process.env["GOOGLE_CLIENT_ID"],
        clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
        callbackURL: "/auth/oauth2/redirect/google", // Replace with your callback URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("Google strategy");
          // Check if the user already exists in the database based on their Google ID
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            console.log("user not found in db");
            // If the user does not exist, create a new user in the database
            user = await UserService.create({
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
              firstname: profile.name.givenName,
              lastname: profile.name.familyName,
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
              firstname: user.firstname,
              lastname: user.lastname,
              pictureUrl: user.profilePictureUrl,
            },
            JWT_SECRET
            // { expiresIn: "3h" }
          );

          // Return the token to be used by the client
          return done(null, token);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  // Google-organizer OAuth2.0 strategy
  passport.use(
    "google-organizer",
    new GoogleStrategy(
      {
        clientID: process.env["GOOGLE_CLIENT_ID"],
        clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
        callbackURL: "/auth/oauth2/redirect/google-organizer", // Replace with your callback URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("Google organizer strategy");
          // Check if the user already exists in the database based on their Google ID
          // const user = await User.findOne({
          //   googleId: "113750437949294234892",
          // });
          let user = await User.findOne({ googleId: profile.id });

          // Return null if user not found
          if (!user) return done(null, null);

          const organizer = await Organizer.findOne({ userId: user._id });
          console.log(organizer);
          // Create a JWT token with the user data + organizerId
          const token = jwt.sign(
            {
              id: organizer?._id || null,
              userId: user._id,
            },
            JWT_SECRET
            // { expiresIn: "3h" }
          );

          // Return null if user not found, user token with organizerId if user
          return done(null, token);
        } catch (error) {
          console.log(error);
          return done(error, false);
        }
      }
    )
  );

  passport.use(
    "jwt",
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

  passport.use(
    "jwt-organizer",
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      try {
        console.log("in jwt organizer strategy", jwt_payload);

        const organizer = await Organizer.findOne({ _id: jwt_payload.id });
        console.log("organizer", organizer);
        if (organizer) {
          return done(null, organizer);
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
