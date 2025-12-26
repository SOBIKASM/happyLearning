const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
app.use(express.json())

app.use(cors())

// Replace <password> and <dbname> with your actual credential")
mongoose.connect(
  "mongodb+srv://sobikasm_db_user:sobidani@happylearningcluster.4xyivl0.mongodb.net/learningdb"
)

  .then(() => console.log("✅ Mongodb connected"))
  .catch((err) => console.error("❌ ERR:", err.message));

const countrySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    capital: { type: String, required: true },
    continent: { type: String, required: true },
    languages: {
        type: [String], // array of languages
        required: true
    },
    currency: {
        name: { type: String, required: true },
        code: { type: String, required: true }
    },
    population: { type: Number },
    area: { type: Number },

    flag: { type: String }, // URL to flag image
    map: { type: String },  // URL to map (Google Maps link, etc.)

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
    name: { type: String, required: true, unique: true },      // Full name, e.g. "Hydrogen"
    symbol: { type: String, required: true, unique: true },    // Symbol, e.g. "H"
    atomicNumber: { type: Number, required: true, unique: true }, // Atomic number, e.g. 1
    atomicMass: { type: Number, required: true },              // Atomic mass
    group: { type: Number },                                  // Group in periodic table
    period: { type: Number },                                 // Period in periodic table
    block: { type: String },                                  // s, p, d, f block
    category: { type: String },                               // e.g. Alkali metal, Noble gas

    stateAtRoomTemp: { type: String },                        // solid, liquid, gas
    meltingPoint: { type: Number },                           // in °C
    boilingPoint: { type: Number },                           // in °C
    density: { type: Number },                                // in g/cm³
    color: { type: String },                                  // observed color

    electronConfiguration: { type: String },                   // e.g. 1s1
    electronegativity: { type: Number },                      // value if known
    ionizationEnergy: { type: Number },                       // in kJ/mol
    oxidationStates: { type: [String] },                      // array of possible oxidation states

    naturalOccurrence: { type: String },                      // e.g. "Abundant in Earth's crust"
    majorCompounds: { type: [String] },                      // list of important compounds
    commonUses: { type: [String] },                          // e.g. "Batteries", "Fertilizers"
    hazards: { type: String },                               // toxicity, safety info

    isotopes: { type: [String] },                            // list of isotopes or info
    spectralLines: { type: [String] },                        // emission lines/colors if applicable

    funFacts: { type: String },                              // interesting trivia

    image: { type: String },                                 // URL to image or diagram
    wikiLink: { type: String }                               // link to Wikipedia or trusted source
}, { timestamps: true });



const galaxySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },                 // e.g., Spiral, Barred Spiral, Irregular
  constellation: { type: String },
  distance: { type: String },             // e.g., "30 million light-years"
  diameter: { type: String },             // e.g., "120,000 light-years"
  stars: { type: String },                // e.g., "100 billion"
  blackHole: { type: String },            // info about central black hole
  mass: { type: String },
  age: { type: String },
  structure: { type: String },
  redshift: { type: String },
  image: { type: String, default: "" },   // store URL to image
  formation: { type: String },
  discoveredBy: { type: String },
  funFact: { type: String },
  notableFeatures: { type: [String] },    // array of notable features
  observations: { type: [String] },       // array of observation instruments
  researchLinks: { type: [String] }       // array of links
}, { timestamps: true });


const constellationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String, required: true }, // e.g., "Constellation"
    constellationGroup: { type: String },
    distance: { type: String }, // e.g., "500–1,300 light-years"
    area: { type: String }, // e.g., "594 square degrees"
    brightestStars: { type: [String] }, // array of star names
    stars: { type: String }, // e.g., "7 main stars, plus dozens of fainter stars"
    deepSkyObjects: { type: [String] }, // e.g., ["Orion Nebula (M42)", "Horsehead Nebula"]
    mythology: { type: String },
    bestViewingSeason: { type: String },
    coordinates: {
        rightAscension: { type: String },
        declination: { type: String }
    },
    size: { type: String }, // e.g., "594 square degrees"
    notableFeatures: { type: [String] }, // array of interesting features
    observations: { type: [String] }, // array of observation notes
    image: { type: String }, // URL to image
    formation: { type: String },
    age: { type: String },
    redshift: { type: String },
    discoveredBy: { type: String },
    funFact: { type: String }
});

const worldWonderSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: { type: String }, // e.g., "Ancient", "Modern", "Natural"
    location: {
        country: { type: String, required: true },
        region: { type: String },
        coordinates: {
            latitude: { type: Number },
            longitude: { type: Number }
        }
    },
    builtYear: { type: String }, // e.g., "2560 BC" or "Completed in 1987"
    architecturalStyle: { type: String },
    description: { type: String, required: true },
    significance: { type: String }, // Why it's important culturally, historically, etc.
    visitorsPerYear: { type: Number },
    materials: { type: [String] }, // e.g., ["Stone", "Marble"]
    conservationStatus: { type: String }, // e.g., "UNESCO World Heritage", "Protected Site"
    image: { type: String }, // URL to image
    funFact: { type: String },
    moreInfoLinks: { type: [String] } // Additional links for details
});
const Wonders = mongoose.model('Wonder', worldWonderSchema);
const Constellation = mongoose.model('Constellation', constellationSchema);
const Galaxy = mongoose.model('Galaxy', galaxySchema);
const Country = mongoose.model("Country", countrySchema);
const Element = mongoose.model("Element",elementSchema)

const getCountry = async (req, res) => {
    try {
        const { name } = req.query
        if (!name) {
            return res.status(400).json({ message: "Provide country name" })
        }
        const normalisedName = name.replace(/\s+/, " ")
        const result = await Country.findOne({ name: new RegExp(`^${normalisedName}$`, "i") });

        if (!result) {
            return res.status(404)
        }
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }

}
const getall = async (req, res) => {
    try {
        const countries = await Country.find()
        res.json(countries)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch" })
    }
}
const getAllElements = async (req, res) => {
    try {
        const elements = await Element.find()
        res.json(elements)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch" })
    }
}
const getAllGalaxy = async (req, res) => {
    try {
        const galaxies = await Galaxy.find()
        res.json(galaxies)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch" })
    }
}
const getAllConstellation = async (req, res) => {
    try {
        const constellations = await Constellation.find()
        res.json(constellations)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch" })
    }
}
const getAllWonders = async (req, res) => {
    try {
        const wonders = await Wonders.find()
        res.json(wonders)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch" })
    }
}
app.get('/wonders',getAllWonders)
app.get('/constellations',getAllConstellation)
app.get('/country', getall)
app.get('/getCountry', getCountry)
app.get('/elements',getAllElements)
app.get('/galaxy',getAllGalaxy)

app.get("/", (req, res) => {
  res.send("✅ Backend is working! Try /country or /wonders endpoints.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
