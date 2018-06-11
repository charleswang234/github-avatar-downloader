var request = require('request');

console.log("Welcome to the Github Avatar Downloader");

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
}

getRepoContributors("jquery", "jquery", function(err, resulet) {
  console.log("Errors:", err);
  console.log("Result:", result);
});