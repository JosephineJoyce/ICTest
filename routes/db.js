console.log("cloudantService.credentials.url is "+cloudantService.credentials.url);
require('cloudant')(cloudantService.credentials.url), function(err, cloudant1) {
  if (err) {
    return console.log('Failed to initialize Cloudant: ' + err.message);
  }
  }
  
  cloudant = require('cloudant')(cloudantService.credentials.url);

console.log("CatalogueCloudant is "+cloudant);
var db = null;


//Initiate the database.
initDB = function() {
	console.log("init DB");
	cloudant.db.list(function(err, allDbs) {
	console.log("all dbs is "+allDbs);
  //console.log('All my databases: %s', allDbs.join(', '))
});


    cloudant.db.create('items', function(err, body){
    console.log("err is "+err);
    console.log("body is "+body);
    if(!err){
        populateDB();
        db = cloudant.use('items');
        console.log('Successfully created database and populated!');
    }
    else{
        console.log("Database already exists.");
    }
    });
}

//populate the db with these items.
populateDB = function() {

    var products = [
    {
        name: 'AMANTREL CAPSULE 10S',
        manufacturer: 'CIPLA LIMITED',
        quantity: 5,
        description: 'Amantadine',
        price: 115.00
    },
    {
        name: 'PARKITIDIN TABLET 10S',
        manufacturer: 'SUN PHARMACEUTICAL INDUSTRIES LTD',
        quantity: 5,
        description: 'Amantadine',
        price: 78.00
    },
    {
        name: 'METFIRST T 50MG TABLET 10S',
        manufacturer: 'SINSAN PHARMACEUTICALS',
        description: 'Metoprolol+Telmisartan',
        quantity: 7,
        price: 199.99
    },  
    {
        name: 'TELMIVAS M 50MG TABLET 10S',
        manufacturer: 'MANO PHARMACEUTICALS PVT LTD',
        quantity: 94,
        description: 'Metoprolol+Telmisartan',
        price: 15.00
    },
    {
        name: 'TELEACT BETA 50MG TABLET 10S',
        color: 'RANBAXY LABORATORIES LTD',
        quantity: 97,
        description: 'Metoprolol+Telmisartan',
        price: 95.00
    },
    {
        name: 'GLYCIPHAGE G1 TABLET 10S',
        manufacturer: 'FRANCO INDIAN PHARMACEUTICALS PVT LTD',
        quantity: 64,
        description: 'Glimepiride+Metformin',
        price: 49.99
    },
    {
        name: 'FLUNER 10MG TABLET 10S',
        manufacturer: 'GENO PHARMACEUTICALS LIMITED',
        quantity: 24,
        description: 'Flunarizine',
        price: 45.99
    },
    {
        name: 'GRENIL F 10MG TABLET 10S',
        manufacturer: 'KARNATAKA ANTIBIOTIC & PHAMACEUTICALS LTD',
        quantity: 71,
        description: 'Flunarizine',
        price: 19.99
    }];

    for(p in products){
        db.insert(products[p], function(err, body, header){
            if(err){
                console.log('error in populating the DB items: ' + err );
            }
        });
    }   
}