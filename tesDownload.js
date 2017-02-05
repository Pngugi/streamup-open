var fs = require('fs'),
request = require('request'),
 os = require('os');
  var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(os.homedir()+'/Sbox/'+filename)).on('close', callback);
	//console.log(os.homedir);
  });
};
// download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
//   console.log('done');
// });

var NodeGit = require("nodegit");
var isBare = 0;
 NodeGit.Repository.init(os.homedir()+'/Sbox/real', isBare).then(function (repo) {
	console.log('initialized a repo please verify it');
  // In this function we have a repo object that we can perform git operations
  // on.
  // Note that with a new repository many functions will fail until there is
  // an initial commit.
})
.catch(function (reasonForFailure) {
  // If the repo cannot be created for any reason we can handle that case here.
  // NodeGit won't init a repo over a pre-existing repo.
});


//second lib helper for nodegit above var git = require('nodegit-kit');
var nodegit = require("nodegit");
var path = require("path");
var promisify = require("promisify-node");
 var fse = promisify(require("fs-extra"));
 var fileName = "newfile.txt";
 var fileContent = "hello world"; 
var directoryName = 'Sbox/real';
 // ensureDir is an alias to mkdirp, which has the callback with a weird name // and in the 3rd position of 4 (the 4th being used for recursion). We have to // force promisify it, because promisify-node won't detect it on its // own and assumes sync fse.ensureDir = promisify(fse.ensureDir); /**
 /* This example creates a certain file `newfile.txt`, adds it to the git
 * index and commits it to head. Similar to a `git add newfile.txt`
 * followed by a `git commit` **/ 
var repo;
 var index; var oid; 
nodegit.Repository.open(path.resolve(os.homedir(),'Sbox/real')) 
.then(function(repoResult) {
  repo = repoResult;
  return fse.ensureDir(path.join(repo.workdir(), directoryName));
}).then(function(){
  return fse.writeFile(path.join(repo.workdir(), fileName), fileContent);
})
.then(function() {
  return fse.writeFile(
    path.join(repo.workdir(), directoryName, fileName),
    fileContent
  );
})
.then(function() {
  return repo.refreshIndex();
})
.then(function(indexResult) {
  index = indexResult;
})
.then(function() {
  // this file is in the root of the directory and doesn't need a full path
  return index.addByPath(fileName);
})
.then(function() {
  // this file is in a subdirectory and can use a relative path
  return index.addByPath(path.join(directoryName, fileName));
})
.then(function() {
  // this will write both files to the index
  return index.write();
})
.then(function() {
  return index.writeTree();
})
.then(function(oidResult) {
  oid = oidResult;
  return nodegit.Reference.nameToId(repo, "HEAD");
})
.then(function(head) {
  return repo.getCommit(head);
})
.then(function(parent) {
  var author = nodegit.Signature.create(process.env.userName,
    process.env.userEmail, 123456789, 60);
  var committer = nodegit.Signature.create(process.env.userName,
    process.env.userEmail, 987654321, 90);
  return repo.createCommit("HEAD", author, committer, "message", oid, [parent]);
})
.done(function(commitId) {
  console.log("New Commit: ", commitId);
});
