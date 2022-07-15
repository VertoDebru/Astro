const Elements = require("../models/Elements");

// Récupération des éléments. ( GET api/elements/:id )
exports.getElements = (req,res) => {
    const idElements = req.params.id;

    console.log("[INFO] New get request for Elements.");
    // Renvoi les données de tous les éléments.
    if(!idElements) {
        Elements.find().then( (elements) => {
            if(!elements.length) {
                res.status(204).json({message: 'Empty!'});
                console.log(`[SUCCESS] Get Elements is empty!`);
            }
            else {
                res.status(200).json({elements});
                console.log("[SUCCESS] Get Elements complete!");
            }
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json({message: 'GET ELEMENTS : ERROR!'});
            console.log(`[ERROR] In Get Request All Elements!`);
        });
    }
    // Renvoi les données de l'élément selon son id.
    else {
        Elements.findOne({ _id: idElements }).then( (element) => {
            res.status(200).json({element});
            console.log(`[SUCCESS] Get Element : '${element.name}' complete!`);
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json({message: 'GET ELEMENT : ERROR!'});
            console.log(`[ERROR] In Get Request Element!`);
        });
    }
};
