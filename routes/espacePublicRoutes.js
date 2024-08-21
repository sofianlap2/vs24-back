// Import necessary modules
const express = require('express');
const router = express.Router();
const EspacePublic = require('../models/espacePublic');
const User = require("../models/user");
const Publicite = require("../models/publicite")
const Authorisation = require("../security/authorisation");
const asyncErrorHandler = require('../security/asyncErrorHandler');
const Station = require('../models/station');
// const Station = require('../models/station');

router.post('/:email/addEspacePublic', asyncErrorHandler( async (req, res) => {
  
    // Validate user input (optional but recommended)
    if (!req.body.nomEspace || !req.body.gouvernorat || !req.body.ville || !req.body.user || !req.body.typeEspace) {
      return res.status(400).json({ error: 'Missing required fields in request body' });
    }

    const { nomEspace, gouvernorat, ville, user, typeEspace } = req.body;

    // Check for duplicate EspacePublic
    const existingEspacePublic = await EspacePublic.findOne({
      nomEspace,
      gouvernorat,
      ville,
      user
    }).collation({ locale: 'fr', strength: 2 });

    if (existingEspacePublic) {
      return res.status(400).json({ 
        status: 'ERROR',
        message: 'Espace Public avec ces détails existe déjà' 
      });
    }

    // Create a new instance of EspacePublic using data from request body
    const newEspacePublic = new EspacePublic({
      nomEspace,
      gouvernorat,
      ville,
      typeEspace,
      user, // Assuming user ID is in request body
    });

    // Save the new instance to the database
    const savedEspacePublic = await newEspacePublic.save();

    // Send a success response
    res.status(200).json(savedEspacePublic);
  
}));


