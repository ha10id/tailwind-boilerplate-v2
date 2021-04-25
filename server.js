const jsonServer = require("json-server");
const auth = require("json-server-auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
var exec = require("child_process").exec;
const server = jsonServer.create();
const router = jsonServer.router("./db/db.json");
const middlewares = jsonServer.defaults(["noCors"]);
server.db = router.db;

// Set rewrite /api
server.use(
  jsonServer.rewriter({
    "/api/users/*": "/600/users/$1",
    "/api/user/info": "/user/info",
    "/api/upload": "/664/upload",
    "/api/*": "/644/$1"
  })
);

server.use(middlewares);
server.use(auth);
// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

server.get("/user/info", (req, res) => {
  let token = req.headers["authorization"];
  // console.log(token);
  let response = {error: "Bad authorization header"};
  let status = 403;
  token = token.split(" ")[1];
  if (token !== "undefined") {
    try {
      response = jwt.verify(token, "json-server-auth-123456");
      status = 200;
      // console.log(response);
    } catch (error) {
      response = error;
      status = 403;
    }
  }
  res.status(status).jsonp(response);
});

server.get("/user/is-admin", (req, res) => {
  let token = req.headers["authorization"];
  let response = {error: "Bad authorization header"};
  let status = 403;
  token = token.split(" ")[1];
  if (token !== "undefined") {
    response = jwt.verify(token, "json-server-auth-123456");
    status = 200;
  }
  res.status(status).jsonp(response);
});

const resize = function (image) {
  var cmd =
    "convert " +
    image.src +
    " -resize " +
    image.width +
    "x" +
    image.height +
    "^" +
    " -gravity center -crop " +
    image.width +
    "x" +
    image.height +
    "+0+0 " +
    image.dst;

  exec(cmd, function (error, stdout, stderr) {
    if (error) {
      console.log(error);
    }
  });
};

server.post("/upload", (req, res) => {
  var storage = multer.diskStorage({
    destination: "./public/static",
    filename: function (req, file, cb) {
      let farray = file.originalname.split(".");
      console.log(farray);
      cb(
        null,
        file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".")[farray.length - 1]
      );
    }
  });

  var upload = multer({
    storage: storage,
    limits: 1
  }).any();

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(520).jsonp({message: err});
    } else {
      req.files.forEach(function (item) {
        console.log(item);
        if (item.fieldname === "image")
          resize({
            src: item.path,
            dst: item.path,
            width: 250,
            height: 150
          });
      });
      res.status(200).jsonp(req.files[0]);
    }
  });
});

const getCredentials = token => {
  let userId = undefined;
  token = token.split(" ")[1];
  if (token !== "undefined") {
    try {
      let userCredentials = jwt.verify(token, "json-server-auth-123456");
      // console.log("user request: ", userCredentials);
      return parseInt(userCredentials.sub);
    } catch (e) {
      return undefined;
    }
  }
};

server.use(jsonServer.bodyParser);
//
// server.use((req, res, next) => {
//   res.setHeader("X-Content-Type-Options", "no-sniff");
//   next();
// });

server.use((req, res, next) => {
  if (req.url.indexOf("users") != -1 &&
    req.method === "PATCH" || req.method === "PUT" &&
    req.body.password) {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        req.body.password = hash;
        next();
      })
      .catch(next);
  } else {
    next(); // Simply continue with json-server router
    return;
  }
});
server.use((req, res, next) => {
  let userId = getCredentials(req.headers["authorization"]);
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
    if (userId) {
      req.body.userId = userId;
    }
  }
  // Continue to JSON Server router
  next();
});

// Use default router

server.use(router);
server.listen(4020, () => {
  console.log("JSON Server for dsreda.stavregion.ru is running");
});
