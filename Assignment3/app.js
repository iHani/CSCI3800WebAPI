/**
 * Created by Hani on 3/5/2016.
 */

var express = require('express');
var app = express();


app.get('/gets', function(req, res){
    var json = JSON.stringify(req.headers);
    res.set('Content-Type', 'text/json');
    res.send(json);
});

app.post('/posts', function(req, res){
    var json = JSON.stringify(req.headers);
    res.set('Content-Type', 'text/json');
    res.send(json);
});

app.put('/puts', function(req, res){
    var json = JSON.stringify(req.headers);
    res.set('Content-Type', 'text/json');
    res.send(json);
});

app.delete('/deletes', function(req, res){
    var json = JSON.stringify(req.headers);
    res.set('Content-Type', 'text/json');
    res.send(json);
});

app.use('*', function(req, res, next) {
    var err = new Error();
    err.status = 404;
    err.message = "This request is not supported";
    next(err);
});

// handling 404 errors
app.use(function(err, req, res, next) {
    if(err.status !== 404) {
        return next();
    }

    res.send(err.message || 'Something went wrong!');
});

app.listen(3000);
console.log("server running on http://localhost:3000/");
