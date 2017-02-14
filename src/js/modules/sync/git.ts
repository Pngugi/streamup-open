var path = require("path")
var nodegit = require('nodegit')
var promisify = require("promisify-node"); var fse =
    promisify(require("fs-extra")); var fileName = "newfile.txt";
var fileContent = "hello world";
let os = require('os');
export class Git {

    init(repoDir?: string): void {
        fse.ensureDir = promisify(fse.ensureDir); var repository; var index; fse.ensureDir(path.resolve((os.homedir(), 'real')).then(function () {

            return nodegit.Repository.init(path.resolve(os.homedir(), 'real'), 0);

        })
            .then(function (repo) {
                repository = repo;
                return fse.writeFile(path.join(repository.workdir(), fileName), fileContent);
            })
            .then(function () {
                return repository.refreshIndex();
            })
            .then(function (idx) {
                index = idx;
            })
            .then(function () {
                return index.addByPath(fileName);
            })
            .then(function () {
                return index.write();
            })
            .then(function () {
                return index.writeTree();
            })
            .then(function (oid) {
                var author = nodegit.Signature.create("Scott Chacon",
                    "schacon@gmail.com", 123456789, 60);
                var committer = nodegit.Signature.create("Scott A Chacon",
                    "scott@github.com", 987654321, 90);
                // Since we're creating an inital commit, it has no parents. Note that unlike
                // normal we don't get the head either, because there isn't one yet.
                return repository.createCommit("HEAD", author, committer, "message", oid, []);
            })
            .done(function(s){
                console.log(s);
             }));
        }
  
}

