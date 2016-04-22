var express = require('express');
var app = express();

app.get('/gets', function(req, res){
    returnGitHub(res);
})

function returnGitHub(res) {
    var GitHubApi = require("github");
    var github = new GitHubApi({
        // required
        version: "3.0.0"
    });

    var token = "";

    github.authenticate({
        type: "oauth",
        token: token
    });

    github.user.getFollowingFromUser({
        user: "ihani"
    }, function(err, res1) {
        console.log("GOT ERR?", err);
        console.log("GOT RES?", res);
        res.json(res1);
    });
}

app.listen(3000);
console.log("server running on http://localhost:3000/gets");



