import http from "http";
// import gfname, { gfname1, gfname2, gfname3 } from "./name.js";
// console.log(gfname1);
// console.log(gfname2);
// console.log(gfname3);
import * as Obj from "./name.js";
console.log(Obj.default);
console.log(Obj.gfname1);
console.log(Obj.marks());

import fs from "fs";
// const home = fs.readFileSync("./index.html");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // res.end(`Age is ${Obj.age()}`);
    // fs.readFile("./index.html", (err, home) => {
    //   res.end(home);
    // });

    res.end(home);
  } else if (req.url === "/about") {
    res.end("About Page");
  } else if (req.url === "/contact") {
    res.end("Contact Page");
  } else {
    res.end("Not Found");
  }
});

server.listen(5000, () => {
  console.log("Server Working on Port No 5000");
});
