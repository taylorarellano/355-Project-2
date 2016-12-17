var express = require('express');
var router = express.Router();
var artist_dal = require('../model/artist_dal');
//var address_dal = require('../model/address_dal');


// View All artist
router.get('/all', function(req, res) {
    artist_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('artist/artistViewAll', { 'result':result });
        }
    });

});

// View the artist for the given id
router.get('/', function(req, res){
    if(req.query.name == null) {
        res.send('name is null');
    }
    else {
        artist_dal.getById(req.query.name, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('artist/artistViewById', {'result': result});
            }
        });
    }
});

// Return the add a new artist form
router.get('/add', function(req, res) {
    // passing all the query parameters (req.query) to the insert function instead of each individually
    artist_dal.getAll(function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('artist/artistAdd', {'name': result});
        }
    });
});

// insert a artist record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.name == null) {
        res.send('Name must be provided.');
    }
    else if(req.query.height == null) {
        res.send('A Height must be selected');
    }
    else if(req.query.gender == null) {
        res.send('A gender must be selected');
    }
    else if(req.query.age == null) {
        res.send('A age must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        artist_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/artist/all');
            }
        });
    }
});

// Delete a artist for the given name
router.get('/delete', function(req, res){
    if(req.query.name == null) {
        res.send('name is null');
    }
    else {
        artist_dal.delete(req.query.name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/artist/all');
            }
        });
    }
});

router.get('/edit2', function(req, res){
    if(req.query.name == null) {
        res.send('A name id is required');
    }
    else {
        artist_dal.getById(req.query.name, function(err, artist){
            res.render('artist/artistUpdate', {artist: artist[0]});

        });
    }

});

router.get('/update', function(req, res){
    artist_dal.update(req.query, function(err, result){
        res.redirect(302, '/artist/all');
    });
});

// Delete a artist for the given artist
//router.get('/delete', function(req, res){
//    if(req.query.name == null) {
//        res.send('name is null');
//    }
//    else {
//        artist_dal.delete(req.query.name, function(err, result){
//            if(err) {
//                res.send(err);
//            }
//            else {
//                //poor practice, but we will handle it differently once we start using Ajax
//                res.redirect(302, '/artist/all');
//            }
//        });
//    }
//});

module.exports = router;