router.get("/espacePublicManagement", Authorisation, async (req, res) => {
  try {
    const espacePublic = await EspacePublic.find().populate('user'); 
    res.json(espacePublic);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch EspacePublic" });
  }
});
router.get('/:email/espaceForStation', Authorisation, async (req, res) => {
  try {
    // Find users with role 'client' (lowercase for consistency)
    const espaces = await EspacePublic.find();

    // Send response with users
    res.json(espaces);
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: "Failed to fetch users with client role" });
  }
});
router.get('/:email/espaceFilterForStation', Authorisation, async (req, res) => {
  try {
    const { gouvernorat, ville,typeEspace } = req.query;
    let filter = {};

    if (gouvernorat) {
      filter.gouvernorat = gouvernorat;
    }

    if (ville) {
      filter.ville = ville;
    }
    if (typeEspace) {
      filter.typeEspace = typeEspace;
    }

    const espaces = await EspacePublic.find(filter);
    res.json(espaces);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch espacePublic" });
  }
});
router.get('/espaceFilterFordemandePub', async (req, res) => {
  try {
    const { gouvernorat, ville,typeEspace } = req.query;
    let filter = {};

    if (gouvernorat) {
      filter.gouvernorat = gouvernorat;
    }

    if (ville) {
      filter.ville = ville;
    }
    if (typeEspace) {
      filter.typeEspace = typeEspace;
    }
    

    const espaces = await EspacePublic.find(filter);
    res.json(espaces);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch espacePublic" });
  }
});
const gouvernoratCitiesMap = {
  Ariana: ["Ariana Ville", "Ettadhamen", "Kalâat el-Andalous", "La Soukra", "Mnihla", "Raoued", "Sidi Thabet"],
  Béja:["Amdoun","Béja Nord","Béja Sud","Goubellat","Medjez el-Bab","Nefza","Téboursouk","Testour","Thibar"],
  BenArous:["Ben Arous","Bou Mhel el-Bassatine","El Mourouj","Ezzahra","Fouchana","Hammam Chott","Hammam Lif","Mohamedia","Medina Jedida","Mégrine","Mornag","Radès"],
  Bizerte: ["Bizerte Nord","Bizerte Sud","El Alia","Ghar El Melh","Ghezala","Joumine","Mateur","Menzel Bourguiba","Menzel Jemil","Ras Jebel","Sejnane","Tinja","Utique","Zarzouna"],
  Gabès: ["Gabès Médina","Gabès Ouest","Gabès Sud","Ghannouch","El Hamma","Matmata","Mareth","Menzel El Habib","Métouia","Nouvelle Matmata"],
  Gafsa: ["Belkhir","El Guettar","El Ksar","Gafsa Nord","Gafsa Sud","Mdhilla","Métlaoui","Moularès","Redeyef","Sened","Sidi Aïch"],
  Jendouba: ["Aïn Draham","Balta-Bou Aouane","Bou Salem","Fernana","Ghardimaou","Jendouba Sud","Jendouba Nord","Oued Meliz","Tabarka"],
  Kairouan: ["Bou Hajla","Chebika","Echrarda","El Alâa","Haffouz","Hajeb El Ayoun","Kairouan Nord","Kairouan Sud","Nasrallah","Oueslatia","Sbikha"],
  Kasserine: ["El Ayoun","Ezzouhour","Fériana","Foussana","Haïdra","Hassi El Ferid","Jedelienne","Kasserine Nord","Kasserine Sud","Majel Bel Abbès","Sbeïtla","Sbiba","Thala"],
  Kébili: ["Douz Nord","Douz Sud","Faouar","Kébili Nord","Kébili Sud","Souk Lahad"],
  LeKef: ["Dahmani","Jérissa","El Ksour","Sers","Kalâat Khasba","Kalaat Senan","Kef Est","Kef Ouest","Nebeur","Sakiet Sidi Youssef","Tajerouine"],
  Mahdia: ["Bou Merdes","Chebba","Chorbane","El Jem","Essouassi","Hebira","Ksour Essef","Mahdia","Melloulèche","Ouled Chamekh","Sidi Alouane","Rejiche","El Bradâa"],
  LaManouba: ["Den Den","Douar Hicher","Oued Ellil","Mornaguia","Borj El Amri","Djedeida","Tebourba","El Batan"],
  Médenine: ["Ben Gardane","Beni Khedache","Djerba - Ajim","Djerba - Houmt Souk","Djerba - Midoun","Médenine Nord","Médenine Sud","Sidi Makhlouf","Zarzis"],
  Monastir: ["Bekalta","Bembla","Beni Hassen","Jemmal","Ksar Hellal","Ksibet el-Médiouni","Moknine","Monastir","Ouerdanine","Sahline","Sayada-Lamta-Bou Hajar","Téboulba","Zéramdine"],
  Nabeul: ["Béni Khalled","Béni Khiar","Bou Argoub","Dar Chaâbane El Fehri","El Haouaria","El Mida","Grombalia","Hammam Ghezèze","Hammamet","Kélibia","Korba","Menzel Bouzelfa","Menzel Temime","Nabeul","Soliman","Takelsa"],
  Sfax: ["Agareb","Bir Ali Ben Khalifa","El Amra","El Hencha","Graïba","Jebiniana","Kerkennah","Mahrès","Menzel Chaker","Sakiet Eddaïer","Sakiet Ezzit","Sfax Ouest","Sfax Sud","Sfax Ville","Skhira","Thyna"],
  SidiBouzid: ["Bir El Hafey","Cebbala Ouled Asker","Jilma","Meknassy","Menzel Bouzaiane","Mezzouna","Ouled Haffouz","Regueb","Sidi Ali Ben Aoun","Sidi Bouzid Est","Sidi Bouzid Ouest","Souk Jedid"],
  Siliana: ["Bargou","Bou Arada","El Aroussa","El Krib","Gaâfour","Kesra","Makthar","Rouhia","Sidi Bou Rouis","Siliana Nord","Siliana Sud"],
  Sousse: ["Akouda","Bouficha","Enfida","Hammam Sousse","Hergla","Kalâa Kebira","Kalâa Seghira","Kondar","M'saken","Sidi Bou Ali","Sidi El Hani","Sousse Jawhara","Sousse Médina","Sousse Riadh","Sousse Sidi Abdelhamid"],
  Tataouine: ["Bir Lahmar","Dehiba","Ghomrassen","Remada","Smâr","Tataouine Nord","Tataouine Sud"],
  Tozeur: ["Degache","Hazoua","Nefta","Tameghza","Tozeur"],
  Tunis: ["Bab El Bhar","Bab Souika","Carthage","Cité El Khadra","Djebel Jelloud","El Kabaria","El Menzah","El Omrane","El Omrane supérieur","El Ouardia","Ettahrir","Ezzouhour","Hraïria","La Goulette","La Marsa","Le Bardo","Le Kram","La Médina","Séjoumi","Sidi El Béchir","Sidi Hassine"],
  Zaghouan: ["Bir Mcherga","El Fahs","Nadhour","Saouaf","Zaghouan","Zriba"]
};
router.get('/cities/:gouvernorat', async (req, res) => {
  try {
    const { gouvernorat } = req.params;
    const cities = gouvernoratCitiesMap[gouvernorat] || [];
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});
// router.get('/stations', async (req, res) => {
//   try {
//     const {espacePublic } = req.query;
//     let filter = {};

//     if (espacePublic) {
//       filter.espacePublic = espacePublic;
//     }

//     const stationE = await Station.find(filter);
//     res.json(stationE);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch espacePublic" });
//   }
// });


router.get("/:email/geographieChart",Authorisation, async (req, res) => {
    try {
        const countByGouvernorat = await EspacePublic.aggregate([
            {
                $group: {
                    _id: '$gouvernorat',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(countByGouvernorat);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch EspacePublic" });
    }
});
router.delete("/:_id", (req, res) => {
  const { _id } = req.params;

  EspacePublic.findOneAndDelete({ _id })
      .then((espacePublic) => {
          if (!espacePublic) {
              return res.sendStatus(404); // Demande not found
          }
          res.sendStatus(200); // Successful deletion
      })
      .catch((error) => {
          res.sendStatus(500); // Internal server error
      });
});
///////////////////////////////////////////////////////////////////////////////////////
router.get('/statistics1/:gouvernorat', async (req, res) => {
  const gouvernorat = req.params.gouvernorat;
  
  if (!gouvernorat) {
    return res.status(400).send("Gouvernorat manquant.");
  }

  try {
    console.log("Gouvernorat reçu :", gouvernorat);
    const stats = await getStatisticsByGouvernoratAndType1(gouvernorat);
    console.log("Statistiques obtenues :", stats);
    res.json(stats);
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des statistiques." });
  }
});

const getStatisticsByGouvernoratAndType1 = async(gouvernorat)=>{

  try{
      const stats =EspacePublic.aggregate([
        {
          $match:{gouvernorat}
        },
        {
          $group:{
            _id:{typeEspace :'$typeEspace'},
            count:{$sum :1}
          }
        },
        {
          $project:{
            _id:0,
            typeEspace:'$_id.typeEspace',
            count:1
          }
        },
        {
          $sort:{typeEspace : 1}

        }
        
      ]);
      console.log('statistics avant retour ',stats);
      return stats;

  }
  catch(error){
    console.error("erreur lors de l' aggregation de statistics ");
    throw error;
  }
};
////////////////////////////////////////////////////////////////////
router.get('/statistics', async (req, res) => {
  try {
    const stats = await getStatisticsByGouvernoratAndType();
    res.json(stats);
  } catch (error) {
    res.status(500).send("Erreur lors de la récupération des statistiques.");
  }
});

const getStatisticsByGouvernoratAndType = async () => {
  try {
    const statistics = await EspacePublic.aggregate([
      {
        $group: {
          _id: { gouvernorat: "$gouvernorat", typeEspace: "$typeEspace" },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          gouvernorat: "$_id.gouvernorat",
          typeEspace: "$_id.typeEspace",
          count: 1
        }
      },
      {
        $sort: { gouvernorat: 1, typeEspace: 1 }
      }
    ]);

    return statistics;
  } catch (error) {
    console.error("Erreur lors de l'agrégation des statistiques :", error);
    throw error;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


const getStatisticsStationByGouvernoratAndType = async (gouvernorat) => {
  try {
    const statistics = await Station.aggregate([
      {
        $lookup: {
          from: 'espacepublics', // Nom de la collection EspacePublic
          localField: 'espacePublic',
          foreignField: '_id',
          as: 'espacePublicDetails'
        }
      },
      {
        $unwind: '$espacePublicDetails'
      },
      {
        $match: { 'espacePublicDetails.gouvernorat': gouvernorat }
      },
      {
        $group: {
          _id: {
            gouvernorat: '$espacePublicDetails.gouvernorat',
            typeEspace: '$espacePublicDetails.typeEspace'
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          gouvernorat: '$_id.gouvernorat',
          typeEspace: '$_id.typeEspace',
          count: 1
        }
      },
      {
        $sort: { gouvernorat: 1, typeEspace: 1 }
      }
    ]);

    return statistics;
  } catch (error) {
    console.error("Erreur lors de l'agrégation des statistiques :", error);
    throw error;
  }
};

router.get('/getStatisticsStationByGouvernoratAndType/:gouvernorat', async (req, res) => {
  const { gouvernorat } = req.params;
  try {
    const stats = await getStatisticsStationByGouvernoratAndType(gouvernorat);
    res.json(stats);
  } catch (error) {
    res.status(500).send("Erreur lors de la récupération des statistiques.");
  }
});

//////////////////////////////////////////////////////////////////////////
router.get('/getTotalCounts', async (req, res) => {
  try {
    const totalCounts = await getTotalCounts();
    res.status(200).json(totalCounts);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des totaux', error });
  }
});

const getTotalCounts = async () => {
  try {
    const totalEspacesPublics = await EspacePublic.countDocuments();
    const totalStations = await Station.countDocuments();

    return { totalEspacesPublics, totalStations };
  } catch (error) {
    console.error("Erreur lors de la récupération des totaux :", error);
    throw error;
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////
  router.get("/:email/espacesPublicByGouvernorat", Authorisation, async (req, res) => {
    try {
        // Get the user's email from the Authorisation middleware
        const userEmail = req.userEmail;
 
        // Find the user by email
        const user = await User.findOne({ email: userEmail });
 
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
 
        // Aggregate EspacePublic by gouvernorat, filtering by the user's ID
        const countByGouvernorat = await EspacePublic.aggregate([
            {
                $match: {
                    user: user._id
                }
            },
            {
                $group: {
                    _id: '$gouvernorat',
                    count: { $sum: 1 }
                }
            }
        ]);
 
        res.json(countByGouvernorat);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch EspacePublic" });
    }
});
////////////////////////////////////////////////////////////////////////////////////
router.get("/getEspacePublic/:id", async (req, res) => {
  try {
    const espacePublic = await EspacePublic.findById(req.params.id);
    res.json(espacePublic);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
// backend/routes/espacePublic.js or where you define your routes
router.put("/updateEspacePublic/:id", async (req, res) => {
  try {
    const updatedEspacePublic = await EspacePublic.findByIdAndUpdate(
      req.params.id, // Use req.params.id for the espacePublic ID
      req.body,     // The updated data will be in req.body
      { new: true } // Return the updated document
    );
    
    if (!updatedEspacePublic) {
      return res.status(404).json({ msg: 'EspacePublic not found' });
    }

    res.json(updatedEspacePublic);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});
router.get('/EspacesClient', Authorisation, async (req, res) => {
  try {
    // Find reclamations by user ID
    const userEspaces = await EspacePublic.find({ user: req.userId })
       // Populate the cathegorie field if needed
      .exec();

    // Send a success response with the user's reclamations
    res.status(200).json(userEspaces);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user espace" });
  }
});
router.get('/EspacesPublicitaire', async (req, res) => {
  try {
    const espaces = await EspacePublic.find({});
    const ads = await Publicite.find({}).select('espacePublic -_id');

    // Flatten the array of espacePublic in advertisements
    const usedEspacePublics = ads.flatMap(ad => ad.espacePublic);

    res.status(200).send({ espaces, usedEspacePublics });
  } catch (error) {
    res.status(500).send({ error: 'Error fetching public spaces and advertisements' });
  }
});
router.get('/espaceFilterForPublicite', Authorisation, asyncErrorHandler(async (req, res) => {
 
    const userEmail = req.userEmail; // Assuming userEmail is available in the request object
    const { gouvernorat, ville, typeEspace } = req.query;

    // Fetch the user ID based on the email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = user._id;

    let filter = {};

    if (gouvernorat) {
      filter.gouvernorat = gouvernorat;
    }

    if (ville) {
      filter.ville = ville;
    }

    if (typeEspace) {
      filter.typeEspace = typeEspace;
    }

    // Find all Publicites created by the current user
    const userPublicites = await Publicite.find({ user: userId });

    // Extract espacePublic IDs from these Publicites
    const userEspaceIds = userPublicites.map(ad => ad.espacePublic).flat();

    // Find EspacePublic that are not in userEspaceIds and apply filter
    const espaces = await EspacePublic.find({
      ...filter,
      _id: { $nin: userEspaceIds }
    });

    res.json(espaces);
  
}));


router.get('/espacePubliciteManagemenet', Authorisation, async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is available in the request object

    // Find all Publicites created by the current user
    const userPublicites = await Publicite.find({ user: userId });

    // Extract espacePublic IDs from these Publicites
    const userEspaceIds = userPublicites.map(ad => ad.espacePublic).flat();

    // Fetch details of each Espace based on the extracted IDs
    const userEspaces = await EspacePublic.find({ _id: { $in: userEspaceIds } });

    res.json(userEspaces);
  } catch (error) {
    console.error('Error fetching filtered espaces:', error.message);
    res.status(500).json({ error: 'Failed to fetch espacePublic' });
  }
});
router.get('/ClientespacePubliciteManagemenet', Authorisation, async (req, res) => {
  try {
    const userId = req.userId; // ID de l'utilisateur connecté

    // Étape 1: Trouver tous les espaces publics créés par l'utilisateur connecté
    const userEspaces = await EspacePublic.find({ user: userId }).select('_id');

    // Étape 2: Extraire les IDs de ces espaces publics
    const userEspaceIds = userEspaces.map(espace => espace._id);

    // Étape 3: Trouver les publicités qui appartiennent à ces espaces publics et dont le statut est "Accepté"
    const acceptedPublicites = await Publicite.find({
      espacePublic: { $in: userEspaceIds },
      status: 'Accepté',
    }).populate('espacePublic').populate('user'); 

   

    res.status(200).json(acceptedPublicites); // Retourner les publicités filtrées
  } catch (error) {
    console.error('Error fetching filtered publicites:', error.message);
    res.status(500).json({ error: 'Failed to fetch publicites' });
  }
});

module.exports = router;
