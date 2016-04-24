var usergrid = require('usergrid'); //npm install usergrid
var express = require('express');   //npm install express
var app = express();
var request = require('request');   //npm install request
var client = new usergrid.client({
    orgName:'hanialghamdi',
    appName:'sandbox',
});

//QUERY ENTITIES IN THE COLLECTION
//This will output any query on the movie collection
//usage is passed through as a part of the url.
//Example: Enter 127.0.0.1:3000/movies?ql=select * where year=2008 as a
//GET request and the results of that query will be returned.
app.get('/movies', function(req, res){

    var options = {
        url: "https://api.usergrid.com/hanialghamdi/sandbox/" + req.originalUrl
    };

//Make a get request with the specific query parameters to the
//Apigee BaaS database and pull up the results as the response.
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            res.send(info);
        }
        else
        {
            res.status(400).send('error getting movies');
        }
    }
    request(options, callback);
})

//CREATE A NEW ENTITY
//creates an new movie entity by passing the parameters through
//the url. Example:
//127.0.0.1:3000/movies?name=Bridesmaids&debut=2011&actors=Kristen Wig, Mya Rudolf, Melissa McCarthy

app.post('/movies', function (req, res){
if(!req.query.name || !req.query.year || !req.query.actors) {
    res.send('There was an error in creating the entity.');
} else {
    var options = {
        type: 'movies',
        name: req.query.name,
        year: req.query.year,
        actors: req.query.actors,
        getOnExist: true
    };
    //Call createEntity to initiate the API call
    dataClient.createEntity(options, function(error, result){
        if(error) {
            var info = JSON.parse(body);
            res.send(info);
        } else {
            res.status(200).send('New movie posted successfully');
        }
    });
}
})

//DELETE AN EXISTING ENTITY
//This will retrieve the entity listed by name and, at which
//point will delete it from the collection.
app.delete('/movies', function (req, res) {
    var options = {
        type: 'movies',
        name: req.query.name,
        getOnExist: true
    };
//create the entity object
    var entity = new Usergrid.entity(options);
//call destroy() to initiate the API DELETE request
    entity.destroy(function (error, result) {
        if (error) {
            var info = JSON.parse(body);
            res.send(info);
        } else {
            res.status(200).send('Movie deleted successfully');
        }
    });
})

app.listen(3000);
console.log("test http://127.0.0.1:3000/movies?ql=select * where year=2008");