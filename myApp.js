let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

console.log("Hello World")

app.use((req, res, next) => {
  const logString = `${req.method} ${req.path} - ${req.ip}`;
  console.log(logString);
  next();
})

app.use("/public", express.static(__dirname + "/public"))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
})

app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({
      message: "Hello json"
    });
  }
})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({ time: req.time });
})

app.get('/:word/echo', (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

app.get("/name", (req, res) => {
  const { first: firstname, last: lastname } = req.query;
  res.json({ name: `${firstname} ${lastname}` })
})

app.post("/name", (req, res) => {
  const { first: firstname, last: lastname } = req.body;
  res.json({ name: `${firstname} ${lastname}` })
})


module.exports = app;
