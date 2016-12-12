var express = require('express');
var router = express.Router();
var book_dal = require('../model/book_dal');
//var address_dal = require('../model/address_dal');


// View All books
router.get('/all', function(req, res) {
    book_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('books/bookViewAll', { 'result':result });
        }
    });

});

// View the book for the given id
router.get('/', function(req, res){
    if(req.query.title == null) {
        res.send('title is null');
    }
    else {
        book_dal.getById(req.query.title, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('books/bookViewById', {'result': result});
            }
        });
    }
});

// Return the add a new book form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    book_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('books/bookAdd', {'title': result});
        }
    });
});

// insert a book record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.title == null) {
        res.send('Book name must be provided.');
    }
    else if(req.query.author == null) {
        res.send('An author must be selected');
    }
    else if(req.query.year_publication == null) {
        res.send('A year must be selected');
    }
    else if(req.query.genres == null) {
        res.send('A genre must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        book_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/books/all');
            }
        });
    }
});

// Delete a book for the given title
router.get('/delete', function(req, res){
    if(req.query.title == null) {
        res.send('title is null');
    }
    else {
        book_dal.delete(req.query.title, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/books/all');
            }
        });
    }
});

router.get('/edit2', function(req, res){
    if(req.query.title == null) {
        res.send('A title id is required');
    }
    else {
        book_dal.getById(req.query.title, function(err, books){
                res.render('books/bookUpdate', {books: books[0]});

        });
    }

});

router.get('/update', function(req, res){
    book_dal.update(req.query, function(err, result){
        res.redirect(302, '/books/all');
    });
});

// Delete a book for the given book
//router.get('/delete', function(req, res){
//    if(req.query.title == null) {
//        res.send('title is null');
//    }
//    else {
//        book_dal.delete(req.query.title, function(err, result){
//            if(err) {
//                res.send(err);
//            }
//            else {
//                //poor practice, but we will handle it differently once we start using Ajax
//                res.redirect(302, '/books/all');
//            }
//        });
//    }
//});

module.exports = router;