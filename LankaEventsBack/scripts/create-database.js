const mongoose = require("mongoose");

// URL de connexion à la base de données MongoDB
const url = "mongodb://localhost:27017";
const dbName = "lankaEvents";

// Définition du schéma pour les utilisateurs
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

// Définition du schéma pour les événements
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "Organizer" },
});

// Définition du schéma pour les organisateurs
const organizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

// Connexion à la base de données et création des modèles
mongoose
  .connect(`${url}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    const User = mongoose.model("User", userSchema);
    const Event = mongoose.model("Event", eventSchema);
    const Organizer = mongoose.model("Organizer", organizerSchema);

    // Création d'utilisateurs
    const users = [
      { username: "user1", password: "password1", email: "user1@example.com" },
      { username: "user2", password: "password2", email: "user2@example.com" },
    ];

    // Création d'événements
    const events = [
      { name: "Concert", date: new Date(), location: "Salle de concert A" },
      {
        name: "Conférence",
        date: new Date(),
        location: "Centre de conférences B",
      },
      { name: "Festival", date: new Date(), location: "Parc C" },
    ];

    // Création d'un organisateur
    const organizer = { name: "Organizer1", events: [] };

    // Insertion des utilisateurs, événements et organisateur dans la base de données
    Promise.all([
      User.insertMany(users),
      Event.insertMany(events),
      Organizer.create(organizer),
    ])
      .then(([insertedUsers, insertedEvents, insertedOrganizer]) => {
        console.log("Database created successfully");
        console.log("Inserted users:", insertedUsers);
        console.log("Inserted events:", insertedEvents);
        console.log("Inserted organizer:", insertedOrganizer);
        mongoose.disconnect(); // Fermeture de la connexion à MongoDB
      })
      .catch((error) => {
        console.error("Failed to create database:", error);
        mongoose.disconnect(); // Fermeture de la connexion à MongoDB
      });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
