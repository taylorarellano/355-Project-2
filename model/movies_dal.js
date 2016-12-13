var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view school_view as
 select s.*, a.street, a.zipcode from school s
 join address a on a.address_id = s.address_id;
 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM movies;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(title, callback) {
    var query = 'SELECT * FROM movies WHERE title = ?';
    var queryData = [title];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO movies (title, genres, year, director, book_title) VALUES (?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.title, params.genres, params.year, params.director, params.book_title];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(title, callback) {
    var query = 'DELETE FROM movies WHERE title = ?';
    var queryData = [title];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE movies SET title = ?, genres = ?, year = ?, director = ?, book_title = ? WHERE title = ?';
    var queryData = [params.title, params.genres, params.year, params.director, params.book_title];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS school_getinfo;
 DELIMITER //
 CREATE PROCEDURE school_getinfo (school_id int)
 BEGIN
 SELECT * FROM school WHERE school_id = school_id;
 SELECT a.*, school_id FROM address a
 LEFT JOIN school s on s.address_id = a.address_id;
 END //
 DELIMITER ;
 # Call the Stored Procedure
 CALL school_getinfo (4);
 */

exports.edit = function(title, callback) {
    var query = 'CALL movies';
    var queryData = [title];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};