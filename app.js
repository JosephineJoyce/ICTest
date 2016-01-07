var express = require('express');
var bodyParser = require('body-parser');
var cfenv = require("cfenv");
var path = require('path');
var cors = require('cors');

//Setup Cloudant Service.
var appEnv = cfenv.getAppEnv();
console.log("appEnv is "+appEnv);
var out = '';
 for (var p in appEnv) {
    out += p + ': ' + appEnv[p] + '\n';
  }
  console.log("out is  "+out);

cloudantService = appEnv.getService("CatalogueCloudant");
var catalogue = require('./routes/catalogue');

//Setup middleware.
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'www')));

//REST HTTP Methods
//app.get('/db/:option', items.dbOptions);
app.get('/items', catalogue.list);
app.get('/items/:id', catalogue.find);
app.post('/items', catalogue.create);
app.put('/items/:id', catalogue.update);
app.delete('/items/:id', catalogue.remove);

app.listen(appEnv.port, appEnv.bind);
console.log('App started on ' + appEnv.bind + ':' + appEnv.port)