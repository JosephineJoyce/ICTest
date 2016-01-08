require('./db');
initDB();

//Create an item to add to the database.
exports.create = function(req, res) {
        db.insert(req.body, function (err, body, headers) {
            if (!err) {
                res.send({msg: 'Successfully created item'});
            }
            else {
                res.send({msg: 'Error on insert, maybe the item already exists: ' + err});
            }
        });
    }
    
function createResponseData(id, name, quantity, description, dollarprice) {

	var responseData = {
		"id" : id,
		"name" : name,
		"quantity" : quantity,
		"description":description,
		"dollarprice":dollarprice
		
	};
	return responseData;
}
    
//find an item by ID.
exports.find = function(req, res) {
    var id = req.params.id;
    db.get(id, { revs_info: false }, function(err, body) {
        if (!err){
            res.send(body);
        }
        else{
            res.send({msg:'Error: could not find item: ' + id});
        }
    });
}

//list all the database contents.
exports.list = function(req, res) {
    db.list({include_docs: true}, function (err, body, headers) {
    if (!err) {
        //res.send(body);
        body.rows.forEach(function(document) {
			db.get(document.id, { revs_info: true }, function(err, doc) {
				if (!err) {
					var responseData = createResponseData(
							doc._id,
							doc.customerId,
							doc.itemId,
							doc.count
							);
					docList.push(responseData);
					i++;
					if(i >= len) {
						
						var out = '';

  for (var p in docList) {
    out += p + ': ' + docList[p] + '\n';
  }
  console.log("docList in catalogue is "+out);
						
						
						response.write(JSON.stringify(docList));
						console.log('ending response...');
						response.end();
					}
				} else {
					console.log(err);
				}
			});
			
		});
        return;
    }
    else res.send({msg:'Error listing items: ' + err});
    });
}


//update an item using an ID.
exports.update = function(req, res) {
    var id = req.params.id;
    var data = req.body;
    db.get(id,{revs_info:true}, function (err, body) {
        if(!err){
            data._rev = body._rev;
            db.insert(data, id, function(err, body, headers){
            if(!err){
                res.send({msg:'Successfully updated item: ' + JSON.stringify(data)});
            }
            else res.send({msg:'Error inserting for update: ' + err});
            });
        }
        else res.send({msg:'Error getting item for update: ' + err});
    });
}

//remove an item from the database using an ID.
exports.remove =  function(req, res){
    var id = req.params.id;
    db.get(id, { revs_info: true }, function(err, body) {
        if (!err){
            console.log('Deleting item: ' + id);
            db.destroy(id, body._rev, function(err, body){
                if(!err){
                    res.send({msg:'Successfully deleted item'});
                }
                else{
                    res.send({msg:'Error in delete: ' + err});
                }
            })
        }
        else{
            res.send({msg:'Error getting item id: ' + err});
        }
    });  
}