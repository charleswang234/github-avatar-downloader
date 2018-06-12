var args = process.argv.slice(2, 4);

if (args[0] === undefined) {
  throw "You did not enter the repoOwner and repoName";
} else if (args[1] === undefined) {
  throw "You did not enter the repoName";
}
var request = require('request');
var secret = require("./secrets.js");
var fs = require('fs');


console.log("Welcome to the Github Avatar Downloader");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + args[0] + "/" + args[1] + "/contributors",
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


function downloadImageByURL(url, filePath) {
  request.get(url)
          .on('response', function (response) {
          })
          .pipe(fs.createWriteStream(filePath));
}


getRepoContributors("jquery", "jquery", function(err, result) {
  for (var i = 0; i < result.length; ++i) {
    // if (!fs.existsSync('./avatars')){
    //   fs.mkdirSync('./avatars');
    // }
    var currentFilePath = 'avatars/' + result[i]['login'] + ".jpg";
    downloadImageByURL(result[i]['avatar_url'], currentFilePath);

    // console.log(currentFilePath);
    // console.log(result[i]['avatar_url']);
  }
  // console.log("Errors:", err);
  // console.log("Result:", result);
});

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");