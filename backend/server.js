require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not defined in .env");
  process.exit(1);
}

// MongoDB Connection Options
const mongooseOptions = {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
};

// Connection Event Listeners
mongoose.connection.on('connected', () => {
    console.log(`✅ MongoDB connected to: ${mongoose.connection.name}`);
});

mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB disconnected');
});

// Models
const worldWonderSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String },
    location: {
        country: { type: String, required: true },
        region: { type: String },
        coordinates: {
            latitude: { type: Number },
            longitude: { type: Number }
        }
    },
    builtYear: { type: String },
    architecturalStyle: { type: String },
    description: { type: String, required: true },
    significance: { type: String },
    visitorsPerYear: { type: Number },
    materials: { type: [String] },
    conservationStatus: { type: String },
    image: { type: String },
    funFact: { type: String },
    moreInfoLinks: { type: [String] }
});

const countrySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    capital: { type: String, required: true },
    continent: { type: String, required: true },
    languages: { type: [String], required: true },
    currency: {
        name: { type: String, required: true },
        code: { type: String, required: true }
    },
    population: { type: Number },
    area: { type: Number },
    flag: { type: String },
    map: { type: String },
    nationalSymbols: {
        animal: { type: String },
        bird: { type: String },
        flower: { type: String },
        tree: { type: String },
        sport: { type: String }
    },
    landmark: { type: String },
    food: { type: String },
    funFact: { type: String }
});

const elementSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    symbol: { type: String, required: true, unique: true },
    atomicNumber: { type: Number, required: true, unique: true },
    atomicMass: { type: Number, required: true },
    group: { type: Number },
    period: { type: Number },
    block: { type: String },
    category: { type: String },
    stateAtRoomTemp: { type: String },
    meltingPoint: { type: Number },
    boilingPoint: { type: Number },
    density: { type: Number },
    color: { type: String },
    electronConfiguration: { type: String },
    electronegativity: { type: Number },
    ionizationEnergy: { type: Number },
    oxidationStates: { type: [String] },
    naturalOccurrence: { type: String },
    majorCompounds: { type: [String] },
    commonUses: { type: [String] },
    hazards: { type: String },
    isotopes: { type: [String] },
    spectralLines: { type: [String] },
    funFacts: { type: String },
    image: { type: String },
    wikiLink: { type: String }
}, { timestamps: true });

const galaxySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String },
    constellation: { type: String },
    distance: { type: String },
    diameter: { type: String },
    stars: { type: String },
    blackHole: { type: String },
    mass: { type: String },
    age: { type: String },
    structure: { type: String },
    redshift: { type: String },
    image: { type: String, default: "" },
    formation: { type: String },
    discoveredBy: { type: String },
    funFact: { type: String },
    notableFeatures: { type: [String] },
    observations: { type: [String] },
    researchLinks: { type: [String] }
}, { timestamps: true });

const constellationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    constellationGroup: { type: String },
    distance: { type: String },
    area: { type: String },
    brightestStars: { type: [String] },
    stars: { type: String },
    deepSkyObjects: { type: [String] },
    mythology: { type: String },
    bestViewingSeason: { type: String },
    coordinates: {
        rightAscension: { type: String },
        declination: { type: String }
    },
    size: { type: String },
    notableFeatures: { type: [String] },
    observations: { type: [String] },
    image: { type: String },
    formation: { type: String },
    age: { type: String },
    redshift: { type: String },
    discoveredBy: { type: String },
    funFact: { type: String }
});

const Wonders = mongoose.model('Wonder', worldWonderSchema);
const Constellation = mongoose.model('Constellation', constellationSchema);
const Galaxy = mongoose.model('Galaxy', galaxySchema);
const Country = mongoose.model("Country", countrySchema);
const Element = mongoose.model("Element", elementSchema);

// Controllers
const getCountry = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) return res.status(400).json({ message: "Provide country name" });
        const normalisedName = name.replace(/\s+/, " ");
        const result = await Country.findOne({ name: new RegExp(`^${normalisedName}$`, "i") });
        if (!result) return res.status(404).json({ message: "Country not found" });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getall = async (req, res) => {
    try {
        const countries = await Country.find().sort({ name: 1 });
        res.json(countries);
    } catch (err) {
        console.error("Error in getall:", err);
        res.status(500).json({ error: err.message || "Failed to fetch" });
    }
};

const getAllElements = async (req, res) => {
    try {
        const elements = await Element.find().sort({ atomicNumber: 1 });
        res.json(elements);
    } catch (err) {
        console.error("Error in getAllElements:", err);
        res.status(500).json({ error: err.message || "Failed to fetch" });
    }
};

const getAllGalaxy = async (req, res) => {
    try {
        const galaxies = await Galaxy.find().sort({ name: 1 });
        res.json(galaxies);
    } catch (err) {
        console.error("Error in getAllGalaxy:", err);
        res.status(500).json({ error: err.message || "Failed to fetch" });
    }
};

const getAllConstellation = async (req, res) => {
    try {
        const constellations = await Constellation.find().sort({ name: 1 });
        res.json(constellations);
    } catch (err) {
        console.error("Error in getAllConstellation:", err);
        res.status(500).json({ error: err.message || "Failed to fetch" });
    }
};

const getAllWonders = async (req, res) => {
    try {
        const wonders = await Wonders.find().sort({ name: 1 });
        res.json(wonders);
    } catch (err) {
        console.error("Error in getAllWonders:", err);
        res.status(500).json({ error: err.message || "Failed to fetch" });
    }
};

// Routes
app.get('/wonders', getAllWonders);
app.get('/constellations', getAllConstellation);
app.get('/country', getall);
app.get('/getCountry', getCountry);
app.get('/elements', getAllElements);
app.get('/galaxy', getAllGalaxy);
app.get("/", (req, res) => res.send("✅ Backend is working! Try /country or /wonders endpoints."));

// Startup Function
const startServer = async () => {
    try {
        console.log("⏳ Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI, mongooseOptions);
        
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    } catch (err) {
        console.error("❌ Fatal Error during startup:", err.message);
        process.exit(1);
    }
};

startServer();
