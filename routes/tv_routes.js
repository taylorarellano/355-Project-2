var express = require('express');
var router = express.Router();
var tv_dal = require('../model/tv_dal');
//var address_dal = require('../model/address_dal');


// View All tv
router.get('/all', function(req, res) {
    tv_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('tv/tvViewAll', { 'result':result });
        }
    });

});

// View the tv for the given id
router.get('/', function(req, res){
    if(req.query.title == null) {
        res.send('title is null');
    }
    else {
        tv_dal.getById(req.query.title, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('tv/tvViewById', {'result': result});
            }
        });
    }
});

// Return the add a new tv form
router.get('/add', function(req, res) {
    // passing all the query parameters (req.query) to the insert function instead of each individually
    tv_dal.getAll(function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('tv/tvAdd', {'title': result});
        }
    });
});

// insert a tv record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.title == null) {
        res.send('title must be provided.');
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
        tv_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/tv/all');
            }
        });
    }
});

// Delete a tv for the given title
router.get('/delete', function(req, res){
    if(req.query.title == null) {
        res.send('title is null');
    }
    else {
        tv_dal.delete(req.query.title, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/tv/all');
            }
        });
    }
});

router.get('/edit2', function(req, res){
    if(req.query.title == null) {
        res.send('A title id is required');
    }
    else {
        tv_dal.getById(req.query.title, function(err, tv){
            res.render('tv/tvUpdate', {tv: tv[0]});

        });
    }

});

router.get('/update', function(req, res){
    tv_dal.update(req.query, function(err, result){
        res.redirect(302, '/tv/all');
    });
});

// Delete a tv for the given tv
//router.get('/delete', function(req, res){
//    if(req.query.title == null) {
//        res.send('title is null');
//    }
//    else {
//        tv_dal.delete(req.query.title, function(err, result){
//            if(err) {
//                res.send(err);
//            }
//            else {
//                //poor practice, but we will handle it differently once we start using Ajax
//                res.redirect(302, '/tv/all');
//            }
//        });
//    }
//});

module.exports = router;