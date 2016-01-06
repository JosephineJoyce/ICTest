cloudant = require('cloudant')(cloudantService.credentials.url);
db = cloudant.use('items');

//Initiate the database.
initDB = function() {
    cloudant.db.create('items', function(err, body){
    if(!err){
        populateDB();
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
        name: 'War Room Table',
        color: 'tan',
        quantity: 5,
        description: 'A Beautiful War Room table, perfect for collaborative work spaces!',
        usaDollarPrice: 180.00
    },
    {
        name: 'Foosball Table',
        color: 'white',
        quantity: 53,
        description: 'Wooden table, some assembly required.',
        usaDollarPrice: 125.99
    },
    {
        name: 'Ping pong table',
        color: 'green',
        quantity: 7,
        description: 'A very sturdy ping pong table. Includes 2 paddles and a regulation sized net.',
        usaDollarPrice: 199.99
    },  
    {
        name: 'IBM Coffee Beans',
        color: 'brown',
        quantity: 155,
        description: 'These have been fueling IBMers for ages!',
        usaDollarPrice: 15.00
    },
    {
        name: 'Ping pong balls',
        color: 'white',
        quantity: 97,
        description: '3 star ping pong balls, regulation size.',
        usaDollarPrice: 12.00
    },
    {
        name: 'Travel Backpack',
        color: 'green',
        quantity: 64,
        description: 'This backpack is perfect for traveling.',
        usaDollarPrice: 49.99
    },
    {
        name: 'Monitor',
        color: 'white',
        quantity: 24,
        description: 'A computer monitor.',
        usaDollarPrice: 159.99
    },
    {
        name: 'Water Bottle',
        color: 'orange, blue, yellow',
        quantity: 71,
        description: '3 different colors to match your personality!',
        usaDollarPrice: 19.99
    }];

    for(p in products){
        db.insert(products[p], function(err, body, header){
            if(err){
                console.log('error in populating the DB items: ' + err );
            }
        });
    }   
}