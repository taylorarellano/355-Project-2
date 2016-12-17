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
    var query = 'SELECT * FROM artist;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(name, callback) {
    var query = 'SELECT * FROM artist WHERE name = ?';
    var queryData = [name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO artist (name, height, gender, age) VALUES (?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.name, params.genres, params.year, params.director, params.book_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(name, callback) {
    var query = 'DELETE FROM artist WHERE name = ?';
    var queryData = [name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.update = function(params, callback) {
    var query = 'UPDATE artist SET name = ?, genres = ?, year = ?, director = ?, book_name = ? WHERE name = ?';
    var queryData = [params.name[1], params.genres, params.year, params.director, params.book_name, params.name[0]];

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

exports.edit = function(name, callback) {
    var query = 'CALL artist';
    var queryData = [name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};