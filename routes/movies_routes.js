var express = require('express');
var router = express.Router();
var movies_dal = require('../model/movies_dal');
//var address_dal = require('../model/address_dal');


// View All movies
router.get('/all', function(req, res) {
    movies_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('movies/moviesViewAll', { 'result':result });
        }
    });

});

// View the movies for the given id
router.get('/', function(req, res){
    if(req.query.title == null) {
        res.send('title is null');
    }
    else {
        movies_dal.getById(req.query.title, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('movies/moviesViewById', {'result': result});
            }
        });
    }
});

// Return the add a new movies form
router.get('/add', function(req, res) {
    // passing all the query parameters (req.query) to the insert function instead of each individually
    movies_dal.getAll(function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('movies/moviesAdd', {'title': result});
            }
        });
    });

// insert a movies record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.title == null) {
        res.send('Movie name must be provided.');
    }
    else if(req.query.genres == null) {
        res.send('An genre must be selected');
    }
    else if(req.query.year == null) {
        res.send('A year must be selected');
    }
    else if(req.query.director == null) {
        res.send('A director must be selected');
    }
    else if(req.query.book_title == null) {
        res.send('A book title must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        movies_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/movies/all');
            }
        });
    }
});

// Delete a movies for the given title
router.get('/delete', function(req, res){
    if(req.query.title == null) {
        res.send('title is null');
    }
    else {
        movies_dal.delete(req.query.title, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/movies/all');
            }
        });
    }
});

router.get('/edit2', function(req, res){
    if(req.query.title == null) {
        res.send('A title id is required');
    }
    else {
        movies_dal.getById(req.query.title, function(err, movies){
            res.render('movies/moviesUpdate', {movies: movies[0]});

        });
    }

});

router.get('/update', function(req, res){
    movies_dal.update(req.query, function(err, result){
        res.redirect(302, '/movies/all');
    });
});

// Delete a movies for the given movies
//router.get('/delete', function(req, res){
//    if(req.query.title == null) {
//        res.send('title is null');
//    }
//    else {
//        movies_dal.delete(req.query.title, function(err, result){
//            if(err) {
//                res.send(err);
//            }
//            else {
//                //poor practice, but we will handle it differently once we start using Ajax
//                res.redirect(302, '/movies/all');
//            }
//        });
//    }
//});

module.exports = router;