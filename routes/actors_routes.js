var express = require('express');
var router = express.Router();
var actors_dal = require('../model/actors_dal');
//var address_dal = require('../model/address_dal');


// View All actors
router.get('/all', function(req, res) {
    actors_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('actors/actorsViewAll', { 'result':result });
        }
    });

});

// View the actors for the given id
router.get('/', function(req, res){
    if(req.query.name == null) {
        res.send('name is null');
    }
    else {
        actors_dal.getById(req.query.name, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('actors/actorsViewById', {'result': result});
            }
        });
    }
});

// Return the add a new actors form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    actors_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('actors/actorsAdd', {'name': result});
        }
    });
});

// insert a actors record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.name == null) {
        res.send('A name must be provided.');
    }
    else if(req.query.height == null) {
        res.send('A height must be selected');
    }
    else if(req.query.gender == null) {
        res.send('A gender must be selected');
    }
    else if(req.query.age == null) {
        res.send('An age must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        actors_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/actors/all');
            }
        });
    }
});

// Delete a actors for the given title
router.get('/delete', function(req, res){
    if(req.query.name == null) {
        res.send('Name is null');
    }
    else {
        actors_dal.delete(req.query.name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/actors/all');
            }
        });
    }
});

router.get('/edit2', function(req, res){
    if(req.query.name == null) {
        res.send('A name is required');
    }
    else {
        actors_dal.getById(req.query.name, function(err, actors){
            res.render('actors/actorsUpdate', {actors: actors[0]});

        });
    }

});

router.get('/update', function(req, res){
    actors_dal.update(req.query, function(err, result){
        res.redirect(302, '/actors/all');
    });
});

// Delete a actors for the given actors
//router.get('/delete', function(req, res){
//    if(req.query.title == null) {
//        res.send('title is null');
//    }
//    else {
//        actors_dal.delete(req.query.title, function(err, result){
//            if(err) {
//                res.send(err);
//            }
//            else {
//                //poor practice, but we will handle it differently once we start using Ajax
//                res.redirect(302, '/actors/all');
//            }
//        });
//    }
//});

module.exports = router;