/**
 * second Tutorial - Introduction
// ES6 sintaxsys. commented because i prefer the old one (more similar to Java)
import tutorialModule, { sum, Math } from "./TutorialModule";

const tutorialModule = require("./TutorialModule");
console.log("Hellow word from node.js");
console.log("Content of TutorialModule:");
console.log(tutorialModule);
console.log(tutorialModule.sum(1,1));
var math = new tutorialModule.Math();
 */

/**
 * Thirt Tutorial - EventEmiter
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

// extend EventEmitter
class Person extends EventEmitter {
    name = "";
    constructor(name) {
        super();
        this.name = name;
    }

    on(event, person) {
//        super.on(event, person);
        if (event == "personCreated")
            console.log("the name of the person is: " + person.name);
    }
    get name() {
        return this.name;
    }
}

// event listener
eventEmitter.on("Sum", (num1, num2) => {
    console.log("Sum event has occurt. Result " + (num1 + num2));
});

eventEmitter.on("Tutorial", () => {
    console.log("Tutorial event has occurt.");
});



// event emmiters
eventEmitter.emit("Sum", "One + ", "Two");
eventEmitter.emit("Tutorial");

const person = new Person("Terry");
emit("personCreated", person);
 */

/**
 * fourt Tutorial - readLine
const readLine = require("readline");
const file = {
    input: process.stdin,
    output: process.stdout
};
const rl = readLine.createInterface(file);
var num1 = Math.floor((Math.random() * 10) + 1);
var num2 = Math.floor((Math.random() * 10) + 1);
var answer = num1 + num2;
rl.question(`what is ${num1} + ${num2}? `, (userInput) => {
    if (userInput.trim() == answer)
        console.log("Correct! you are a genius. Bye");
    else
        console.log("Incorrect. you need to studie more!! Bye");
    rl.close();
});
rl.on("close", () => console.log("readLine closed."));
 */

/**
 * 5 and 6 Tutorial - File system

const fileSystem = require("fs");
const fName = "node_Tutorial.txt";
fileSystem.writeFile(fName, "Content of the File.", (err) => {
    console.log(err != null ? err.message + err : "File succefully created.");
});
fileSystem.readFile(fName, (err, file) => {
    console.log(err != null ? err.message : "The file´s contetnt is: \n" + file);
});
fileSystem.appendFile(fName, "\nThis is an appended line.", (err) => {
    console.log(err != null ? err.message : "Data appended to the file.");
});
//fileSystem.unlink(fName, (err) =>{
//  console.log(err != null ? "Error deleting the File. " + err : "File deleted.");
//});

// dirs
const dirName = "Tutorial"
fileSystem.mkdir(dirName, (err) => {
    console.log(err != null ? err.message : "Dir created.");
});
fileSystem.copyFile(fName, dirName + "/" + fName, (err) => {
    if (err)
        throw err;
    console.log("file copied.");
});
fileSystem.rmdir(dirName, (err) => {
    console.log(err != null ? err.message : "Dir removed.");
});
 */

/**
 * tutorial 7 and 8 - radable and writable streams
const fileSystem = require("fs");
const readStream = fileSystem.createReadStream("./mdp-master.zip");
const writableStream = fileSystem.createWriteStream("nodeTutorialFile.txt");
readStream.on("data", (chunk) => {
    writableStream.write(chunk, (err) => {
        console.log(err != null ? err.message : "chunk of data copied.");
    });
    console.log("data chuck recived.");
});
 */
/**
 * Tutorial 10 - http server
 const http = require("http");
 
 function requestListener(request, response) {
    response.write("hello World");
    response.end();
}

const server = http.createServer((request, response) => {
    console.log(request.url);
    response.write("hello World");
    response.end();
});
server.listen("8080");
 */

/**
 * Tutorial 11 - Serving files

const { Console } = require("console");
const { setServers } = require("dns");
const fs = require("fs");
const http = require("http");

const server = http.createServer((request, response) => {
    fs.readFile("./testPage.html", (err, file) => {
        if (err) throw err;
        response.write(file);
        response.end();
    });
});
server.listen(8080);
 */

/**
 * Tutorial 12 - creating package with "npm init"
 * Tutorial 13 - instaling packages with "npm install"
 * https://www.npmjs.com/ is a sito to look and discovery packages. 
 * for this example i have this "npm install math-expression-evaluator" installed
 */

const mathEval = require("math-expression-evaluator");
const formula = "cos(30)*10";
console.log("math formula evaluation " + formula + " = " + mathEval.eval(formula));

/**
 * Tutorial 14 - namming versioning. Example  "math-expression-evaluator": "^1.3.8"
 * 1=mayor version: not compative whit old version 
 * 3=minor version: new function or deprecated function but still using
 * 8=patch version: bug fix
 * ^=this package allow changes in minor and patch version but not in mayor version. automatic download
 * ~=next to version meaning only allow path updates.
 * version number without ^ or ~ mean no update in the package version are allow. 
 * 
 */

/**
 * Tutorial 15 - Express server 
 * https://expressjs.com/ ist a framework for node.js
 */