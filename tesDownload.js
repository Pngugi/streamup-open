var fs = require('fs'),
request = require('request'),
 os = require('os');

var isOnline = require('is-online');

/**checking if connection is up or not */

isOnline().then(online => {
    console.log(online);
    //=> true
});


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
  var author = nodegit.Signature.create('richie',
    'beastar457@gmail.com', 123456789, 60);
  var committer = nodegit.Signature.create('richie',
    'beastar457@gmail.com', 987654321, 90);
  return repo.createCommit("HEAD", author, committer, "message", oid, [parent]);
})
.done(function(commitId) {
  console.log("New Commit: ", commitId);
});


//listingCommit Testing in progress

var Promise = require('promise');

nodegit.Repository.open(os.homedir()+'/Sbox/real').then(function(repo) {
  /* Get the current branch. */
  return repo.getCurrentBranch().then(function(ref) {
    console.log("On " + ref.shorthand() + " (" + ref.target() + ")");

    /* Get the commit that the branch points at. */
    return repo.getBranchCommit(ref.shorthand());
  }).then(function (commit) {
    /* Set up the event emitter and a promise to resolve when it finishes up. */
    var hist = commit.history(),
        p = new Promise(function(resolve, reject) {
            hist.on("end", resolve);
            hist.on("error", reject);
        });
    hist.start();
    return p;
  }).then(function (commits) {
    /* Iterate through the last 10 commits of the history. */
    for (var i = 0; i < 10; i++) {
      try {
        var sha = commits[i].sha().substr(0,7),
          msg = commits[i].message().split('\n')[0];
      console.log(sha + " " + msg);
      } catch (error) {
        console.log("");
      }
    }
  });
}).catch(function (err) {
  console.log(err);
}).done(function () {
  console.log('Finished');
});




//testing 
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'beastar457@gmail.com',
        pass: 'Umutoni&Richard'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'beastar457@gmail.com', // sender address
    to: 'beastar457@gmail.com, muragijimanarichard@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) =>{
    if (error) {
        return console.log(error);
    }
    //console.log('Message %s sent: %s', info.messageId, info.response);
});



//node nofifier
const notifier = require('node-notifier');
// String
notifier.notify('Message');

// Object
notifier.notify({
  'title': 'My notification',
  'message': 'Hello, there!'
});
