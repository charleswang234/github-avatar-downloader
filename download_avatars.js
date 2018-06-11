var request = require('request');
var secret = require("./secrets.js");

console.log("Welcome to the Github Avatar Downloader");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': secret.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    cb(err, data);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  for (var i = 0; i < result.length; ++i) {
    console.log(result[i]['avatar_url'])
  }
  // console.log("Errors:", err);
  // console.log("Result:", result);
});


//