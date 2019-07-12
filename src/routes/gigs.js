const express = require('express');
const router = express.Router();
const db = require('../server/database');


router.get('/', (req, res) => 
    database.findAll()
        .then(gigs => {
            console.log(gigs)
            res.sendStatus(200);
        })
        .catch(err => console.log(err))
);

module.exports = router;