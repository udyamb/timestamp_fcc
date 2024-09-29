// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const invalidDate=(date)=>date.toUTCString()==="Invalid Date"

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
let newDate=new Date(req.params.date)
if(invalidDate(newDate))
{
  newDate=new Date(+req.params.date)
}
if(invalidDate(newDate))
{
  res.json({error:"Invalid Date"})
  return
}
  res.json({unix:newDate.getTime(),utc:newDate.toUTCString()});
});

app.get('/api',(req,res)=>{
  let unixDate=new Date()
  let utcDate=new Date()
   res.json({unix:unixDate.getTime(),utc:utcDate.toUTCString()})
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT ||3050, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
